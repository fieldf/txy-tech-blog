---
title: Day02-调用ollama deepseek流式应答接口
date: 2025-04-14
index: false
icon: laptop-code
category:
  - 学习笔记
  - ai
tags:
  - deepseek
  - ollama
---

## 分支：3-stream-api

## 实现步骤
### 创建启动类和配置文件
### 创建redis配置类
```java
@Configuration
@EnableConfigurationProperties(RedisClientConfigProperties.class)
public class RedisClientConfig {

    @Bean("redissonClient")
    public RedissonClient redissonClient(ConfigurableApplicationContext applicationContext, RedisClientConfigProperties properties) {
        Config config = new Config();
        // 根据需要可以设定编解码器；https://github.com/redisson/redisson/wiki/4.-%E6%95%B0%E6%8D%AE%E5%BA%8F%E5%88%97%E5%8C%96
        config.setCodec(JsonJacksonCodec.INSTANCE);

        config.useSingleServer()
                .setAddress("redis://" + properties.getHost() + ":" + properties.getPort())
//                .setPassword(properties.getPassword())
                .setConnectionPoolSize(properties.getPoolSize())
                .setConnectionMinimumIdleSize(properties.getMinIdleSize())
                .setIdleConnectionTimeout(properties.getIdleTimeout())
                .setConnectTimeout(properties.getConnectTimeout())
                .setRetryAttempts(properties.getRetryAttempts())
                .setRetryInterval(properties.getRetryInterval())
                .setPingConnectionInterval(properties.getPingInterval())
                .setKeepAlive(properties.isKeepAlive())
        ;

        return Redisson.create(config);
    }

}
```
```java
@Data
@ConfigurationProperties(prefix = "redis.sdk.config", ignoreInvalidFields = true)
public class RedisClientConfigProperties {

    /** host:ip */
    private String host;
    /** 端口 */
    private int port;
    /** 账密 */
    private String password;
    /** 设置连接池的大小，默认为64 */
    private int poolSize = 64;
    /** 设置连接池的最小空闲连接数，默认为10 */
    private int minIdleSize = 10;
    /** 设置连接的最大空闲时间（单位：毫秒），超过该时间的空闲连接将被关闭，默认为10000 */
    private int idleTimeout = 10000;
    /** 设置连接超时时间（单位：毫秒），默认为10000 */
    private int connectTimeout = 10000;
    /** 设置连接重试次数，默认为3 */
    private int retryAttempts = 3;
    /** 设置连接重试的间隔时间（单位：毫秒），默认为1000 */
    private int retryInterval = 1000;
    /** 设置定期检查连接是否可用的时间间隔（单位：毫秒），默认为0，表示不进行定期检查 */
    private int pingInterval = 0;
    /** 设置是否保持长连接，默认为true */
    private boolean keepAlive = true;

}
```
### 创建接口IAiService
```java
public interface IAiService {
    ChatResponse generate(String model, String mesage);
    Flux<ChatResponse> generateStream(String model, String message);
}
```

### 创建OllamaController实现IAiService接口
trigger触发器层创建OllamaController实现IAiService接口

## 问题：
遇到连接redis服务端时报错：Redis容器权限不足导致rdb快照持久化失败，通过挂载数据目录修正权限解决。
- 步骤 1：清理错误配置残留
```yml
volumes:
  - ./redis/redis.conf:/usr/local/etc/redis/redis.conf
  - ./redis/data:/data  # 新增数据目录挂载
```
- 步骤 2：清理错误配置残留
```bash
# 删除可能被错误配置生成的文件
sudo rm -f /etc/profile.d/watch.sh
```
- 步骤 3：重建 Redis 容器
```bash
docker-compose -f docker-compose-environment-aliyun.yml down redis
docker-compose -f docker-compose-environment-aliyun.yml up -d --force-recreate redis
```