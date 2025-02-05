const e=JSON.parse('{"key":"v-5df95418","path":"/notes/xxx/day03.html","title":"Day03","lang":"zh-CN","frontmatter":{"title":"Day03","index":false,"icon":"laptop-code","category":["开发笔记","学习记录"],"description":"day03 任务 [x] 模板模式处理抽奖流程 学习过程 因为之前没学过设计模式，先学一学模板模式，用到一种学一种，哈哈哈 先看一下整个抽奖流程 抽奖过程 了解了抽奖流程之后就开始写代码 先写对应的 dao 层 要查策略吧？写个策略的 Mapper 要查策略详情吧？写个策略详情的 Mapper 要查奖品吧？要减奖品库存吧？要查没库存的奖品吧？写个奖品的 Mapper 然后实现 repository 层 这里主要是调 Mapper 将结果进行聚合封装 使用模板模式设计抽奖过程代码 顶层接口规定抽奖的入参出参 加一层 Config 把抽奖策略进行统一录入 配置完成后需要调用基础服务比如 repository 层，所以加一层基础支持 然后来一个抽象类，在这里实现接口的抽奖，抽奖接口里面写抽奖的流程，然后具体的方法交给子类实现 实现抽象类 测试","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/notes/xxx/day03.html"}],["meta",{"property":"og:site_name","content":"txy"}],["meta",{"property":"og:title","content":"Day03"}],["meta",{"property":"og:description","content":"day03 任务 [x] 模板模式处理抽奖流程 学习过程 因为之前没学过设计模式，先学一学模板模式，用到一种学一种，哈哈哈 先看一下整个抽奖流程 抽奖过程 了解了抽奖流程之后就开始写代码 先写对应的 dao 层 要查策略吧？写个策略的 Mapper 要查策略详情吧？写个策略详情的 Mapper 要查奖品吧？要减奖品库存吧？要查没库存的奖品吧？写个奖品的 Mapper 然后实现 repository 层 这里主要是调 Mapper 将结果进行聚合封装 使用模板模式设计抽奖过程代码 顶层接口规定抽奖的入参出参 加一层 Config 把抽奖策略进行统一录入 配置完成后需要调用基础服务比如 repository 层，所以加一层基础支持 然后来一个抽象类，在这里实现接口的抽奖，抽奖接口里面写抽奖的流程，然后具体的方法交给子类实现 实现抽象类 测试"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-04T13:04:31.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-04T13:04:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Day03\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-04T13:04:31.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"day03","slug":"day03","link":"#day03","children":[{"level":3,"title":"任务","slug":"任务","link":"#任务","children":[]},{"level":3,"title":"学习过程","slug":"学习过程","link":"#学习过程","children":[]},{"level":3,"title":"遇到的问题","slug":"遇到的问题","link":"#遇到的问题","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}]}],"git":{"createdTime":1738674271000,"updatedTime":1738674271000,"contributors":[{"name":"txy","email":"2434877135@qq.com","commits":1}]},"readingTime":{"minutes":39.64,"words":11893},"filePathRelative":"notes/xxx/day03.md","localizedDate":"2025年2月4日","excerpt":"<h2> day03</h2>\\n<h3> 任务</h3>\\n<ul>\\n<li>[x] 模板模式处理抽奖流程</li>\\n</ul>\\n<h3> 学习过程</h3>\\n<ol>\\n<li>\\n<p>因为之前没学过设计模式，先学一学模板模式，用到一种学一种，哈哈哈</p>\\n</li>\\n<li>\\n<p>先看一下整个抽奖流程</p>\\n<figure><figcaption>抽奖过程</figcaption></figure>\\n</li>\\n<li>\\n<p>了解了抽奖流程之后就开始写代码</p>\\n<ol>\\n<li>\\n<p>先写对应的 dao 层</p>\\n<ol>\\n<li>要查策略吧？写个策略的 Mapper</li>\\n<li>要查策略详情吧？写个策略详情的 Mapper</li>\\n<li>要查奖品吧？要减奖品库存吧？要查没库存的奖品吧？写个奖品的 Mapper</li>\\n</ol>\\n</li>\\n<li>\\n<p>然后实现 repository 层</p>\\n<p>这里主要是调 Mapper 将结果进行聚合封装</p>\\n</li>\\n<li>\\n<p>使用模板模式设计抽奖过程代码</p>\\n<ol>\\n<li>顶层接口规定抽奖的入参出参</li>\\n<li>加一层 Config 把抽奖策略进行统一录入</li>\\n<li>配置完成后需要调用基础服务比如 repository 层，所以加一层基础支持</li>\\n<li>然后来一个抽象类，在这里实现接口的抽奖，抽奖接口里面写抽奖的流程，然后具体的方法交给子类实现</li>\\n<li>实现抽象类</li>\\n</ol>\\n</li>\\n<li>\\n<p>测试</p>\\n</li>\\n</ol>\\n</li>\\n</ol>","autoDesc":true}');export{e as data};
