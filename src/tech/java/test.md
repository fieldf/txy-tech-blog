---
title: 日志框架
date: 2025-02-01
index: false
icon: laptop-code
category:
  - 开发笔记
  - 学习记录
tag:
  - log
---
## test
111test




slf4j是日志门面api，提供了一种标准化的日志接口，log4j、log4j2、logback是真正的日志实现库。slf4j允许用户在不改变代码的情况下，随时更换底层日志框架。

各个库单独使用
log4j
```
<dependency>
<groupId>log4j</groupId>
<artifactId>log4j</artifactId>
<version>1.2.17</version>
</dependency>
```
使用：
```
import org.apache.log4j.Logger;
static final Logger LOGGER = Logger.getLogger(Main.class);
```
log4j2
```
<dependency>
<groupId>org.apache.logging.log4j</groupId>
<artifactId>log4j-core</artifactId>
<version>2.12.1</version>
</dependency>
```
使用：
```
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
static final Logger LOGGER = LogManager.getLogger(Main.class);
```
logback
```
<dependency>
<groupId>ch.qos.logback</groupId>
<artifactId>logback-classic</artifactId>
<version>1.2.3</version>
</dependency>
```
使用：
```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
static final Logger LOGGER = LoggerFactory.getLogger(Main.class);
```
各个库实现slf4j标准使用log4j实现方式：引入slf4j-log4j12