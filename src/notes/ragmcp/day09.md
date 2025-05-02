---
title: Day09-部署上线
date: 2025-05-02
index: false
icon: laptop-code
category:
  - 学习笔记
  - ai
tags:
  - deepseek
  - rag
---

## 分支 10-tag-v1
本地代码->打包构建镜像->上传docker-hub->云服务器执行环境安装(redis/ollama/pgvector)->云服务器执行软件安装(上传docker-hub的打包镜像)

## 部署
### 1. 部署脚本文件夹配置检查
dev-ops/tag/v1.0目录
#### api
测试脚本
- curl.json
- curl.sh

#### maven
maven配置
- settings.xml

#### nginx
nginx配置以及前端文件
- conf/
- html/
#### pgvector
pgvector配置文件及初始化sql
- sql/init.sql

#### redis
redis配置文件
- redis.conf

#### 环境及本地代码docker-compose文件
- docker-compose-app-v1.0.yml
- docker-compose-environment.yml
- docker-compose-environment-aliyun.yml
- 注意
  - 里面redis和向量库的配置端口为docker的端口
  - ollama的端口为服务器端口

### 2. 构建镜像
1. 打包
- maven clean install
2. app模块下配置文件
- dockerFile文件
- build.sh：启动脚本，构建镜像
3. docker-hub上创建仓库
4. 本地docker构建的镜像 push to hub


### 3. 上传并执行脚本
1. 上传v1.0目录下脚本到云服务器/dev-ops目录下
2. 执行环境安装
```text
docker-compose -f docker-compose-environment-aliyun.yml up -d
```
3. 执行软件安装
```text
docker-compose -f docker-compose-app-v1.0.yml up -d
```
4. portainer查看软件并访问测试

## 问题
### 问题1 本地构建arm架构镜像在拉取jdk镜像时超时问题
本地是arm架构，构建的docker镜像在远程服务器amd架构上运行会不兼容，因此本地要构建兼容多平台docker镜像，执行：
```bash
docker buildx build --load --platform liunx/amd64,linux/arm64 -t fuzhengwei/ai-rag-knowledge-app:1.2 -f ./Dockerfile . --push
```
报错拉取jdk17镜像超时，但是使用docker pull还能正常拉取，尝试显式配置 BuildKit 镜像源，
```text
mkdir -p /etc/buildkit
cat <<EOF > /etc/buildkit/buildkitd.toml
[registry."docker.io"]
  mirrors = ["https://k8selkkp.mirror.aliyuncs.com"]
EOF
```
仍不行，想了一个笨办法。
1. 把项目上传到远程服务器
2. 切换到项目目录
```text
cd /home/username/projects/your-project
```
3. 构建镜像(该步骤可正常执行)
```bash
docker build -t txyyy/ai-rag-knowledge-app:1.1 -f Dockerfile .
```
4. 尝试在远程服务器登陆docker，用于推送镜像，但连不上，只能搞到本地在push到远程
```text
docker login
```
5. 将镜像保存为 tar 文件并传回本地
```text
# 查看已构建的镜像列表
docker images
# 将镜像保存为 tar 文件（例如镜像名为 txyyy/ai-rag-knowledge-app:1.1）
docker save -o image.tar txyyy/ai-rag-knowledge-app:1.1
# 在本地终端执行（非远程服务器）将文件copy回本地
scp jdyun:/path/to/image.tar ./image.tar
```
6. 在本地加载镜像
```text
docker load -i image.tar

# 验证镜像是否存在
docker images | grep txyyy/ai-rag-knowledge-app
```
7. 上传至远程仓库
8. 其中4-8为上传docker-hub步骤，在远程仓库构建完镜像后，可以直接执行docker-compose启动服务了
9. 几个常用命令
```text
docker-compose -f docker-compose-app-v1.0.yml down
docker-compose -f docker-compose-app-v1.0.yml up -d
docker ps -a
docker rm -f nginx
docker rm -f xxxx(容器id)
```

后续：如果修改后端，上传远程服务器打包镜像后重新运行。
如果修改前端，修改前端文件后重新运行docker-compose

### 问题2 ERROR: expected 1536 dimensions, not 768
该问题意味着数据库中是1536维，而模型使用768造成，下面步骤修改数据库表结构的维度改为768，以匹配Nomic模型
```text
# 进入 PostgreSQL 容器
docker exec -it vector_db psql -U postgres -d ai-rag-knowledge

# 执行 SQL 查询表结构
\d vector_store

# 预期输出了1536
-- 修改表结构
ALTER TABLE vector_store 
ALTER COLUMN embedding TYPE VECTOR(768);

-- 删除旧索引（如果存在）
DROP INDEX IF EXISTS embedding_idx;

-- 重建索引
CREATE INDEX ON vector_store USING ivfflat (embedding);
```
