---
title: Day01-部署ollama环境
date: 2025-04-13
index: false
icon: laptop-code
category:
  - 学习笔记
  - chatgpt
tags:
  - deepseek
  - ollama
---

1. 创建项目
```
ai-rag-knowledge
```
2. 添加模块
```
txy-dev-tech-api
txy-dev-tech-app
txy-dev-tech-trigger
```

3. 添加依赖：[参考文档](https://wx.zsxq.com/group/48411118851818/topic/2858141518251521)

4. push到远程仓库：[gitcode](https://gitcode.com/Field_ctxy/ai-rag-knowledge)

5. 远程服务器
- 安装docker、docker-compose、portainer等环境
- 根目录下创建dev-ops目录并复制相关文件
- 运行：docker-compose -f docker-compose-environment-aliyun.yml up -d安装redis、redis-admin、ollama、vector-db(postgresql)
- 开放相关端口
- 进入ollama安装模型
```java
# 拉取模型，推荐小一点，够做开发就可以
ollama pull deepseek-r1:1.5b

# （可选）运行模型，运行后关闭，继续安装模型。Ctrl/Command + D
ollama run deepseek-r1:1.5b

# 向量文本
ollama pull nomic-embed-text
```
- 提问
```shell
curl http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
        "model": "deepseek-r1:1.5b",
        "prompt": "你是谁",
        "stream": false
      }'
```