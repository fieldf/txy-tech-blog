---
title: Day04-上传rag知识库
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

## 分支：5-rag

## pom：
app模块打开几个ai相关的依赖，分别是rag知识库文档相关的以及存储到pgsql向量库
```text
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-tika-document-reader</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-pgvector-store-spring-boot-starter</artifactId>
</dependency>
```
## 初始化sql
初始化向量库，将sql放到dev-ops/pgvector/sql/init.sql，重新安装

## 添加向量库配置
```text
spring:
  datasource:
    driver-class-name: org.postgresql.Driver
    username: postgres
    password: postgres
    url: jdbc:postgresql://127.0.0.1:15432/ai-rag-knowledge
    type: com.zaxxer.hikari.HikariDataSource
    # hikari连接池配置
    hikari:
      #连接池名
      pool-name: HikariCP
      #最小空闲连接数
      minimum-idle: 5
      # 空闲连接存活最大时间，默认10分钟
      idle-timeout: 600000
      # 连接池最大连接数，默认是10
      maximum-pool-size: 10
      # 此属性控制从池返回的连接的默认自动提交行为,默认值：true
      auto-commit: true
      # 此属性控制池中连接的最长生命周期，值0表示无限生命周期，默认30分钟
      max-lifetime: 1800000
      # 数据库连接超时时间,默认30秒
      connection-timeout: 30000
      # 连接测试query
      connection-test-query: SELECT 1
  ai:
    ollama:
      base-url: http://127.0.0.1:11434
      embedding:
        options:
          num-batch: 512
        model: nomic-embed-text
```

## ollama配置添加向量库存储的操作
```java
@Configuration
public class OllamaConfig {

    @Bean
    public OllamaApi ollamaApi(@Value("${spring.ai.ollama.base-url}") String baseUrl) {
        return new OllamaApi(baseUrl);
    }

    @Bean
    public OllamaChatClient ollamaChatClient(OllamaApi ollamaApi) {
        return new OllamaChatClient(ollamaApi);
    }

    @Bean
    public TokenTextSplitter tokenTextSplitter() {
        return new TokenTextSplitter();
    }

    @Bean
    public SimpleVectorStore simpleVectorStore(OllamaApi ollamaApi) {
        OllamaEmbeddingClient embeddingClient = new OllamaEmbeddingClient(ollamaApi);
        embeddingClient.withDefaultOptions(OllamaOptions.create().withModel("nomic-embed-text"));
        return new SimpleVectorStore(embeddingClient);
    }

    @Bean
    public PgVectorStore pgVectorStore(OllamaApi ollamaApi, JdbcTemplate jdbcTemplate) {
        OllamaEmbeddingClient embeddingClient = new OllamaEmbeddingClient(ollamaApi);
        embeddingClient.withDefaultOptions(OllamaOptions.create().withModel("nomic-embed-text"));
        return new PgVectorStore(jdbcTemplate, embeddingClient);
    }
}
```

## 单测
在app模块下添加测试
```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class RAGTest {

    @Resource // Spring自动给的AI聊天工具
    private OllamaChatClient ollamaChatClient;
    @Resource // 用来切分大段文字
    private TokenTextSplitter tokenTextSplitter;
    @Resource
    private SimpleVectorStore simpleVectorStore;
    @Resource // 存储和查找信息的地方（像图书馆）
    private PgVectorStore pgVectorStore;

    // 测试上传知识库的功能（像往图书馆放书）
    @Test
    public void upload() {
        // 1. 用文件阅读器读取"./data/file.text"文件（像打开一本书）
        TikaDocumentReader reader = new TikaDocumentReader("./data/data.text");

        // 2. 把书拆成一页页的（防止内容太多）
        List<Document> documents = reader.get();
        List<Document> documentSplitterList = tokenTextSplitter.apply(documents);

        // 3. 给每一页贴标签（写上这是哪个知识库的）
        documents.forEach(doc -> doc.getMetadata().put("knowledge", "知识库名称"));
        documentSplitterList.forEach(doc -> doc.getMetadata().put("knowledge", "知识库名称"));

        // 4. 把整理好的书页存到图书馆
        pgVectorStore.accept(documentSplitterList);

        log.info("上传完成"); // 在控制台打印"上传完成"
    }

    // 测试聊天功能（像图书管理员帮你查资料）
    @Test
    public void chat() {
        String message = "王大瓜，哪年出生"; // 用户的问题

        // 给AI的指示模板（预先写好的回答要求）
        String SYSTEM_PROMPT = """
                Use the information from the DOCUMENTS section to provide accurate answers but act as if you knew this information innately.
                If unsure, simply state that you don't know.
                Another thing you need to note is that your reply must be in Chinese!
                DOCUMENTS:
                    {documents}
                """;

        // 1. 去图书馆查相关资料：查最相关的5条，且必须是"知识库名称"这个分类
        SearchRequest request = SearchRequest.query(message).withTopK(5).withFilterExpression("knowledge == '知识库名称'");

        // 2. 把查到的资料内容拼接成一大段文字
        List<Document> documents = pgVectorStore.similaritySearch(request);
        String documentsCollectors = documents.stream().map(Document::getContent).collect(Collectors.joining());

        // 3. 把指示模板和查到的资料合并成系统消息
        Message ragMessage = new SystemPromptTemplate(SYSTEM_PROMPT).createMessage(Map.of("documents", documentsCollectors));

        // 4. 准备对话内容：用户问题 + 系统提示
        ArrayList<Message> messages = new ArrayList<>();
        messages.add(new UserMessage(message)); // 用户的问题
        messages.add(ragMessage); // 系统指示和资料

        // 5. 让AI根据这些内容生成回答（使用名为deepseek-r1的模型）
        ChatResponse chatResponse = ollamaChatClient.call(new Prompt(messages, OllamaOptions.create().withModel("deepseek-r1:1.5b")));

        log.info("测试结果:{}", JSON.toJSONString(chatResponse)); // 打印AI的回复
    }
}
```

在单测模块下的创建知识库目录 /data/data.text
```text
王大瓜出生于1990年
```



