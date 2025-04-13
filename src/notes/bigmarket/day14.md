---
title: Day14-抽奖活动重构
date: 2025-04-07
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
  - 数据库
tags:
  - 库表设计
---

分支：250407-txy-activity-order-design

将活动和库存解耦，作为商品属性绑定到商品上，后续不同模块例如支付/签到对应到不同的sku，当发生用户行为支付/签到时即对应给用户下一笔支付/签到的订单，且产生流水

修改库表结构
新增商品sku表，调整RaffleActivity表，和RaffleActivityCount解耦
删除RaffleActivityAccountFlow表，调整RaffleActivityOrder表

新增RaffleActivitySku的dao方法和xml配置：根据sku查询
增加dao方法：RaffleActivityCountDao增加根据activityCountId查询RaffleActivityCount方法
```java
RaffleActivityCount queryActivityCountByActivityCountId(Long activityCountId);
```

创建充血模型包(domain包下)
充血模型：按不同功能分类的包下有对应的对象和行为
贫血模型：mvc结构对象和行为放到不同的包
```java
activity
    model
        aggregate
        entity
        valobj：不影响数据变动的对象/枚举描述字段状态的对象
    repository
    service
        IRaffleOrder
```

