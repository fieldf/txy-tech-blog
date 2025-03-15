---
title: Day12-抽奖部署
date: 2025-03-15
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
  - 部署
tags:
  - docker
---


## 前端
### 打包部署流程
- 前端工程目录下添加/修改以下3个文件 
  - Dockerfile：镜像脚本，用于打包部署
  - next.config.js：启动的
  - build.sh：执行镜像脚本，用于构建镜像
- 修改.env.local修改路径地址：本地/远程服务器
- 执行build.sh构建脚本：打包前端镜像
  - 构建完成后：本地Docker Desktop可以看到构建的镜像

### 配置文件
#### 1. Dockerfile
```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN yarn config set registry 'https://registry.npmmirror.com/'
RUN yarn install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```
#### 2. next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    target: 'server',
    output: "standalone",
    env: {
        API_HOST_URL: process.env.API_HOST_URL
    },
}

module.exports = nextConfig
```
#### 3. build.sh
```shell
docker build -t txy/big-market-front-app:1.1 .
```

## 后端
### 打包部署流程
- app模块目录下新增以下文件
  - Dockerfile：镜像脚本
  - build.sh：执行镜像脚本，构建镜像
- install：有了target文件才能构建出镜像
- 执行build.sh构建镜像
  - 构建完成后：在docker desktop可看到构建的镜像
  - 推送至dockerhub（可选）：https://hub.docker.com/
    - 创建repository：例如：txy/big-market-app（与本地镜像保持一致）
- dev-ops目录：添加部署脚本
  - mysql & redis目录：提供了数据库表的创建脚本以及一些环境配置
  - docker-compose-environment.yml：部署环境，如Mysql，redis
  - docker-compose-app.yml：用于部署前后端应用
  - start.sh和stop.sh：启停应用的脚本
- 部署环境
  - 命令执行：docker-compose -f docker-compose-environment.yml up -d（idea中直接点运行）
- 部署应用
  - 命令执行：docker-compose -f docker-compose-app.yml up -d
- 云服务端部署
  - terminus连接远程服务端
  - 创建dev-ops文件夹，把相关文件copy过去
  - 执行docker-compose安装即可
### 配置文件
#### 1. Dockerfile
```dockerfile
# 基础镜像
FROM openjdk:8-jre-slim

# 作者
MAINTAINER txyyy

# 配置
ENV PARAMS=""

# 时区
ENV TZ=PRC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 添加应用
ADD target/big-market-app.jar /big-market-app.jar

ENTRYPOINT ["sh","-c","java -jar $JAVA_OPTS /big-market-app.jar $PARAMS"]
```
#### build.sh
执行Dockerfile的脚本
```shell
# 普通镜像构建，随系统版本构建 amd/arm
docker build -t txy/big-market-app:1.0-SNAPSHOT -f ./Dockerfile .

# 兼容 amd、arm 构建镜像
# docker buildx build --load --platform liunx/amd64,linux/arm64 -t xiaofuge/xfg-frame-archetype-app:1.0 -f ./Dockerfile . --push
```
#### docker-compose-environment.yml
```shell
# 命令执行 docker-compose -f docker-compose-environment.yml up -d
version: '3.9'
services:
  mysql:
    image: mysql:8.0.32
    container_name: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123456
    networks:
      - my-network
    depends_on:
      - mysql-job-dbdata
    ports:
      - "13306:3306"
    volumes:
      - ./mysql/sql:/docker-entrypoint-initdb.d
    healthcheck:
      test: [ "CMD", "mysqladmin" ,"ping", "-h", "localhost" ]
      interval: 5s
      timeout: 10s
      retries: 10
      start_period: 15s
    volumes_from:
      - mysql-job-dbdata

  # 自动加载数据
  mysql-job-dbdata:
    image: alpine:3.18.2
    container_name: mysql-job-dbdata
    volumes:
      - /var/lib/mysql

  # phpmyadmin https://hub.docker.com/_/phpmyadmin
  phpmyadmin:
    image: phpmyadmin:5.2.1
    container_name: phpmyadmin
    hostname: phpmyadmin
    ports:
      - 8899:80
    environment:
      - PMA_HOST=mysql
      - PMA_PORT=3306
      - MYSQL_ROOT_PASSWORD=123456
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - my-network

  # Redis
  redis:
    image: redis:6.2
    container_name: redis
    restart: always
    hostname: redis
    privileged: true
    ports:
      - 16379:6379
    volumes:
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    networks:
      - my-network
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 10s
      timeout: 5s
      retries: 3

  # RedisAdmin https://github.com/joeferner/redis-commander
  redis-admin:
    image: spryker/redis-commander:0.8.0
    container_name: redis-admin
    hostname: redis-commander
    restart: always
    ports:
      - 8081:8081
    environment:
      - REDIS_HOSTS=local:redis:6379
      - HTTP_USER=admin
      - HTTP_PASSWORD=admin
      - LANG=C.UTF-8
      - LANGUAGE=C.UTF-8
      - LC_ALL=C.UTF-8
    networks:
      - my-network
    depends_on:
      redis:
        condition: service_healthy

networks:
  my-network:
    driver: bridge
```
#### docker-compose-app.yml
```shell
version: '3.8'
# 命令执行 docker-compose -f docker-compose-app.yml up -d
services:
  big-market-app:
    image: txyyy/big-market-app:1.0-SNAPSHOT
    container_name: big-market-app
    restart: always
    ports:
      - "8091:8091"
    environment:
      - TZ=PRC
      - SERVER_PORT=8091
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=123456
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/big_market?serverTimezone=UTC&characterEncoding=utf8&autoReconnect=true&serverTimezone=Asia/Shanghai
      - SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver
      - SPRING_HIKARI_POOL_NAME=Retail_HikariCP
      - REDIS_SDK_CONFIG_HOST=redis
      - REDIS_SDK_CONFIG_PORT=6379
    volumes:
      - ./log:/data/log
    networks:
      - my-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
  big-market-front-app:
    container_name: big-market-front-app
    image: txyyy/big-market-front-app:1.1
    restart: always
    networks:
      - my-network
    ports:
      - 3000:3000
    environment:
      - API_HOST_URL=http://192.168.1.8:8091
      - PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
    healthcheck:
      test: [ "CMD", "wget", "--spider", "-q", "http://0.0.0.0:3000/" ]
      interval: 1m
      timeout: 10s
      retries: 3

networks:
  my-network:
    driver: bridge
```
#### start.sh
```shell
CONTAINER_NAME=big-market
IMAGE_NAME=txyyy/big-market-app:1.0-SNAPSHOT
PORT=8091

echo "容器部署开始 ${CONTAINER_NAME}"

# 停止容器
docker stop ${CONTAINER_NAME}

# 删除容器
docker rm ${CONTAINER_NAME}

# 启动容器
docker run --name ${CONTAINER_NAME} \
-p ${PORT}:${PORT} \
-d ${IMAGE_NAME}

echo "容器部署成功 ${CONTAINER_NAME}"

docker logs -f ${CONTAINER_NAME}
```
#### stop.sh
```shell
docker stop big-market-app
```


