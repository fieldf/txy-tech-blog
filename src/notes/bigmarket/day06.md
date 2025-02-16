---
title: Day06-抽奖规则过滤(中)
date: 2025-02-15
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 抽奖策略
  - 设计模式
---
## 做了什么
- 实现逻辑：实现**抽奖中**的规则过滤
  - 抽奖模板：新增抽奖中的过滤动作
  - 新增抽奖中策略：RULE_LOCK抽奖次数到达指定次数后可解锁抽奖奖品
- 实现步骤：在原有**模板、策略、工厂**设计模式的基础上扩展——抽奖中过滤规则

## 步骤
### 创建分支：
- 250215-txy-raffle-rule-center

### 模板
- 获取抽奖中规则（StrategyAwardRuleModelVo过滤奖品过滤规则是抽奖中的）并进行抽奖中过滤
  - 抽奖中过滤的抽象方法：doCenterRuleFilter
- 过滤后执行动作：
  - 若ALLOW则继续后面的步骤
  - 若TAKE_OVER表示不满足解锁条件，需要返回默认兜底逻辑RULE_LOCK

### 策略
- 抽奖中策略过滤（RULE_LOCK）
  - 逻辑：如果抽奖次数<解锁需要的抽奖次数，说明不符合抽奖条件，需要被接管返回默认兜底逻辑

### 工厂
1. 新增抽奖中策略枚举类型(RULE_LOCK)
2. LogicModel区分一下过滤规则是过滤前/中/后

