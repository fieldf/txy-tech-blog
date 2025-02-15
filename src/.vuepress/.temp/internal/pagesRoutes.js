export const pagesRoutes = [
  ["v-8daa1a0e","/",{"y":"h","t":"主页","i":"home"},["/README.md"]],
  ["v-2e3eac9e","/slides.html",{"d":1706621995000,"e":"<!-- markdownlint-disable MD024 MD033 MD051 -->\n<p>@slidestart</p>\n<!-- .slide: data-transition=\"slide\" -->\n<h2> 幻灯片演示</h2>\n<!-- .element: class=\"r-fit-text\" -->\n<p>一个简单的幻灯片演示与各种小贴士。</p>\n<!-- .element: class=\"r-fit-text\" -->\n<blockquote>\n<p>作者 Mr.Hope. 请滚动鼠标滚轮进入下一页</p>\n</blockquote>\n<hr>\n<h2> 标注幻灯片</h2>","r":{"minutes":4.51,"words":1352},"y":"s","t":"幻灯片页","i":"person-chalkboard"},[":md"]],
  ["v-b26ff390","/hobbies/",{"d":1738674271000,"e":"<h2> 爱好</h2>\n","r":{"minutes":0.01,"words":2},"y":"a","t":""},["/hobbies/README.md"]],
  ["v-139a9e40","/essays/",{"d":1738674271000,"e":"<h2> 随笔</h2>\n","r":{"minutes":0.02,"words":5},"y":"a","t":"随笔"},["/essays/README.md"]],
  ["v-76bfbf5c","/essays/newyear.html",{"d":1738713600000,"l":"2025年2月5日","c":["随笔"],"g":["新年快乐"],"e":"<p>新年假期结束了，但我请了两天假，在大家都开工上班的日子，我享受着假期，算是偷得浮生半日闲。</p>\n<p>自己曾经一直想有一个网站来记录自己想写的东西，之前尝试过类似的博客，但因为缺少前端基础，\npass掉了这种方式。后面在b站看到了一个前后端结合的博客教程，想着后端可以自由做还能顺便学习前端知识，跟着做了并且部署到了线上，在看到过很多好看的博客后也想\n做成他们那样，但受限于前端技术，博客风格一直没什么变化，后面也没什么兴致去维护然后就不了了之了。</p>\n<p>现在重新开始主要是自己从毕业后工作一年多了也积累了一些自己的个人思考，加上自己之前很多技术总结，一直放在那里不想像老房子一直没人住长时间就\n失去了活力一样，同时自己希望能够在新的一年继续不断的学习积累和成长，有一个持续输出的地方。</p>","r":{"minutes":1.55,"words":464},"y":"a","t":"2025","i":"laptop-code","I":0},[":md"]],
  ["v-15551100","/tech/",{"d":1738750602000,"r":{"minutes":0.02,"words":7},"y":"a","t":"技术"},["/tech/README.md"]],
  ["v-6d8a8004","/notes/xxx/",{"d":1738674271000,"c":["自我介绍","专业技能","项目经验"],"e":"<ul>\n<li><a href=\"/notes/xxx/day01.html\" target=\"blank\">day01.md</a></li>\n</ul>\n","r":{"minutes":0.08,"words":25},"y":"a","t":"开发日志","i":"laptop-code"},["/notes/xxx/README.md"]],
  ["v-5a8fa2da","/notes/xxx/day01.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h2> 任务</h2>\n<ul>\n<li>[x] 环境配置</li>\n<li>[x] 搭建项目结构</li>\n<li>[x] 跑通广播模式 RPC 过程调用</li>\n</ul>\n<h2> 学习过程</h2>\n<ol>\n<li>\n<p>项目整体了解</p>\n<p>通过对第一节文档的阅读，了解整个项目的生命周期、所需要的技术以及代码提交规范</p>\n</li>\n<li>\n<p>搭建项目结构，理解每个模块应该干什么</p>\n<table>\n<thead>\n<tr>\n<th>模块</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Lottery</td>\n<td>总项目，用来管理整个项目的依赖</td>\n</tr>\n<tr>\n<td>lottery-application</td>\n<td>应用层，为用户接口层提供各种应用数据展现支持服务</td>\n</tr>\n<tr>\n<td>lottery-common</td>\n<td>定义通用数据，比如统一响应数据、常量、异常、枚举等</td>\n</tr>\n<tr>\n<td>lottery-domain</td>\n<td>领域层，核心业务逻辑</td>\n</tr>\n<tr>\n<td>lottery-infrastructure</td>\n<td>基础层，为其他各层提供通用技术能力，包括数据库、Redis、ES 等</td>\n</tr>\n<tr>\n<td>lottery-interfaces</td>\n<td>用户接口层，存放与前端交互、展现数据相关的代码</td>\n</tr>\n<tr>\n<td>lottery-rpc</td>\n<td>RPC 接口文件</td>\n</tr>\n</tbody>\n</table>\n<blockquote>\n<p>注：因为并不了解 DDD 架构，所以每个模块目前只有模糊的概念，具体的东西在后续代码编写中进行体会</p>\n</blockquote>\n</li>\n<li>\n<p>阅读 <a href=\"https://gitcode.net/KnowledgePlanet/Lottery/-/tree/210801_xfg_initProject\" target=\"_blank\" rel=\"noopener noreferrer\">210801_xfg_initProject</a> 分支上的 POM 文件</p>\n<p>通过对 POM 文件的阅读，更加清楚的了解这个项目所使用的技术，并且通过阅读发现项目没有添加 Lombok 来简化开发，具体项目开发是否使用这个插件我不知道，但是我想用，因为我<strong>懒</strong>，所以就给加上了😄</p>\n</li>\n<li>\n<p>跑通 RPC</p>\n<ol>\n<li>定义 response 状态码枚举供通用返回对象 Result 进行使用</li>\n<li>定义通用返回对象 Result 类</li>\n<li>定义 activity 表的持久化对象</li>\n<li>定义 activity 表的 Mapper 接口</li>\n<li>定义 mybatis 配置文件</li>\n<li>定义 activity 表的 mapper.xml 文件</li>\n<li>定义 rpc 的数据传输对象(DTO) ActivityDto</li>\n<li>定义 rpc 的 请求对象 ActivityReq</li>\n<li>定义 rpc 的响应对象 ActivityRes</li>\n<li>定义 rpc 接口 IActivityBooth</li>\n<li>实现 IActivityBooth 接口</li>\n<li>编写启动类</li>\n<li>编写配置文件 application.yml</li>\n<li>编写测试模块 <strong>这个我是直接加在工程里面的，教程是单独开了一个项目</strong></li>\n</ol>\n</li>\n</ol>","r":{"minutes":4.48,"words":1343},"y":"a","t":"Day01","i":"laptop-code","I":0},[":md"]],
  ["v-5c447b79","/notes/xxx/day02.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h2> 任务</h2>\n<ul>\n<li>[x] 表设计</li>\n<li>[x] 抽奖领域模块开发</li>\n</ul>\n<h2> 学习过程</h2>\n<ol>\n<li>查询分库分表相关知识点，了解到垂直和水平分库分表，主要是为了解决数据量过大导致 MySQL 查询慢、单体容量过大问题</li>\n<li>开始写代码\n<ol>\n<li>编写基础的持久化对象 (PO)</li>\n<li>编写 Mapper 接口</li>\n<li>编写对应的 Mapper.xml</li>\n<li>设计抽奖策略顶级接口，主要是入参出参，如何封装，要封装哪些数据</li>\n<li>编写顶级接口的基础实现，实现里面公用的方法，比如把初始化方法、哈希计算的方法以及判断是否初始化完成</li>\n<li>编写两种算法的实现</li>\n<li>算法单元测试</li>\n</ol>\n</li>\n</ol>","r":{"minutes":3.53,"words":1059},"y":"a","t":"Day02","i":"laptop-code","I":0},[":md"]],
  ["v-5df95418","/notes/xxx/day03.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h2> day03</h2>\n<h3> 任务</h3>\n<ul>\n<li>[x] 模板模式处理抽奖流程</li>\n</ul>\n<h3> 学习过程</h3>\n<ol>\n<li>\n<p>因为之前没学过设计模式，先学一学模板模式，用到一种学一种，哈哈哈</p>\n</li>\n<li>\n<p>先看一下整个抽奖流程</p>\n<figure><figcaption>抽奖过程</figcaption></figure>\n</li>\n<li>\n<p>了解了抽奖流程之后就开始写代码</p>\n<ol>\n<li>\n<p>先写对应的 dao 层</p>\n<ol>\n<li>要查策略吧？写个策略的 Mapper</li>\n<li>要查策略详情吧？写个策略详情的 Mapper</li>\n<li>要查奖品吧？要减奖品库存吧？要查没库存的奖品吧？写个奖品的 Mapper</li>\n</ol>\n</li>\n<li>\n<p>然后实现 repository 层</p>\n<p>这里主要是调 Mapper 将结果进行聚合封装</p>\n</li>\n<li>\n<p>使用模板模式设计抽奖过程代码</p>\n<ol>\n<li>顶层接口规定抽奖的入参出参</li>\n<li>加一层 Config 把抽奖策略进行统一录入</li>\n<li>配置完成后需要调用基础服务比如 repository 层，所以加一层基础支持</li>\n<li>然后来一个抽象类，在这里实现接口的抽奖，抽奖接口里面写抽奖的流程，然后具体的方法交给子类实现</li>\n<li>实现抽象类</li>\n</ol>\n</li>\n<li>\n<p>测试</p>\n</li>\n</ol>\n</li>\n</ol>","r":{"minutes":39.64,"words":11893},"y":"a","t":"Day03","i":"laptop-code","I":0},[":md"]],
  ["v-5fae2cb7","/notes/xxx/day04.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 简单工厂搭建发奖领域</li>\n</ul>\n<h3> 学习过程</h3>\n<ol>\n<li>\n<p>表结构变了，先导入 SQL，然后该对应的 PO 类，然后改一下 Mapper 文件</p>\n</li>\n<li>\n<p>先把包结构建好</p>\n<ol>\n<li>新建一个领域包，负责发奖</li>\n<li>领域包内建三个子包，model 实体封装包、repository 提供仓储服务、service 提供具体的服务（重点内容）</li>\n</ol>\n</li>\n<li>\n<p>看一下代码的继承关系</p>\n</li>\n<li>\n<p>debug 看一下代码执行流程，了解其中的调用关系</p>\n<ol>\n<li>先执行抽奖，返回抽奖结果</li>\n<li>对抽奖结果进行判断，如果是未中奖，直接返回</li>\n<li>中奖了就保存用户信息以及订单信息</li>\n<li>根据中奖结果中的奖品类型获取对应的服务</li>\n<li>然后把第三步保存的用户信息以及订单信息传进去，做一个发奖的操作</li>\n<li>然后返回发奖结果</li>\n</ol>\n</li>\n</ol>","r":{"minutes":1.54,"words":461},"y":"a","t":"Day04","i":"laptop-code","I":0},[":md"]],
  ["v-61630556","/notes/xxx/day05.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h2> 任务</h2>\n<ul>\n<li>[x] 活动领域的配置与状态</li>\n</ul>\n<h2> 学习过程</h2>\n<ol>\n<li>包结构变化，调整对应的包</li>\n<li>了解活动创建的整个流程，然后将流程进行编排(其实就是落库的步骤呗)，写对应的 repository 层代码\n<ol>\n<li>首先明确要做哪些操作\n<ol>\n<li>添加活动</li>\n<li>添加奖品</li>\n<li>添加活动配置</li>\n<li>添加策略</li>\n<li>添加策略明细</li>\n</ol>\n</li>\n<li>编写对应的 repository 接口和实现类</li>\n<li></li>\n</ol>\n</li>\n<li>debug 了解状态模式如何进行的状态判断(感觉不用刻意去学这个设计模式，通过对项目的学习，从而达到状态模式的学习，<strong>后期进行设计模式的统一学习</strong>）\n<ol>\n<li>首先定义一个状态处理的接口，入参统一是活动ID和当前状态</li>\n<li>定义一个活动状态抽象类，这个抽象类的子类用来判断某种状态是否可以流转</li>\n<li>编写抽象类的实现，里面定义是否可以流转</li>\n<li>编写状态配置类，把每一种活动状态抽象类的实现注入进去并放入 Map 中，供状态处理服务使用</li>\n<li>编写状态处理接口的实现类\n<ol>\n<li>先从状态配置中获取当前状态所对应的活动状态流转实现类</li>\n<li>然后实现类调用方法，通过方法的返回值来确定是否能进行操作\n<ol>\n<li>如果能进行变更的，先进行落库操作，然后根据 MyBatis 返回值返回对应信息</li>\n<li>如果不能进行变更的，直接返回对应的错误信息</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>","r":{"minutes":3.98,"words":1193},"y":"a","t":"Day05","i":"laptop-code","I":0},[":md"]],
  ["v-6317ddf5","/notes/xxx/day06.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] ID 生成策略开发</li>\n</ul>\n<h3> 学习过程</h3>\n<ol>\n<li>\n<p>先看视频了解用到了啥</p>\n</li>\n<li>\n<p>看小傅哥策略模式的<a href=\"https://mp.weixin.qq.com/s/zOFLtSFVrYEyTuihzwgKYw\" target=\"_blank\" rel=\"noopener noreferrer\">文章</a></p>\n</li>\n<li>\n<p>看代码结构</p>\n<ol>\n<li>定义一个接口，用来生成 id</li>\n<li>实现接口，实现不同的 id 生成算法</li>\n<li>定义一个上下文对象，包装各种 id 生成算法，然后放到 Spring 容器中供其他类注入使用</li>\n</ol>\n<p>今天的代码比较简单，主要就是涉及策略模式的使用，这里的上下文对象和之前的 config 类似，都是把写好的实现类进行包装，统一放到一个容器内，然后其他类通过这个容器，配合枚举拿到对应的实现类进行调用</p>\n</li>\n<li>\n<p>实操</p>\n</li>\n</ol>","r":{"minutes":3.6,"words":1081},"y":"a","t":"Day06","i":"laptop-code","I":0},[":md"]],
  ["v-6f252d2e","/notes/xxx/day07~day08.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 分库分表组件</li>\n</ul>\n<h3> 遇到的问题</h3>\n<p>问题就不说了，这一章节全是问题 T.T，基础不牢，地动山摇啊！！！</p>\n<h3> 总结</h3>\n<p>首先建立一个大局观，要实现一个分库分表组件，那么先要学会如何编写 SpringBoot Starter，然后这个 Starter 需要实现的功能是分库分表，那么一定是有多个数据源，这个数据源从项目的 yml 配置文件传进来，然后就要实现多数据源的切换，然后分表操作就是要修改 SQL 的表名，所以需要做的事情大概是如下：</p>\n<ol>\n<li>读取数据源信息</li>\n<li>动态修改数据源</li>\n<li>动态修改 SQL</li>\n</ol>","r":{"minutes":2.75,"words":824},"y":"a","t":"Day07 ~ Day08","i":"laptop-code","I":0},[":md"]],
  ["v-b4702396","/notes/xxx/day09~day10.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 在应用层编排抽奖过程</li>\n</ul>\n<h3> 总结</h3>\n<p>有了前面的模板模式的基础，这一章节相对来说比较容易，自己实现的时候也没有什么大问题，大体流程就是写接口，编排流程，然后写实现类，然后写 Mapper，至于为什么花了两三天，这就不得不说上一章的分库分表了，没写过 SpringBoot Starter，没写过 MyBatis 插件，对 AOP 没有深刻的理解，纯硬啃下来的，但是记不太劳，所以晚上睡不着觉，总感觉缺点什么东西，就花了两天干了如下几件事：</p>\n<ol>\n<li>\n<p>新建一个空的 SpringBoot 项目，从 <code>SpringApplication.run()</code> 方法开始 debug，一步一步看，在这一个过程中主要学到了如下几点：</p>\n<ul>\n<li>一个 SpringBoot 项目是如何初始化的，在哪里创建的容器等等</li>\n<li>如何加载第三方 Starter 的</li>\n<li><s>在哪里打印的Banner 以及如何设置</s> 这个不是重点，哈哈哈，但是挺好玩的</li>\n<li>还有 <code>ApplicationRunner</code> 和 <code>CommandLineRunner</code></li>\n<li>还有异常报告器 <code>exceptionReporters</code></li>\n<li>还有几个关于上下文环境的重要方法 <code>prepareContext()</code> 、<code>refreshContext()</code>、<code>afterRefresh()</code></li>\n</ul>\n<p>明白了 SpringBoot 应用初始化流程就知道所写的分录分表路由 starter 是在哪个阶段进行数据源设置以及为什么要在 <code>AutoConfig</code> 类下进行 Bean 的注入了</p>\n</li>\n<li>\n<p>看了看 MyBatis 插件相关的文档，大致了解了一个 MyBatis 插件如何编写，看了这个以后看 MyBatis-Plus 源码的时候可能会轻松一点</p>\n</li>\n<li>\n<p>复习了一下 AOP，注解的属性有哪些以及该怎么写都有点忘了</p>\n</li>\n<li>\n<p>在这个 debug 的过程中其实画了一些图，但是因为没有 OSS，所以图片不太好展示，所以使用 vuepress + github pages + github actions 搭建了一个博客，后面有空了会把看源码的过程发上去</p>\n</li>\n</ol>","r":{"minutes":2.48,"words":744},"y":"a","t":"Day09 ~ Day10","i":"laptop-code","I":0},[":md"]],
  ["v-e11443ca","/notes/xxx/day11.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 在应用层编排抽奖过程</li>\n</ul>\n<h3> 总结</h3>\n<p>今天的内容比较简单，最主要的问题就是表改了，然后花了很多时间去改对应的 PO 以及 SQL，然后今天第一次开发 application 层，感觉就是把 domain 层各个领域进行组装，然后形成一个又一个的流程，在这里面会使用 MQ 把流程进行切片，之后写门面接口应该就是调 application 层里面各个流程了，这样对于 Controller 层感觉挺好的，只需要简单的封装一下前端传进来的参数，然后调用 application 层执行各个流程就可以了</p>\n<p>感觉今天最大的收获就在于学到了在开发的过程中要把整个流程切分一下，分成一块一块的，然后用 MQ 进行后续的操作，用户不需要感知到这一切，他只需要点进去，然后执行一个小的片段，然后剩下的操作可以使用 MQ 来慢慢操作，而不是之前那样直接单线程一个流程写完，又臭又长，返回得还慢，用户体验很不好，学到了流程切片，今天不亏，哈哈哈哈，这个东西还是很有用的</p>","r":{"minutes":1.14,"words":341},"y":"a","t":"Day011","i":"laptop-code","I":0},[":md"]],
  ["v-ddaa928c","/notes/xxx/day12.html",{"d":1738674271000,"c":["开发笔记","学习记录"],"e":"<h3> 任务</h3>\n<ul>\n<li>[x] 规则引擎量化人群参与活动</li>\n</ul>\n<h2> 总结</h2>\n<p>首先先去了解了一下组合模式和决策树，然后看了看数据库，其实就是把一个类似于二叉树的结构存到了数据库里，分别对应了三个东西，一个表用来保存决策树的树根信息，然后一个表用来保存树上的所有节点的信息，然后一个表用来存决策树的连接信息，我们可以通过树根的 ID 拿到所有相关的连线信息以及所有相关的节点信息，明白了数据库相关的东西之后屡屡代码结构</p>\n<p>什么是组合模式呢？先看看维基百科对组合模式的定义，然后直接看代码，给我的第一感觉就是把每一个 if-else 的条件抽取出来，然后变成一个又一个的 filter，然后在规则引擎中进行使用，首先把一个个 filter 包装到 map 中，供子类使用</p>","r":{"minutes":2.62,"words":786},"y":"a","t":"Day012","i":"laptop-code","I":0},[":md"]],
  ["v-18c89c6a","/tech/algorithms/",{"d":1738674271000,"e":"<h2> algorithms</h2>\n<p>算法</p>\n","r":{"minutes":0.03,"words":8},"y":"a","t":"算法"},["/tech/algorithms/README.md"]],
  ["v-b0708c76","/tech/bigdata/",{"d":1738674271000,"e":"<h2> bigdata</h2>\n<p>bigdata</p>\n","r":{"minutes":0.03,"words":8},"y":"a","t":"大数据"},["/tech/bigdata/README.md"]],
  ["v-34e41fba","/tech/cloudnative/",{"d":1738674271000,"e":"<h2> cloudnative</h2>\n<p>云原生</p>\n","r":{"minutes":0.03,"words":10},"y":"a","t":"云原生"},["/tech/cloudnative/README.md"]],
  ["v-3571a5d8","/tech/database/",{"d":1738674271000,"e":"<h2> database</h2>\n<p>数据库</p>\n","r":{"minutes":0.03,"words":10},"y":"a","t":"数据库"},["/tech/database/README.md"]],
  ["v-378b0cea","/tech/database/mysql.html",{"d":1676160000000,"l":"2023年2月12日","c":["MYSQL"],"g":["索引","事务","mysql日志","mysql锁"],"e":"<h1> 基础</h1>\n<figure><img src=\"https://cdn.nlark.com/yuque/0/2022/png/22839467/1667314175631-0ca0a803-49a4-4380-9fd9-96727c4aad59.png\" alt=\"\" tabindex=\"0\" loading=\"lazy\"><figcaption></figcaption></figure>\n<h2> myisam和innodb</h2>\n<p>myisam：</p>\n<ol>\n<li>myisam不支持行锁，读取数据只能加表锁。写入时加排他锁。</li>\n<li>不支持事务。</li>\n<li>不支持外键。</li>\n<li>适合select密集型表。</li>\n</ol>","r":{"minutes":30.66,"words":9197},"y":"a","t":"MYSQL","i":"laptop-code","I":0},[":md"]],
  ["v-0a121a22","/tech/database/redis1.html",{"d":1676160000000,"l":"2023年2月12日","c":["Redis"],"g":["数据类型","AOF&RDB","缓存一致性","redis实战"],"e":"<h1> ·为什么用redis</h1>\n<p><strong></strong></p>\n<p><strong></strong></p>\n<p><strong></strong></p>\n<p><strong></strong></p>\n<ol>\n<li>\n</li>\n<li>\n</li>\n<li>\n</li>\n<li>\n</li>\n<li>\n</li>\n</ol>\n<h1> ·数据结构</h1>\n<h2> </h2>\n<h3> </h3>\n<div class=\"language-c line-numbers-mode\" data-ext=\"c\"><pre class=\"language-c\"><code><span class=\"token keyword\">struct</span> <span class=\"token class-name\">sdshdr</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token keyword\">int</span> len<span class=\"token punctuation\">;</span><span class=\"token comment\">// 记录已使用的长度   </span>\n    <span class=\"token keyword\">int</span> free<span class=\"token punctuation\">;</span> <span class=\"token comment\">// 记录空闲未使用的长度</span>\n    <span class=\"token keyword\">char</span><span class=\"token punctuation\">[</span><span class=\"token punctuation\">]</span> buf<span class=\"token punctuation\">;</span> <span class=\"token comment\">// 字符数组</span>\n<span class=\"token punctuation\">}</span>\n</code></pre><div class=\"line-numbers\" aria-hidden=\"true\"><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div></div></div>","r":{"minutes":44.22,"words":13266},"y":"a","t":"Redis(上)","i":"laptop-code","I":0},[":md"]],
  ["v-06a868e4","/tech/database/redis2.html",{"d":1676160000000,"l":"2023年2月12日","c":["Redis"],"g":["数据类型","哨兵模式","redis集群"],"e":"<h1> 入门</h1>\n<p>nosql</p>\n<ol>\n<li>not only sql</li>\n<li>问题：\n<ol>\n<li>关系型数据库难以对付高并发</li>\n</ol>\n</li>\n<li>特点：\n<ol>\n<li>方便扩展</li>\n<li>大数据量、高性能</li>\n<li>数据类型多样</li>\n</ol>\n</li>\n<li>关系型\n<ol>\n<li>结构化</li>\n<li>SQL</li>\n<li>数据和关系单独的表中</li>\n<li>一致性</li>\n<li>事务</li>\n</ol>\n</li>\n<li>nosql\n<ol>\n<li>没有固定查询语句</li>\n<li>键值对、列存储、文档存储、图形数据库</li>\n<li>最终一致性</li>\n<li>CAP定理和BASE（异地多活）</li>\n<li>高性能、高可用、高扩展</li>\n</ol>\n</li>\n<li>分类\n<ol>\n<li>KV键值对：redis</li>\n<li>文档型数据库\n<ol>\n<li>mongodb（bson和json一样）\n<ol>\n<li>基于分布式文件存储</li>\n</ol>\n</li>\n</ol>\n</li>\n<li>列存储数据库\n<ol>\n<li>HBase</li>\n<li>分布式文件系统</li>\n</ol>\n</li>\n<li>图关系数据库\n<ol>\n<li>放的是关系，比如朋友圈社交网络、广告推荐\n<ol>\n<li>neo4j、infogrid</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>\n</li>\n</ol>","r":{"minutes":18.99,"words":5698},"y":"a","t":"Redis(下)","i":"laptop-code","I":0},[":md"]],
  ["v-0031294d","/tech/java/",{"d":1738674271000,"e":"<h2> Java</h2>\n<p>爪哇</p>\n","r":{"minutes":0.02,"words":7},"y":"a","t":"Java"},["/tech/java/README.md"]],
  ["v-e2d6088c","/tech/java/javaBasic.html",{"d":1676160000000,"l":"2023年2月12日","c":["Java"],"g":["Java集合","序列化","反射","代理","设计模式"],"e":"<h1> ·java集合</h1>\n<h2> </h2>\n<p>一、HashSet：HashMap实现、无序</p>\n<p>实现：</p>\n<ol>\n<li>存的是散列值。</li>\n<li>按照元素的散列值来存取元素的。</li>\n<li>元素的散列值通过元素的hashCode方法计算得到。</li>\n<li>hashCode相等，则接着通过equals方法比较。</li>\n</ol>\n<p>特点：</p>\n<ol>\n<li>查找O(1)。</li>\n<li>无序。</li>\n<li>iterator遍历得到的结果是不确定的。</li>\n</ol>\n<p>二、TreeSet：二叉树实现</p>","r":{"minutes":47.42,"words":14227},"y":"a","t":"Java基础","i":"laptop-code","I":0},[":md"]],
  ["v-aca788a4","/tech/java/juc.html",{"d":1676160000000,"l":"2023年2月12日","c":["JUC"],"g":["多线程","线程池","锁"],"e":"<h1> ·线程</h1>\n<h2> 1线程</h2>\n<h3> 线程生命周期</h3>\n<p>锁池和等待池</p>\n<p>Java中的对象有两个池，对对象加synchronized锁时必须获得对象锁，没有获得锁的线程进入锁池。获取到锁的线程如果调用了wait()方法就会进入等待池，进入等待池的线程不会竞争对象锁。</p>\n<p>状态：</p>\n<ol>\n<li>新建New：new新建一个线程，处于新建状态。为线程分配内存并初始化成员变量的值。</li>\n<li>就绪Runnable：可运行态。start启动一个线程，处于就绪状态。</li>\n<li>运行Running：获取CPU资源后，执行run方法进入运行状态。</li>\n<li>阻塞Blocked\n<ol>\n<li>同步阻塞：运行线程尝试获取同步锁没有获取到，JVM会把线程放入锁池。</li>\n<li>其他阻塞：运行线程执行sleep、I/O阻塞（等待用户输入），JVM会把线程转入阻塞状态。</li>\n</ol>\n</li>\n<li>waiting状态：\n<ol>\n<li>调用wait方法，进入waiting状态，会释放对象锁。被notify唤醒会变为runnable状态，被唤醒是从等待池进入锁池重新竞争锁，状态其实是blocked。获取到锁以后才是runnable。</li>\n<li>调用join方法，也会让调用join的线程从runnable变成waiting。</li>\n</ol>\n</li>\n<li>死亡Dead：处于运行状态的线程调用run方法或call方法执行完成后、调用stop方法停止线程、程序执行错误/异常退出，进入死亡状态。</li>\n</ol>","r":{"minutes":42.08,"words":12625},"y":"a","t":"JUC","i":"laptop-code","I":0},[":md"]],
  ["v-20ba25b6","/tech/java/jvm.html",{"d":1676160000000,"l":"2023年2月12日","c":["JVM"],"g":["JVM","垃圾回收","Java内存模型","类加载机制","JVM调优"],"e":"<h1> ·JVM</h1>\n<h2> 运行机制</h2>\n<p>源文件-&gt;编译器-&gt;字节码-&gt;JVM-&gt;机器码</p>\n<ol>\n<li>Java源文件被编译器编译成字节码文件。</li>\n<li>JVM的即时编译器将字节码文件编译成相应操作系统的机器码。【解释器不同虚拟机相同】</li>\n<li>机器码是靠调用相应操作系统的本地方法库执行相应的方法。</li>\n<li>一个进程对应一个java虚拟机实例。</li>\n</ol>\n<h2> JVM包括什么？</h2>\n<p>包括类加载器，运行时数据区，执行引擎和本地接口库。</p>\n<ol>\n<li>类加载器：用于将字节码文件加载到JVM中。</li>\n<li>运行时数据区：用于存储JVM运行过程中产生的数据。</li>\n<li>执行引擎：\n<ol>\n<li>包括即时编译器JIT-&gt;将字节码编译成具体的机器码。</li>\n<li>垃圾回收器：回收在运行过程中不再使用的对象。</li>\n</ol>\n</li>\n<li>本地接口库JNI：调用本地方法库与操作系统交互。</li>\n</ol>","r":{"minutes":27.82,"words":8347},"y":"a","t":"JVM","i":"laptop-code","I":0},[":md"]],
  ["v-343f179c","/tech/java/logframework.html",{"d":1738368000000,"l":"2025年2月1日","c":["开发笔记","学习记录"],"g":["log"],"e":"<h1> 日志框架结构：</h1>\n<p>slf4j是日志门面api，提供了一种标准化的日志接口，log4j、log4j2、logback是真正的日志实现库。slf4j允许用户在不改变代码的情况下，随时更换底层日志框架。</p>\n<h2> 各个库单独使用</h2>\n<ul>\n<li><strong>log4j</strong></li>\n</ul>\n<div class=\"language-java line-numbers-mode\" data-ext=\"java\"><pre class=\"language-java\"><code><span class=\"token generics\"><span class=\"token punctuation\">&lt;</span>dependency<span class=\"token punctuation\">&gt;</span></span>\n    <span class=\"token generics\"><span class=\"token punctuation\">&lt;</span>groupId<span class=\"token punctuation\">&gt;</span></span>log4j<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>groupId<span class=\"token operator\">&gt;</span>\n    <span class=\"token generics\"><span class=\"token punctuation\">&lt;</span>artifactId<span class=\"token punctuation\">&gt;</span></span>log4j<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>artifactId<span class=\"token operator\">&gt;</span>\n    <span class=\"token generics\"><span class=\"token punctuation\">&lt;</span>version<span class=\"token punctuation\">&gt;</span></span><span class=\"token number\">1.2</span><span class=\"token number\">.17</span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>version<span class=\"token operator\">&gt;</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>dependency<span class=\"token operator\">&gt;</span>\n</code></pre><div class=\"line-numbers\" aria-hidden=\"true\"><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div><div class=\"line-number\"></div></div></div>","r":{"minutes":3.6,"words":1080},"y":"a","t":"日志框架","i":"laptop-code","I":0},[":md"]],
  ["v-cc283046","/tech/middleware/",{"d":1738674271000,"e":"<h2> 中间件</h2>\n<p>中间件</p>\n","r":{"minutes":0.04,"words":12},"y":"a","t":"中间件"},["/tech/middleware/README.md"]],
  ["v-8d8006a8","/tech/basic/network.html",{"d":1676160000000,"l":"2023年2月12日","c":["计算机网络","计算机基础"],"g":["OSI七层模型","TCP/IP","HTTP/HTTPS"],"e":"<h1> ·七层模型</h1>\n<p>是ISO国家标准化组织制定的用于计算机通信系统间互联的体系。OSI七层模型包含一些抽象的概念和术语，也包括一些具体的协议。</p>\n<p>应用层、表示层、会话层、传输层、网络层、数据链路层、物理层。</p>\n<h2> 应用层</h2>\n<ol>\n<li>应用层是构建的具体应用。</li>\n<li>我们应用软件都是在应用层实现的，是和用户的接口。</li>\n<li>应用层把数据传递给下一层TCP层。</li>\n<li>协议有HTTP,DNS,HTTPS,FTP文件上传下载,SMTP,POP3,TELNET,DHCP,TFTP。</li>\n</ol>\n<p><em></em></p>","r":{"minutes":39.87,"words":11961},"y":"a","t":"计算机网络","i":"laptop-code","I":0},[":md"]],
  ["v-241ad394","/tech/basic/os.html",{"d":1676160000000,"l":"2023年2月12日","c":["操作系统","计算机基础"],"g":["内存管理","进程与线程","IO模型","CPU","零拷贝"],"e":"<h1> 内存</h1>\n<h2> 虚拟内存</h2>\n<p>虚拟内存，就是虚拟出来的内存，可以把外存当做内存来使用，是为了解决程序运行时内存不足的问题。</p>\n<p>每个程序拥有地址空间，也就是虚拟内存地址。在编译期间，为变量一个虚拟地址。虚拟地址空间被分成多个固定大小的。物理空间也就是内存空间，被分成大小相同的页。在运行期间，内存管理单元MMU，用于获取虚拟地址对应的物理地址，是通过内存中的获取虚拟地址对应的实际内存物理地址，但是这个时候如果变量还物理地址，MMU就会它对应的物理地址是什么，此时发生了。需要为它在内存上分配一块物理地址，并将该地址供以后使用。发生缺页中断时，若物理内存空间，需要将物理空间中的一部分数据和磁盘对换来腾出空间，称为页面置换，根据换出页面的不同有不同的页面置换算法。</p>","r":{"minutes":29.51,"words":8854},"y":"a","t":"操作系统","i":"laptop-code","I":0},[":md"]],
  ["v-265fdf56","/notes/bigmarket/day01.html",{"d":1738800000000,"l":"2025年2月6日","c":["学习笔记","大营销"],"g":["docker"],"e":"<h1> 环境</h1>\n<h2> java环境</h2>\n<ol>\n<li>\n<p>下载安装java\n<a href=\"https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html\" target=\"_blank\" rel=\"noopener noreferrer\">Oracle官网java8</a></p>\n</li>\n<li>\n<p>配置环境变量</p>\n</li>\n</ol>\n<div class=\"language-bash line-numbers-mode\" data-ext=\"sh\"><pre class=\"language-bash\"><code><span class=\"token function\">vim</span> ~/.bash_profile\n</code></pre><div class=\"line-numbers\" aria-hidden=\"true\"><div class=\"line-number\"></div></div></div>","r":{"minutes":2.07,"words":622},"y":"a","t":"Day01-环境配置&项目初始化","i":"laptop-code","I":0},[":md"]],
  ["v-2814b7f5","/notes/bigmarket/day02.html",{"d":1738800000000,"l":"2025年2月6日","c":["学习笔记","大营销"],"g":["数据库"],"e":"<h2> 数据库与库表设计</h2>\n<p>数据库操作软件：Sequel ace</p>\n<p>步骤：</p>\n<ul>\n<li>创建数据库</li>\n<li>创建表</li>\n<li>创建表结构</li>\n<li>填充数据</li>\n</ul>\n<p>docker执行sql：</p>\n<ul>\n<li>库表需要先清理下再重新执行sql才生效</li>\n</ul>\n<div class=\"language-bash line-numbers-mode\" data-ext=\"sh\"><pre class=\"language-bash\"><code><span class=\"token function\">docker-compose</span> <span class=\"token parameter variable\">-f</span> docker-compose-environment.yml down <span class=\"token parameter variable\">-v</span>\n<span class=\"token function\">docker-compose</span> <span class=\"token parameter variable\">-f</span> docker-compose-environment.yml up <span class=\"token parameter variable\">-d</span>\n</code></pre><div class=\"line-numbers\" aria-hidden=\"true\"><div class=\"line-number\"></div><div class=\"line-number\"></div></div></div>","r":{"minutes":0.66,"words":198},"y":"a","t":"Day02-库表设计","i":"laptop-code","I":0},[":md"]],
  ["v-29c99094","/notes/bigmarket/day03.html",{"d":1739059200000,"l":"2025年2月9日","c":["学习笔记","大营销"],"g":["抽奖策略","redis"],"e":"<p>运营配置好一个抽奖策略以后，装配这个抽奖策略按不同概率实现奖品抽奖的功能。</p>\n<h2> redis配置与测试</h2>\n<ul>\n<li>创建分支：250209-txy-strategy-armory</li>\n<li>修改dev-ops目录结构：\n<ul>\n<li>environment/mysql</li>\n<li>environment/redis</li>\n<li>environment/docker-compose.yml</li>\n</ul>\n</li>\n<li>redis.conf</li>\n</ul>\n<div class=\"language-bash line-numbers-mode\" data-ext=\"sh\"><pre class=\"language-bash\"><code><span class=\"token builtin class-name\">bind</span> <span class=\"token number\">0.0</span>.0.0\nport <span class=\"token number\">6379</span>\n</code></pre><div class=\"line-numbers\" aria-hidden=\"true\"><div class=\"line-number\"></div><div class=\"line-number\"></div></div></div>","r":{"minutes":2.29,"words":688},"y":"a","t":"Day03-装配抽奖策略","i":"laptop-code","I":0},[":md"]],
  ["v-2b7e6933","/notes/bigmarket/day04.html",{"d":1739059200000,"l":"2025年2月9日","c":["学习笔记","大营销"],"g":["抽奖策略"],"e":"<p>能够实现按照不同积分解锁不同的抽奖奖品-策略的权重规则配置。</p>\n<p>创建分支：250209-txy-strategy-armory-rule-weight</p>\n<p>重构：</p>\n<ul>\n<li>在/domain/service/armory/包下创建接口IStrategyDispatch：策略抽奖调度，把IStrategyArmory类的抽奖方法移过来，</li>\n<li>实现类实现两个接口：IStrategyArmory，IStrategyDispatch</li>\n<li>原来装配策略方法拆分成两个模块，1.查询策略奖品配置，2.装配抽奖策略（便于复用）</li>\n</ul>","r":{"minutes":1.18,"words":353},"y":"a","t":"Day04-抽奖权重策略装配","i":"laptop-code","I":0},[":md"]],
  ["v-2d3341d2","/notes/bigmarket/day05.html",{"d":1739059200000,"l":"2025年2月9日","c":["学习笔记","大营销"],"g":["抽奖策略","设计模式"],"e":"<h2> 概述</h2>\n<ul>\n<li><strong>使用【模板模式】定义抽奖方法模板</strong>：固定步骤，调用前置规则过滤的抽象方法（由具体实现去实现具体的过滤规则），\n根据规则过滤结果（即黑名单/权重过滤结果）判断执行抽奖（普通抽奖/黑名单返回固定奖品/权重抽奖）。</li>\n<li><strong>在具体实现中由【策略模式】实现规则过滤</strong>：根据规则过滤的标识key，从工厂中获取策略接口【工厂模式】，根据不同策略调用规则过滤的具体实现。</li>\n</ul>\n<h2> 步骤</h2>\n<p>创建分支：250210-txy-raffle-design</p>\n<ol>\n<li>模板模式 🧩\n实现：</li>\n</ol>","r":{"minutes":1.48,"words":443},"y":"a","t":"Day05-抽奖规则过滤(设计模式)","i":"laptop-code","I":0},[":md"]],
  ["v-3706649a","/404.html",{"y":"p","t":""},[]],
  ["v-e8b6c472","/notes/",{"y":"p","t":"Notes"},[]],
  ["v-0f67fa7e","/tech/basic/",{"y":"p","t":"Basic"},[]],
  ["v-c04db10c","/notes/bigmarket/",{"y":"p","t":"Bigmarket"},[]],
  ["v-5bc93818","/category/",{"y":"p","t":"分类","I":0},[]],
  ["v-744d024e","/tag/",{"y":"p","t":"标签","I":0},[]],
  ["v-e52c881c","/article/",{"y":"p","t":"文章","I":0},[]],
  ["v-154dc4c4","/star/",{"y":"p","t":"收藏","I":0},[]],
  ["v-01560935","/timeline/",{"y":"p","t":"时间轴","I":0},[]],
  ["v-60649a06","/category/%E9%9A%8F%E7%AC%94/",{"y":"p","t":"随笔 分类","I":0},["/category/随笔/"]],
  ["v-089cebd6","/tag/%E6%96%B0%E5%B9%B4%E5%BF%AB%E4%B9%90/",{"y":"p","t":"标签: 新年快乐","I":0},["/tag/新年快乐/"]],
  ["v-a80515c6","/category/%E8%87%AA%E6%88%91%E4%BB%8B%E7%BB%8D/",{"y":"p","t":"自我介绍 分类","I":0},["/category/自我介绍/"]],
  ["v-6ebee387","/tag/%E7%B4%A2%E5%BC%95/",{"y":"p","t":"标签: 索引","I":0},["/tag/索引/"]],
  ["v-b6898762","/category/%E4%B8%93%E4%B8%9A%E6%8A%80%E8%83%BD/",{"y":"p","t":"专业技能 分类","I":0},["/category/专业技能/"]],
  ["v-26374ab8","/tag/%E4%BA%8B%E5%8A%A1/",{"y":"p","t":"标签: 事务","I":0},["/tag/事务/"]],
  ["v-793ef1c6","/category/%E9%A1%B9%E7%9B%AE%E7%BB%8F%E9%AA%8C/",{"y":"p","t":"项目经验 分类","I":0},["/category/项目经验/"]],
  ["v-54d85698","/tag/mysql%E6%97%A5%E5%BF%97/",{"y":"p","t":"标签: mysql日志","I":0},["/tag/mysql日志/"]],
  ["v-5fb2089c","/category/%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/",{"y":"p","t":"开发笔记 分类","I":0},["/category/开发笔记/"]],
  ["v-74edb48c","/tag/mysql%E9%94%81/",{"y":"p","t":"标签: mysql锁","I":0},["/tag/mysql锁/"]],
  ["v-375cc205","/category/%E5%AD%A6%E4%B9%A0%E8%AE%B0%E5%BD%95/",{"y":"p","t":"学习记录 分类","I":0},["/category/学习记录/"]],
  ["v-aafe73e0","/tag/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B/",{"y":"p","t":"标签: 数据类型","I":0},["/tag/数据类型/"]],
  ["v-9717cc36","/category/mysql/",{"y":"p","t":"MYSQL 分类","I":0},[]],
  ["v-e6ae3818","/tag/aof_rdb/",{"y":"p","t":"标签: AOF&RDB","I":0},[]],
  ["v-8848dfa8","/category/redis/",{"y":"p","t":"Redis 分类","I":0},[]],
  ["v-34e38882","/tag/%E7%BC%93%E5%AD%98%E4%B8%80%E8%87%B4%E6%80%A7/",{"y":"p","t":"标签: 缓存一致性","I":0},["/tag/缓存一致性/"]],
  ["v-5831b135","/category/java/",{"y":"p","t":"Java 分类","I":0},[]],
  ["v-7a295aac","/tag/redis%E5%AE%9E%E6%88%98/",{"y":"p","t":"标签: redis实战","I":0},["/tag/redis实战/"]],
  ["v-65f15ecf","/category/juc/",{"y":"p","t":"JUC 分类","I":0},[]],
  ["v-5bbd6695","/tag/%E5%93%A8%E5%85%B5%E6%A8%A1%E5%BC%8F/",{"y":"p","t":"标签: 哨兵模式","I":0},["/tag/哨兵模式/"]],
  ["v-65f163c6","/category/jvm/",{"y":"p","t":"JVM 分类","I":0},[]],
  ["v-49aeef49","/tag/redis%E9%9B%86%E7%BE%A4/",{"y":"p","t":"标签: redis集群","I":0},["/tag/redis集群/"]],
  ["v-227ecbd6","/category/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/",{"y":"p","t":"计算机网络 分类","I":0},["/category/计算机网络/"]],
  ["v-12e56aa2","/tag/java%E9%9B%86%E5%90%88/",{"y":"p","t":"标签: Java集合","I":0},["/tag/java集合/"]],
  ["v-79574331","/category/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/",{"y":"p","t":"计算机基础 分类","I":0},["/category/计算机基础/"]],
  ["v-eccae7f6","/tag/%E5%BA%8F%E5%88%97%E5%8C%96/",{"y":"p","t":"标签: 序列化","I":0},["/tag/序列化/"]],
  ["v-4c40caa5","/category/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/",{"y":"p","t":"操作系统 分类","I":0},["/category/操作系统/"]],
  ["v-5e3b2cf1","/tag/%E5%8F%8D%E5%B0%84/",{"y":"p","t":"标签: 反射","I":0},["/tag/反射/"]],
  ["v-67483220","/category/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/",{"y":"p","t":"学习笔记 分类","I":0},["/category/学习笔记/"]],
  ["v-2b21fce9","/tag/%E4%BB%A3%E7%90%86/",{"y":"p","t":"标签: 代理","I":0},["/tag/代理/"]],
  ["v-5c3a2524","/category/%E5%A4%A7%E8%90%A5%E9%94%80/",{"y":"p","t":"大营销 分类","I":0},["/category/大营销/"]],
  ["v-05b88e01","/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",{"y":"p","t":"标签: 设计模式","I":0},["/tag/设计模式/"]],
  ["v-415e2fc5","/tag/%E5%A4%9A%E7%BA%BF%E7%A8%8B/",{"y":"p","t":"标签: 多线程","I":0},["/tag/多线程/"]],
  ["v-a9313856","/tag/%E7%BA%BF%E7%A8%8B%E6%B1%A0/",{"y":"p","t":"标签: 线程池","I":0},["/tag/线程池/"]],
  ["v-62671174","/tag/%E9%94%81/",{"y":"p","t":"标签: 锁","I":0},["/tag/锁/"]],
  ["v-b30dba08","/tag/jvm/",{"y":"p","t":"标签: JVM","I":0},[]],
  ["v-0e7d8a20","/tag/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6/",{"y":"p","t":"标签: 垃圾回收","I":0},["/tag/垃圾回收/"]],
  ["v-7f15fd44","/tag/java%E5%86%85%E5%AD%98%E6%A8%A1%E5%9E%8B/",{"y":"p","t":"标签: Java内存模型","I":0},["/tag/java内存模型/"]],
  ["v-0c5b8bda","/tag/%E7%B1%BB%E5%8A%A0%E8%BD%BD%E6%9C%BA%E5%88%B6/",{"y":"p","t":"标签: 类加载机制","I":0},["/tag/类加载机制/"]],
  ["v-6ecc2b8f","/tag/jvm%E8%B0%83%E4%BC%98/",{"y":"p","t":"标签: JVM调优","I":0},["/tag/jvm调优/"]],
  ["v-b30c1e8e","/tag/log/",{"y":"p","t":"标签: log","I":0},[]],
  ["v-b50ce0e6","/tag/osi%E4%B8%83%E5%B1%82%E6%A8%A1%E5%9E%8B/",{"y":"p","t":"标签: OSI七层模型","I":0},["/tag/osi七层模型/"]],
  ["v-06795f96","/tag/tcpip/",{"y":"p","t":"标签: TCP/IP","I":0},[]],
  ["v-8a66e00c","/tag/httphttps/",{"y":"p","t":"标签: HTTP/HTTPS","I":0},[]],
  ["v-1190a5ee","/tag/%E5%86%85%E5%AD%98%E7%AE%A1%E7%90%86/",{"y":"p","t":"标签: 内存管理","I":0},["/tag/内存管理/"]],
  ["v-02a467de","/tag/%E8%BF%9B%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B/",{"y":"p","t":"标签: 进程与线程","I":0},["/tag/进程与线程/"]],
  ["v-19ed4ed7","/tag/io%E6%A8%A1%E5%9E%8B/",{"y":"p","t":"标签: IO模型","I":0},["/tag/io模型/"]],
  ["v-b3144256","/tag/cpu/",{"y":"p","t":"标签: CPU","I":0},[]],
  ["v-991a6cee","/tag/%E9%9B%B6%E6%8B%B7%E8%B4%9D/",{"y":"p","t":"标签: 零拷贝","I":0},["/tag/零拷贝/"]],
  ["v-6106c001","/tag/docker/",{"y":"p","t":"标签: docker","I":0},[]],
  ["v-25365ef3","/tag/%E6%95%B0%E6%8D%AE%E5%BA%93/",{"y":"p","t":"标签: 数据库","I":0},["/tag/数据库/"]],
  ["v-4bb7bbf4","/tag/%E6%8A%BD%E5%A5%96%E7%AD%96%E7%95%A5/",{"y":"p","t":"标签: 抽奖策略","I":0},["/tag/抽奖策略/"]],
  ["v-0d1f4c3c","/tag/redis/",{"y":"p","t":"标签: redis","I":0},[]],
]
