---
title: docker部署
date: 2025-06-09
index: false
icon: laptop-code
category:
  - docker
tags:
  - docker
---

1. 购买服务器
- 服务器规格：2c4g-60G 5M带宽 500G流量 基本就够用了
- 操作系统：CentOS 7.9 64位 arm架构
2. 环境配置
- docker安装(docker/docker-compose/portainer)：[https://bugstack.cn/md/road-map/docker.html](https://bugstack.cn/md/road-map/docker.html)

3. 部署流程
- 前端项目：build镜像构建打包 
  - dockerfile
  - docker build txy/name
  - docker hub上创建 txy/name
  - 在docker中push到远端 
- 后端项目：build镜像构建打包
- 发布push到docker-hub镜像站中
- docker容器中把上面两个镜像拉下来使用构建
- docker-compose文件：配置mysql/redis/nginx/2个
