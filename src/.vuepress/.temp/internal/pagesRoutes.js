export const pagesRoutes = [
  ["v-8daa1a0e","/",{"y":"h","t":"主页","i":"home"},["/README.md"]],
  ["v-2e3eac9e","/slides.html",{"e":"<!-- markdownlint-disable MD024 MD033 MD051 -->\n<p>@slidestart</p>\n<!-- .slide: data-transition=\"slide\" -->\n<h2> 幻灯片演示</h2>\n<!-- .element: class=\"r-fit-text\" -->\n<p>一个简单的幻灯片演示与各种小贴士。</p>\n<!-- .element: class=\"r-fit-text\" -->\n<blockquote>\n<p>作者 Mr.Hope. 请滚动鼠标滚轮进入下一页</p>\n</blockquote>\n<hr>\n<h2> 标注幻灯片</h2>","y":"s","t":"幻灯片页","i":"person-chalkboard"},[":md"]],
  ["v-139a9e40","/essays/",{"e":"<h2> 随笔</h2>\n","y":"a","t":""},["/essays/README.md"]],
  ["v-b26ff390","/hobbies/",{"e":"<h2> 爱好</h2>\n","y":"a","t":""},["/hobbies/README.md"]],
  ["v-5a8fa2da","/notes/xxx/day01.html",{"c":["开发笔记","学习记录"],"e":"<h2> 任务</h2>\n<ul>\n<li>[x] 环境配置</li>\n<li>[x] 搭建项目结构</li>\n<li>[x] 跑通广播模式 RPC 过程调用</li>\n</ul>\n<h2> 学习过程</h2>\n<ol>\n<li>\n<p>项目整体了解</p>\n<p>通过对第一节文档的阅读，了解整个项目的生命周期、所需要的技术以及代码提交规范</p>\n</li>\n<li>\n<p>搭建项目结构，理解每个模块应该干什么</p>\n<table>\n<thead>\n<tr>\n<th>模块</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Lottery</td>\n<td>总项目，用来管理整个项目的依赖</td>\n</tr>\n<tr>\n<td>lottery-application</td>\n<td>应用层，为用户接口层提供各种应用数据展现支持服务</td>\n</tr>\n<tr>\n<td>lottery-common</td>\n<td>定义通用数据，比如统一响应数据、常量、异常、枚举等</td>\n</tr>\n<tr>\n<td>lottery-domain</td>\n<td>领域层，核心业务逻辑</td>\n</tr>\n<tr>\n<td>lottery-infrastructure</td>\n<td>基础层，为其他各层提供通用技术能力，包括数据库、Redis、ES 等</td>\n</tr>\n<tr>\n<td>lottery-interfaces</td>\n<td>用户接口层，存放与前端交互、展现数据相关的代码</td>\n</tr>\n<tr>\n<td>lottery-rpc</td>\n<td>RPC 接口文件</td>\n</tr>\n</tbody>\n</table>\n<blockquote>\n<p>注：因为并不了解 DDD 架构，所以每个模块目前只有模糊的概念，具体的东西在后续代码编写中进行体会</p>\n</blockquote>\n</li>\n<li>\n<p>阅读 <a href=\"https://gitcode.net/KnowledgePlanet/Lottery/-/tree/210801_xfg_initProject\" target=\"_blank\" rel=\"noopener noreferrer\">210801_xfg_initProject</a> 分支上的 POM 文件</p>\n<p>通过对 POM 文件的阅读，更加清楚的了解这个项目所使用的技术，并且通过阅读发现项目没有添加 Lombok 来简化开发，具体项目开发是否使用这个插件我不知道，但是我想用，因为我<strong>懒</strong>，所以就给加上了😄</p>\n</li>\n<li>\n<p>跑通 RPC</p>\n<ol>\n<li>定义 response 状态码枚举供通用返回对象 Result 进行使用</li>\n<li>定义通用返回对象 Result 类</li>\n<li>定义 activity 表的持久化对象</li>\n<li>定义 activity 表的 Mapper 接口</li>\n<li>定义 mybatis 配置文件</li>\n<li>定义 activity 表的 mapper.xml 文件</li>\n<li>定义 rpc 的数据传输对象(DTO) ActivityDto</li>\n<li>定义 rpc 的 请求对象 ActivityReq</li>\n<li>定义 rpc 的响应对象 ActivityRes</li>\n<li>定义 rpc 接口 IActivityBooth</li>\n<li>实现 IActivityBooth 接口</li>\n<li>编写启动类</li>\n<li>编写配置文件 application.yml</li>\n<li>编写测试模块 <strong>这个我是直接加在工程里面的，教程是单独开了一个项目</strong></li>\n</ol>\n</li>\n</ol>","y":"a","t":"Day01","i":"laptop-code","I":0},[":md"]],
  ["v-5c447b79","/notes/xxx/day02.html",{"c":["开发笔记","学习记录"],"e":"<h2> 任务</h2>\n<ul>\n<li>[x] 表设计</li>\n<li>[x] 抽奖领域模块开发</li>\n</ul>\n<h2> 学习过程</h2>\n<ol>\n<li>查询分库分表相关知识点，了解到垂直和水平分库分表，主要是为了解决数据量过大导致 MySQL 查询慢、单体容量过大问题</li>\n<li>开始写代码\n<ol>\n<li>编写基础的持久化对象 (PO)</li>\n<li>编写 Mapper 接口</li>\n<li>编写对应的 Mapper.xml</li>\n<li>设计抽奖策略顶级接口，主要是入参出参，如何封装，要封装哪些数据</li>\n<li>编写顶级接口的基础实现，实现里面公用的方法，比如把初始化方法、哈希计算的方法以及判断是否初始化完成</li>\n<li>编写两种算法的实现</li>\n<li>算法单元测试</li>\n</ol>\n</li>\n</ol>","y":"a","t":"Day02","i":"laptop-code","I":0},[":md"]],
  ["v-5df95418","/notes/xxx/day03.html",{"c":["开发笔记","学习记录"],"e":"<h2> day03</h2>\n<h3> 任务</h3>\n<ul>\n<li>[x] 模板模式处理抽奖流程</li>\n</ul>\n<h3> 学习过程</h3>\n<ol>\n<li>\n<p>因为之前没学过设计模式，先学一学模板模式，用到一种学一种，哈哈哈</p>\n</li>\n<li>\n<p>先看一下整个抽奖流程</p>\n<figure><figcaption>抽奖过程</figcaption></figure>\n</li>\n<li>\n<p>了解了抽奖流程之后就开始写代码</p>\n<ol>\n<li>\n<p>先写对应的 dao 层</p>\n<ol>\n<li>要查策略吧？写个策略的 Mapper</li>\n<li>要查策略详情吧？写个策略详情的 Mapper</li>\n<li>要查奖品吧？要减奖品库存吧？要查没库存的奖品吧？写个奖品的 Mapper</li>\n</ol>\n</li>\n<li>\n<p>然后实现 repository 层</p>\n<p>这里主要是调 Mapper 将结果进行聚合封装</p>\n</li>\n<li>\n<p>使用模板模式设计抽奖过程代码</p>\n<ol>\n<li>顶层接口规定抽奖的入参出参</li>\n<li>加一层 Config 把抽奖策略进行统一录入</li>\n<li>配置完成后需要调用基础服务比如 repository 层，所以加一层基础支持</li>\n<li>然后来一个抽象类，在这里实现接口的抽奖，抽奖接口里面写抽奖的流程，然后具体的方法交给子类实现</li>\n<li>实现抽象类</li>\n</ol>\n</li>\n<li>\n<p>测试</p>\n</li>\n</ol>\n</li>\n</ol>","y":"a","t":"Day03","i":"laptop-code","I":0},[":md"]],
  ["v-5fae2cb7","/notes/xxx/day04.html",{"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 简单工厂搭建发奖领域</li>\n</ul>\n<h3> 学习过程</h3>\n<ol>\n<li>\n<p>表结构变了，先导入 SQL，然后该对应的 PO 类，然后改一下 Mapper 文件</p>\n</li>\n<li>\n<p>先把包结构建好</p>\n<ol>\n<li>新建一个领域包，负责发奖</li>\n<li>领域包内建三个子包，model 实体封装包、repository 提供仓储服务、service 提供具体的服务（重点内容）</li>\n</ol>\n</li>\n<li>\n<p>看一下代码的继承关系</p>\n</li>\n<li>\n<p>debug 看一下代码执行流程，了解其中的调用关系</p>\n<ol>\n<li>先执行抽奖，返回抽奖结果</li>\n<li>对抽奖结果进行判断，如果是未中奖，直接返回</li>\n<li>中奖了就保存用户信息以及订单信息</li>\n<li>根据中奖结果中的奖品类型获取对应的服务</li>\n<li>然后把第三步保存的用户信息以及订单信息传进去，做一个发奖的操作</li>\n<li>然后返回发奖结果</li>\n</ol>\n</li>\n</ol>","y":"a","t":"Day04","i":"laptop-code","I":0},[":md"]],
  ["v-61630556","/notes/xxx/day05.html",{"c":["开发笔记","学习记录"],"e":"<h2> 任务</h2>\n<ul>\n<li>[x] 活动领域的配置与状态</li>\n</ul>\n<h2> 学习过程</h2>\n<ol>\n<li>包结构变化，调整对应的包</li>\n<li>了解活动创建的整个流程，然后将流程进行编排(其实就是落库的步骤呗)，写对应的 repository 层代码\n<ol>\n<li>首先明确要做哪些操作\n<ol>\n<li>添加活动</li>\n<li>添加奖品</li>\n<li>添加活动配置</li>\n<li>添加策略</li>\n<li>添加策略明细</li>\n</ol>\n</li>\n<li>编写对应的 repository 接口和实现类</li>\n<li></li>\n</ol>\n</li>\n<li>debug 了解状态模式如何进行的状态判断(感觉不用刻意去学这个设计模式，通过对项目的学习，从而达到状态模式的学习，<strong>后期进行设计模式的统一学习</strong>）\n<ol>\n<li>首先定义一个状态处理的接口，入参统一是活动ID和当前状态</li>\n<li>定义一个活动状态抽象类，这个抽象类的子类用来判断某种状态是否可以流转</li>\n<li>编写抽象类的实现，里面定义是否可以流转</li>\n<li>编写状态配置类，把每一种活动状态抽象类的实现注入进去并放入 Map 中，供状态处理服务使用</li>\n<li>编写状态处理接口的实现类\n<ol>\n<li>先从状态配置中获取当前状态所对应的活动状态流转实现类</li>\n<li>然后实现类调用方法，通过方法的返回值来确定是否能进行操作\n<ol>\n<li>如果能进行变更的，先进行落库操作，然后根据 MyBatis 返回值返回对应信息</li>\n<li>如果不能进行变更的，直接返回对应的错误信息</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>","y":"a","t":"Day05","i":"laptop-code","I":0},[":md"]],
  ["v-6317ddf5","/notes/xxx/day06.html",{"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] ID 生成策略开发</li>\n</ul>\n<h3> 学习过程</h3>\n<ol>\n<li>\n<p>先看视频了解用到了啥</p>\n</li>\n<li>\n<p>看小傅哥策略模式的<a href=\"https://mp.weixin.qq.com/s/zOFLtSFVrYEyTuihzwgKYw\" target=\"_blank\" rel=\"noopener noreferrer\">文章</a></p>\n</li>\n<li>\n<p>看代码结构</p>\n<ol>\n<li>定义一个接口，用来生成 id</li>\n<li>实现接口，实现不同的 id 生成算法</li>\n<li>定义一个上下文对象，包装各种 id 生成算法，然后放到 Spring 容器中供其他类注入使用</li>\n</ol>\n<p>今天的代码比较简单，主要就是涉及策略模式的使用，这里的上下文对象和之前的 config 类似，都是把写好的实现类进行包装，统一放到一个容器内，然后其他类通过这个容器，配合枚举拿到对应的实现类进行调用</p>\n</li>\n<li>\n<p>实操</p>\n</li>\n</ol>","y":"a","t":"Day06","i":"laptop-code","I":0},[":md"]],
  ["v-6f252d2e","/notes/xxx/day07~day08.html",{"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 分库分表组件</li>\n</ul>\n<h3> 遇到的问题</h3>\n<p>问题就不说了，这一章节全是问题 T.T，基础不牢，地动山摇啊！！！</p>\n<h3> 总结</h3>\n<p>首先建立一个大局观，要实现一个分库分表组件，那么先要学会如何编写 SpringBoot Starter，然后这个 Starter 需要实现的功能是分库分表，那么一定是有多个数据源，这个数据源从项目的 yml 配置文件传进来，然后就要实现多数据源的切换，然后分表操作就是要修改 SQL 的表名，所以需要做的事情大概是如下：</p>\n<ol>\n<li>读取数据源信息</li>\n<li>动态修改数据源</li>\n<li>动态修改 SQL</li>\n</ol>","y":"a","t":"Day07 ~ Day08","i":"laptop-code","I":0},[":md"]],
  ["v-b4702396","/notes/xxx/day09~day10.html",{"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 在应用层编排抽奖过程</li>\n</ul>\n<h3> 总结</h3>\n<p>有了前面的模板模式的基础，这一章节相对来说比较容易，自己实现的时候也没有什么大问题，大体流程就是写接口，编排流程，然后写实现类，然后写 Mapper，至于为什么花了两三天，这就不得不说上一章的分库分表了，没写过 SpringBoot Starter，没写过 MyBatis 插件，对 AOP 没有深刻的理解，纯硬啃下来的，但是记不太劳，所以晚上睡不着觉，总感觉缺点什么东西，就花了两天干了如下几件事：</p>\n<ol>\n<li>\n<p>新建一个空的 SpringBoot 项目，从 <code>SpringApplication.run()</code> 方法开始 debug，一步一步看，在这一个过程中主要学到了如下几点：</p>\n<ul>\n<li>一个 SpringBoot 项目是如何初始化的，在哪里创建的容器等等</li>\n<li>如何加载第三方 Starter 的</li>\n<li><s>在哪里打印的Banner 以及如何设置</s> 这个不是重点，哈哈哈，但是挺好玩的</li>\n<li>还有 <code>ApplicationRunner</code> 和 <code>CommandLineRunner</code></li>\n<li>还有异常报告器 <code>exceptionReporters</code></li>\n<li>还有几个关于上下文环境的重要方法 <code>prepareContext()</code> 、<code>refreshContext()</code>、<code>afterRefresh()</code></li>\n</ul>\n<p>明白了 SpringBoot 应用初始化流程就知道所写的分录分表路由 starter 是在哪个阶段进行数据源设置以及为什么要在 <code>AutoConfig</code> 类下进行 Bean 的注入了</p>\n</li>\n<li>\n<p>看了看 MyBatis 插件相关的文档，大致了解了一个 MyBatis 插件如何编写，看了这个以后看 MyBatis-Plus 源码的时候可能会轻松一点</p>\n</li>\n<li>\n<p>复习了一下 AOP，注解的属性有哪些以及该怎么写都有点忘了</p>\n</li>\n<li>\n<p>在这个 debug 的过程中其实画了一些图，但是因为没有 OSS，所以图片不太好展示，所以使用 vuepress + github pages + github actions 搭建了一个博客，后面有空了会把看源码的过程发上去</p>\n</li>\n</ol>","y":"a","t":"Day09 ~ Day10","i":"laptop-code","I":0},[":md"]],
  ["v-e11443ca","/notes/xxx/day11.html",{"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 在应用层编排抽奖过程</li>\n</ul>\n<h3> 总结</h3>\n<p>今天的内容比较简单，最主要的问题就是表改了，然后花了很多时间去改对应的 PO 以及 SQL，然后今天第一次开发 application 层，感觉就是把 domain 层各个领域进行组装，然后形成一个又一个的流程，在这里面会使用 MQ 把流程进行切片，之后写门面接口应该就是调 application 层里面各个流程了，这样对于 Controller 层感觉挺好的，只需要简单的封装一下前端传进来的参数，然后调用 application 层执行各个流程就可以了</p>\n<p>感觉今天最大的收获就在于学到了在开发的过程中要把整个流程切分一下，分成一块一块的，然后用 MQ 进行后续的操作，用户不需要感知到这一切，他只需要点进去，然后执行一个小的片段，然后剩下的操作可以使用 MQ 来慢慢操作，而不是之前那样直接单线程一个流程写完，又臭又长，返回得还慢，用户体验很不好，学到了流程切片，今天不亏，哈哈哈哈，这个东西还是很有用的</p>","y":"a","t":"Day011","i":"laptop-code","I":0},[":md"]],
  ["v-ddaa928c","/notes/xxx/day12.html",{"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 规则引擎量化人群参与活动</li>\n</ul>\n<h2> 总结</h2>\n<p>首先先去了解了一下组合模式和决策树，然后看了看数据库，其实就是把一个类似于二叉树的结构存到了数据库里，分别对应了三个东西，一个表用来保存决策树的树根信息，然后一个表用来保存树上的所有节点的信息，然后一个表用来存决策树的连接信息，我们可以通过树根的 ID 拿到所有相关的连线信息以及所有相关的节点信息，明白了数据库相关的东西之后屡屡代码结构</p>\n<p>什么是组合模式呢？先看看维基百科对组合模式的定义，然后直接看代码，给我的第一感觉就是把每一个 if-else 的条件抽取出来，然后变成一个又一个的 filter，然后在规则引擎中进行使用，首先把一个个 filter 包装到 map 中，供子类使用</p>","y":"a","t":"Day012","i":"laptop-code","I":0},[":md"]],
  ["v-6d8a8004","/notes/xxx/",{"c":["自我介绍","专业技能","项目经验"],"e":"<ul>\n<li><a href=\"/notes/xxx/day01.html\" target=\"blank\">day01.md</a></li>\n</ul>\n","y":"a","t":"开发日志","i":"laptop-code"},["/notes/xxx/README.md"]],
  ["v-18c89c6a","/tech/algorithms/",{"e":"<h2> algorithms</h2>\n<p>算法</p>\n","y":"a","t":""},["/tech/algorithms/README.md"]],
  ["v-b0708c76","/tech/bigdata/",{"e":"<h2> bigdata</h2>\n<p>bigdata</p>\n","y":"a","t":""},["/tech/bigdata/README.md"]],
  ["v-34e41fba","/tech/cloudnative/",{"e":"<h2> cloudnative</h2>\n<p>云原生</p>\n","y":"a","t":""},["/tech/cloudnative/README.md"]],
  ["v-3571a5d8","/tech/database/",{"e":"<h2> database</h2>\n<p>数据库</p>\n","y":"a","t":""},["/tech/database/README.md"]],
  ["v-0031294d","/tech/java/",{"e":"<h2> Java</h2>\n<p>爪哇</p>\n","y":"a","t":""},["/tech/java/README.md"]],
  ["v-c9d5f64c","/tech/java/test.html",{"d":1738368000000,"l":"2025年2月1日","c":["开发笔记","学习记录"],"g":["log"],"e":"<h2> test</h2>\n<p>111test</p>\n<p>slf4j是日志门面api，提供了一种标准化的日志接口，log4j、log4j2、logback是真正的日志实现库。slf4j允许用户在不改变代码的情况下，随时更换底层日志框架。</p>\n<p>各个库单独使用\nlog4j</p>\n<div class=\"language-text line-numbers-mode\" data-ext=\"text\"><pre class=\"language-text\"><code>&lt;dependency&gt;\n&lt;groupId&gt;log4j&lt;/groupId&gt;\n&lt;artifactId&gt;log4j&lt;/artifactId&gt;\n&lt;version&gt;1.2.17&lt;/version&gt;\n&lt;/dependency&gt;\n</code></pre><div class=\"line-numbers\" aria-hidden=\"true\"><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div></div></div>","y":"a","t":"日志框架","i":"laptop-code","I":0},[":md"]],
  ["v-cc283046","/tech/middleware/",{"e":"<h2> 中间件</h2>\n<p>中间件</p>\n","y":"a","t":""},["/tech/middleware/README.md"]],
  ["v-3706649a","/404.html",{"y":"p","t":""},[]],
  ["v-e8b6c472","/notes/",{"y":"p","t":"Notes"},[]],
  ["v-15551100","/tech/",{"y":"p","t":"Tech"},[]],
  ["v-5bc93818","/category/",{"y":"p","t":"分类","I":0},[]],
  ["v-744d024e","/tag/",{"y":"p","t":"标签","I":0},[]],
  ["v-e52c881c","/article/",{"y":"p","t":"文章","I":0},[]],
  ["v-154dc4c4","/star/",{"y":"p","t":"收藏","I":0},[]],
  ["v-01560935","/timeline/",{"y":"p","t":"时间轴","I":0},[]],
  ["v-5fb2089c","/category/%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/",{"y":"p","t":"开发笔记 分类","I":0},["/category/开发笔记/"]],
  ["v-b30c1e8e","/tag/log/",{"y":"p","t":"标签: log","I":0},[]],
  ["v-375cc205","/category/%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/",{"y":"p","t":"学习记录 分类","I":0},["/category/学习记录/"]],
  ["v-a80515c6","/category/%E8%87%AA%E6%88%91%E4%BB%8B%E7%BB%8D/",{"y":"p","t":"自我介绍 分类","I":0},["/category/自我介绍/"]],
  ["v-b6898762","/category/%E4%B8%93%E4%B8%9A%E6%8A%80%E8%83%BD/",{"y":"p","t":"专业技能 分类","I":0},["/category/专业技能/"]],
  ["v-793ef1c6","/category/%E9%A1%B9%E7%9B%AE%E7%BB%8F%E9%AA%8C/",{"y":"p","t":"项目经验 分类","I":0},["/category/项目经验/"]],
]
