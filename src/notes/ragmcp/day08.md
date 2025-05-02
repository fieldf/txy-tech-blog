---
title: Day08-扩展对接openai
date: 2025-05-01
index: false
icon: laptop-code
category:
  - 学习笔记
  - ai
tags:
  - deepseek
  - rag
---

之前是对接的ollama我们自己部署的模型，现在要扩展对接openai的模型
## 配置增加openai的模型
```yaml
ai:
ollama:
  base-url: http://xxx:11434
  embedding:
    options:
      num-batch: 512
    model: nomic-embed-text
openai:
  base-url: https://pro-share-aws-api.zcyai.com/
  api-key: sk-eEyfxptPgbfXd3Z164260740E0494161Bd8**找小傅哥申请
  embedding-model: text-embedding-ada-002
rag:
  embed: nomic-embed-text #nomic-embed-text、text-embedding-ada-002
```

## OllamaConfig
新增创建openai的模型
```java
@Bean
public OpenAiApi openAiApi(@Value("${spring.ai.openai.base-url}") String baseUrl, @Value("${spring.ai.openai.api-key}") String apikey) {
    return new OpenAiApi(baseUrl, apikey);
}
```

## 引入pom
```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>
```

## IAiService增加rag流式问答接口
通过知识库回答问题，实际原理是先通过知识库去构造一个更好的问题，然后再提交给大模型回答
```java
Flux<ChatResponse> generateStreamRag(String model, String ragTag, String message);
```

## 创建openaiController实现IAiService
实现生成模型和流式问答接口

实现知识库流式问答接口
```java
@RequestMapping(value = "generate_stream_rag", method = RequestMethod.GET)
@Override
public Flux<ChatResponse> generateStreamRag(@RequestParam String model, @RequestParam String ragTag, @RequestParam String message) {

    String SYSTEM_PROMPT = """
            Use the information from the DOCUMENTS section to provide accurate answers but act as if you knew this information innately.
            If unsure, simply state that you don't know.
            Another thing you need to note is that your reply must be in Chinese!
            DOCUMENTS:
                {documents}
            """;

    // 指定文档搜索
    SearchRequest request = SearchRequest.query(message)
            .withTopK(5)
            .withFilterExpression("knowledge == '" + ragTag + "'");

    List<Document> documents = pgVectorStore.similaritySearch(request);
    String documentCollectors = documents.stream().map(Document::getContent).collect(Collectors.joining());
    Message ragMessage = new SystemPromptTemplate(SYSTEM_PROMPT).createMessage(Map.of("documents", documentCollectors));

    List<Message> messages = new ArrayList<>();
    messages.add(new UserMessage(message));
    messages.add(ragMessage);

    return chatClient.stream(new Prompt(
            messages,
            OpenAiChatOptions.builder()
                    .withModel(model)
                    .build()
    ));
}
```


## OllamaController实现rag流式问答接口
```java
@RequestMapping(value = "generate_stream_rag", method = RequestMethod.GET)
@Override
public Flux<ChatResponse> generateStreamRag(@RequestParam String model, @RequestParam String ragTag, @RequestParam String message) {
    String SYSTEM_PROMPT = """
            Use the information from the DOCUMENTS section to provide accurate answers but act as if you knew this information innately.
            If unsure, simply state that you don't know.
            Another thing you need to note is that your reply must be in Chinese!
            DOCUMENTS:
                {documents}
            """;

    // 指定文档搜索
    SearchRequest request = SearchRequest.query(message)
            .withTopK(5)
            .withFilterExpression("knowledge == '" + ragTag + "'");

    List<Document> documents = pgVectorStore.similaritySearch(request);
    String documentCollectors = documents.stream().map(Document::getContent).collect(Collectors.joining());
    Message ragMessage = new SystemPromptTemplate(SYSTEM_PROMPT).createMessage(Map.of("documents", documentCollectors));

    List<Message> messages = new ArrayList<>();
    messages.add(new UserMessage(message));
    messages.add(ragMessage);

    return chatClient.stream(new Prompt(
            messages,
            OllamaOptions.create()
                    .withModel(model)
    ));
}
```


## 前端页面
```text
dev-ops/nginx/html
index.html
git.html
upload.html
```
