---
title: Day01-chatgpt项目dev-ops
date: 2025-03-16
index: false
icon: laptop-code
category:
  - 学习笔记
  - chatgpt
tags:
  - dev-ops
---

## 1.项目初始化
创建dev-ops项目初始化并推送到[远程仓库](https://gitcode.com/Field_ctxy/dev-ops)

## 2.云服务器安装环境（docker & portainer）
1. 购买云服务器
2. termius连接
3. 更新yum源
```shell
sudo yum update
```
4. 安装docker所需要的依赖包
```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```
5. 更新yum源
```shell
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
6. 安装docker
```shell
sudo yum install docker
```
7. 设置开机启动
```shell
sudo systemctl start docker
systemctl enable docker
```
8. 安装portainer
```shell
# 拉取portainer镜像
docker pull portainer/portainer
# 安装
docker run -d --restart=always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer
```
## 3.nginx
1. 安装nginx（可以在云服务器或者自己本地的docker环境下安装）
```shell
docker run \
--restart always \
--name Nginx \
-d \
-p 80:80 \
nginx
```

2. dev-ops工程下创建目录
nginx/conf/conf.d
nginx/html
nginx/logs
nginx/ssl

3. 把docker容器下的配置文件拷贝到我们dev-ops项目创建的目录下：
```shell
docker container cp Nginx:/etc/nginx/nginx.conf /xxx/nginx/conf
docker container cp Nginx:/etc/nginx/conf.d/default.conf /xxx/nginx/conf/conf.d/default.conf
docker container cp Nginx:/usr/share/nginx/html/index.html /xxx/nginx/html
```

4. 挂载到我们自己目录并重新安装nginx
- 删除Nginx
  - 命令【docker stop Nginx、docker rm Nginx】
  - 或者在Portainer中操作
- 安装
```shell
docker run \
--name Nginx \
-p 80:80 \
-v /xxx/nginx/logs:/var/log/nginx \
-v /xxx/nginx/html:/usr/share/nginx/html \
-v /xxx/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /xxx/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /xxx/nginx/ssl:/etc/nginx/ssl \
--privileged=true -d --restart=always nginx
```
