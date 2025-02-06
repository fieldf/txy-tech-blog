
java环境
1. 下载安装java
[Oracle官网java8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)

2. 配置环境变量
```
vim ~/.bash_profile
```
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
```
```
# 刷新环境变量
source .bash_profile
```

ddd架构在线脚手架起工程
1. maven Archetype
2. catalog添加一个地址 https://gaga.plus
3. 使用archetype选择对应catalog下的ddd架构的一个lite轻量版

