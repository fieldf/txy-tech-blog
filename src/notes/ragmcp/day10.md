---
title: Day10-mcp开发及部署上线
date: 2025-05-02
index: false
icon: laptop-code
category:
  - 学习笔记
  - ai
tags:
  - deepseek
  - rag
  - 向量库
---

## mcp客户端
代码仓库：ai-mcp-knowledge

### 引入pom
客户端和服务端
```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-mcp-server-spring-boot-starter</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-mcp-client-webflux-spring-boot-starter</artifactId>
</dependency>
```

## 服务端
### 对接文件系统
服务端工程：mcp-server-computer

对接文件系统：[https://articles.zsxq.com/id_pgow50vxj4db.html](https://articles.zsxq.com/id_pgow50vxj4db.html)

### csdn自动发帖
服务端工程：mcp-server-csdn

使用软件trae.ai，封装接口描述话术：
```text
请按照如下要求完成代码开发；
        
1. 在 infrastructure 的 gateway 下，使用 retrofit2 框架，封装对 ICSDNService 接口的调用。Cookie 通过入参的方式传递使用。
2. 接口的出入参对象，放到 gateway 下的 dto 文件夹内。
3. 在 McpServerApplication 中，实例化提供 ICSDNService Bean 对象。
4. 在 cn.bugstack.mcp.server.csdn.test 包下 APITest 编写方法，测试 ICSDNService 接口。  
  
接口信息如下；
  
curl 'https://bizapi.csdn.net/blog-console-api/v3/mdeditor/saveArticle' \
  -H 'accept: */*' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'content-type: application/json' \
  -b 'dc_sid=21f5bb4de98e88049f5292ae3593f70b; fid=20_48032897523-1743237693494-081936; uuid_tt_dd=11_22498201076-1743237693495-184730; dc_session_id=11_1743237693495.122370; c_first_ref=default; c_first_page=https%3A//editor.csdn.net/md/%3Fnot_checkout%3D1%26spm%3D1000.2115.3001.5352; c_dsid=11_1743237693496.168400; c_segment=10; c_page_id=default; loginbox_strategy=%7B%22taskId%22%3A349%7D; SESSION=c25265f3-b98f-477c-9bb2-fba89ede5d12; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1743237695; HMACCOUNT=BF81B60489032C87; creative_btn_mp=1; hide_login=1; UserName=weixin_46755643; UserInfo=023fca3559d24cbabca34a712d75f1d0; UserToken=023fca3559d24cbabca34a712d75f1d0; UserNick=%E5%B0%8F%E5%82%85%E5%93%A5%E7%9A%84%E7%A0%81%E4%BB%94; AU=1C3; UN=weixin_46755643; BT=1743237720298; p_uid=U010000; creativeSetApiNew=%7B%22toolbarImg%22%3A%22https%3A//img-home.csdnimg.cn/images/20231011044944.png%22%2C%22publishSuccessImg%22%3A%22https%3A//img-home.csdnimg.cn/images/20240229024608.png%22%2C%22articleNum%22%3A0%2C%22type%22%3A0%2C%22oldUser%22%3Afalse%2C%22useSeven%22%3Atrue%2C%22oldFullVersion%22%3Afalse%2C%22userName%22%3A%22weixin_46755643%22%7D; csdn_newcert_weixin_46755643=1; c_pref=https%3A//editor.csdn.net/; c_ref=https%3A//mp.csdn.net/mp_blog/creation/success/146694967; log_Id_pv=8; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1743237915; dc_tos=stvmzg; log_Id_view=199; log_Id_click=12' \
  -H 'dnt: 1' \
  -H 'origin: https://editor.csdn.net' \
  -H 'priority: u=1, i' \
  -H 'referer: https://editor.csdn.net/' \
  -H 'sec-ch-ua: "Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
  -H 'x-ca-key: 203803574' \
  -H 'x-ca-nonce: 138d7d05-2600-482d-83a6-62e6c02bdc17' \
  -H 'x-ca-signature: I1z2XgTgYqo839qPZYINgKRHWp3v7XlHO8QbmLDKMDA=' \
  -H 'x-ca-signature-headers: x-ca-key,x-ca-nonce' \
  --data-raw '{"title":"111111111","markdowncontent":"测试\n","content":"<p>测试</p>\n\n","readType":"public","level":"0","tags":"Java面试","status":0,"categories":"","type":"original","original_link":"","authorized_status":false,"Description":"测试。","resource_url":"","not_auto_saved":"1","source":"pc_mdeditor","cover_images":[],"cover_type":1,"is_new":1,"vote_id":0,"resource_id":"","pubStatus":"publish","sync_git_code":0}'
  
出参信息；  
  
{
 "code": 200,
 "traceId": "19e7ba16-91df-42ec-808d-b77aab6f4121",
 "data": {
  "url": "https://blog.csdn.net/weixin_46755643/article/details/146699982",
  "id": 146699982,
  "qrcode": "https://blog.csdn.net/common_tool/qrcode?url=https://blog.csdn.net/weixin_46755643/article/details/146699982%3Futm_source=blog_wap_share",
  "title": "111111111",
  "description": "测试。"
 },
 "msg": "success"
}  

1. 在 infrastructure 的 gateway 下，使用 retrofit2 框架，封装对 ICSDNService 接口的调用。Cookie 通过入参的方式传递使用。
2. 接口的出入参对象，放到 gateway 下的 dto 文件夹内。
3. 在 McpServerApplication 中，实例化提供 ICSDNService Bean 对象。
4. 在 APITest 编写方法，测试 ICSDNService 接口。
```

## 上线步骤
1、csdn服务端打jar包->2、客户端工程引入1jar包并打包镜像->3、远程服务器执行部署脚本安装环境和部署2镜像
1. mcp-server-csdn：执行install打包(分支：txy-csdn-service-trigger)
2. ai-mcp-knowledge工程更改配置（分支：txy-ai-mcp-csdn-trigger）
   - mcp-server-config配置jar包路径：mcp-servers-config-3.json
   - application-dev.yml更改配置mcp-servers-config-3.json
3. ai-mcp-knowledge工程新增模块：ai-mcp-knowledge-trigger
4. ai-mcp-knowledge打包并构建镜像，执行build.sh构建，执行push.sh推送至远程仓库（使用aliyun镜像仓库）
5. 远程仓库执行：docker pull 拉取镜像（验证）
6. 配置ai-mcp-knowledge中docs下面的环境和应用配置文件
7. 到远程服务器下面执行环境和应用部署

