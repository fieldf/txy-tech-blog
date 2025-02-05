const l=JSON.parse('{"key":"v-06a868e4","path":"/tech/database/redis2.html","title":"Redis(下)","lang":"zh-CN","frontmatter":{"title":"Redis(下)","date":"2023-02-12T00:00:00.000Z","index":false,"icon":"laptop-code","category":["Redis"],"tag":["数据类型","哨兵模式","redis集群"],"description":"入门 nosql not only sql 问题： 关系型数据库难以对付高并发 特点： 方便扩展 大数据量、高性能 数据类型多样 关系型 结构化 SQL 数据和关系单独的表中 一致性 事务 nosql 没有固定查询语句 键值对、列存储、文档存储、图形数据库 最终一致性 CAP定理和BASE（异地多活） 高性能、高可用、高扩展 分类 KV键值对：redis 文档型数据库 mongodb（bson和json一样） 基于分布式文件存储 列存储数据库 HBase 分布式文件系统 图关系数据库 放的是关系，比如朋友圈社交网络、广告推荐 neo4j、infogrid","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/tech/database/redis2.html"}],["meta",{"property":"og:site_name","content":"txy"}],["meta",{"property":"og:title","content":"Redis(下)"}],["meta",{"property":"og:description","content":"入门 nosql not only sql 问题： 关系型数据库难以对付高并发 特点： 方便扩展 大数据量、高性能 数据类型多样 关系型 结构化 SQL 数据和关系单独的表中 一致性 事务 nosql 没有固定查询语句 键值对、列存储、文档存储、图形数据库 最终一致性 CAP定理和BASE（异地多活） 高性能、高可用、高扩展 分类 KV键值对：redis 文档型数据库 mongodb（bson和json一样） 基于分布式文件存储 列存储数据库 HBase 分布式文件系统 图关系数据库 放的是关系，比如朋友圈社交网络、广告推荐 neo4j、infogrid"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"数据类型"}],["meta",{"property":"article:tag","content":"哨兵模式"}],["meta",{"property":"article:tag","content":"redis集群"}],["meta",{"property":"article:published_time","content":"2023-02-12T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis(下)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-12T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[{"level":2,"title":"下载","slug":"下载","link":"#下载","children":[]},{"level":2,"title":"性能测试","slug":"性能测试","link":"#性能测试","children":[]},{"level":2,"title":"单线程为什么快","slug":"单线程为什么快","link":"#单线程为什么快","children":[]},{"level":2,"title":"五大数据类型","slug":"五大数据类型","link":"#五大数据类型","children":[{"level":3,"title":"string","slug":"string","link":"#string","children":[]},{"level":3,"title":"list","slug":"list","link":"#list","children":[]},{"level":3,"title":"set","slug":"set","link":"#set","children":[]},{"level":3,"title":"hash","slug":"hash","link":"#hash","children":[]},{"level":3,"title":"zset","slug":"zset","link":"#zset","children":[]}]},{"level":2,"title":"三种特征数据类型","slug":"三种特征数据类型","link":"#三种特征数据类型","children":[{"level":3,"title":"geospatial","slug":"geospatial","link":"#geospatial","children":[]},{"level":3,"title":"hyperloglog","slug":"hyperloglog","link":"#hyperloglog","children":[]},{"level":3,"title":"bitmap位图","slug":"bitmap位图","link":"#bitmap位图","children":[]}]},{"level":2,"title":"监视watch","slug":"监视watch","link":"#监视watch","children":[]},{"level":2,"title":"jedis","slug":"jedis","link":"#jedis","children":[]},{"level":2,"title":"springboot整合redis","slug":"springboot整合redis","link":"#springboot整合redis","children":[]},{"level":2,"title":"持久化","slug":"持久化","link":"#持久化","children":[]},{"level":2,"title":"持久化","slug":"持久化-1","link":"#持久化-1","children":[{"level":3,"title":"RDB","slug":"rdb","link":"#rdb","children":[]},{"level":3,"title":"AOF","slug":"aof","link":"#aof","children":[]}]},{"level":2,"title":"哈希槽","slug":"哈希槽","link":"#哈希槽","children":[]},{"level":2,"title":"集群搭建","slug":"集群搭建","link":"#集群搭建","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":18.99,"words":5698},"filePathRelative":"tech/database/redis2.md","localizedDate":"2023年2月12日","excerpt":"<h1> 入门</h1>\\n<p>nosql</p>\\n<ol>\\n<li>not only sql</li>\\n<li>问题：\\n<ol>\\n<li>关系型数据库难以对付高并发</li>\\n</ol>\\n</li>\\n<li>特点：\\n<ol>\\n<li>方便扩展</li>\\n<li>大数据量、高性能</li>\\n<li>数据类型多样</li>\\n</ol>\\n</li>\\n<li>关系型\\n<ol>\\n<li>结构化</li>\\n<li>SQL</li>\\n<li>数据和关系单独的表中</li>\\n<li>一致性</li>\\n<li>事务</li>\\n</ol>\\n</li>\\n<li>nosql\\n<ol>\\n<li>没有固定查询语句</li>\\n<li>键值对、列存储、文档存储、图形数据库</li>\\n<li>最终一致性</li>\\n<li>CAP定理和BASE（异地多活）</li>\\n<li>高性能、高可用、高扩展</li>\\n</ol>\\n</li>\\n<li>分类\\n<ol>\\n<li>KV键值对：redis</li>\\n<li>文档型数据库\\n<ol>\\n<li>mongodb（bson和json一样）\\n<ol>\\n<li>基于分布式文件存储</li>\\n</ol>\\n</li>\\n</ol>\\n</li>\\n<li>列存储数据库\\n<ol>\\n<li>HBase</li>\\n<li>分布式文件系统</li>\\n</ol>\\n</li>\\n<li>图关系数据库\\n<ol>\\n<li>放的是关系，比如朋友圈社交网络、广告推荐\\n<ol>\\n<li>neo4j、infogrid</li>\\n</ol>\\n</li>\\n</ol>\\n</li>\\n</ol>\\n</li>\\n</ol>","autoDesc":true}');export{l as data};
