const t=JSON.parse('{"key":"v-5a8fa2da","path":"/notes/xxx/day01.html","title":"Day01","lang":"zh-CN","frontmatter":{"title":"Day01","index":false,"icon":"laptop-code","category":["开发笔记","学习记录"],"description":"任务 [x] 环境配置 [x] 搭建项目结构 [x] 跑通广播模式 RPC 过程调用 学习过程 项目整体了解 通过对第一节文档的阅读，了解整个项目的生命周期、所需要的技术以及代码提交规范 搭建项目结构，理解每个模块应该干什么 模块 作用 Lottery 总项目，用来管理整个项目的依赖 lottery-application 应用层，为用户接口层提供各种应用数据展现支持服务 lottery-common 定义通用数据，比如统一响应数据、常量、异常、枚举等 lottery-domain 领域层，核心业务逻辑 lottery-infrastructure 基础层，为其他各层提供通用技术能力，包括数据库、Redis、ES 等 lottery-interfaces 用户接口层，存放与前端交互、展现数据相关的代码 lottery-rpc RPC 接口文件 注：因为并不了解 DDD 架构，所以每个模块目前只有模糊的概念，具体的东西在后续代码编写中进行体会 阅读 210801_xfg_initProject 分支上的 POM 文件 通过对 POM 文件的阅读，更加清楚的了解这个项目所使用的技术，并且通过阅读发现项目没有添加 Lombok 来简化开发，具体项目开发是否使用这个插件我不知道，但是我想用，因为我懒，所以就给加上了😄 跑通 RPC 定义 response 状态码枚举供通用返回对象 Result 进行使用 定义通用返回对象 Result 类 定义 activity 表的持久化对象 定义 activity 表的 Mapper 接口 定义 mybatis 配置文件 定义 activity 表的 mapper.xml 文件 定义 rpc 的数据传输对象(DTO) ActivityDto 定义 rpc 的 请求对象 ActivityReq 定义 rpc 的响应对象 ActivityRes 定义 rpc 接口 IActivityBooth 实现 IActivityBooth 接口 编写启动类 编写配置文件 application.yml 编写测试模块 这个我是直接加在工程里面的，教程是单独开了一个项目","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/notes/xxx/day01.html"}],["meta",{"property":"og:site_name","content":"txy"}],["meta",{"property":"og:title","content":"Day01"}],["meta",{"property":"og:description","content":"任务 [x] 环境配置 [x] 搭建项目结构 [x] 跑通广播模式 RPC 过程调用 学习过程 项目整体了解 通过对第一节文档的阅读，了解整个项目的生命周期、所需要的技术以及代码提交规范 搭建项目结构，理解每个模块应该干什么 模块 作用 Lottery 总项目，用来管理整个项目的依赖 lottery-application 应用层，为用户接口层提供各种应用数据展现支持服务 lottery-common 定义通用数据，比如统一响应数据、常量、异常、枚举等 lottery-domain 领域层，核心业务逻辑 lottery-infrastructure 基础层，为其他各层提供通用技术能力，包括数据库、Redis、ES 等 lottery-interfaces 用户接口层，存放与前端交互、展现数据相关的代码 lottery-rpc RPC 接口文件 注：因为并不了解 DDD 架构，所以每个模块目前只有模糊的概念，具体的东西在后续代码编写中进行体会 阅读 210801_xfg_initProject 分支上的 POM 文件 通过对 POM 文件的阅读，更加清楚的了解这个项目所使用的技术，并且通过阅读发现项目没有添加 Lombok 来简化开发，具体项目开发是否使用这个插件我不知道，但是我想用，因为我懒，所以就给加上了😄 跑通 RPC 定义 response 状态码枚举供通用返回对象 Result 进行使用 定义通用返回对象 Result 类 定义 activity 表的持久化对象 定义 activity 表的 Mapper 接口 定义 mybatis 配置文件 定义 activity 表的 mapper.xml 文件 定义 rpc 的数据传输对象(DTO) ActivityDto 定义 rpc 的 请求对象 ActivityReq 定义 rpc 的响应对象 ActivityRes 定义 rpc 接口 IActivityBooth 实现 IActivityBooth 接口 编写启动类 编写配置文件 application.yml 编写测试模块 这个我是直接加在工程里面的，教程是单独开了一个项目"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-04T13:04:31.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-04T13:04:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Day01\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-04T13:04:31.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"任务","slug":"任务","link":"#任务","children":[]},{"level":2,"title":"学习过程","slug":"学习过程","link":"#学习过程","children":[]},{"level":2,"title":"遇到的问题","slug":"遇到的问题","link":"#遇到的问题","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1738674271000,"updatedTime":1738674271000,"contributors":[{"name":"txy","email":"2434877135@qq.com","commits":1}]},"readingTime":{"minutes":4.48,"words":1343},"filePathRelative":"notes/xxx/day01.md","localizedDate":"2025年2月4日","excerpt":"<h2> 任务</h2>\\n<ul>\\n<li>[x] 环境配置</li>\\n<li>[x] 搭建项目结构</li>\\n<li>[x] 跑通广播模式 RPC 过程调用</li>\\n</ul>\\n<h2> 学习过程</h2>\\n<ol>\\n<li>\\n<p>项目整体了解</p>\\n<p>通过对第一节文档的阅读，了解整个项目的生命周期、所需要的技术以及代码提交规范</p>\\n</li>\\n<li>\\n<p>搭建项目结构，理解每个模块应该干什么</p>\\n<table>\\n<thead>\\n<tr>\\n<th>模块</th>\\n<th>作用</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>Lottery</td>\\n<td>总项目，用来管理整个项目的依赖</td>\\n</tr>\\n<tr>\\n<td>lottery-application</td>\\n<td>应用层，为用户接口层提供各种应用数据展现支持服务</td>\\n</tr>\\n<tr>\\n<td>lottery-common</td>\\n<td>定义通用数据，比如统一响应数据、常量、异常、枚举等</td>\\n</tr>\\n<tr>\\n<td>lottery-domain</td>\\n<td>领域层，核心业务逻辑</td>\\n</tr>\\n<tr>\\n<td>lottery-infrastructure</td>\\n<td>基础层，为其他各层提供通用技术能力，包括数据库、Redis、ES 等</td>\\n</tr>\\n<tr>\\n<td>lottery-interfaces</td>\\n<td>用户接口层，存放与前端交互、展现数据相关的代码</td>\\n</tr>\\n<tr>\\n<td>lottery-rpc</td>\\n<td>RPC 接口文件</td>\\n</tr>\\n</tbody>\\n</table>\\n<blockquote>\\n<p>注：因为并不了解 DDD 架构，所以每个模块目前只有模糊的概念，具体的东西在后续代码编写中进行体会</p>\\n</blockquote>\\n</li>\\n<li>\\n<p>阅读 <a href=\\"https://gitcode.net/KnowledgePlanet/Lottery/-/tree/210801_xfg_initProject\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">210801_xfg_initProject</a> 分支上的 POM 文件</p>\\n<p>通过对 POM 文件的阅读，更加清楚的了解这个项目所使用的技术，并且通过阅读发现项目没有添加 Lombok 来简化开发，具体项目开发是否使用这个插件我不知道，但是我想用，因为我<strong>懒</strong>，所以就给加上了😄</p>\\n</li>\\n<li>\\n<p>跑通 RPC</p>\\n<ol>\\n<li>定义 response 状态码枚举供通用返回对象 Result 进行使用</li>\\n<li>定义通用返回对象 Result 类</li>\\n<li>定义 activity 表的持久化对象</li>\\n<li>定义 activity 表的 Mapper 接口</li>\\n<li>定义 mybatis 配置文件</li>\\n<li>定义 activity 表的 mapper.xml 文件</li>\\n<li>定义 rpc 的数据传输对象(DTO) ActivityDto</li>\\n<li>定义 rpc 的 请求对象 ActivityReq</li>\\n<li>定义 rpc 的响应对象 ActivityRes</li>\\n<li>定义 rpc 接口 IActivityBooth</li>\\n<li>实现 IActivityBooth 接口</li>\\n<li>编写启动类</li>\\n<li>编写配置文件 application.yml</li>\\n<li>编写测试模块 <strong>这个我是直接加在工程里面的，教程是单独开了一个项目</strong></li>\\n</ol>\\n</li>\\n</ol>","autoDesc":true}');export{t as data};
