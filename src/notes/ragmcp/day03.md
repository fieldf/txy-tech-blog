---
title: Day03-对接流式应答接口前端页面
date: 2025-05-01
index: false
icon: laptop-code
category:
  - 学习笔记
  - ai
tags:
  - deepseek
  - ollama
---

## 分支：4-stream-ui

## 整理话术并提问ai
```text
请根据以下信息，编写UI对接服务端接口；

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

如描述说明，帮我编写一款简单的AI对话页面。

1. 输入内容，点击发送按钮，调用服务端流式请求接口，前端渲染展示。
2. 以html、js代码方式实现，css样式使用 tailwind 编写。
3. 通过 const eventSource = new EventSource(apiUrl); 调用api接口。    
4. 从 result.output.content 获取，应答的文本展示。注意 content 可能为空。
5. 从 result.metadata.finishReason = STOP 获取，结束标识。
6. 注意整体样式的简洁美观。
```

## 将html文件放到项目目录下
dev-ops/nginx/html/xxx.html
打开，调试
