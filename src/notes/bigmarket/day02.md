---
title: Day02-库表设计
date: 2025-02-06
index: false
icon: laptop-code
category:
  - 学习笔记
  - 大营销
tags:
  - 数据库
---

## 数据库与库表设计
数据库操作软件：Sequel ace

步骤：
- 创建数据库
- 创建表
- 创建表结构
- 填充数据

docker执行sql：
- 库表需要先清理下再重新执行sql才生效
```shell
docker-compose -f docker-compose-environment.yml down -v
docker-compose -f docker-compose-environment.yml up -d
```

## 基础层持久化数据
快捷键：
- 新建分支：20250208-txy-orm
- commit：command+k
- push：command+shift+k
- 选择：option+shift
- 移动光标到开头/结尾：command+左/右

基础层：infrastructure
- 创建po类
- dao：创建po对应的dao接口，添加@Mapper注解
- mapper: /resource/mapper/xxx.xml
- 单测：dao接口的测试类
```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class AwardDaoTest {
    @Resource
    private IAwardDao awardDao;
    
    @Test
    public void test_queryAwardList() {
        List<Award> awards = awardDao.queryAwardList();
    }
}
```
