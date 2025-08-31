组件实现的机制叫：SpringBoot Starter，基于SPI机制的，
效果：我们开发好组件后，组件被其他springboot工程引入后，可以被动态的初始化加载，完成Bean对象的处理，实现业务功能
功能：可以理解为SpringBoot的入口启动机制，你只需要配置好使用的类，它在spring工程中会调用你的这些类去做实例化，

注册配置：
1、连接注册中心redis
2、动态配置服务实例化代理对象，调整属性值
3、注册redis发布订阅监听用于调用调整属性值


实现过程：
1. 创建工程：txy-wrench
2. 包的引入：
   - 版本改成1.0
   - 引入SpringBoot
```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.12</version>
        <relativePath/>
    </parent>
```
-   - 引入通用的组件

```xml
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.google.guava</groupId>
                <artifactId>guava</artifactId>
                <version>32.1.3-jre</version>
            </dependency>
            <dependency>
                <groupId>commons-lang</groupId>
                <artifactId>commons-lang</artifactId>
                <version>2.6</version>
            </dependency>
            <dependency>
                <groupId>commons-codec</groupId>
                <artifactId>commons-codec</artifactId>
                <version>1.15</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>2.0.49</version>
            </dependency>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.13.1</version>
                <scope>test</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```
-   - 引入构建工程的build
```xml
    <build>
        <finalName>txy-wrench</finalName>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/assembly/resources</directory>
                <filtering>false</filtering>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <directory>src/test/resources</directory>
                <filtering>true</filtering>
            </testResource>
            <testResource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </testResource>
        </testResources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-archetype-plugin</artifactId>
                <version>3.2.0</version>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.0</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <encoding>${project.build.sourceEncoding}</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>2.5</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>versions-maven-plugin</artifactId>
                <version>2.7</version>
            </plugin>
        </plugins>
    </build>
```
3. 删除src，创建不同的module
   - 模块名：txy-wrench-starter-dynamic-config-center，实现dcc配置中心
   - 删除新模块pom文件中的properties部分，因为父类已经定义，可直接引用到。
   - 引入必要的包
```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
        <dependency>
            <groupId>commons-lang</groupId>
            <artifactId>commons-lang</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.redisson</groupId>
            <artifactId>redisson-spring-boot-starter</artifactId>
        </dependency>
    </dependencies>
```

   - 引入构建工程的build
```xml
    <build>
        <finalName>txy-wrench-starter-dynamic-config-center</finalName>
    </build>
```
   - 创建包
     com.txy.wrench.dynamic.config.center: config, domain, listener,  types

- config下创建配置DynamicConfigCenterAutoConfig,实现BeanPostProcessor，添加@Configuration注解
- 实现postProcessAfterInitialization方法
- 添加配置的参数，创建类DynamicConfigCenterAutoProperties，@ConfigurationProperties(prefix = "txy.wrench.config", ignoreInvalidFields = true)
添加前缀和忽略的字段。
没有使用lombok，因为打包的时候做这种组件给人家处理一下。
types包下，创建一个自定义注解包annotations,建一个通用的common包，
common创建Constants，（commond+shift+u转换大小写），定义Rediskey常量，给一个拼redis的方法getTopic，内聚，不用担心外面谁用谁去拼。
 
加一个自定义注解，@DCCValue， 作用域在我们整个的运行时RUntime，作用到目标是字段属性上FIELD，加一个值，default默认是空

在AutoProperties属性类中写一个getKey方法组装成一个key

DynamicConfigCenterAutoConfig是我们其中一个入口，可以获取spring容器给我们的一个东西。作为入口启动层。

还需要一个注册中心，

我要自己去配置连接redis或者服务的东西， 把这些东西帮我起动起来，需要对应的配置文件。
属性直接复制，连接redis的一些东西，直接复制.
生成get set

配置类得把我们配置的引入进来，这样在应用启动的时候才能使用到这两个注解，@EnableConfigurationProperties(value={})
这样就配置进来了，之后就可以使用了。
接下来把常用的东西加一下。

日志这些得自己手动去加。

接下来实现领域层实现的功能，然后到configuration去做调用。
建service服务，建model.valobj，
创建一个接口DynamicConfigCenter加一个Service服务，一个动态配置中心的服务接口。

方法1:从spring 中拿到的对象，之后你去处理。
方法2:变更一下属性的值，需要添加一个属性值的对象，复制一下attributes


增加一下AttributeVO对象，给我属性和值，然后我去做操作。
实现接口那两个方法。实现类不需要注册springbean，之后在config那两个类里注册的时候去给实例化，
需要里面配置的属性的信息，注入需要使用系统信息。

还需要RedissonClient，和属性那个都是final级别的，放到构造函数中去操作。

proxyObject的bean对象在postProcessAfterInitialization拿到bean对象后去操作
拿到了所有spring容器中的bean对象，可能是代理的对象，需要获取原始的对象。
获得所有的字段，判断哪些字段获取了自定义的注解，如果配置了DCCValue注解，获取用户配置的字段的值。拿到这个value呢，做一下截取操作，用冒号截取的。
根据拆分的值，拿到对应的key，

第二个方法是当外部发起变更的时候，怎么处理属性值。


存储起来

在RegistryAutoConfig中

把自己的服务也实例化一下。提供一些属性信息。

监听器的监听，当有发布订阅的时候监听，

添加测试的工程

4. 

