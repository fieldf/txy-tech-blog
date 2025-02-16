---
title: Day07-抽奖前置规则过滤改造-责任链设计模式
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
## 概述
1. 做了什么
- 把之前实现的基于模板+策略+工厂的规则前过滤进行改造，改成责任链设计模式，因为规则前过滤各个部分有依赖关系且互斥（黑名单接管无需过滤权重），当前这部分逻辑写在代码中的，较臃肿，使用责任链模式更合适。
2. 整体的设计模式
- 抽奖模板+抽奖前规则过滤（责任链）+抽奖中规则过滤（策略）+抽奖前过滤规则实现&抽奖中过滤规则实现（工厂）
3. 设计模式通常组合使用：行为+创建，行为+创建+结构

分支：250216-txy-strategy-rule-chain

## 责任链模式
1. **特点**：互斥
2. **责任链接口**：ILogicChain
- 逻辑方法：logic()
- 链接方法：ILogicChain chainNext(ILogicChain)
- 获取下一个节点方法：next()

3. **责任链抽象类**： abstract AbstractLogicChain implement ILogicChain
- next节点：ILogicChain next;
- 实现chainNext(ILogicChain)
- 实现next();

4. **责任链具体实现**
- RuleBlackLogicChain: 黑名单规则
  - 如果当前用户在黑名单
    - 接管返回默认奖品id
  - 责任链放行
- RuleWeightLogicChain：权重规则
  - 若积分达到xxx，接管返回解锁范围内的抽奖结果
  - 责任链放行
- DefaultLogicChain：默认规则
  - 返回抽奖结果

## 工厂模式
- map注入
```java
@Service
public class LogicChainFactory {
    private Map<String, ILogicChain> map;
    private IStrategyRepository repository;
    
    LogicChainFactory(Map<String, ILogicChain> map, IStrategyRepository repository) {
        this.map = map;
        this.repository = repository;
    }
}
```
- 也可以使用自定义注解方式注入
```java
@Service
public class DefaultLogicFactory {

    public Map<String, ILogicFilter<?>> logicFilterMap = new ConcurrentHashMap<>();
    public DefaultLogicFactory(List<ILogicFilter<?>> logicFilters) {
        logicFilters.forEach(logic -> {
            LogicStrategy strategy = AnnotationUtils.findAnnotation(logic.getClass(), LogicStrategy.class);
            if (null != strategy) {
                logicFilterMap.put(strategy.logicMode().getCode(), logic);
            }
        });
    }
}
```
- 根据策略id查询rule_models都有哪些，连接成责任链

## 改造抽奖模板
- 将抽奖模板类中前置规则过滤部分替换为责任链
