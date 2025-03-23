---
title: Day03-token验证鉴权
date: 2025-03-16
index: false
icon: laptop-code
category:
  - 学习笔记
  - chatgpt
tags:
  - dev-ops
---

**思路**：
1. 先登陆获取token(shiro登陆授权发放token)
2. 通过token鉴权访问使用openai接口

**工程结构**
- interfaces: **ApiAccessController**
- application: **IApiAccessService**
- domain:
  - access
  - security
    - model.vo: **JwtToken**
    - service:
      - realm: **JwtRealm**
      - **JwtFilter**
      - **JwtUtil**
      - **ShiroConfig**
- infrastructure
  - common: **Constants**

[文档](https://articles.zsxq.com/id_0843dvwa4j2i.html)

[代码](https://gitcode.net/KnowledgePlanet/chatgpt/chatgpt-api/-/blob/230502-xfg-api-proxy-auth/src/main/java/cn/bugstack/chatgpt/interfaces/ApiAccessController.java)
