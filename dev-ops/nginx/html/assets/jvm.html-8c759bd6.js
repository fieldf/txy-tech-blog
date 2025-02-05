const l=JSON.parse('{"key":"v-20ba25b6","path":"/tech/java/jvm.html","title":"JVM","lang":"zh-CN","frontmatter":{"title":"JVM","date":"2023-02-12T00:00:00.000Z","index":false,"icon":"laptop-code","category":["JVM"],"tag":["JVM","垃圾回收","Java内存模型","类加载机制","JVM调优"],"description":"·JVM 运行机制 源文件-&gt;编译器-&gt;字节码-&gt;JVM-&gt;机器码 Java源文件被编译器编译成字节码文件。 JVM的即时编译器将字节码文件编译成相应操作系统的机器码。【解释器不同虚拟机相同】 机器码是靠调用相应操作系统的本地方法库执行相应的方法。 一个进程对应一个java虚拟机实例。 JVM包括什么？ 包括类加载器，运行时数据区，执行引擎和本地接口库。 类加载器：用于将字节码文件加载到JVM中。 运行时数据区：用于存储JVM运行过程中产生的数据。 执行引擎： 包括即时编译器JIT-&gt;将字节码编译成具体的机器码。 垃圾回收器：回收在运行过程中不再使用的对象。 本地接口库JNI：调用本地方法库与操作系统交互。","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/tech/java/jvm.html"}],["meta",{"property":"og:site_name","content":"txy"}],["meta",{"property":"og:title","content":"JVM"}],["meta",{"property":"og:description","content":"·JVM 运行机制 源文件-&gt;编译器-&gt;字节码-&gt;JVM-&gt;机器码 Java源文件被编译器编译成字节码文件。 JVM的即时编译器将字节码文件编译成相应操作系统的机器码。【解释器不同虚拟机相同】 机器码是靠调用相应操作系统的本地方法库执行相应的方法。 一个进程对应一个java虚拟机实例。 JVM包括什么？ 包括类加载器，运行时数据区，执行引擎和本地接口库。 类加载器：用于将字节码文件加载到JVM中。 运行时数据区：用于存储JVM运行过程中产生的数据。 执行引擎： 包括即时编译器JIT-&gt;将字节码编译成具体的机器码。 垃圾回收器：回收在运行过程中不再使用的对象。 本地接口库JNI：调用本地方法库与操作系统交互。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"垃圾回收"}],["meta",{"property":"article:tag","content":"Java内存模型"}],["meta",{"property":"article:tag","content":"类加载机制"}],["meta",{"property":"article:tag","content":"JVM调优"}],["meta",{"property":"article:published_time","content":"2023-02-12T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JVM\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-12T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[{"level":2,"title":"运行机制","slug":"运行机制","link":"#运行机制","children":[]},{"level":2,"title":"JVM包括什么？","slug":"jvm包括什么","link":"#jvm包括什么","children":[]},{"level":2,"title":"确定垃圾","slug":"确定垃圾","link":"#确定垃圾","children":[{"level":3,"title":"引用计数法","slug":"引用计数法","link":"#引用计数法","children":[]},{"level":3,"title":"可达性分析法","slug":"可达性分析法","link":"#可达性分析法","children":[]}]},{"level":2,"title":"垃圾回收算法","slug":"垃圾回收算法","link":"#垃圾回收算法","children":[{"level":3,"title":"标记清除：CMS","slug":"标记清除-cms","link":"#标记清除-cms","children":[]},{"level":3,"title":"标记复制","slug":"标记复制","link":"#标记复制","children":[]},{"level":3,"title":"标记整理","slug":"标记整理","link":"#标记整理","children":[]},{"level":3,"title":"分代垃圾回收","slug":"分代垃圾回收","link":"#分代垃圾回收","children":[]}]},{"level":2,"title":"四种引用类型","slug":"四种引用类型","link":"#四种引用类型","children":[]},{"level":2,"title":"垃圾回收器","slug":"垃圾回收器","link":"#垃圾回收器","children":[{"level":3,"title":"分类","slug":"分类","link":"#分类","children":[]},{"level":3,"title":"并行","slug":"并行","link":"#并行","children":[]},{"level":3,"title":"CMS","slug":"cms","link":"#cms","children":[]},{"level":3,"title":"G1","slug":"g1","link":"#g1","children":[]},{"level":3,"title":"ZGC","slug":"zgc","link":"#zgc","children":[]}]},{"level":2,"title":"栈区【私有】","slug":"栈区【私有】","link":"#栈区【私有】","children":[{"level":3,"title":"程序计数器","slug":"程序计数器","link":"#程序计数器","children":[]},{"level":3,"title":"虚拟机栈","slug":"虚拟机栈","link":"#虚拟机栈","children":[]},{"level":3,"title":"本地方法栈","slug":"本地方法栈","link":"#本地方法栈","children":[]}]},{"level":2,"title":"【共享】","slug":"【共享】","link":"#【共享】","children":[{"level":3,"title":"堆","slug":"堆","link":"#堆","children":[]},{"level":3,"title":"方法区（永久代）","slug":"方法区-永久代","link":"#方法区-永久代","children":[]}]},{"level":2,"title":"直接内存","slug":"直接内存","link":"#直接内存","children":[]},{"level":2,"title":"逃逸分析","slug":"逃逸分析","link":"#逃逸分析","children":[]},{"level":2,"title":"加载","slug":"加载","link":"#加载","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[{"level":3,"title":"验证","slug":"验证","link":"#验证","children":[]},{"level":3,"title":"准备","slug":"准备","link":"#准备","children":[]},{"level":3,"title":"解析","slug":"解析","link":"#解析","children":[]}]},{"level":2,"title":"初始化","slug":"初始化","link":"#初始化","children":[]},{"level":2,"title":"双亲委派","slug":"双亲委派","link":"#双亲委派","children":[{"level":3,"title":"为什么用双亲委派？","slug":"为什么用双亲委派","link":"#为什么用双亲委派","children":[]},{"level":3,"title":"破坏双亲委派","slug":"破坏双亲委派","link":"#破坏双亲委派","children":[]},{"level":3,"title":"如何自定义类加载器【不破坏双亲委派】","slug":"如何自定义类加载器【不破坏双亲委派】","link":"#如何自定义类加载器【不破坏双亲委派】","children":[]},{"level":3,"title":"破坏双亲委派的例子","slug":"破坏双亲委派的例子","link":"#破坏双亲委派的例子","children":[]}]},{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[{"level":3,"title":"1. JVM在搜索类时，如何判定两个class是相同的呢？","slug":"_1-jvm在搜索类时-如何判定两个class是相同的呢","link":"#_1-jvm在搜索类时-如何判定两个class是相同的呢","children":[]}]},{"level":2,"title":"JVM内存参数","slug":"jvm内存参数","link":"#jvm内存参数","children":[]},{"level":2,"title":"内存泄漏","slug":"内存泄漏","link":"#内存泄漏","children":[]},{"level":2,"title":"JVM调优","slug":"jvm调优","link":"#jvm调优","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":27.82,"words":8347},"filePathRelative":"tech/java/jvm.md","localizedDate":"2023年2月12日","excerpt":"<h1> ·JVM</h1>\\n<h2> 运行机制</h2>\\n<p>源文件-&gt;编译器-&gt;字节码-&gt;JVM-&gt;机器码</p>\\n<ol>\\n<li>Java源文件被编译器编译成字节码文件。</li>\\n<li>JVM的即时编译器将字节码文件编译成相应操作系统的机器码。【解释器不同虚拟机相同】</li>\\n<li>机器码是靠调用相应操作系统的本地方法库执行相应的方法。</li>\\n<li>一个进程对应一个java虚拟机实例。</li>\\n</ol>\\n<h2> JVM包括什么？</h2>\\n<p>包括类加载器，运行时数据区，执行引擎和本地接口库。</p>\\n<ol>\\n<li>类加载器：用于将字节码文件加载到JVM中。</li>\\n<li>运行时数据区：用于存储JVM运行过程中产生的数据。</li>\\n<li>执行引擎：\\n<ol>\\n<li>包括即时编译器JIT-&gt;将字节码编译成具体的机器码。</li>\\n<li>垃圾回收器：回收在运行过程中不再使用的对象。</li>\\n</ol>\\n</li>\\n<li>本地接口库JNI：调用本地方法库与操作系统交互。</li>\\n</ol>","autoDesc":true}');export{l as data};
