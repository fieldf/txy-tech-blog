---
title: Day03-装配抽奖策略
date: 2025-02-09
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 抽奖策略
  - redis
---

运营配置好一个抽奖策略以后，装配这个抽奖策略按不同概率实现奖品抽奖的功能。
## redis配置与测试
- 创建分支：250209-txy-strategy-armory
- 修改dev-ops目录结构：
  - environment/mysql
  - environment/redis
  - environment/docker-compose.yml
- redis.conf
```shell
bind 0.0.0.0
port 6379
```

**基础层infrastructure**添加redis包路径，
**app层**和**基础层**引用redis包
```shell
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.23.4</version>
</dependency>
```
**基础层redis包**下添加两个文件：IRedisService和RedissonService，[代码在这里找](https://bugstack.cn/md/road-map/ddd-archetype.html)

**app层**添加两个redis配置：RedisClientConfig和RedisClientConfigProperties

配置文件application.properties配置redis
```shell
# Redis
redis:
  sdk:
    config:
      host: 127.0.0.1
      port: 16379
      pool-size: 10
      min-idle-size: 5
      idle-timeout: 30000
      connect-timeout: 5000
      retry-attempts: 3
      retry-interval: 1000
      ping-interval: 60000
      keep-alive: true
```

测试：
```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApiTest {

    @Resource
    private IRedisService redisService;

    @Test
    public void test() {
        RMap<Object, Object> map = redisService.getMap("strategy_id_100001");
        map.put(1, 101);
        map.put(2, 101);
        map.put(3, 101);
        map.put(4, 102);
        map.put(5, 102);
        map.put(6, 102);
        map.put(7, 103);
        map.put(8, 103);
        map.put(9, 104);
        map.put(10, 105);
        log.info("测试结果：{}", redisService.getFromMap("strategy_id_100001", 1).toString());
    }
}
```

## 业务逻辑
### domain层添加包
```
domain/strategy/model
domain/strategy/repository
domain/strategy/service
```
- service包

  - service/包下新建策略装配库(兵工厂)/armory/IStrategyArmory，装配抽奖策略和抽奖方法
```java
public interface IStrategyArmory {
    void assembleLotteryStrategy(Long strategyId); // 装配抽奖策略
    Integer getRandomAwardId(Long strategyId); // 抽奖
}
```
  - 
    - IStrategyArmory接口实现类StrategyArmory(实现装配抽奖策略的逻辑 & 实现抽奖方法)
```java
@Service
public class StrategyArmory implements IStrategyArmory {
    @Resource
    private IStrategyRepository repository;

    @Override
    public void assembleLotteryStrategy(Long strategyId) {
        // 1. 查询策略配置
        List<StrategyAwardEntity> strategyAwardEntities = repository.queryStrategyAwardList(strategyId);

        // 2. 获取抽奖奖品概率最小值
        BigDecimal minAwardRate = strategyAwardEntities.stream()
                .map(StrategyAwardEntity::getAwardRate)
                .min(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);

        // 3. 获取概率值总和
        BigDecimal totalAwardRate = strategyAwardEntities.stream()
                .map(StrategyAwardEntity::getAwardRate)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. 用1 / 0.0001 获取概率范围
        BigDecimal rateRange = totalAwardRate.divide(minAwardRate, 0, RoundingMode.CEILING);

        // 5. 填充奖品策略数组
        ArrayList<Integer> strategyAwardSearchRateTables = new ArrayList<>(rateRange.intValue());
        for (StrategyAwardEntity strategyAwardEntity : strategyAwardEntities) {
            Integer awardId = strategyAwardEntity.getAwardId();
            BigDecimal awardRate = strategyAwardEntity.getAwardRate();
            for (int i = 0; i < awardRate.multiply(rateRange).setScale(0, RoundingMode.CEILING).intValue(); i ++ ) {
                strategyAwardSearchRateTables.add(awardId);
            }
        }

        // 6. 乱序
        Collections.shuffle(strategyAwardSearchRateTables);

        // 7. 转换为奖品策略hash表
        HashMap<Integer, Integer> shuffleStrategyAwardSearchRateTables = new HashMap<>();
        for (int i = 0; i < strategyAwardSearchRateTables.size(); i++) {
            shuffleStrategyAwardSearchRateTables.put(i, strategyAwardSearchRateTables.get(i));
        }

        // 8. 保存redis(此处传的抽奖概率范围不能是rateRange因为概率和可能不为1)
        repository.storeStrategyAwardSearchRateTable(strategyId, strategyAwardSearchRateTables.size(), shuffleStrategyAwardSearchRateTables);
    }

    // 抽奖
    @Override
    public Integer getRandomAwardId(Long strategyId) {
        // 1. 获取概率范围
        Integer rateRange = repository.getRateRange(strategyId);

        // 2. 获取抽奖奖品
        return repository.getStragegyAwardAssemble(strategyId, new SecureRandom().nextInt(rateRange));
    }
}
```
- repository 
  - repository/包下新建策略仓储接口IStrategyRepository

- model
  - model/包下新建策略奖品实体：StrategyAwardEntity，只需要po的必要字段

### infrastructure基础层(依赖domain)
实现仓储层接口,repository/包下新建StrategyRepository实现IStrategyRepository
```java
@Service
public class StrategyRepository implements IStrategyRepository {
    @Resource
    private IStrategyAwardDao strategyAwardDao;

    @Override
    public List<StrategyAwardEntity> queryStrategyAwardList(Long strategyId) {
        // 先查redis
        // redis没有查数据库
        // 保存redis
        return Collections.emptyList();
    }
} 
```

