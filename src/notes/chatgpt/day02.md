---
title: Day02-nginx auth鉴权
date: 2025-03-16
index: false
icon: laptop-code
category:
  - 学习笔记
  - chatgpt
tags:
  - dev-ops
---

## 创建一个springboot工程，提供鉴权和鉴权成功访问接口
工程code：[https://gitcode.com/Field_ctxy/chatgpt-api](https://gitcode.com/Field_ctxy/chatgpt-api)
```java
@SpringBootApplication
@RestController
public class Application {
    private Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verify(String token) {
        logger.info("验证 token：{}", token);
        if ("success".equals(token)){
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/success")
    public String success(){
        return "test success by xfg";
    }

}
```

## 修改nginx配置支持auth
- 在dev-ops工程中修改配置，修改后需要重启nginx生效。
- 访问 http://localhost/api 目标是到 http://192.168.1.101:8080/success  但这里添加了 auth 模块，所以会先进入 auth 的处理。
- = auth 是绝对匹配，没有 = 号就是前缀匹配。在 auth 中把请求 api 的参数获取到在访问到验证地址 http://192.168.1.101:8080/verify?$query  如果接口返回一个200的码就通过，其他的码就失败。

```shell
server {

    listen       80;
    server_name  localhost;

    # 首页
    index index.html;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location /api/ {
        auth_request /auth;
        # 鉴权通过后的处理方式
        proxy_pass http://localhost:8080/success;
    }

    location = /auth {
        # 发送子请求到HTTP服务，验证客户端的凭据，返回响应码
        internal;
        # 设置参数
        set $query '';
        if ($request_uri ~* "[^\?]+\?(.*)$") {
            set $query $1;
        }
        # 验证成功，返回200 OK
        proxy_pass http://localhost:8080/verify?$query;
        # 发送原始请求
        proxy_pass_request_body off;
        # 清空 Content-Type
        proxy_set_header Content-Type "";
     }

    error_page 404 /404.html;
        location = /40x.html {

        }

    error_page   500 502 503 504  /50x.html;
     location = /50x.html {
     }

}
```

## 测试访问
- 访问测试
  - 正确验证：http://localhost/api/?token=success
    - 鉴权通过，访问到/success接口
  - 错误验证：http://localhost/api/?token=123
    - 鉴权失败，返回404
