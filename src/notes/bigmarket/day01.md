---
title: Day01-环境配置&项目初始化
date: 2025-02-06
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - docker
---
# 环境
## java环境
1. 下载安装java
[Oracle官网java8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)

2. 配置环境变量
```shell
vim ~/.bash_profile
```
```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
```
```shell
# 刷新环境变量
source .bash_profile
```

## 安装docker&portainer
### centos
安装docker，[参考该文章](https://bugstack.cn/md/road-map/docker.html)
```shell
# 更新yum源
sudo yum update
# 安装docker的依赖包
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# 设置docker的yum源
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 看能安装的docker的版本
yum list docker-ce --showduplicates | sort -r
# 指定版本安装
sudo yum install docker-ce 3:25.0.5-1.el7
sudo yum install docker-ce-20.10.11.ce
# 查看docker版本
docker --version
```
安装docker-compose
```shell
# 正常安装
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
# 镜像地址
# 指定路径【推荐】
sudo curl -L https://gitee.com/fustack/docker-compose/releases/download/v2.24.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
# 设置权限
sudo chmod +x /usr/local/bin/docker-compose
# 安装后就可以使用docker-compose命令了
docker-compose -v
# 启动docker-compose
docker-compose -f environment-docker-compose.yml up -d
```
启动docker并添加开机启动
```shell
# 启动docker
sudo systemctl start docker
# 设置开机启动 Docker
systemctl enable docker
# 重启 Docker 命令
sudo systemctl restart docker

# 设置国内源
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://***替换为你的地址***.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker # 需要重启下docker
# 看一下docker镜像源是否设置好
docker info
```
卸载docker
```shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```
安装portainer
```shell
# 拉取最新的portainer
docker pull portainer/portainer
# 安装和启动
docker run -d --restart=always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```
访问: http://localhost:9090

### mac
安装[Docker Desktop](https://app.docker.com/)，Docker Desktop 自带docker-compose

配置docker镜像加速
```shell
{ "registry-mirrors" : [
    "https://docker.1panel.live",
    "https://dc.j8.work",
    "https://docker.m.daocloud.io"
  ],
  "builder": {
    "gc": {
      "enabled": true,
      "defaultKeepStorage": "20GB"
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  }
}
```
安装portainer
```shell
# 直接使用 docker 命令（需先启动 Docker）
docker run -d --restart=always --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer

# 访问（可能需要等待容器启动）
open http://localhost:9000
```

使用国内的镜像源安装Homebrew
```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
brew --version
```

## DDD架构在线脚手架起工程
1. maven Archetype
2. catalog添加一个地址 https://gaga.plus
3. 使用archetype选择对应catalog下的ddd架构的一个lite轻量版
4. 创建工程本地启动后没问题可以push到远程仓库
5. 运行项目中的docker-compose文件即可在本地的docker环境下安装mysql、phpmyadmin、redis、redis-admin
