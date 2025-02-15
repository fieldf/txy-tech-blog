---
title: Day04-抽奖权重策略装配
date: 2025-02-09
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 抽奖策略
---

能够实现按照不同积分解锁不同的抽奖奖品-策略的权重规则配置。

创建分支：250209-txy-strategy-armory-rule-weight

重构：
- 在/domain/service/armory/包下创建接口IStrategyDispatch：策略抽奖调度，把IStrategyArmory类的抽奖方法移过来，
- 实现类实现两个接口：IStrategyArmory，IStrategyDispatch
- 原来装配策略方法拆分成两个模块，1.查询策略奖品配置，2.装配抽奖策略（便于复用）

```java
@Override
public boolean assembleLotteryStrategy(Long strategyId) {
    // 1. 查询策略配置 装配抽奖策略
    List<StrategyAwardEntity> strategyAwardEntities = repository.queryStrategyAwardList(strategyId);
    assembleLotteryStrategy(String.valueOf(strategyId), strategyAwardEntities);

    // 2. 查询策略权重
    StrategyEntity strategyEntity = repository.queryStrategyByStrategyId(strategyId);
    String ruleWeight = strategyEntity.getRuleWeight();
    if (ruleWeight == null) {
        return true;
    }

    // 3. 查询策略规则
    StrategyRuleEntity strategyRuleEntity = repository.queryStrategyRule(strategyId, ruleWeight);
    if (strategyRuleEntity == null) {
        throw new AppException(STRATEGY_RULE_WEIGHT_IS_NULL.getCode(), STRATEGY_RULE_WEIGHT_IS_NULL.getInfo());
    }

    // 4. 权重规则类型不同积分的奖品重新装配抽奖策略
    Map<String, List<Integer>> ruleWeightValues = strategyRuleEntity.getRuleWeightValues();
    ruleWeightValues.forEach((key, value) -> {
        List<StrategyAwardEntity> strategyAwardEntitiesClone = new ArrayList<>(strategyAwardEntities);
        strategyAwardEntitiesClone.removeIf(entity -> !value.contains(entity.getAwardId()));
        assembleLotteryStrategy(String.valueOf(strategyId).concat("_").concat(key), strategyAwardEntitiesClone);
    });

    return true;
}
```
- 权重策略规则装配
  - 创建策略规则实体类
  - 装配方法步骤添加：查询策略权重对应的策略规则（根据：策略id & 策略模型【权重类型】）
    - repository=>dao=>mybatis.xml
  - 对配置了权重规则的策略按不同积分下的奖品分别重新装配抽奖策略
- 单测