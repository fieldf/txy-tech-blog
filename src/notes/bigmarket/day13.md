---
title: Day13-抽奖活动，分库分表路由组件
date: 2025-04-06
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
  - 数据库
tags:
  - 库表设计
---
1. **新增5张活动相关的表**：
- raffle_activity：抽奖活动表
- raffle_activity_count：抽奖活动关联配置
- raffle_activity_account：用户抽奖活动
- raffle_activity_account_flow：用户流水
- raffle_activity_order: 用户订单

2. **创建分支**

3. **引入分库分表组件**：db-router-spring-boot-starter
```java
<dependency>
    <groupId>cn.bugstack.middleware</groupId>
    <artifactId>db-router-spring-boot-starter</artifactId>
    <version>1.0.2</version>
</dependency>
```

4. **分库分表配置**：
```java
# 多数据源路由配置，库数量 * 表数量 为2的次幂，如2库4表
# mysql 5.x 配置 driver-class-name: com.mysql.jdbc.Driver    mysql-connector-java 5.1.34
# mysql 8.x 配置 driver-class-name: com.mysql.cj.jdbc.Driver mysql-connector-java 8.0.22
mini-db-router:
  jdbc:
    datasource:
      dbCount: 2
      tbCount: 4
      default: db00
      routerKey: userId
      list: db01,db02
      db00:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:3306/big_market?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
        username: root
        password: 123456
        type-class-name: com.zaxxer.hikari.HikariDataSource
        pool:
          pool-name: Retail_HikariCP
          minimum-idle: 15 #最小空闲连接数量
          idle-timeout: 180000 #空闲连接存活最大时间，默认600000（10分钟）
          maximum-pool-size: 25 #连接池最大连接数，默认是10
          auto-commit: true  #此属性控制从池返回的连接的默认自动提交行为,默认值：true
          max-lifetime: 1800000 #此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认1800000即30分钟
          connection-timeout: 30000 #数据库连接超时时间,默认30秒，即30000
          connection-test-query: SELECT 1
      db01:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:3306/big_market_01?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
        username: root
        password: 123456
        type-class-name: com.zaxxer.hikari.HikariDataSource
        pool:
          pool-name: Retail_HikariCP
          minimum-idle: 15 #最小空闲连接数量
          idle-timeout: 180000 #空闲连接存活最大时间，默认600000（10分钟）
          maximum-pool-size: 25 #连接池最大连接数，默认是10
          auto-commit: true  #此属性控制从池返回的连接的默认自动提交行为,默认值：true
          max-lifetime: 1800000 #此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认1800000即30分钟
          connection-timeout: 30000 #数据库连接超时时间,默认30秒，即30000
          connection-test-query: SELECT 1
      db02:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:3306/big_market_02?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
        username: root
        password: 123456
        type-class-name: com.zaxxer.hikari.HikariDataSource
        pool:
          pool-name: Retail_HikariCP
          minimum-idle: 15 #最小空闲连接数量
          idle-timeout: 180000 #空闲连接存活最大时间，默认600000（10分钟）
          maximum-pool-size: 25 #连接池最大连接数，默认是10
          auto-commit: true  #此属性控制从池返回的连接的默认自动提交行为,默认值：true
          max-lifetime: 1800000 #此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认1800000即30分钟
          connection-timeout: 30000 #数据库连接超时时间,默认30秒，即30000
          connection-test-query: SELECT 1
```

5. **创建对应的DAO接口**
- IRaffleActivityDao里面查找活动的方法不需要走分库分表
```java
RaffleActivity queryRaffleActivityByActivityId(Long activityId);
```
- 用户抽奖活动单需要走分库分表，固定写法
```java
@Mapper
@DbRouterStrategy(splitTable = true)
public interface IRaffleActivityOrder {
    @DBRouter(key = "userId")
    void insert(IRaffleActivityOrder order);
    
    @DBRouter
    List<RaffleActivityOrder> queryRaffleActivityOrderByUserId(Long userId); 
}
```

6. **写xml文件**

7. **测试**：
- 测试不分库分表的查询：IRaffleActivityDao
- 测试分库分表的查询：IRaffleActivityOrderDao（插入&查询）
- 引入可随机mock数据的包
```java
<dependency>
    <groupId>org.jeasy</groupId>
    <artifactId>easy-random-core</artifactId>
    <version>4.3.0</version>
</dependency>
```
