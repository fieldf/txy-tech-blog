---
title: Day10-抽奖策略之库存扣减
date: 2025-02-22
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 抽奖策略
  - 设计模式
  - redis
---

分支：250222-txy-raffle-stock

### 策略装配与调度实现
- 策略装配接口（IStrategyArmory）： 
  - 装配抽奖策略：抽奖策略的range & 抽奖策略随机值与奖品映射map
  - **装配奖品库存**：缓存库存数据 strategy_award_count_key_#{strategyId}_#{awardId}
```java
/** repository */
@Override
public void storeStrategyStock(Long strategyId, Integer awardId, Integer awardCountSurplus) {
  String cacheKey = Constants.RedisKey.STRATEGY_AWARD_COUNT_KEY + strategyId + Constants.UNDERLINE + awardId;
  if (!redisService.isExists(cacheKey)) {
    redisService.setAtomicLong(cacheKey, awardCountSurplus);
  }
}
/** redisService */
// 用setValue不能incr或者decr操作
@Override
public Long getAtomicLong(String cacheKey) {
    return redissonClient.getAtomicLong(cacheKey).get();
}

@Override
public void setAtomicLong(String cacheKey, Integer awardCountSurplus) {
    redissonClient.getAtomicLong(cacheKey).set(awardCountSurplus);
}
```
- 策略调度接口（IStrategyDispatch）
  - 抽奖方法：普通抽奖与权重抽奖
  - **库存扣减**：subtractionAwardStock 
          decr
          setNx
  ```java
  /** repository */
  @Override
    public Boolean subStock(Long strategyId, Integer awardId) {
        String cacheKey = Constants.RedisKey.STRATEGY_AWARD_COUNT_KEY + strategyId + Constants.UNDERLINE + awardId;
        long decr = redisService.decr(cacheKey);
        if (decr < 0) {
            // 如果库存不足 设为0
            redisService.setAtomicLong(cacheKey, 0);
            return false;
        }

        // 如果扣减成功 设置lock锁 避免库存超卖
        String lockKey = cacheKey + Constants.UNDERLINE + decr;
        return redisService.setNx(lockKey);
    }
  ```

### 规则树
- 次数锁：
- 库存： 
  - 库存扣减 
  - 扣减成功发送消息队列：strategy_award_count_queue_key
```java
@Override
public void sendQueue(StrategyAwardStockVO strategyAwardStockVO) {
  String key = Constants.RedisKey.STRATEGY_AWARD_QUEUE_KEY;
  RBlockingQueue<StrategyAwardStockVO> blockingQueue = redisService.getBlockingQueue(key);
  RDelayedQueue<StrategyAwardStockVO> delayedQueue = redisService.getDelayedQueue(blockingQueue);
  delayedQueue.offer(strategyAwardStockVO, 3, TimeUnit.SECONDS);
}
```
- 兜底奖励
  - rule_tree_node的rule_value字段：101:1,100 

### 任务消费队列（UpdateAwardStockJob）
消耗库存的队列，延迟队列更新数据库库存，减少数据库压力
- 定时任务
  - 消费redis队列 takeQueueValue
  - 更新数据库表 updateStrategyAwardStock(strategyId, awardId)
```java
@Slf4j
@Component
public class ScheduleJob {
  @Resource
  private IRaffleStock raffleStock;

  @Scheduled(cron = "0/5 * * * * ?")
  public void schedule() {
    try {
      log.info("定时任务执行");
      StrategyAwardStockVO fromQueue = raffleStock.getFromQueue();
      if (fromQueue == null) {
        return;
      }
      log.info("定时任务更新库存");
      raffleStock.updateAwardStock(fromQueue);
    } catch (Exception e) {
      log.error(e.getMessage(), e);
    }
  }
}

```


### 单测
测试抽奖3次，是否会更新库存-3
```java
@Test
public void test_raffleAward() throws InterruptedException {
  for (int i = 0; i < 3; i++) {
    RaffleAwardEntity raffleAwardEntity = defaultRaffleService.performRaffle(RaffleFactorEntity.builder()
            .strategyId(100006L)
            .userId("txy").build());

    log.info("raffle result: {}", JSON.toJSONString(raffleAwardEntity.toString()));
  }
  new CountDownLatch(1).await();
}
```

### redis
redis命令：flushall

