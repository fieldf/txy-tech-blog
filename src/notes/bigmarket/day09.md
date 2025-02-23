---
title: Day09-抽奖模板整合
date: 2025-02-21
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 抽奖策略
  - 设计模式
---

分支：250221-txy-raffle-rule-flow
快捷键：ctrl+option+o，去除没用的import

## 概述
今天的内容是把前面的模板、责任链、规则树整合到一起，并且结合了数据库配置动态生成规则树模型。内容比较多和细碎，
但是整体是串联起来了。

## 整体流程
- 先装配抽奖规则，保存抽奖的最大数和对应随机数字->奖品的map
  - 如果抽奖策略有权重配置，则按照配置的去装配抽奖规则 
- 模板：模板整合抽奖流程 
  - 责任链：处理抽奖得到抽奖结果，若在黑名单或者权重，得到对应黑名单或权重配置的奖品
  - 规则树：得到奖品id后，看是否有奖品锁，如果有返回幸运奖；如果没有看库存，库存不够返回幸运奖

### 规则树模型表
1、新增表维护规则树模型
ruleTree
ruleTreeNode
ruleTreeNodeLine
2、写3个dao和1个repository查聚合的规则树类ruleTreeNodeVo
