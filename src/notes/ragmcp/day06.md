---
title: Day06-rag上传对接前端页面
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

分支：6-stream-rag-ui

## 常用网站

- https://www.deepseek.com/

- https://v0.dev/

- https://chatglm.cn/

- https://openai.itedus.cn/


## ai生成前端代码话术
### 生成对话页面
```text
根据如描述说明，帮我编写一款简单的AI对话页面。
        1. 请编写html、js、tailwindcss UI 效果。不要写react、vue。
        2. 点击新建聊天，会创建一个新的加入左侧的聊天列表
        3. 聊天列表可以点击展开选择。
        4. 选择的聊天，在对话列表中，可以点击删除或者重命名。
        5. 输入内容，点击发送按钮和使用快捷键，调用服务端流式请求接口，前端渲染展示。
        6. 以html、js代码方式实现，css样式使用 tailwind 编写。
        7. 通过 const eventSource = new EventSource(apiUrl); 调用api接口。
        8. 从 result.output.content 获取，应答的文本展示。注意 content 可能为空。
        9. 从 result.metadata.finishReason = STOP 获取，结束标识。
        10. 注意整体样式的简洁美观。

        接口信息如下

        流式GET请求接口，由 SpringBoot Spring AI 框架实现，如下；

/**
 * curl http://localhost:8090/api/v1/ollama/generate_stream?model=deepseek-r1:1.5b&message=1+1
 */
@RequestMapping(value = "generate_stream", method = RequestMethod.GET)
@Override
public Flux<ChatResponse> generateStream(@RequestParam String model, @RequestParam String message) {
        return chatClient.stream(new Prompt(
        message,
        OllamaOptions.create()
        .withModel(model)
        ));
        }

        流式GET应答数据，数组中的一条对象；

        [
        {
        "result": {
        "output": {
        "messageType": "ASSISTANT",
        "properties": {
        "id": "chatcmpl-B3HPw95SsqmhoWeJ8azGLxK1Vf4At",
        "role": "ASSISTANT",
        "finishReason": ""
        },
        "content": "1",
        "media": []
        },
        "metadata": {
        "finishReason": null,
        "contentFilterMetadata": null
        }
        }
        }
        ]

```
### 生成知识库上传页面
```text
@RestController()
@CrossOrigin("*")
@RequestMapping("/api/v1/ollama/")
public class OllamaController implements IAiService {

    @RequestMapping(value = "file/upload", method = RequestMethod.POST, headers = "content-type=multipart/form-data")
    @Override
    public Response<String> uploadFile(@RequestParam String ragTag, @RequestParam("file") List<MultipartFile> files) {
        log.info("上传知识库开始 {}", ragTag);
        for (MultipartFile file : files) {
            TikaDocumentReader documentReader = new TikaDocumentReader(file.getResource());
            List<Document> documents = documentReader.get();
            List<Document> documentSplitterList = tokenTextSplitter.apply(documents);
            // 添加知识库标签
            documents.forEach(doc -> doc.getMetadata().put("knowledge", ragTag));
            documentSplitterList.forEach(doc -> doc.getMetadata().put("knowledge", ragTag));
            pgVectorStore.accept(documentSplitterList);
            // 添加知识库记录
            RList<String> elements = redissonClient.getList("ragTag");
            if (!elements.contains(ragTag)) {
                elements.add(ragTag);
            }
        }
        log.info("上传知识库完成 {}", ragTag);
        return Response.<String>builder().code("0000").info("调用成功").build();
    }

}

- 请根据服务端接口，编写一款好看的前端上传页面。页面使用 html、js、tailwindcss 编写，不要提供 vue、react 代码。
- ragTag 为知识库名称
- files 为知识库文件，支持，md、txt、sql 文件类型上传。

```

## 前端代码
```text

```
