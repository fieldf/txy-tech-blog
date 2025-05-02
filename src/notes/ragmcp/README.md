---
title: rag&mcp
layout: null
---
# rag&mcp
## IAiService
- 非流式问答接口
  - 可根据模型和问题返回答案
- 流式问答
  - 根据模型和问题返回答案
- rag流式问答
  - 根据模型和问题以及rag知识库返回答案

## IRAGService
- 查询全部知识库
- 上传知识库
- 获取git仓库文件并上传知识库

## RAGController
实现IRAGService

## OllamaController和OpenAiController
实现IAiService

## 前端
- 前端首页问答
  - 根据所选模型&输入消息&知识库进行模型问题并返回答案
- 上传普通文件到知识库
- 传入git仓库地址并上传知识库