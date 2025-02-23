---
title: redis常见用法
date: 2025-02-22
index: false
icon: laptop-code
category:
  - redis
tags:
  - redis
---

## key,value
```java
public <T> void setValue(String key, T value) {
    redissonClient.<T>getBucket(key).set(value);
}
public <T> T getValue(String key) {
    return redissonClient.<T>getBucket(key).get();
}
```

```java
// 先从缓存中获取
String cacheKey = Constants.RedisKey.STRATEGY_AWARD_KEY + strategyId;
List<StrategyAwardEntity> strategyAwardEntities = redisService.getValue(cacheKey);

// 保存redis
redisService.setValue(cacheKey, strategyAwardEntities);
```

## hash
```java
@Override
public <K, V> RMap<K, V> getMap(String key) {
    return redissonClient.getMap(key);
}

@Override
public <K, V> V getFromMap(String key, K field) {
    return redissonClient.<K, V>getMap(key).get(field);
}
```

```java
// 2. 保存策略奖品概率查找表
RMap<Integer, Integer> cacheRateTable = redisService.getMap(Constants.RedisKey.STRATEGY_RATE_TABLE_KEY + key);
cacheRateTable.putAll(shuffleStrategyAwardSearchRateTables);

return redisService.getFromMap(Constants.RedisKey.STRATEGY_RATE_TABLE_KEY + strategyId, randomNum);
```

## atomicLong

```java
@Override
public Long getAtomicLong(String cacheKey) {
    return redissonClient.getAtomicLong(cacheKey).get();
}

@Override
public void setAtomicLong(String cacheKey, Integer awardCountSurplus) {
    redissonClient.getAtomicLong(cacheKey).set(awardCountSurplus);
}
```

- 使用场景：库存扣减，可以用desc/incr
```java
// 存储库存
@Override
public void storeStrategyStock(Long strategyId, Integer awardId, Integer awardCountSurplus) {
    String cacheKey = Constants.RedisKey.STRATEGY_AWARD_COUNT_KEY + strategyId + Constants.UNDERLINE + awardId;
    Long stockCount = redisService.getAtomicLong(cacheKey);
    if (stockCount == null) {
        redisService.setAtomicLong(cacheKey, awardCountSurplus);
    }
}

// 库存扣减
@Override
public Boolean subStock(Long strategyId, Integer awardId) {
    String cacheKey = Constants.RedisKey.STRATEGY_AWARD_COUNT_KEY + strategyId + Constants.UNDERLINE + awardId;
    long decr = redisService.decr(cacheKey);
    if (decr < 0) {
        // 如果库存不足 设为0
        redisService.setAtomicLong(cacheKey, 0);
        return false;
    }

    // 如果扣减成功 设置lock锁
    String lockKey = cacheKey + Constants.UNDERLINE + decr;
    return redisService.setNx(lockKey);
}
```



## 延迟队列
```java
@Override
public <T> RBlockingQueue<T> getBlockingQueue(String key) {
    return redissonClient.getBlockingQueue(key);
}

@Override
public <T> RDelayedQueue<T> getDelayedQueue(RBlockingQueue<T> rBlockingQueue) {
    return redissonClient.getDelayedQueue(rBlockingQueue);
}
```

- 使用场景:扣减库存的时候把哪个奖品扔到延迟队列，定时消费队列并执行数据库的库存扣减
```java
@Override
public void sendQueue(StrategyAwardStockVO strategyAwardStockVO, Long strategyId, Integer awardId) {
    String key = Constants.RedisKey.STRATEGY_AWARD_QUEUE_KEY + strategyId + Constants.UNDERLINE + awardId;
    RBlockingQueue<StrategyAwardStockVO> blockingQueue = redisService.getBlockingQueue(key);
    RDelayedQueue<StrategyAwardStockVO> delayedQueue = redisService.getDelayedQueue(blockingQueue);
    delayedQueue.offer(strategyAwardStockVO, 3, TimeUnit.SECONDS);
}

@Override
public StrategyAwardStockVO getAwardQueue(Long strategyId, Integer awardId) {
    String key = Constants.RedisKey.STRATEGY_AWARD_QUEUE_KEY + strategyId + Constants.UNDERLINE + awardId;
    RBlockingQueue<StrategyAwardStockVO> blockingQueue = redisService.getBlockingQueue(key);
    return blockingQueue.poll();
}
```

## setNx
```java
@Override
public Boolean setNx(String lockKey) {
    return redissonClient.getBucket(lockKey).trySet("lock");
}
```

- 使用场景：
```java
@Override
public Boolean subtractionAwardStock(Long strategyId, Integer awardId) {
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

