---
title: 工厂设计模式
date: 2025-06-30
index: false
icon: laptop-code
category:
  - 设计模式
tags:
  - 设计模式
---

提供适配器

创建型模式

父类

多种类型商品不同接口，统一服务发奖系统搭建
```java
// 发放商品接口
public interface ICommodity {
    void sendCommodity(String uid, String commodityId, String bizId, Map<String, String> extMap) throws Exception;
}
```

```java
// 爱奇艺卡
public class CardCommodityService implements ICommoodity {
    // 模拟注入
    private IQyiCardService iQyiCardService = new IQiCardService();
    void sendCommodity(String uid, String commodityId, String bizId, Map<String, String> extMap) throws Exception {
        String mobile = queryUserMobile(uid);
        iQyiCardService.grantToken(mobile, bizId);
    }
}
```