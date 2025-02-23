---
title: Day08-抽奖中后规则过滤-决策树模型
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
决策树思路：构造一个决策树（在单一职责的责任链不能满足需求且需要相对复杂的决策树形结构能表示出过滤规则逻辑时使用），
每个节点即是不同的过滤规则，使用工厂模式管理并提供决策树节点，由决策引擎接口实现决策树形的遍历。

## 实现
分支：250216-txy-rule-tree
### 节点数据结构 
- RuleTreeVO: 树根信息 
```java
public class RuleTreeVO {

    /** 规则树ID */
    private Integer treeId;
    /** 规则树名称 */
    private String treeName;
    /** 规则树描述 */
    private String treeDesc;
    /** 规则根节点 */
    private String treeRootRuleNode;

    /** 规则节点 */
    private Map<String, RuleTreeNodeVO> treeNodeMap;
}
```
- RuleTreeNodeVO: 节点信息
```java
public class RuleTreeNodeVO {

    /** 规则树ID */
    private Integer treeId;
    /** 规则Key */
    private String ruleKey;
    /** 规则描述 */
    private String ruleDesc;
    /** 规则比值 */
    private String ruleValue;

    /** 规则连线 */
    private List<RuleTreeNodeLineVO> treeNodeLineVOList;

}
```
- RuleTreeNodeLineVO: 节点连线信息
```java
public class RuleTreeNodeLineVO {

    /** 规则树ID */
    private Integer treeId;
    /** 规则Key节点 From */
    private String ruleNodeFrom;
    /** 规则Key节点 To */
    private String ruleNodeTo;
    /** 限定类型；1:=;2:>;3:<;4:>=;5<=;6:enum[枚举范围] */
    private RuleLimitTypeVO ruleLimitType;
    /** 限定值（到下个节点） */
    private RuleLogicCheckTypeVO ruleLimitValue;

}
```

### 节点接口
- 节点接口：ILogicTreeNode 
  - 逻辑处理方法：DefaultTreeFactory.TreeActionEntity logic(userId, strategyId, awardId)
  - 返回当前节点的处理结果：
    - 接管TAKE_OVER/放行ALLOW
    - 处理的结果信息：在本业务中就是奖品信息
- 接口实现： 
  - RuleLockLogicTreeNode：抽到一个奖品，抽奖次数不够则需要走兜底奖品返回（拦截则走兜底奖品节点）
  - RuleLuckAwardLogicTreeNode：返回兜底奖品
  - RuleStockAwardLogicTreeNode：抽到一个奖品看库存是否够，若够放行返回，若不够拦截返回兜底奖品

### 工厂与决策引擎
- 决策引擎接口：IDecisionTreeEngine
  - 作用：按照决策树路径进行节点的过滤
  - 方法：DefaultTreeFactory.StrategyAwardData process(userId, strategyId, awardId);
    - 返回走完规则树链路后的奖品信息
- 决策引擎接口实现：DecisionTreeEngine
  - 每个节点得到结果后（接管/放行），从决策树中获取该节点的相邻节点，对照着（接管/放行）找到下一个节点，逐步遍历到最后
```java
@Override
public DefaultTreeFactory.AwardResClass process(Long strategyId, String userId, Integer awardId) {
    String treeRootRuleNode = ruleTreeVO.getTreeRootRuleNode(); // 根节点
    Map<String, RuleTreeNodeVO> treeNodeMap = ruleTreeVO.getTreeNodeMap(); // 决策树子节点map

    RuleTreeNodeVO ruleTreeNodeVO = treeNodeMap.get(treeRootRuleNode); // treeNode节点

    DefaultTreeFactory.AwardResClass resClass = null;

    while (treeRootRuleNode != null) {
        ILogicTreeNode iLogicTreeNode = logicTreeGroup.get(ruleTreeNodeVO.getRuleKey());
        DefaultTreeFactory.DecisionEngineRes logic = iLogicTreeNode.logic(strategyId, userId, awardId);
        log.info(JSON.toJSONString(logic));

        RuleLogicCheckTypeVO ruleLogicCheckTypeVO = logic.getRuleLogicCheckTypeVO();
        resClass = logic.getAwardResClass();

        treeRootRuleNode = nextTreeNode(ruleLogicCheckTypeVO, ruleTreeNodeVO.getTreeNodeLineVOList());
        ruleTreeNodeVO = treeNodeMap.get(treeRootRuleNode);
    }
    return resClass;

}

private String nextTreeNode(RuleLogicCheckTypeVO ruleLogicCheckTypeVO, List<RuleTreeNodeLineVO> treeNodeLineVOList) {
    if (treeNodeLineVOList == null || treeNodeLineVOList.isEmpty()) {
        return null;
    }
    for (RuleTreeNodeLineVO ruleTreeNodeLineVO : treeNodeLineVOList) {
        if (decisionEqual(ruleLogicCheckTypeVO.getCode(), ruleTreeNodeLineVO)) {
            return ruleTreeNodeLineVO.getRuleNodeTo();
        }
    }
    throw new RuntimeException("配置不合理");
}
```

- 工厂：DefaultTreeFactory
  - 提供决策引擎接口：openDecisionTreeEngine

## 其他
idea插件：sequenceDiagram，画出代码中各部分图
