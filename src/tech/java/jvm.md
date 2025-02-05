---
title: JVM
date: 2023-02-12
index: false
icon: laptop-code
category:
  - JVM
tag:
  - JVM
  - 垃圾回收
  - Java内存模型
  - 类加载机制
  - JVM调优
---
# ·JVM
## 运行机制
源文件->编译器->字节码->JVM->机器码

1. Java源文件被编译器编译成字节码文件。
2. JVM的即时编译器将字节码文件编译成相应操作系统的机器码。【解释器不同虚拟机相同】
3. 机器码是靠调用相应操作系统的本地方法库执行相应的方法。
4. 一个进程对应一个java虚拟机实例。

## JVM包括什么？
包括类加载器，运行时数据区，执行引擎和本地接口库。

1. 类加载器：用于将字节码文件加载到JVM中。
2. 运行时数据区：用于存储JVM运行过程中产生的数据。
3. 执行引擎：
    1. 包括即时编译器JIT->将字节码编译成具体的机器码。
    2. 垃圾回收器：回收在运行过程中不再使用的对象。
4. 本地接口库JNI：调用本地方法库与操作系统交互。

# ·GC
GC就是垃圾回收，释放堆内存中那些不再被使用的对象的内存。

## 确定垃圾
### 引用计数法
特点：

1. 容易产生循环引用问题。

### 可达性分析法
实现：

1. 通过GC Roots Tracing实现。
2. 以GC Roots作为起点向下搜索。
3. 不可达的对象将作为垃圾被回收。

GC Roots：

1. 虚拟机栈中(局部变量表)的引用。
2. 本地方法栈中(JNI)的引用。
3. 方法区中的静态引用/常量引用。

## 垃圾回收算法
### 标记清除：CMS
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654780604063-258dd457-20df-445d-ab56-212d28359b80.png)

过程：

1. 标记阶段，对<font style="background-color:#DEE8FC;">可回收对象</font>进行标记；
2. 清除阶段，对标记的对象进行<font style="background-color:#DEE8FC;">清除</font>，释放它所占用的内存，并取消标记。

操作：

1. 把对象作为分块。
2. 把对象连接到“空闲链表”的单向链表上。
3. 之后对<font style="background-color:#DEE8FC;">新对象进行分配</font>只需要遍历这个空闲链表，就可以找到分块。

缺点：

1. 标记和清除效率不高。
2. 产生大量内存碎片，无法给大对象分配内存空间。

### 标记复制
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654780973077-6fbeff16-6778-4fe0-85b5-022d88c6a867.png)

过程：

1. 内存划分为大小相等的两块。
2. 新生成的对象放在区域1，然后当区域1满了，对区域1进行一次标记。
3. 存活的对象复制到另一块，然后把前一块内存空间进行一次清理。

特点：

1. 解决标记清除内存碎片问题。
2. 只使用了内存的一半。因为同一时刻只有1个内存区域可用。

例子：

1. HotSpot虚拟机的eden和survivor比例8:1:1，保证内存利用率90%。
2. minorGC：survivor from+eden存活的对象<font style="background-color:#DEE8FC;">放到to区</font>，然后survivor From和survivor To互换。
3. 如果to区放不下了，需要依靠老年代进行<font style="background-color:#DEE8FC;">空间分配担保</font>。
4. 也就是借用老年代的空间存储放不下的对象。

### 标记整理
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654780619813-80e02dd2-409c-4247-bea2-3c35380cbf3b.png)

过程：

1. 标记<font style="background-color:#DEE8FC;">可回收对象</font>。
2. 整理阶段：让存活的对象都向<font style="background-color:#DEE8FC;">一端移动</font>，然后直接清理掉边界以外的内存。

特点：

1. 结合了前两种。
2. 不会产生内存碎片。
3. 需要移动大量对象，处理效率比较低。

### 分代垃圾回收
背景：

1. 上述3种无法对所有类型的对象都进行垃圾回收。

定义：

1. JVM提出的针对不同对象类型。
2. 采取不同垃圾回收算法。

#### 分代
##### 新生代
定义：

1. 新生成的对象。

特点：

1. 对象数量多。
2. 生命周期短。

构成：

1. eden+survivor From+survivor To

##### 老年代
定义：

1. 存放大对象
2. 存放生命周期长的对象。

#### 过程
##### <font style="background-color:#FAE1EB;">MinorGC</font>
过程：

1. 大部分情况，对象在eden去分配。
2. 由于频繁创建对象，内存不足新生代就会触发MinorGC。
3. 在一次新生代垃圾回收后，eden和survivorFrom中的存活对象，放入survivorTo，对象的年龄增加。
4. 年龄增加到一定程度默认15岁，会被晋升到老年代。
5. 清除eden和survivorFrom中的对象。
6. survivorTo和suivivorFrom互换，原来在survivorTo成为下一次GC时的survivorFrom。

特点：

1. 频繁执行，执行速度也很快。

##### <font style="background-color:#FAE1EB;">FullGC</font>
定义：当minorGC后出现老年代且老年代空间不足时会触发MajorGC。

过程：

1. 标记清除算法。
2. 扫描所有对象+标记存活。
3. 清除未被标记的对象。

特点：

1. 耗时较长，很少执行。
2. 内存碎片。

触发：

1. 调用System.gc()，只是建议虚拟机执行，但虚拟机不一定真正去执行。
2. 老年代空间不足。
3. 空间分配担保失败。
4. Concurrent mode failure。执行CMS GC的过程中同时有对象要放入老年代，而此时老年代空间不足（可能是GC过程中浮动垃圾过多导致暂时性空间不足），便会报ConcurrentModeFailure错误，并触发FullGC。

## 四种引用类型
强引用：

定义：

1. 把一个对象赋值给一个引用变量时，这个引用变量就是强引用。

特点：

1.  java中最常见。
2. 一定是可达的，所以不会被垃圾回收。
3. 所以是造成内存泄漏的主要原因。

软引用：

定义：

1. 通过SoftReference类实现。

特点：

1. 在系统内存空间不足时被回收。

弱引用：

定义：

1. 通过WeakReference类实现。

特点：

1. 垃圾回收时一定会被回收。

虚引用：

定义：

1. 通过PhantomReference类实现。

作用：

1. 虚引用和引用队列联合使用。
2. 用于跟踪对象的垃圾回收状态。

## 垃圾回收器
### 分类
新生代：复制

1. Serial：单线程复制算法。
2. ParNew：多线程复制算法
3. Parallel Scavenge：多线程复制算法

老年代：标记清除/整理

1. CMS：多线程标记清除算法
2. Serial Old：单线程标记整理算法
3. Parallel Old：多线程标记整理算法

G1：多线程标记整理算法

### 并行
1. eden内存不足发生MinorGC，标记复制STW
2. old内存不足发生fullGC，标记整理STW
3. 注重吞吐量

### CMS
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654781671347-e3782038-9d3c-468c-8a3f-10c66835e367.png)

1. 初始标记：仅仅只是标记一下GCRoots能<font style="background-color:#D4EEFC;">直接关联</font>到的对象，速度很快，需要<font style="background-color:#D4EEFC;">停顿STW（暂停工作线程）</font>。
2. 并发标记：进行GCROOTsTracing的过程，整个回收过程<font style="background-color:#D4EEFC;">耗时</font>最长，<font style="background-color:#D4EEFC;">不需要停顿，</font>和用户线程<font style="background-color:#D4EEFC;">并发一起</font>执行。
3. 重新标记：并发标记过程中用户线程继续运行，导致一些对象标记<font style="background-color:#D4EEFC;">变化</font>，然后重新更新这些标记，需要<font style="background-color:#D4EEFC;">暂停工作线程</font>。
4. 并发清除：和用户线程<font style="background-color:#D4EEFC;">一起</font>执行，不需要停顿，执行清除GC Roots不可达对象。

并发标记和并发清除是和用户线程一起工作，缩短系统停顿时间。

缺点：

吞吐量低：<font style="background-color:#D4EEFC;">低停顿</font>是牺牲吞吐量为代价的，导致<font style="background-color:#D4EEFC;">CPU利用率不够高</font>。

浮动垃圾：4<font style="background-color:#D4EEFC;">并发清除</font>阶段由于用户线程继续运行可能会产生一定的垃圾，叫做<font style="background-color:#D4EEFC;">浮动垃圾</font>，这部分垃圾只能到<font style="background-color:#D4EEFC;">下一次</font>GC时才能进行回收。由于浮动垃圾的存在，需要<font style="background-color:#D4EEFC;">预留</font>出一部分内存，意味着CMS不能像其他收集器那样等待老年代快满的时候再回收。如果预留的内存不够存放浮动垃圾，就会出现Concurrent mode failure。

空间碎片：标记-清除算法导致空间碎片，往往出现空间有剩余但<font style="background-color:#D4EEFC;">无法找到足够大连续空间来分配对象</font>，不得不提前触发一次fullGC。

### G1
定义：

1. 将内存划分为大小固定的一些独立区域。
2. 每个区域都可以作为新生代和老年代。
3. 区域独立使用资源以及垃圾回收。
4. 维护优先级列表，根据系统允许的最长垃圾收集时间，优先回收垃圾最多的区域。

作用：

1. 避免全区域垃圾收集引起系统停顿。
2. 能够确保有限时间内获得最高的垃圾收集效率。

特点：

1. 基于标记整理算法，不产生内存碎片。
2. 可以控制停顿时间，既能够保证时间短，又能够保证收集的效率。

<font style="background-color:#E4F7D2;">RememberSet</font>

定义：

1. 用来记录每个区域对象的<font style="background-color:#FFE8E6;">引用对象</font>所在的区域。

作用：

1. 在做可达性分析时可以<font style="background-color:#FFE8E6;">避免</font>全堆扫描。
2. 尤其是老年代也存在一些GCROOT节点，但是老年代数据相对较多，如果遍历寻找会很耗时，可以通过RememberSet去找<font style="background-color:#FFE8E6;">引用的对象</font>节点。



![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654781897124-da755609-14ca-4576-afa7-b91d15bc0a02.png)

1. 初始标记：与CMS一样。仅仅只是标记一下GCRoots能<font style="background-color:#D4EEFC;">直接关联</font>到的对象，速度很快，需要<font style="background-color:#D4EEFC;">停顿STW</font>，<font style="background-color:#D4EEFC;">单线程</font>。
2. 并发标记：和CMS一样。进行GCROOTsTracing的过程，他在整个回收过程<font style="background-color:#D4EEFC;">耗时</font>最长，<font style="background-color:#D4EEFC;">不需要停顿</font>，<font style="background-color:#D4EEFC;">单线程</font>，和用户线程<font style="background-color:#D4EEFC;">并发</font>执行。
3. 最终标记：与CMS差不多，最终标记的区别在于虚拟机将在并发标记时标记变化对象<font style="background-color:#D4EEFC;">记录在</font>线程的RememberSetLogs里面，然后把RememberedSetLogs的数据<font style="background-color:#D4EEFC;">合并到</font>RememberSet中。这阶段需要STW，但是多线程执行最终标记。
4. 筛选回收：首先对各个区域的<font style="background-color:#D4EEFC;">回收价值</font>和<font style="background-color:#D4EEFC;">成本</font>进行排序，根据用户<font style="background-color:#D4EEFC;">期望</font>的GC<font style="background-color:#D4EEFC;">停顿时间</font>来指定回收计划。



YoungGC：

定义：

1. Eden区满了可能触发。
2. 会先去计算一下回收这个Eden区的时间。
3. 如果远远小于先前设定的期望停顿时间，说明现在Eden区太小了，垃圾并不多，不需要触发youngGC。
4. 会新增一些Eden区。直到计算的回收时间到达一定程度才会去真的触发youngGC。

MixGC：

定义：

1. 老年代所占<font style="background-color:#D4EEFC;">比例大于</font>等于设定的比例了，就会触发MixGC。
2. 会回收<font style="background-color:#D4EEFC;">所有的年轻代</font>和<font style="background-color:#D4EEFC;">部分老年代</font>。
3. <font style="background-color:#D4EEFC;">根据最大的停顿</font>时间，计算回收效益比，决定回收哪些区域。

特点：

1. 和CMS的Full GC类似。

FullGC：

<font style="background-color:#D4EEFC;">定义：</font>

1. 在进行复制算法的时候，没有更多的空间供你复制的时候，就会触发fullGC。

特点：

1.  整个程序停止。



### ZGC
1. JDK11引入的一个收集器。
2. 特点不采用分代回收的机制。
3. 使用了读屏障、染色指针和内存多重映射技术实现的。
4. 可并发+标记整理算法。

内存分布：区域叫做region，小型+中型+大型

染色指针：

1. 染色指针是一个指向对象的指针，存储一些额外的信息。
2. 比如通过指针上的一些标志位看到引用对象的状态。
3. 可以通过指针，在内存清除的时候能够立即释放内存。
4. 设置<font style="background-color:#FADB14;">内存屏障</font>可以记录对象引用的变更情况，这些信息可以记录在染色指针中。
5. 所以可以减少使用内存屏障的数量。
6. 通过染色指针记录信息、数据可以提高性能。



# ·Java内存模型
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654782622698-d29c6c36-d3dd-42d3-b8ae-98584e44608c.png)



jdk1.6：栈内存（本地方法栈、虚拟机栈、程序计数器）这部分也是线程私有的，线程共享的是包括堆内存，方法区（常量池）

jdk1.7：把字符串常量池搬到了堆中。

jdk1.8：取消了方法区，方法区变成了元空间，放在直接内存中。也是包括运行时常量池和类常量池。

注：静态对象1.8在堆中，早期在方法区。

## 栈区【私有】
### 程序计数器
定义：很小的内存空间。存储当前运行线程字节码运行到哪的行号。

作用：

1. 程序控制：解释器通过改变程序计数器读取字节码，实现代码的<font style="background-color:#D4EEFC;">流程控制</font>。顺序、选择、循环。
2. 线程切换：线程被<font style="background-color:#D4EEFC;">切换，</font>回来的时候能知道线程上次运行到哪了。

特征：

1. 程序计数器是唯一<font style="background-color:#D4EEFC;">不会</font>出现<font style="background-color:#D4EEFC;">OOM</font>的内存区域。
2. 是线程私有的，<font style="background-color:#D4EEFC;">生命周期</font>随线程的创建而创建，随线程的结束而死亡。

### 虚拟机栈
作用：描述java的方法的执行过程的内存区域。

过程：

1. 每个java<font style="background-color:#D4EEFC;">方法</font>在执行时会创建一个<font style="background-color:#D4EEFC;">栈帧</font>用于存储<font style="background-color:#D4EEFC;">局部变量表</font>，操作数栈，动态链接，方法出口等信息。
2. 方法<font style="background-color:#D4EEFC;">调用</font>直至执行完成，对应着一个栈帧在java虚拟机栈中<font style="background-color:#D4EEFC;">入栈</font>和<font style="background-color:#D4EEFC;">出栈</font>的过程。

存储的东西定义：

1. 局部变量表主要存放了编译器可知的基本数据类型数据（boolean，byte，char，short，int，float，long，double）、对象引用。
2. 操作数栈用于局部变量表中的数据做一些运算。

### 本地方法栈
作用：虚拟机栈为java方法服务；本地方法栈为native方法服务。

特点：和虚拟机栈发挥的作用相似。

## 【共享】
### 堆
定义：存放运行过程中创建的对象和产生的数据。

特点：

1. 存放几乎所有对象实例和数组。
2. 垃圾收集器进行垃圾回收的主要内存区域。

包括：

1. 新生代1/3+老年代2/3
2. 新生代=eden8/10+from survivor1/10+to survivor1/10

如何回收：

minorGC：

1. 大部分情况，对象在eden去分配。
2. 由于频繁创建对象，内存不足新生代就会触发MinorGC。
3. 在一次新生代垃圾回收后，eden和survivorFrom中的存活对象，放入survivorTo，对象的年龄增加。
4. 年龄增加到一定程度默认15岁，会被晋升到老年代。
5. 情况eden和survivorFrom中的对象。
6. survivorTo和suivivorFrom互换，原来在survivorTo成为下一次GC时的survivorFrom。

老年代的年龄阈值：-XX:MaxTenuringThreshold来设置。

MajorGC：

定义：当minorGC后出现老年代且老年代空间不足时会触发MajorGC。

过程：

1. 标记清除算法。
2. 扫描所有对象+标记存活。
3. 清除未被标记的对象。

特点：

1. 耗时较长。
2. 内存碎片。

### 方法区（永久代）
定义：

1. 存储运行时常量池；
2. 静态变量、类信息；
3. 存储常量；
4. 即时编译器编译后的机器码。

运行时常量池：

1. 是方法区的一部分，用于存放<font style="background-color:#E4F7D2;">编译器生成</font>的各种<font style="background-color:#E4F7D2;">字面量</font>和<font style="background-color:#E4F7D2;">符号引用</font>。
2. 受限于方法区内存，也会OOM。

<font style="background-color:#E4F7D2;">永久代的实现</font>从方法区替换为元空间：

1. 因为永久代的空间有限，大量使用字符串的场景下会导致OOM错误。
2. 永久代有一个jvm本身设定的固定大小上限，无法进行调整。而元空间使用的是直接内存，受本机可用内存的限制，并且永远不会OOM。可以使用-XX:MaxMetaspaceSize标志设置最大元空间大小。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654782913117-24777e19-1461-4163-a253-67125cd6e9be.png)



## 直接内存
定义：

1. 叫堆外内存，直接内存<font style="background-color:#D4EEFC;">并不是jvm</font>运行时数据区的一部分。

特点：

1. 这部分内存也会被频繁使用。
2. <font style="background-color:#D4EEFC;">可能导致OOM</font>Error异常出现，受本机总内存大小限制。
3. 大小不受java堆的限制。

比如：

1. jdk1.4中NIO类，基于通道Channel和缓存区Buffer的IO操作方式就是基于堆外内存实现的。
2. 它可以直接使用native函数本地方法库进行堆外内存分配。
3. 通过一个存储在java堆中的DirectByteBuffer对象作为这块内存的引用进行操作。

好处：

1. 避免了在java堆和内核之间来回复制数据。
2. 还能在一些场景中提高性能。

## 逃逸分析
结论：

1. java的对象不一定在堆上分配。

作用：

1. JVM通过逃逸分析，分析出一个对象的使用范围。
2. 并确定是否将这个对象分配在堆上。

过程：

1. 如果有些对象没有逃逸出方法，那么可能会被优化在栈上分配。

举例：

1. 对象<font style="background-color:#FADB14;">被赋值</font>给了一些<font style="background-color:#FADB14;">成员变量</font>，那么这个成员变量可能被外部的方法使用，此时变量发生了逃逸，只能在<font style="background-color:#FADB14;">堆</font>上分配。
2. 另一种场景就是对象通过<font style="background-color:#FADB14;">return语句</font>返回了对象，程序不能确定后续这个对象会不会<font style="background-color:#FADB14;">被使用</font>，外部的方法（线程）可能会<font style="background-color:#FADB14;">访问</font>到这个变量，也发生了逃逸。

```java
public class ObjectEscape {
    private User user;
    public void init() {
        user=new User();
    }
}

public class ObjectReturn {
    public User createUser() {
        User user=new User();
        return user;
    }
}
```

# ·类加载机制
定义：

1. 把字节码文件加载到JVM中。
2. 创建对应的Class对象。

## <font style="background-color:#D4EEFC;">加载</font>
过程：

1. 读取类的字节码文件<font style="background-color:#D4EEFC;">转换</font>成字节流存入方法区中。
2. 在堆中<font style="background-color:#D4EEFC;">创建</font>一个对应的Class对象。

特征：

1. 先加载父类，懒惰加载。

## 链接
### <font style="background-color:#D4EEFC;">验证</font>
定义：

1. 验证Class文件的规范性，是否符合当前虚拟机的要求。

验证内容：

1. 文件格式：是否符合Class文件字节流的规范。
2. 元数据验证：符合java语言规范。
3. 字节码验证：确保程序符合逻辑的。
4. 符号引用验证：确保解析动作能正确执行。

### <font style="background-color:#D4EEFC;">准备</font>
1. 为<font style="background-color:#D4EEFC;">类变量</font>初始化并赋值
2. （但是赋的值并不是用户期望的值，而是<font style="background-color:#D4EEFC;">默认</font>值）。
3. 但是对于<font style="background-color:#D4EEFC;">final</font>修饰的<font style="background-color:#D4EEFC;">static</font>变量会被初始化成<font style="background-color:#D4EEFC;">用户期望</font>的值。

### <font style="background-color:#D4EEFC;">解析</font>
1. 将<font style="background-color:#D4EEFC;">常量</font>池中的<font style="background-color:#D4EEFC;">符号引用</font>替换为<font style="background-color:#D4EEFC;">直接引用</font>的过程。
2. 符号引用：就是一个符号，而不指向真实的对象。
3. 直接引用：是指向真实的地址引用。

## <font style="background-color:#D4EEFC;">初始化</font>
1. 执行<font style="background-color:#D4EEFC;">静态代码块</font>，为静态变量<font style="background-color:#D4EEFC;">赋真实值</font>的过程。
2. 赋值有两种方式，一种是声明变量时直接赋值，一种是静态代码块赋值。



使用这个类会触发类的加载：几种方式

1. 创建类的实例，也就是<font style="background-color:#D4EEFC;">new</font>的方式
2. 访问某个类或接口的<font style="background-color:#D4EEFC;">静态变量</font>，或者对静态变量赋值。
3. 调用类的<font style="background-color:#D4EEFC;">静态方法</font>。
4. 反射(Class.forName())
5. 初始化某个类的子类，会<font style="background-color:#D4EEFC;">触发父类</font>的加载。
6. Java虚拟机启动时被标注为<font style="background-color:#D4EEFC;">启动类</font>的类，直接使用java.exe命令运行某个类。

调试工具：jhsdb.exe hsdb。

## 双亲委派
加载类的时候会优先委派<font style="background-color:#D4EEFC;">上级类加载器</font>对这个类进行加载，如果上级能够找到这个类，就由上级加载，上级对下级可见。否则就由<font style="background-color:#D4EEFC;">下级</font>加载，好处就是能优先<font style="background-color:#D4EEFC;">加载核心类</font>。

Jdk8中的类加载器：

1. Bootstrap Classloader: 启动类加载器，主要加载java的核心类库 java_home/jre/lib目录下jar和class
2. Extension classloader：扩展类加载器 java_home/jre/lib/ext下的jar和class
3. Application classloader: 当前应用的classpath下的所有类。
4. 再下面是用户自定义加载器。

举例：

1. 加载String.class 上到bootstrap classloader可以加载
2. 如果包名为java.开头会报错，抛出SecurityException。自定义类加载器也不行。
3. 如果包名java.lang，编译都通不过。

实现代码：loadClass方法

1. 先检查类是否已经被加载过
2. 如果没有加载调用父加载器的loadClass方法进行加载。
3. 如果父加载器失败，那么会调用自己的findClass方法进行加载



### 为什么用双亲委派？
1. 更安全，优先加载核心类。比如某些类只会由Bootstrap类加载器加载，加载的目录是lib下面的类，如果自己写一个重名的类那么是不会被加载。
2. 避免重复加载，当父亲已经加载了该类的时候，子类加载器就不会再加载一次。
3. 如果不使用这种委托模式，那我们就可以随时使用自定义的String来动态替代java核心api中定义的类型，这样会存在非常大的安全隐患。
4. 而双亲委派的方式，就可以避免这种情况。因为String已经在启动时就被引导类加载器（Bootstrcp ClassLoader）加载。
5. 所以用户自定义的ClassLoader永远也无法加载一个自己写的String，除非你改变JDK中ClassLoader搜索类的默认算法。

### 破坏双亲委派
1. 双亲委派实现是在loadClass方法里实现的。
2. 那么想要破坏双亲委派我们可以自定义一个类加载器，继承ClassLoader。
3. 重写里面的loadClass方法，让他不进行双亲委派。
4. 破坏双亲委派可以实现自定义类String的加载，但是包名不能是java.lang。可以是com.xxx.String.

### 如何自定义类加载器【不破坏双亲委派】
1. 我们继承ClassLoader。
2. 重写findClass方法，而不是覆盖loadClass方法。
3. 因为在loadClass方法中，如果父类加载器加载失败会调用findClass方法来完成加载。
4. 然后再findClass方法中实现自己的加载逻辑即可。

### 破坏双亲委派的例子
1. JNDI，JDBC等需要加载SPI接口实现类的情况。
    1. 比如JDBC用于创建数据库连接的代码。Connection conn=DriverManager.getConnection("jdbc://mysql://localhost:3306/mysql","root","1234");
    2. DriverManage是会Bootstrap类加载器加载的。
    3. 在类加载时，会执行类的静态方法。静态方法里会有一行代码，会去尝试加载classpath下面所有实现了Driver接口的实现类。
    4. 那么这些类是不能被bootstrap类加载器加载的。
    5. JDBC就引入ThreadContextClassLoad的方式破坏了双亲委派。
2. 实现热插拔热部署的工具。在代码启动后修改代码无需重启。实现方式就是连同类加载器一起换掉实现代码的热部署。比如idea中有一个插件jrable。
3. tomcat等web容器。
    1. tomcat部署可能需要部署多个应用。
    2. 就有一个问题，不同的应用可能依赖的jar包的版本是不同的，但是路径却是一样的。
    3. 如果采用默认的类加载机制，是无法加载多个相同的类。
    4. tomcat提供了一种隔离机制，为每个web容器单独提供了一个类加载器。webAppClassLoader。
    5. 优先加载web应用自己定义的类。也就是本目录下的class文件。
    6. 如果加载不到在交给上级类加载器加载。和双亲委派是相反的。

## 问题
### 1. JVM在搜索类时，如何判定两个class是相同的呢？
<font style="color:rgb(232,50,60);">JVM在判定两个class是否相同时，不仅要判断两个类名是否相同，而且要判断是否由同一个类加载器实例加载的。</font>只有两者同时满足的情况下，JVM才认为这两个class是相同的。就算两个class是同一份class字节码，如果被两个不同的ClassLoader实例所加载，JVM也会认为它们是两个不同class。比如网络上的一个Java类org.classloader.simple.NetClassLoaderSimple，javac编译之后生成一个字节码文件NetClassLoaderSimple.class，假如ClassLoaderA和ClassLoaderB这两个类加载器分别读取了NetClassLoaderSimple.class文件，并分别定义出了java.lang.Class实例来表示这个类，对于JVM来说，它们是两个不同的实例对象，但它们确实是同一份字节码文件，如果试图将这个Class实例生成具体的对象进行转换时，就会抛运行时异常java.lang.ClassCaseException，提示这是两个不同的类型。

# ·JVM参数/泄漏/调优
## JVM内存参数
-Xmx最大分配的堆内存大小，  Java Heap 最大值，默认值为物理内存的1/4 ；

-Xms初始化的堆大小，Java Heap 初始值，设置这两个成相同大小，避免在程序运行时堆不够用时要动态扩展，并且尽可能的使用最大的堆大小，可以减少GC时间。  
-Xmn    Java Heap Young 区大小，不熟悉最好保留默认值；  
-Xss      每个线程的Stack 大小，不熟悉最好保留默认值；  
-XX:PermSize ：设定内存的永久保存区域；  
-XX:MaxPermSize ：设定最大内存的永久保存区域；  
-XX:PermSize ：设定内存的永久保存区域；  
-XX:NewSize ：设置JVM 堆的‘新生代’的默认大小；  
-XX:MaxNewSize ：设置JVM 堆的‘新生代’的最大大小；

-XX:PretenureSizeThreshold:当对象大于某一个值时直接放入老年代，减少了新生代和老年代之间的复制操作，一般设置为和数据集差不多的大小。因为由数据集在整个程序生命周期中基本都会用到的，直到最后的测试评估。



-XX:-UseBiasedLocking=false对于多并发访问的代码块，关闭对象的偏向锁，这样程序里边同步代码块里边的偏向锁就被关闭了，减少了性能的损耗。

## 内存泄漏
1、静态集合类，如hashmap、linkedlist等等。如果这些容器为静态的，那么它们的生命周期与程序一致，则容器中的对象在程序结束之前将不能被释放，从而造成内存泄漏。简单而言，长生命周期的对象持有短生命周期对象的引用，尽管短生命周期的对象不再使用，但是因为长生命周期对象持有它的引用而导致不能被回收。

2、各种连接，如数据库连接、网络连接和IO连接等。在对数据库进行操作的过程中，首先需要建立与数据库的连接，当不再使用时，需要调用close()方法来释放与数据库的连接。只有连接被关闭后，垃圾回收器才会回收对应的对象。否则，如果在访问数据库的过程中，对Connection、Statement或ResultSet不显性的关闭，将会造成大量的对象无法被回收，从而引起内存泄漏。

3、变量不合理的作用域。一般而言，一个变量的定义的作用范围大于其适用范围，很有可能会造成内存泄漏，另一方面，如果没有及时把对象设置为null，很有可能导致内存泄漏的发生。

4、内部类持有外部类，如果一个外部类的实例对象的方法返回了一个内部类的实例对象，这个内部类对象被长期引用了，即使那个外部类实例对象不再被使用，但由于内部类持有外部类的实例对象，这个外部类对象将不会被垃圾回收，这也会造成内存泄漏。

5、改变哈希值。当一个对象被存储进hashset集合中以后，就不能修改这个对象中的那些参与计算哈希值的字段了，否则，对象修改后的哈希值与最初存储进hashset集合中时的哈希值就不同了，在这种情况下，即使contains方法使用该对象的当前引用作为的参数去HashSet集合中检索对象，也将返回找不到对象的结果，这也会导致无法从HashSet集合中单独删除当前对象，造成内存泄漏。

7、缓存泄漏。内存泄漏的另一个常见来源是缓存，一旦你把对象引用放入到缓存中，他就很容易遗忘，对于这个问题，可以使用WeakHashMap代表缓存，此种Map的特点是，当除了自身有对key的引用外，此key没有其他引用那么此map会自动丢弃此值。

## JVM调优
对于还在正常运行的系统

1. 可以使用<font style="background-color:#D4EEFC;">jmap</font>来查看JVM中<font style="background-color:#D4EEFC;">各个区域</font>的使用情况。

通过jmap命令查看堆中对象jmap -histo:live 7869 | head -20定位前20个

2. 可以通过<font style="background-color:#D4EEFC;">jstack</font>查看<font style="background-color:#D4EEFC;">线程的运行</font>情况，比如哪些线程<font style="background-color:#D4EEFC;">阻塞</font>，是否出现了<font style="background-color:#D4EEFC;">死锁</font>

Jstack -l 26045 > ./26045.stack

Cat 26045.stack | grep ‘65be’ -C 20

3. 可以通过<font style="background-color:#D4EEFC;">jstat</font>命令查看<font style="background-color:#D4EEFC;">垃圾回收</font>的情况，特别是fullgc，如果发现fullgc比较频繁，那么就得进行调优了

4. 通过各个命令的结果，或者<font style="background-color:#D4EEFC;">JVisualVM</font>等工具来进行分析

5. 首先，初步猜测频繁发送fullgc的原因，如果<font style="background-color:#D4EEFC;">频繁发生fullgc</font>但是又一直<font style="background-color:#D4EEFC;">没有出现内存溢出</font>，那么表示fullgc实际上是回收了很多对象了，所以这些对象最好能在younggc过程中就直接回收掉，避免这些对象进入老年代，对于这种情况，就要考虑这些存活时间不长的对象是不是比较大，导致年轻代放不下，直接进入到了老年代，<font style="background-color:#D4EEFC;">尝试加大年轻代的大小</font>，如果改完之后，fullgc减少，则证明修改有效。

6. 同时，还可以找到占用cpu最多的线程，定位到具体的方法，优化这个方法的执行，看是否能避免某些对象的创建，从而节省内存。

对于已经发生了OOM的系统：

1. 一般生产系统中都会设置当系统发生了OOM，生成当时的dump文件（-X +HeapDumpOnOutOfMemoryError-XXHeapDumpPath=/usr/local/base）

2. 我们可以利用<font style="background-color:#D4EEFC;">JVisualVM</font>等工具来分析<font style="background-color:#D4EEFC;">dump文件</font>

3. 根据dump文件找到<font style="background-color:#D4EEFC;">异常的实例对象</font>和<font style="background-color:#D4EEFC;">异常的线程</font>（占用CPU高），<font style="background-color:#D4EEFC;">定位</font>到具体的<font style="background-color:#D4EEFC;">代码</font>

4. 然后在进行详细的<font style="background-color:#D4EEFC;">分析</font>和<font style="background-color:#D4EEFC;">调试</font>

总之，调优不是一蹴而就的，需要分析、推理、实践、总结、再分析、最终定位到具体的问题。

cpu100%

1. top找到占用率高的进程
2. top -Hp pid找到CPU占用高的线程ID
3. 线程id转换为16进制，printf "0x%x\n" 958，得到0X3be
4. 通过命令jstack 163 | grep '0x3be' -C5 --color或者jstack 163 | vim +0x3be-

























