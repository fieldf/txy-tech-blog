---
title: Day07-git仓库代码上传知识库
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
## 分支：8-rag-git

## 添加pom依赖
```xml
<dependency>
    <groupId>org.eclipse.jgit</groupId>
    <artifactId>org.eclipse.jgit</artifactId>
</dependency>
```

## 测试
```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class JGitTest {

    @Resource
    private OllamaChatClient ollamaChatClient;
    @Resource
    private TokenTextSplitter tokenTextSplitter;
    @Resource
    private SimpleVectorStore simpleVectorStore;
    @Resource
    private PgVectorStore pgVectorStore;

    @Test
    public void test() {
    }

    @Test
    public void test_file() {
    }

}
```

### 拉取仓库代码克隆到本地
```java
@Test
public void test() throws Exception {
    // 这部分替换为你的
    String repoURL = "https://gitcode.com/仓库地址";
    String username = "username";
    String password = "DqUc-xxx";

    String localPath = "./cloned-repo";
    log.info("克隆路径：" + new File(localPath).getAbsolutePath());

    FileUtils.deleteDirectory(new File(localPath));

    Git git = Git.cloneRepository()
            .setURI(repoURL)
            .setDirectory(new File(localPath))
            .setCredentialsProvider(new UsernamePasswordCredentialsProvider(username, password))
            .call();

    git.close();
}
```
### git代码上传知识库
```java
@Test
public void test_file() throws IOException {
    Files.walkFileTree(Paths.get("./cloned-repo"), new SimpleFileVisitor<>() {
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {

            log.info("文件路径:{}", file.toString());

            PathResource resource = new PathResource(file);
            TikaDocumentReader reader = new TikaDocumentReader(resource);

            List<Document> documents = reader.get();
            List<Document> documentSplitterList = tokenTextSplitter.apply(documents);

            documents.forEach(doc -> doc.getMetadata().put("knowledge", "group-buy-market-liergou"));
            documentSplitterList.forEach(doc -> doc.getMetadata().put("knowledge", "group-buy-market-liergou"));

            pgVectorStore.accept(documentSplitterList);

            return FileVisitResult.CONTINUE;
        }
    });
}
```
## 解析git仓库
将上述测试内容串联提供一个接口IRAGService，先拉取git仓库内容将文件保存到本地然后上传到向量库
```java
Response<String> analyzeGitRepository(String repoUrl, String userName, String token) throws Exception;
```
### RAGController
```java
@RequestMapping(value = "analyze_git_repository", method = RequestMethod.POST)
@Override
public Response<String> analyzeGitRepository(@RequestParam String repoUrl, @RequestParam String userName, @RequestParam String token) throws Exception {
    String localPath = "./git-cloned-repo";
    String repoProjectName = extractProjectName(repoUrl);
    log.info("克隆路径：{}", new File(localPath).getAbsolutePath());

    FileUtils.deleteDirectory(new File(localPath));

    Git git = Git.cloneRepository()
            .setURI(repoUrl)
            .setDirectory(new File(localPath))
            .setCredentialsProvider(new UsernamePasswordCredentialsProvider(userName, token))
            .call();

    Files.walkFileTree(Paths.get(localPath), new SimpleFileVisitor<>() {
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
            log.info("{} 遍历解析路径，上传知识库:{}", repoProjectName, file.getFileName());
            try {
                TikaDocumentReader reader = new TikaDocumentReader(new PathResource(file));
                List<Document> documents = reader.get();
                List<Document> documentSplitterList = tokenTextSplitter.apply(documents);

                documents.forEach(doc -> doc.getMetadata().put("knowledge", repoProjectName));

                documentSplitterList.forEach(doc -> doc.getMetadata().put("knowledge", repoProjectName));

                pgVectorStore.accept(documentSplitterList);
            } catch (Exception e) {
                log.error("遍历解析路径，上传知识库失败:{}", file.getFileName());
            }

            return FileVisitResult.CONTINUE;
        }

        @Override
        public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
            log.info("Failed to access file: {} - {}", file.toString(), exc.getMessage());
            return FileVisitResult.CONTINUE;
        }
    });

    FileUtils.deleteDirectory(new File(localPath));

    RList<String> elements = redissonClient.getList("ragTag");
    if (!elements.contains(repoProjectName)) {
        elements.add(repoProjectName);
    }

    git.close();

    log.info("遍历解析路径，上传完成:{}", repoUrl);

    return Response.<String>builder().code("0000").info("调用成功").build();
}

private String extractProjectName(String repoUrl) {
    String[] parts = repoUrl.split("/");
    String projectNameWithGit = parts[parts.length - 1];
    return projectNameWithGit.replace(".git", "");
}
```

