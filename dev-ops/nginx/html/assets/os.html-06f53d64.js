const e=JSON.parse('{"key":"v-241ad394","path":"/tech/basic/os.html","title":"操作系统","lang":"zh-CN","frontmatter":{"title":"操作系统","date":"2023-02-12T00:00:00.000Z","index":false,"icon":"laptop-code","category":["操作系统","计算机基础"],"tag":["内存管理","进程与线程","IO模型","CPU","零拷贝"],"description":"内存 虚拟内存 虚拟内存，就是虚拟出来的内存，可以把外存当做内存来使用，是为了解决程序运行时内存不足的问题。 每个程序拥有地址空间，也就是虚拟内存地址。在编译期间，为变量一个虚拟地址。虚拟地址空间被分成多个固定大小的。物理空间也就是内存空间，被分成大小相同的页。在运行期间，内存管理单元MMU，用于获取虚拟地址对应的物理地址，是通过内存中的获取虚拟地址对应的实际内存物理地址，但是这个时候如果变量还物理地址，MMU就会它对应的物理地址是什么，此时发生了。需要为它在内存上分配一块物理地址，并将该地址供以后使用。发生缺页中断时，若物理内存空间，需要将物理空间中的一部分数据和磁盘对换来腾出空间，称为页面置换，根据换出页面的不同有不同的页面置换算法。","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/tech/basic/os.html"}],["meta",{"property":"og:site_name","content":"txy"}],["meta",{"property":"og:title","content":"操作系统"}],["meta",{"property":"og:description","content":"内存 虚拟内存 虚拟内存，就是虚拟出来的内存，可以把外存当做内存来使用，是为了解决程序运行时内存不足的问题。 每个程序拥有地址空间，也就是虚拟内存地址。在编译期间，为变量一个虚拟地址。虚拟地址空间被分成多个固定大小的。物理空间也就是内存空间，被分成大小相同的页。在运行期间，内存管理单元MMU，用于获取虚拟地址对应的物理地址，是通过内存中的获取虚拟地址对应的实际内存物理地址，但是这个时候如果变量还物理地址，MMU就会它对应的物理地址是什么，此时发生了。需要为它在内存上分配一块物理地址，并将该地址供以后使用。发生缺页中断时，若物理内存空间，需要将物理空间中的一部分数据和磁盘对换来腾出空间，称为页面置换，根据换出页面的不同有不同的页面置换算法。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"内存管理"}],["meta",{"property":"article:tag","content":"进程与线程"}],["meta",{"property":"article:tag","content":"IO模型"}],["meta",{"property":"article:tag","content":"CPU"}],["meta",{"property":"article:tag","content":"零拷贝"}],["meta",{"property":"article:published_time","content":"2023-02-12T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"操作系统\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-12T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[]}"]]},"headers":[{"level":2,"title":"虚拟内存","slug":"虚拟内存","link":"#虚拟内存","children":[{"level":3,"title":"分页分段","slug":"分页分段","link":"#分页分段","children":[]},{"level":3,"title":"页面置换算法","slug":"页面置换算法","link":"#页面置换算法","children":[]}]},{"level":2,"title":"OS程序内存结构","slug":"os程序内存结构","link":"#os程序内存结构","children":[]},{"level":2,"title":"进程状态","slug":"进程状态","link":"#进程状态","children":[{"level":3,"title":"进程状态的切换（生命周期）","slug":"进程状态的切换-生命周期","link":"#进程状态的切换-生命周期","children":[]},{"level":3,"title":"进程终止方式","slug":"进程终止方式","link":"#进程终止方式","children":[]}]},{"level":2,"title":"进程和线程的区别？","slug":"进程和线程的区别","link":"#进程和线程的区别","children":[{"level":3,"title":"区别","slug":"区别","link":"#区别","children":[]},{"level":3,"title":"上下文切换","slug":"上下文切换","link":"#上下文切换","children":[]},{"level":3,"title":"用户态、内核态","slug":"用户态、内核态","link":"#用户态、内核态","children":[]}]},{"level":2,"title":"进程通信","slug":"进程通信","link":"#进程通信","children":[]},{"level":2,"title":"进程调度算法","slug":"进程调度算法","link":"#进程调度算法","children":[]},{"level":2,"title":"死锁","slug":"死锁","link":"#死锁","children":[]},{"level":2,"title":"IO模型","slug":"io模型","link":"#io模型","children":[{"level":3,"title":"阻塞IO","slug":"阻塞io","link":"#阻塞io","children":[]},{"level":3,"title":"非阻塞IO","slug":"非阻塞io","link":"#非阻塞io","children":[]},{"level":3,"title":"IO多路复用","slug":"io多路复用","link":"#io多路复用","children":[]},{"level":3,"title":"信号驱动IO模型","slug":"信号驱动io模型","link":"#信号驱动io模型","children":[]},{"level":3,"title":"异步IO","slug":"异步io","link":"#异步io","children":[]}]},{"level":2,"title":"Java","slug":"java","link":"#java","children":[{"level":3,"title":"Java.io","slug":"java-io","link":"#java-io","children":[]},{"level":3,"title":"Java NIO","slug":"java-nio","link":"#java-nio","children":[]}]},{"level":2,"title":"零拷贝","slug":"零拷贝","link":"#零拷贝","children":[{"level":3,"title":"传统IO流程","slug":"传统io流程","link":"#传统io流程","children":[]},{"level":3,"title":"Mmap+write实现的零拷贝","slug":"mmap-write实现的零拷贝","link":"#mmap-write实现的零拷贝","children":[]},{"level":3,"title":"Sendfile实现的零拷贝","slug":"sendfile实现的零拷贝","link":"#sendfile实现的零拷贝","children":[]},{"level":3,"title":"sendFile linux2.4","slug":"sendfile-linux2-4","link":"#sendfile-linux2-4","children":[]}]},{"level":2,"title":"DMA","slug":"dma","link":"#dma","children":[]},{"level":2,"title":"中断","slug":"中断","link":"#中断","children":[{"level":3,"title":"缺页中断","slug":"缺页中断","link":"#缺页中断","children":[]},{"level":3,"title":"中断","slug":"中断-1","link":"#中断-1","children":[]}]},{"level":2,"title":"伪共享","slug":"伪共享","link":"#伪共享","children":[{"level":3,"title":"缓存行","slug":"缓存行","link":"#缓存行","children":[]},{"level":3,"title":"伪共享","slug":"伪共享-1","link":"#伪共享-1","children":[]},{"level":3,"title":"如何避免伪共享","slug":"如何避免伪共享","link":"#如何避免伪共享","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":29.51,"words":8854},"filePathRelative":"tech/basic/os.md","localizedDate":"2023年2月12日","excerpt":"<h1> 内存</h1>\\n<h2> 虚拟内存</h2>\\n<p>虚拟内存，就是虚拟出来的内存，可以把外存当做内存来使用，是为了解决程序运行时内存不足的问题。</p>\\n<p>每个程序拥有地址空间，也就是虚拟内存地址。在编译期间，为变量一个虚拟地址。虚拟地址空间被分成多个固定大小的。物理空间也就是内存空间，被分成大小相同的页。在运行期间，内存管理单元MMU，用于获取虚拟地址对应的物理地址，是通过内存中的获取虚拟地址对应的实际内存物理地址，但是这个时候如果变量还物理地址，MMU就会它对应的物理地址是什么，此时发生了。需要为它在内存上分配一块物理地址，并将该地址供以后使用。发生缺页中断时，若物理内存空间，需要将物理空间中的一部分数据和磁盘对换来腾出空间，称为页面置换，根据换出页面的不同有不同的页面置换算法。</p>","autoDesc":true}');export{e as data};
