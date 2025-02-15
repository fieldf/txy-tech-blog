---
title: Day05-抽奖规则过滤(设计模式)
date: 2025-02-09
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 抽奖策略
  - 设计模式
---
## 概述
- **使用【模板模式】定义抽奖方法模板**：固定步骤，调用前置规则过滤的抽象方法（由具体实现去实现具体的过滤规则），
根据规则过滤结果（即黑名单/权重过滤结果）判断执行抽奖（普通抽奖/黑名单返回固定奖品/权重抽奖）。
- **在具体实现中由【策略模式】实现规则过滤**：根据规则过滤的标识key，从工厂中获取策略接口【工厂模式】，根据不同策略调用规则过滤的具体实现。

## 步骤
创建分支：250210-txy-raffle-design
1. 模板模式 🧩
实现：
- 抽奖接口：IRaffleStrategy 
  - 出入参实体： 
    - 入参实体：RaffleFactorEntity抽奖需要的userId、strategyId 
    - 出参实体：RaffleAwardEntity抽奖结果奖品信息 
  - 抽奖方法:
```java
RaffleAwardEntity performRaffle(RaffleFactorEntity raffleFactorEntity);
```
- 定义抽象类：/raffle/AbstractRaffleStrategy **实现接口IRaffleStrategyn**（抽奖模板和抽象方法）
  - 抽象方法：执行前置规则过滤
- 定义实现方法：/raffle/RaffleStrategyImpl 实现抽象方法

2. 策略+工厂模式
- /rule/包下定义策略规则过滤接口ILogicFilter&lt;T extends RuffleEntity&gt;
  - 定义方法：RuleActionEntity&lt;T&gt; filter(RuleMatterEntity ruleMatterEntity); 
  - 出入参实体：
    - 入参：RuleMatterEntity
    - 出参：RuleActionEntity
```
RuleMatterEntity:
userId
strategyId
awardId
ruleModel
RuleActionEntity<T extends RuffleEntity>
   code;
   info;
   ruleModel;
   T data;
   public static class RuffleBeforeEntity extends RuffleEntity {
      strategyId;
      awardId;
      ruleWeightValueKey;
   }
```
- /rule/impl/下创建具体的过滤实现：
  - 权重过滤-按积分抽奖
  - 黑名单过滤-在黑名单返回固定奖品不进行抽奖RuleBlackListLogicFilter
- /rule/factory/下创建工厂：DefaultLogicFactory,管理不同的策略过滤实现
- /annotation/下创建自定义注解LogicStrategy，方便注入到工厂
```
DefaultLogicFactory.logicModel logicMode(); 
```
