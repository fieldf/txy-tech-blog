---
title: Day11-前端创建与后端http接口api
date: 2025-02-23
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
  - 前端
tags:
  - React
---

[参考文章](https://articles.zsxq.com/id_7ju9438pw3gl.html)

## 初始化
### 开发环境
- node.js
- webstorm
- 切换npm镜像源
- 课程资料： 
  - 官网中文资料 https://zh-hans.react.dev/learn
  - 菜鸟教程 https://www.runoob.com/typescript/ts-tutorial.html


### 创建前端项目
- webstorm创建工程
    - 类型：next.js
    - 工程名：big-market-front
- page.tsx：
  - 主页
  - 把return里面内容替换为我们的首页框架
- 抽奖组件
  - 引入包：npm install @lucky-canvas/react@latest
    - [搜索npm包](https://npms.io/)：lucky
    - 抽奖组件官网：https://100px.net/
  - 创建文件：
    - 大转盘：src/app/pages/lucky/[lucky-wheel-page.tsx](https://articles.zsxq.com/id_7ju9438pw3gl.html)
    - 九宫格：src/app/pages/lucky/[lucky-grid-page.tsx](https://articles.zsxq.com/id_7ju9438pw3gl.html)
- page.tsx引入转盘和九宫格组件
- 启动工程：访问localhost:3000


## mock接口
### 使用apifox mock两个接口
1. 查询奖品列表接口：/api/v1/raffle/query_raffle_award_list
2. 随机抽奖接口：/api/v1/raffle/random_raffle

### 代码逻辑
[https://articles.zsxq.com/id_hww9b56sdlcx.html](https://articles.zsxq.com/id_hww9b56sdlcx.html)
- 抽奖页面调用接口1，渲染奖品信息
- 抽奖调用接口2并渲染抽奖结果信息

## http接口
后端api提供3个接口
1. 装配策略
2. 查询奖品列表
3. 抽奖

```java

/**
 * 装配策略接口
 * @param strategyId
 * @return
 */
Response<Boolean> strategyArmory(Long strategyId);

/**
 * 查询奖品信息接口
 * @param raffleAwardListRequestDTO
 * @return
 */
Response<List<RaffleAwardListResponseDTO>> queryRaffleAwardList(RaffleAwardListRequestDTO raffleAwardListRequestDTO);

/**
 * 抽奖接口
 * @param requestDTO
 * @return
 */
Response<RaffleResponseDTO> randomRaffle(RaffleRequestDTO requestDTO);
```

## 前后端对接
1、pages页面添加装配抽奖组件
2、api新增抽奖装配接口
3、大转盘页面改造


