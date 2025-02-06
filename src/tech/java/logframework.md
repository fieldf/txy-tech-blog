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

# 日志框架结构：
slf4j是日志门面api，提供了一种标准化的日志接口，log4j、log4j2、logback是真正的日志实现库。slf4j允许用户在不改变代码的情况下，随时更换底层日志框架。

## 各个库单独使用
- **log4j**
```java
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```
使用：
```java
import org.apache.log4j.Logger;
...
static final Logger LOGGER = Logger.getLogger(Main.class);
```

- **log4j2**
```java
<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-core</artifactId>
  <version>2.12.1</version>
</dependency>
```

使用：
```java
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
...
static final Logger LOGGER = LogManager.getLogger(Main.class);
```
- **logback**
```java
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

使用：
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
...
static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

```

## 各个库实现slf4j标准使用
- **log4j**
实现方式：引入slf4j-log4j12
```java
<dependency>
  <groupId>log4j</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.17</version>
</dependency>
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.7.29</version>
</dependency>
```


log4j2
实现方式：引入log4j-slf4j-impl
```java
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.12.1</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
    <version>2.9.0</version>
</dependency>
```

logback
logback默认实现slf4j
```java
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

使用
以上依赖组装后，就可以用slf4j的写法了
```java

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
...
static final Logger LOGGER = LoggerFactory.getLogger(Main.class);
```
或注解形式：@slf4j

## 原理
### 适配器模式
- slf4j是门面
- logback直接实现了slf4j api中的接口，通过接口实现的方式完成了门面的实现。
- 而log4j和log4j2没有直接实现接口，所以需要个适配器。slf4j-log4j12和log4j-slf4j-impl就是适配器，添加适配器后，就能使用slf4j的接口来使用log4j或log4j2了。

**为什么需要适配器？**
Log4j 的出现早于 slf4j，因此 Log4j 并没有直接实现 slf4j 的接口。如果log4j新版本直接实现slf4j，会导致不同版本的log4j行为不一致，所以通过适配器模式使slf4j和log4j的耦合性降低。

**适配器工作原理：**
适配器（如slf4j-log4j12、log4j-slf4j-impl）向上实现slf4j接口，向下通过成员属性的方式调用log4j，将原本不能实现slf4j的变得也能实现这个标准了。


### 桥接模式
- 桥接包的包名通常带有over/to关键字，并实现了slf4j标准。

**使用场景：**
如果项目的依赖中独立使用了log4j/log4j2，注意是依赖中，这时候想要统一到slf4j上来，就需要引用对应桥接包，如：log4j-over-slf4j/log4j-to-slf4j。

**桥接模式工作原理：**
以log4j-over-slf4j为例，他实际上是重写了log4j所有的类，并且全限定类名保持一致，将原来的info、debug等等方法委托给slf4j执行了。将log4j剔除并加载log4j-over-slf4j，使依赖加载的类被偷梁换柱为log4j-over-slf4j中的logger，这个logger中方法又委托给slf4j，再由slf4j向下找binding。

  
## 总结
使用slf4j标准的方法：
- log4j + slf4j-log4j12：用于使当前项目的log4j实现slf标准
- log4j2 + log4j-slf4j-impl：用于使当前项目的log4j实现slf标准
- log4j-over-slf4j:与剔除log4j联合使用，替换log4j，使log4j实现slf。用于让单独用log4j的依赖能遵循slf，进而统一日志配置。
- log4j-to-slf4j:与剔除log4j2联合使用，替换log4j2，使log4j2实现slf。用于让单独用log4j2的依赖能遵循slf，进而统一日志配置。

## 举例
事实上，我们的项目可能有很多依赖，不同依赖内部可能有不同的日志实现方式。比如我们有五个依赖，他们分别是：
- 独立log4j
- 独立log4j2
- slf化log4j
- slf化log4j2
- slf化logback 因为logback只能slf化，没有独立使用的方式，所以是5种。

如果当前我们项目期望使用logback，并期望统一为slf化的logback形式，该如何配置？
- 自己项目中的实现可能和依赖的其他包的实现发生冲突，需要排除依赖。独立的日志框架通过引入桥接包委托给slf4j；slf化的日志框架通过排除适配器包解除对应实现的日志框架。
  - 独立log4j：排除log4j，引入log4j-over-slf4j
  - 独立log4j2：排除log4j2，引入log4j-to-slf4j
  - slf化log4j：排除slf4j-log4j12
  - slf化log4j2：排除log4j-slf4j-impl
  - 只配置一个logback.xml就对所有依赖进行配置