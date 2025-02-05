---
title: Java基础
date: 2023-02-12
index: false
icon: laptop-code
category:
  - Java
tag:
  - Java集合
  - 序列化
  - 反射
  - 代理
  - 设计模式
---

# ·java集合
## <font style="background-color:#FFE8E6;">Set:接口 ：不可重复</font>
一、HashSet：HashMap实现、无序

实现：

1. 存的是散列值。
2. 按照元素的散列值来存取元素的。
3. 元素的散列值通过元素的hashCode方法计算得到。
4. hashCode相等，则接着通过equals方法比较。

特点：

1. 查找O(1)。
2. 无序。
3. iterator遍历得到的结果是不确定的。



二、TreeSet：二叉树实现

实现：

1. 基于二叉树实现。
2. 查找效率O(logN)。
3. 支持有序性存储。
4. 对元素按照指定的顺序升序、降序排序。

注意：

1. 存储自定义类，类要实现Comparable<>接口。重写compareTo方法。
2. Arrays.sort()，里面new Comparator<>() {compare方法}。



三、LinkedHashset：HashMap实现，双向链表记录顺序。

实现：

1. 底层使用LinkedHashMap。
2. 和HashSet相同。

特征：

1. 继承了HashSet。
2. 查找时间复杂度O(1)。
3. 按序存储。
4. 使用双向链表维护插入顺序。

## <font style="background-color:#FFE8E6;">List接口：可重复</font>
有3个实现类

一、Arraylist：基于动态数组实现，增删慢、查询快、不安全。

实现：

1. 基于数组实现。
2. 提供了增加add、删除remove和访问get功能。

特点：

1. 元素必须连续存储。
2. 在中间位置插入删除元素，需要将节点后的所有元素进行移动。
3. 不适合插入和删除，更适合查找和遍历。
4. 不需要在定义时指定数组长度。
5. 在数组长度不满足存储要求时，ArrayList会创建一个更大的数组并把已有的数组复制到新数组。

二、Vector：基于数组实现，增删慢、查询快、安全。

实现：

1. 基于数组实现。

特点：

1. 支持线程同步。
2. 同一时刻只能有一个线程对Vector进行写操作。增删改。
3. 但需要频繁加锁释放。
4. 读写效率比ArrayList低。

三、LinkedList：基于双向链表实现，增删快、查询慢、不安全。

实现：

1. 基于双向链表实现。

特点：

1. 插入删除时只需要改动指针，改动较小，因此效率较高。
2. 在进行随机访问时，需要从头结点遍历到该节点，速度很慢。
3. 提供了操作链表头和尾的操作，有时可以被当做栈和队列使用。

### list和set的区别
list和set都是继承自Collection接口。

list：元素有序，可以重复。查找效率高，增删稍差。

set：元素无序，不可重复。查找效率低，增删效率高。

### <font style="background-color:#FFE8E6;">Collection和Collections的区别</font>
Collection是一个接口，它的实现类有set和list，collections是一个包装类，里面有sort方法，可以对集合中的元素进行排序搜索等操作。

## <font style="background-color:#FFE8E6;">Map</font>
### hashmap
一、HashMap：数组+链表存储数据，线程不安全

结构：

1. 1.7 Entry数组，Entry有4个属性：key，value，hash值和next。

实现：

1. 基于键的hashcode值进行数据存取。
2. 1.7是数组+链表，1.8是数组+链表+红黑树。
3. 当链表元素超过一定个数的时候会转化成红黑树。

特点：

1. 快速更新和查询数据。
2. 遍历无法保证顺序。
3. key和value可以为null。
4. 非线程安全的。多个线程同时写可能导致数据不一致。
5. 如果需要线程安全可以使用Collections的synchronizedMap。或者ConcurrentHashMap。

查找：

1. 根据key的hash值定位到数组的下标，对链表进行遍历直到找到需要的数据。
2. 时间复杂度O(n)最差。
3. java8进行优化。元素超过8转为红黑树。O(logN)。

### concurrenthashmap
二、ConcurrentHashMap

实现：

1. 1.7采用分段锁，线程安全。
2. 多个segment组成，并发度=segment数量。默认16.
3. 每个Segment继承自ReentrantLock。
4. 每次加锁都是锁住一个Segment。
5. 1.8放弃了Segment。
6. 采用Synchronized+CAS实现。

### hashtable
三、HashTable

线程安全的。synchronized同步的，是遗留类，不应该使用它，可以使用concurrenthashmap。

### 其他
四、TreeMap

实现：

1. 基于二叉树

特点：

1. 保证元素有序存取。
2. 可以自定义排序比较器。



五、LinkedHashMap 继承HashMap、链表保存插入顺序

实现：

1. 双向链表实现。查找效率O(1)

特点：

1. 保证元素按序存取。
2. 用来实现LRU。

## <font style="background-color:#FFE8E6;">Queue</font>
priorityQueue：基于<font style="background-color:#FADB14;">堆结构</font>实现，可以用它来实现优先队列，默认是小顶堆。

ArrayDeque: 是Deque接口的一个实现，使用了<font style="background-color:#FADB14;">可变数组</font>，所以没有容量上的限制。可以作为栈来使用，效率高于Stack；也可以作为队列来使用，效率高于LinkedList。



ArrayBlockingQueue：基于数组实现的有界阻塞队列。ReentrantLock

LinkedBlockingQueue：基于链表实现的有界阻塞队列。

PriorityBlockingQueue：基于优先级排序的无界阻塞队列。

DelayQueue：支持延迟操作的无界阻塞队列。

SynchronousQueue：用于线程同步的阻塞队列。

LinkedTransferQueue：基于链表数据结构实现的无界阻塞队列。

LinkedBlockingDeque：基于链表实现的双向阻塞队列。



<font style="color:rgb(51,51,51);">阻塞功能可以平衡生产者和消费者两端的能力，当有任何一端速度过快时，阻塞队列便会把过快的速度给降下来。</font>

<font style="color:rgb(51,51,51);">支持阻塞的插入方法put: 队列满时，队列会阻塞插入元素的线程，直到队列不满。</font>

<font style="color:rgb(51,51,51);">支持阻塞的移除方法take: 队列空时，获取元素的线程会等待队列变为非空，再获取数据。</font>

## <font style="background-color:#FFE8E6;">线程安全集合类</font>
1. Hashtable、vector：遗留类
2. Collections.synchronizedList()：修饰的，和vector同步级别粒度的同步方法。
3. Juc包：
    1. CopyOnWrite：读不加锁，写加锁。（ArrayList有）
    2. concurrent
    3. Blocking



# ·ArrayList
## <font style="background-color:#E4F7D2;">add扩容</font>：
若没有给初始容量的时候，第一次<font style="background-color:#FADB14;">创建</font>得到一个空的列表。<font style="background-color:#FADB14;">添加</font>元素时使用ensureCapacityInternal()方法来保证容量足够，参数传递的是size+1，看一看当前的size能不能在<font style="background-color:#FADB14;">多放下一个</font>元素了，如果不能，需要使用grow()方法进行扩容，新容量的大小为oldCapacity+(oldCapacity>>1)，也就是旧容量的1.5倍，（1.8变成1.5倍+1，防止初始化容量为0导致扩不了容）元素小于10的时候容量就是10。

扩容操作需要调用<font style="background-color:#FADB14;">Arrays.copyOf()</font>把原数组整个复制<font style="background-color:#FADB14;">到</font>新数组中，申请一个新数组调用System.arraycopy，这个操作代价很高，因此最好在创建ArrayList对象时就指定大概的容量大小，减少扩容操作的次数。

```java
public boolean add(E e) {
	ensureCapacityInternal(size+1); //Increments modCount!!
	elementData[size++] = e;
	return true;
}
private void ensureCapacityInternal(int minCapacity) {
    if(elementData == EMPTY_ELEMENTDATA) {
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity); // minCapacity=size+1,比较默认容量16大还是插入一个元素后的size+1大，获取大的那个数。
    }
    ensureExplicitCapacity(minCapacity);
}

private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
    // overflow-conscious code
    if (minCapacity - elementData.length > 0) {
        grow(minCapacity); // 如果容量不够了，就扩容。	
    }
}

private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // 新容量=1.5x旧容量
    if(newCapacity - minCapacity < 0) {
    newCapacity = minCapacity;
    }
    if(newCapacity - MAX_ARRAY_SIZE > 0) // 如果扩容后大于允许的最大值
        NewCapacit = hugeCapacity(minCapacity); // 判断size+1是否小于0，是否大于允许的最大值MAX_ARRAY_SIZE
    elementData = Arrrays.copyOf(elementData, newCapacity)
}
private static int hugeCapacity(int minCapacity) {
    if(minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    return (minCapacity > MAX_ARRAY_SIZE) 
        ?Integer.MAX_VALUE :MAX_ARRAY_SIZE;
}
```



## <font style="background-color:#E4F7D2;">删除元素</font>
需要调用System.arraycopy()将index+1后面的元素都复制到index位置行，该操作的时间复杂度为O（N），可以看出ArrayList删除元素的代价是非常高的。

```java
public E remove(int index) {
    rangeCheck(index);
    modCount++;
    E oldValue = elementData(index);
    int numMoved = size - index - 1;
    if(numMoved > 0)
    System.arraycopy(elementData, index+1, elementData, index, numMoved);
    elementData[--size] = null; // clear to let GC do its work.
    return oldValue;
}
```



## <font style="background-color:#E4F7D2;">Fail-Fast</font>
Fail-fast: 遍历时并发修改抛ConcurrentModificationException。exceptiedMountCount

Fail-safe:CopyOnWriteArrayList,读多写少，读写分离。读的旧。

modCount用来记录arraylist<font style="background-color:#FADB14;">结构变化</font>的次数。结构发生变化指<font style="background-color:#FADB14;">添加</font>或者<font style="background-color:#FADB14;">删除</font>至少一个元素的所有操作，或者是调整内部数据的大小，仅仅只是设置元素的值不算结构发生变化。在迭代（iterator）或者序列化等操作时，需要比较操作前后modcount是否改变，看看modcount和exceptiedMountCount，期待的值是否一样。如果改变了抛concurrentmodificationexception。

<font style="background-color:#E4F7D2;">CopyOnWriteArrayList（ReentrantLock）</font>  
读写分离：

<font style="background-color:#FFEFD1;">写</font>操作需要加锁，在一个<font style="background-color:#FFEFD1;">复制</font>的数组上进行，写操作结束之后需要把原始数组<font style="background-color:#FFEFD1;">指向</font>新的复制数组。

<font style="background-color:#FFEFD1;">读</font>不加锁，在<font style="background-color:#FFEFD1;">原始</font>数组中进行，<font style="background-color:#FFEFD1;">读写分离</font>；写的同时允许读，提升读的性能，适合<font style="background-color:#FFEFD1;">读多写少</font>。

缺陷：

内存占用：写复制新数组，内存2倍，不适合内存少的用。  
数据不一致：读操作不能读取实时性数据，以及对实时性要求高的场景。

```java
public boolean add(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        Object[] elements = getArray();
        int len = elements.length;
        Object[] newElements = Arrays.copyOf(elements, len+1);
        new Elements[len] = e;
        setArray(newElemennts);
        return true;
    } finally {
        lock.unlock();
    }
}
```

## <font style="background-color:#E4F7D2;">序列化：</font>
ArrayList基于数组实现，并且具有动态扩容特性，因此可能存在一些null元素，比如开始分配元素数量为10但可能只存了1.2个元素，所以没必要全部进行序列化。  
保存元素的数组elementData用transient修饰，表示默认不被序列化。ArrayList自己实现了readObject()和writeObject()来实现只序列化数组中有元素填充的部分。  
<font style="color:#9254DE;">Private transient Object[] elementData;</font>  
序列化时需要使用ObjectOutputStream的writeObject()将对象转换为字节流并输出到文件。而writeObject(list)方法在<font style="background-color:#FADB14;">传入的对象</font>存在writeObject方法时，反射调用该<font style="background-color:#FADB14;">对象的writeObject()</font>来实现序列化。反序列化使用的是ObjectInputStream的readObject()方法，原理类似。

```java
File file = new File("object.txt");
ArrayList list = new ArrayList();
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file));
Oos.writeObject(list);
```

# ·HashMap
## <font style="background-color:#FFECE0;">结构：</font>
1.7 Entry数组+链表  
Transient Entry<K,V>[] table; entry包含四个字段，k，v，next，hash  
产生hash冲突使用拉链法解决，Hash相同存在同一个链表里。

1.8 Node数组+链表+红黑树（查找略逊色于AVL树，但是插入和删除优于AVL树，AVL为了维持平衡开销很大）

## <font style="background-color:#FFECE0;">put</font>
put操作首先计算桶下标，看对应位置是否为空。如果为空，创建Node节点占位。否则判断是TreeNode还是链表，添加元素put操作可能会导致扩容，如果链表节点大于8，如果容量小于64会先扩容。否则树化流程。最终判断是否超过阈值，若超过，扩容，首次put时，容量变为16。。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654783389479-bc077eb3-6aa5-44f1-b70a-857a51f13a82.png)

## <font style="background-color:#FFECE0;">为什么线程不安全？</font>
1. 并发put时，如果A发现对应位置没有元素，B也发现没有元素。把时间片分给B执行。再转换成A，那么A把Bput的元素覆盖了

2. jdk1.7时，扩容会导致元素搬迁，头插法可能会产生死链问题。



## <font style="background-color:#FFECE0;">Hashmap为什么用红黑树而不是B+树？</font>
红黑树<font style="background-color:#FADB14;">查询效率</font>比b+树高，通常红黑树用于存储<font style="background-color:#FADB14;">内存</font>中的数据，B+树用于存储<font style="background-color:#FADB14;">磁盘</font>中的数据。  
B+树在数据库中被应用的原因是B+树比B树更加矮胖，B+树非叶子节点不存储数据，所以每个节点存储的关键字更多，B+树更能应对大量数据的情况。  
Jdk中的hashmap本来是数组+链表的形式，链表查找慢，所以需要查找效率高的树结构来替换。  
如果用B+树，数据量不多的情况下，数据都会挤在一个节点里面，遍历效率退化成一个链表。



## <font style="background-color:#FFECE0;">为什么重载因子是0.75</font>
当负载因子是1时，也就意味着，当数组的8个值全部填充了，才会发生扩容。Hash冲突避免不了，意味着会出现大量的hash冲突，底层的红黑树变得异常复杂，对查询效率及其不利。这种情况就是牺牲了<font style="background-color:#FADB14;">时间</font>来保证空间的利用率。  
负载因子是0.5的时候，意味着数组中元素到1半就开始扩容，<font style="background-color:#FADB14;">空间</font>利用率大大降低。原本存储1M的数据，现在就意味着需要2M的空间。  
一句话就是负载因子太小，虽然时间效率提升了，但是空间利用率降低了。所以权衡时间和空间。



## <font style="background-color:#FFECE0;">为什么8转化为红黑树</font>
因为hashcode分布的随机性，满足泊松分布，根据概率统计，计算出链表中节点数是8的概率已经接近千分之一，比较低，尽量让他树化的概率小一些可以减轻维护红黑树压力。而且8也不算大，就算是链表从查询上来说也是可以接受的。

# ·ConcurrentHashMap
## <font style="background-color:#D3F5F0;">1.7</font>
### <font style="background-color:#D3F5F0;">结构</font>
1.7 Segment数组+HashEntry数组+链表：

ConcurrentHashMap采用了分段锁，segment继承于ReentrantLock，一个segment(16)对应一个锁。不会像hashtable那样不管put还是get都需要同步，并发度是segment数组的个数，一个线程占用锁访问一个segment时，不会影响其他的segment。

```java
// ConcurrentHashMap
final Segment<K,V>[] segments;
transient Set<K> keySet;
transient Set<Map.Entry<K,V>> entrySet;

// Segment是ConcurrentHashMap的一个内部类，主要组成如下：
static final class Segment<K,V> extends ReentrantLock implements Serializable {
    transient volatile HashEntry<K,V>[] table;
}
Static final class HashEntry<K,V> {
    final K key;
    volatile V value;
    volatile HashEntry<K,V> next;
}
// 和hashmap类似，区别就是value和链表是volatile修饰的，保证获取时的可见性。
```

### <font style="background-color:#D3F5F0;">Put流程：</font>
1. 计算hash值定位到segment，
2. 当前segment中有一个hashentry小数组，也是通过hashcode定位到hashentry。
3. 遍历该hashentry，如果不为空则判断传入的key和当前遍历的key是否相等，相等则覆盖旧的key。
4. 为空或者遍历没有相同key则创建一个hashentry并加入到segment中，同时会先判断是否需要扩容。
5. 最后解除锁。

### <font style="background-color:#D3F5F0;">Get逻辑：</font>
1. 将key通过hash值定位到具体的segment，再定位到具体的hashentry。因为hashentry的value值是用volatile修饰的，所以保证了内存的可见性，每次都能获取最新值。Concurrenthashmap的get方法非常高效，因为整个过程都不需要加锁。
2. 若头结点的hash码是负数，表示正在扩容，即forwardingnode，这也就是为什么不用锁也可以保证安全，根据forwardingnode中的find方法去到新的table中去找key。
3. 还有种情况，头结点hash码是负数还有可能是红黑树，那就去红黑树中找。
4. 都不是，那就遍历这个节点，找到key值相同就返回，找不到就返回null。



如果segment=16，计算segment下标，二哈的高四位。

如果小数组=2，计算小数组下标，二哈的低1位。

小数组扩容，segment不会扩容。



### <font style="background-color:#D3F5F0;">扩容：</font>
扩容过程: 元素个数超过容量3/4需要扩容，创建一个新的数组，node节点一个个搬迁过去，从后往前一个一个下标的处理。如果一节点处理过了，用forwardingnode表示已经处理过了，其他线程来处理的时候就不会处理这个节点了。还有用处，其他线程get这个节点就知道已经搬迁了，去新的table中去找。

扩容完成的链表头替换为forwardingnode



## <font style="background-color:#FFEFD1;">1.8</font>
### <font style="background-color:#FFEFD1;">结构：</font>
1.8 数组+链表+红黑树：抛弃了segment分段锁，一个数组头对应一个锁,cas+synchronized

Node数组，其中Node

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    volatile V val;
    volatile Node<K,V> next;
} 
// val和next都用了volatile保证可见性。
```



### <font style="background-color:#FFEFD1;">Put：</font>
1. 根据key计算出hashcode，计算出Node数组对应的位置
2. 判断是否需要进行初始化，
3. 如果定位的位置为空，则可以写入数据，利用CAS尝试写入，失败则自旋保证成功。
4. 如果当前位置的hashcode=MOVED=-1，则需要进行扩容
5. 如果都不满足，则利用synchronized锁写入数据。
6. 如果链表数量>Treeify_THRESHOLD则要转换为红黑树。



### <font style="background-color:#FFEFD1;">Get：</font>
1. 根据计算出来的hashcode寻址，如果在桶上则直接返回值。
2. 否则如果是红黑树就按照树的方式获取值，
3. 不是红黑树按照链表的方式遍历获取值。



1. 正在搬迁元素前面的元素，直接put

2. 正在搬迁的元素，阻塞了，没法获取锁

3. 搬迁完成的元素，帮忙搬迁。



# ·代理,反射(ioc/aop/事务)
## @Transactional注解
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1650684034287-59a3e47a-0599-44c5-bf1d-5d2649f1f149.png)

定义：

1. 使用了JDBC的事务来实现事务的。也就是事务还是基于数据库实现的。
2. 是一种声明式事务，还有编程式事务。

注意

1. 放在方法或类上，不能放在接口上。
2. 只有public是生效的。
3. 如果方法A，A中调用了另外的方法B，B是加了这个注解，那么外部调用方法A时，B的注解会失效。
4. 如果异常被捕获了，那么导致注解失效，出现异常也不会回滚。

## <font style="background-color:#FADB14;">ioc</font>
IoC是<font style="background-color:#FCFCCA;">控制反转</font>，通过IoC容器来帮助我们<font style="background-color:#FCFCCA;">实例化对象</font>，我们需要哪个对象，直接从IoC容器里面<font style="background-color:#FCFCCA;">拿</font>就行。

不需要我们创建对象，让IoC帮我们<font style="background-color:#FCFCCA;">管理</font>对象创建的事情。实际上就是个map(key,value)，map中存放的是各种对象。

IoC最常见的实现方式叫做<font style="background-color:#FCFCCA;">依赖注入</font>，Dependency Injection简称DI

<font style="background-color:#FCFCCA;">好处</font>：降低对象之间的耦合度。资源变得容易管理，Spring容器很容易就可以实现一个单例。



在没有IoC时Service层想要使用dao层的具体实现的话，需要通过new手动创建一个IUserDao的实现类UserDaoImpl（不能直接new接口类）。



<font style="background-color:#FCFCCA;">SpringIOC原理：</font>

+ 项目启动时读取xml文件中的bean配置路径
+ 通过Class.forName的方式进行类的加载，把class文件加载到jvm中，得到类对象
+ 然后可以通过反射的方式创建这个类的实例，放到spring容器中。
+ 项目运行过程中可以从容器中直接获取bean



## <font style="background-color:#FADB14;">Aop</font>
定义：

1. 面向切面编程，<font style="background-color:#FCFCCA;">不改变</font>程序源码的情况下，动态<font style="background-color:#FCFCCA;">增强方法</font>的功能。
2. 数据OOP面向对象编程的一种延续。
3. 在不改变原有业务逻辑的情况下，增强横切逻辑代码。
4. 作用可以实现<font style="background-color:#FCFCCA;">解耦合</font>，避免横切逻辑代码<font style="background-color:#FCFCCA;">重复</font>。

实现：

1. 可以在多个切点执行这样的切面逻辑，然后再执行本来的业务逻辑。
2. 能够解决某些继承不能解决的问题。
3. 继承更够解决大部分重复代码的问题，但是对于一个类中多个方法都有重复代码的问题就无法解决。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651830794263-8d7e9556-d43a-4f89-a3ee-908d3269f4d0.png)

原理：

1. AOP是通过动态代理实现的，

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1650684019969-6cc09c45-aacb-485d-87d8-1b1f799ef84c.png)

## <font style="background-color:#FADB14;">代理</font>
不改变类的情况下，对类的功能进行增强。

代理分为静态代理和动态代理：

### <font style="background-color:#E4F7D2;">静态代理</font>
被代理类是<font style="background-color:#DEE8FC;">确定</font>的，我们的代理类是手工实现的，<font style="background-color:#DEE8FC;">自己创建</font>一个java类来表示代理类，只能代理这<font style="background-color:#DEE8FC;">一个接口</font>的方法。如果想代理其他的，就需要创建<font style="background-color:#DEE8FC;">新的代理类</font>。代码冗余，复杂。但是实现简单。如果一个<font style="background-color:#DEE8FC;">接口增加</font>了一个方法，实现类都需要实现这个方法，代理类也需要实现这个方法，增加了<font style="background-color:#DEE8FC;">代码维护</font>的复杂度。

<font style="color:rgb(36, 41, 46);">一般来说，我们自己定义一个代理类，代理类中持有被代理类对象，代理的方法中调用被代理类对该方法的实现，并在代理类中实现对被代理类方法的扩展。</font>

```java
// 接口
public interface Company {
    void findWorker(String title);
}
// 被代理类
class HR implements Company {
    @Override
    public void findWorker(String title) {
        System.out.println("I need find a worker, title is: "+title);
    }
}
// 代理类
class Proxy implements Company {
    // 持有被代理类对象
    private HR hr;
    public Proxy() {
        super();
        this.hr=new HR();
    }
    @Override
    public void findWorker(String title) {
        // 调用被代理类的方法。
	hr.findWorker(title);
        // 代理类找worker
        String worker = getWorker(title);
        System.out.println("find a worker by proxy,worker name is: "+worker);
    }

    private String getWorker(String title) {
        Map<String, String> workerList=new HashMap<String, String>() {
            {put("Java","张三");put("Python","李四");put("Php","王五");}
        };
        return workerList.get(title);
    }
}
```

### 动态代理
而<font style="background-color:#E4F7D2;">动态代理</font>我们只需要给他<font style="background-color:#DEE8FC;">被代理类的对象</font>，就能返回<font style="background-color:#DEE8FC;">代理类的对象</font>。相比于静态代理当你修改了接口中的方法时，不会影响你的这些代理类。



spring实现动态代理有两种方式，jdk动态代理和cglib动态代理。Jdk动态代理：动态生成<font style="background-color:#DEE8FC;">接口</font>的实例。Cglib动态代理，生成<font style="background-color:#DEE8FC;">子类</font>代理的实例。如果被代理对象是实现类，用jdk；否则用cglib。

#### jdk动态代理
选择：如果目标类实现了接口，则使用JDK动态代理，否则使用CGLIB动态代理。spring2.0以后默认cglib

<font style="background-color:#E4F7D2;">JDK动态代理</font>是基于接口的，动态生成<font style="background-color:#DEE8FC;">接口</font>的代理对象。通过java反射包中的三个类，InvocationHandler，Method，Proxy三个类实现的。步骤大概是这样，先有一个接口，然后有一个接口的实现类，然后<font style="background-color:#DEE8FC;">代理类实现</font>InnovationHandler接口，实现里面的invoke方法，这个invoke方法就是实现对接口方法的<font style="background-color:#DEE8FC;">增强</font>，method.invoke()是执行原来的方法，<font style="background-color:#DEE8FC;">返回代理对象</font>就是通过Proxy.newProxyInstance(ClassLoader，接口，handler)

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651831042359-035a1d61-3046-478c-83fe-73af9128d42b.png)

```java
public class CalculatorProxy {
    public static Object getInstance(final MyCalculatorImpl myCalculator) {
        return Proxy.newProxyInstance(CalculatorProxy.class.getClassLoader(), myCalculator.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println(method.getName()+":方法开始执行了");
                        Object invoke = method.invoke(myCalculator, args);
                        System.out.println(method.getName()+":方法执行结束了");
                        return invoke;
                    }
                });
    }
}
```

#### <font style="background-color:#E4F7D2;">cglib动态代理</font>
<font style="background-color:#E4F7D2;">CGlib动态代理</font>，动态生成<font style="background-color:#DEE8FC;">子类</font>的代理对象，它不要求是接口，可以代理一个普通的类。步骤大概是这样，然后<font style="background-color:#DEE8FC;">代理类实现</font>MethodInterceptor，实现里面的interceptor<font style="background-color:#DEE8FC;">方法</font>，这个方法去实现功能的增强。返回呢是通过给<font style="background-color:#DEE8FC;">目标类创建子类对象</font>，就得到了我们想要的代理对象。因为CGlib是生成子类代理对象，指定的类生成的一个子类覆盖原有的方法，所以方法不能是final的，类也不能是final的。<font style="background-color:#DEE8FC;">内部实现</font>是ASM开源包，修改被代理对象的class字节码得到子类对象。

## <font style="background-color:#FADB14;">反射</font>
```java
Class<R> type;
```
表示R的类型是type

### 反射是啥？
定义：

1. 在运行时期，通过类的class对象获取到<font style="background-color:#DEE8FC;">任意</font>一个<font style="background-color:#DEE8FC;">类</font>的所有<font style="background-color:#DEE8FC;">属性和方法</font>。
2. 对于任意一个<font style="background-color:#DEE8FC;">对象</font>，都能调用它的任意一个<font style="background-color:#DEE8FC;">方法</font>。
3. 这种**动态获取信息，动态调用方法**的功能，叫做反射。
4. （比如通过类对象调用getMethod等方法可以实现。）

类对象（元数据）：

1. <font style="background-color:#DEE8FC;">class文件</font>加载到虚拟机之后会被<font style="background-color:#DEE8FC;">构建</font>成<font style="background-color:#DEE8FC;">class对象</font>。
2. 包括（实现，继承，构造，成员/类变量，成员/类方法）

获取class对象的方法：

1. 对象.getClass()；
2. 类.class；
3. Class.forName("包路径")
4. 类加载器获得（类加载器读取class文件返回class对象）。

### 优缺点
反射的<font style="background-color:#FCFCCA;">优点</font>：灵活性高。运行时动态创建&获取对象实例。

反射的<font style="background-color:#FCFCCA;">缺点</font>：性能低jvm无法优化，安全性。

### 反射API
作用：

1. 运行时动态生成类、接口对象。
2. 动态调用方法。

包括：

1. Class类：获取类的属性、方法等信息。
2. Field类：表示类的成员变量，获取属性。
3. Method类：表示类的方法，用于获取方法或者执行。
4. Constructor：表示类的构造方法。

### 步骤
1. 获取要操作类的Class对象。
2. 通过Class对象获取类的属性和方法。

```java
Class clazz=Class.forName("hello.java.reflect.Persion");
// 获取Person类所有方法信息
Method[] method=clazz.getDeclaredMethods();
for(Method m:method) {
    System.out.println(m.toString());
}
// 获取Person类所有成员属性信息
Field[] field=clazz.getDeclaredFields();
for(Field f:field) {
    System.out.println(f.toString());
}
// 获取Person类所有构造
Constructor[] constructor=clazz.getDeclaredConstructors();
for(Constructor c:constructor) {
    System.out.println()
}
```

4. 创建对象2种方式

```java
// 获取Class对象
Class clazz=Class.forName("hello.java.reflect.Person")
// 1使用newInstance方法创建对象
Person p=(Person) clazz.newInstance();
// 2使用构造方法
Constructor c=clazz.getDeclaredConstructor(String.class,String.class,int.class);
Person p1=c.newInstance("李四","男",20);
```

5. 调用方法

```java
Class clazz=Class.forName("hello.java.reflect.Person");
// 获取setName方法
Method method=clazz.getMethod("setName",String.class);
// 获取构造方法并创建对象
Concstructor constructor=clazz.getConstructor();
Object object=constructor.newInstance();
// 调用object对象的setName方法，并传入参数。
method.invoke(object,"alex")
```





### 用途场景
多态：

1. Person person = new Student();
2. Person是编译时类型(声明)，Student是运行时类型(赋值)。
3. 真实信息(属性和方法)是通过反射机制获取的。

SpringIOC

+ 项目启动时读取xml文件中的bean配置路径
+ 通过Class.forName的方式进行类的加载，把class文件加载到jvm中，得到类对象
+ 然后可以通过反射的方式创建这个类的实例，放到spring容器中。
+ 项目运行过程中可以从容器中直接获取bean



# ·java基础
## 封装继承多态/重写重载
面向对象：封装继承多态，<font style="background-color:#FADB14;">降低系统耦合，更灵活，易于维护，易于扩展</font>。性能不如面向过程，因为创建实例开销比较大，消耗资源。



<font style="background-color:#FADB14;">封装：</font>属性私有化，仅<font style="background-color:#FFE8E6;">提供</font>一些访问这些属性的的方法，让用户可以使用这个类。而且只知道如何使用即可，不需要了解如何<font style="background-color:#FFE8E6;">实现</font>的。<font style="background-color:#FFE8E6;">减少耦合</font>，可以独立的开发、测试、优化、使用、修改。易于维护，修改时不影响其他模块。提高<font style="background-color:#FFE8E6;">可重用性</font>。

<font style="background-color:#FADB14;">继承：</font>子类继承父类，拥有父类的<font style="background-color:#FFE8E6;">非private</font>的属性和方法。可以在原有父类方法的基础上<font style="background-color:#FFE8E6;">重写</font>父类方法，也可以有<font style="background-color:#FFE8E6;">自己的</font>方法。方便的<font style="background-color:#FFE8E6;">复用</font>以前的代码，还能实现对父类的一个<font style="background-color:#FFE8E6;">扩展</font>。

<font style="background-color:#FADB14;">多态：</font><font style="background-color:#FFE8E6;">一个父类创建出不同的实现类的对象</font>。创建一个父类对象[引用变量]，它可以指向不同的子类对象。对于接口来说，可以指向不同的<font style="background-color:#FFE8E6;">实现类</font>。一个接口多种实现，实现可以按照自己的需要去实现，而接口的<font style="background-color:#FFE8E6;">约定</font>只有一个。对于父子类来说，可以指向不同的<font style="background-color:#FFE8E6;">子类</font>。这种是叫做运行时多态，是在<font style="background-color:#FFE8E6;">运行时</font>才确定这个引用类型指向哪个具体的类型。还有编译时多态就是方法的<font style="background-color:#FFE8E6;">重载</font>。

好处就是易于扩展，体现在方法重载和重写上。缺点就是不能用父类对象引用直接调用子类特有方法。



<font style="background-color:#FADB14;">重写</font>：子类重写父类的方法，使子类具有不同的方法实现。方法名相同，参数相同，返回值类型相同，访问修饰符<font style="background-color:#FADB14;">大于</font>父类，抛出异常范围<font style="background-color:#FADB14;">小于</font>父类。

<font style="background-color:#FADB14;">重载</font>：同一个类中方法的重载，方法名相同，参数<font style="background-color:#FADB14;">个数</font>/<font style="background-color:#FADB14;">类型</font>/<font style="background-color:#FADB14;">顺序</font>不同，返回值类型随意，访问修饰符随意。

重载是编译时多态，<font style="color:rgb(51, 51, 51);">是</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">子类和父类</font><font style="color:rgb(51, 51, 51);">之间的</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">关系</font><font style="color:rgb(51, 51, 51);">，是垂直关系</font>，重写是运行时多态，<font style="color:rgb(51, 51, 51);">重载是</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">同一个类中方法</font><font style="color:rgb(51, 51, 51);">之间的</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">关系</font><font style="color:rgb(51, 51, 51);">，是水平关系。</font>



## 抽象类和接口
1. 抽象类是abstract修饰的类，里面有<font style="background-color:#FADB14;">抽象方法</font>也是用abstract修饰不能是private，没有实现，抽象类可以有<font style="background-color:#FADB14;">非抽象方法</font>。接口是interface，变量public static final, 方法默认是public abstract，接口所有方法不能有实现（jdk8可以有默认的方法实现），接口不能有构造方法，抽象类可以有。
2. 抽象类不能创建对象。接口不能实例化，但是能引用一个实现类对象。
3. 一个类实现接口的话需要实现所有方法。抽象类不一定。一个类可以实现多个接口，但只能继承一个抽象类。
4. 抽象是对类的抽象，是一种<font style="background-color:#FADB14;">模板设计</font>。接口是对行为的抽象，是一种<font style="background-color:#FADB14;">行为规范</font>。

理解：如果继承抽象类代表是这个抽象类的<font style="background-color:#FADB14;">种类</font>，抽象类就是一种IS-A关系，是不是的一种关系，必须<font style="background-color:#FADB14;">满足</font>里氏替换原则，就是子类对象必须能够<font style="background-color:#FADB14;">替换</font>掉所有父类对象。接口是一种like-a的关系，就是一种<font style="background-color:#FADB14;">有没有</font>关系，提供了一种方法实现契约，实现了接口就是有这种行为。

补1. 接口1.8默认实现，这是因为不支持默认方法的接口维护成本太高。如果一个接口想添加新的方法，要修改所有实现了该接口的类。

## 面向对象的六大原则
面向对象的六大原则

在满足需求且不破坏系统稳定性的前提下保持高可扩展性、高内聚、低耦合。形成灵活、稳定的系统结构。

面向对象的六大原则分别为单一职责原则、开放封闭原则、里氏替换原则、依赖倒置原则、迪米特原则、接口隔离原则。

1.单一职责原则

单一职责原则（Single Responsibility Principle） SRP

一个类只承担自身特有的职责。一个类如果承受太多职责（即类与类之间耦合度过高）会使大量代码难以阅读、整个项目代码逻辑难以设计。

2.开放封闭原则

开放封闭原则（Open Close Principle） OSP

对于扩展是开放的，对于修改是封闭的。 程序的一个类只因错误而修改，新的改变或升级采用创建新的类通过继承的方式，覆写父类的接口。

3.里氏替换原则

里氏替换原则（Liskov Substitution Principle）LSP

里氏替换原则是开放封闭原则的重要实现方式之一。在程序中使用基类（设计成抽象类或接口）类型来定义对象，在运行再确定其子类类型，用子类对象来替换父类对象 。即 抽象 。（方法注入父类依赖 ImageCache ，使用时传入子类 MemoryCache、DiskCache、DoubleCache ）

4.依赖倒置原则

依赖倒置原则（Dependence Inversion Principle）DIP

高层模块不能依赖低层模块，两者都应依赖于抽象。

抽象不该依赖细节

细节应依赖抽象

依赖关系是通过接口或抽象类产生的。

5.接口隔离原则

接口隔离原则（InterfaceSegregation Principle） ISP

类间的依赖关系应建立在最小的接口上。目的：系统揭开耦合，从而容易重构、更改和重新部署。

(可关闭的 ->创建 Closeable 接口 ->继承实现 close 方法 ->形成抽象，使用了最小化接口隔离了实现类的细节)

6.迪米特原则

迪米特原则（Law of Demecter）LOD 也称为最少知识原则（Least Knowledge Principle）。

类内部只需要实现需要的接口方法即可，其他一律不管。通过引入第三方来减低现有对象之间的耦合度（如创建抽象类、接口）

## static/final/拷贝/JDK/C++
### static
<font style="background-color:#FADB14;">变量</font>：static修饰一个变量代表属于这个类，如果非私有可以直接通过<font style="background-color:#FADB14;">类名</font>调用，实例<font style="background-color:#FADB14;">共享</font>这个变量。

<font style="background-color:#FADB14;">方法</font>：<font style="background-color:#FADB14;">类加载</font>的时候就存在了，必须有<font style="background-color:#FADB14;">实现</font>，所以<font style="background-color:#FADB14;">不能</font>是抽象方法。只能访问静态变量和静态方法。

<font style="background-color:#FADB14;">静态代码块</font>：类加载初始化阶段运行一次。

静态内部类不能访问外部类的非静态的变量和方法。不依赖于外部类的实例。

非静态内部类实例依赖于外部类的实例。

**匿名内部类：**

首先它是一个<font style="background-color:#FADB14;">类</font>，不需要为类<font style="background-color:#FADB14;">指定</font>名字，语法形式就是new 接口名() {实现这个接口的方法};相当于创建一个类的对象，只能使用一次，<font style="background-color:#FADB14;">不能有构造方法</font>。但是可以提供一个对象初始化块。

### final
<font style="color:#F5222D;">概念</font>：final是常量，要么<font style="background-color:#FADB14;">直接</font>被赋值，要么<font style="background-color:#FADB14;">构造方法</font>赋值，总之，构造方法执行之后它必须是<font style="background-color:#FADB14;">被赋值</font>的状态。

<font style="background-color:#FADB14;">变量：</font>final Emplayee emplayee; 被初始化以后就不能指向别的对象了，但是对象里面可以变。

<font style="background-color:#FADB14;">方法</font>：不能被子类重写

<font style="background-color:#FADB14;">类</font>：不能被继承



**String为什么不可变？**

① java8中String类型是char数组，java9改成byte数组。<font style="color:#2F54EB;">value数组是</font><font style="color:#2F54EB;background-color:#FADB14;">final修饰</font><font style="color:#2F54EB;">的</font>，意味着初始化以后<font style="background-color:#FADB14;">不可以再引用其他数组</font>，而且String内部也没有可以改变value数组的方法。②<font style="color:#2F54EB;">而且String这个</font><font style="color:#2F54EB;background-color:#FADB14;">类是final</font><font style="color:#2F54EB;">修饰的</font>，不允许被继承。我觉得也就没办法通过继承String，让子类去改变value数组的方式使String可变。



**String s="abc"; s="123";为什么可以？**

s="abc"这种形式，s指向方法区中的String，里面value是abc，那么因为s不是final修饰的，s指向的引用可以变，可以改成s="123"，也就是s指向了字符串常量池中的另外一个String。

对于String s=new String("abc")这种形式，s是在栈中的引用变量，会在堆中创建一个String对象，value指向方法区中的"abc"字符串常量。因为String中value数组是final修饰的，所以堆中的String中value数组不能再指向其他对象，而且也没有改变value数组的方法。所以堆中的String对象value数组只能指向"123"，而s不是final的，s的指向是可以变的。



_**不可变的好处**_：

①可以用做<font style="background-color:#FADB14;">hash值</font>，不可变的特性可以使得hash值也不变。比如String的哈希值被用做hashmap的key，

②<font style="background-color:#FADB14;">字符串常量池StringPool，</font>如果一个String已经被创建过一次了，可以从StringPool中取得引用，只有不可变，才能使用Stringpool。

③<font style="background-color:#FADB14;">安全性</font>：String不可变可以保证参数安全。

④<font style="background-color:#FADB14;">线程安全</font>：String不可变天生具备线程安全。StringBuffer是线程安全，用synchronized。

String不可变，StringBuffer和StringBuilder可变（为什么？）。String线程安全，StringBuffer线程安全，内部方法使用synchronized同步，StringBuilder不是线程安全。

StringBuffer继承了AbstractStringBuilder，append方法调用了父类的append方法，append(str)，调用str.getChars(value。)方法，这个value不是final的，是可变的，是String类的getchars方法，调用了底层的arraycopy方法。



### 浅拷贝/深拷贝
**浅拷贝**：<font style="background-color:#FADB14;">拷贝</font>对象和<font style="background-color:#FADB14;">原始</font>对象引用同一个对象。

**深拷贝**：<font style="background-color:#FADB14;">拷贝</font>对象和<font style="background-color:#FADB14;">原始</font>对象引用不同对象。

重写clone()方法需要<font style="background-color:#FADB14;">实现</font>Cloneable接口，否则会抛ClassNotSupportedException。默认的clone是浅拷贝，深拷贝如果拷贝数组，就是创建一个大小相同的数组，然后把数组元素都复制到新数组，返回新数组的引用。

深拷贝不仅拷贝对象本身，拷贝对象的引用也需要拷贝。比如A1引用B1，B1引用C1。浅拷贝得到A2，A2依然引用B1，B1引用C1。而深拷贝，A2引用B2，B2引用C2。



### JDK/JRE
**JRE和JDK**

1. jre是java运行环境，jdk是java开发工具包
2. jre包含jvm，java基础类库。jdk是程序员使用java语言编写java程序所需的开发工具包。jdk包含了jre，同时包含了编译java源码的编译器javac，还包含很多java程序调试和分析的工具：jconsole，jvisualVM。
3. 如果只是运行java程序，jre就可以，如果要编写程序需要jdk。
4. 还包含了java程序编写所需的文档和demo例子程序。
5. jre根据不同操作系统（windows、linux等）和不同jre提供商（ibm，oracle）有很多版本。
6.

### Java和C++的区别
1. java通过JVM实现跨平台，C++依赖于特定的平台。
2. Java没有指针，但它有引用类似指针，（可以理解为安全指针），而C++具有和C一样的指针。
3. Java支持自动垃圾回收，C++需要手动回收。
4. Java不支持多继承，但可以实现多个接口，C++支持多继承。
5. Java不支持操作符重载，虽然可以对两个String对象执行加法运算，但是这是语言内置支持的操作，不属于操作符重载，而C++可以。
6. Java的goto是保留字，不可用，C++可以使用goto
7. Java不支持条件编译，C++可以通过#ifdef #ifndef等预处理命令实现条件编译。



## 内部类
定义在类的内部的类。

### 静态内部类
定义：

1. 定义在类内部。
2. 本身是静态的类。

特点：

1. 可以访问外部类的静态变量和方法。
2. 可以定义静态变量、方法、构造等，也可以非静态。
3. 不依赖外部类实例。
4. 通过外部类.静态内部类的方式调用。

使用：

1. 和外部类关系密切
2. 不依赖外部类实例。
3. 如hashmap内部的静态内部类Node数组。

### 成员内部类
定义：

1. 定义在类内部。
2. 非静态类。

特点：

1. 不能定义静态方法和变量。除了final修饰的。

### 局部内部类
定义：

1. 定义在方法中的类。

特点：

1. 当一个类只需要在某个方法中使用时。

### 匿名内部类
定义：

1. 通过继承一个类。
2. 或者实现一个接口的方式
3. 直接定义并使用的类。

特点：

1. 没有class关键字。
2. 直接使用new生成一个对象的引用。



## 泛型/注解/异常
### <font style="background-color:#1890FF;">泛型</font>
定义：

1. 用&lt;E&gt;尖括号这种写法去<font style="background-color:#FADB14;">定义泛型</font>。
2. 直接用E去<font style="background-color:#FADB14;">使用泛型</font>。

特点：

1. 这样<font style="background-color:#FADB14;">编写</font>代码不用固定具体是哪种类型。
2. 而是使用这样的泛型的方式去<font style="background-color:#FADB14;">代表</font>元素的类型。
3. 如果不用泛型，我们可以使用Object实现参数任意化。
4. 但是具体使用时需要进行强制类型转换。容易出现类型转换错误。
5. 泛型可以在编译器检查类型是否安全。
6. 提高安全性和重用性。

#### 泛型标记和泛型限定
**泛型标记**：E/T/K/V/N/?

E：集合中使用，表示集合中存放的元素。

T：表示java类，包括基本类型和自定义的类。

K：表示键，比如Map中的key。

V：表示值。

N：表示数值类型。

?：表示不确定的Java类型。表示所有具体的参数类型。| 泛型类中的泛指 ，是一个占位符  不能往容器中添加数据。

**泛型限定**：

1. 对泛型上限的限定：<? extends T>

表示是T类的子类或者接口T的子接口。

2. 对泛型下限的限定：<? super T>

表示T类型父类或者父接口。

T...inputArray：表示可变长度参数，可以不传，可以传1个，2个...可以传数组。

#### 泛型类和泛型方法和泛型接口
泛型方法：

定义：

1. 在方法的返回值前后用<>定义泛型。
2. 在方法的参数类型定义为泛型。
3. 调用时可以接收不同类型的参数。
4. 在方法内部根据不同的类型执行不同处理方法。

泛型类：

定义：

1. 在类名后用<>定义泛型。
2. 使用时根据传入参数类型不同实例化不同的对象。比如List<>

泛型接口：

定义：

1. 泛型接口的声明和泛型类相似。
2. 在接口名后面加&lt;T&gt;定义泛型。
3. 在实现类中定义具体的类型。
4. 不同的实现类传入不同的类型去做不同的业务逻辑。

#### 类型擦除
定义：

1. 我们使用泛型时加上的类型参数会被去掉。
2. 在编译器编译时。

### <font style="background-color:#1890FF;">注解</font>
定义：

1. 是一种接口，设置属性。
2. 可以通过反射获取注解对象
3. 进而获得注解元素内数据信息。

```java
@Target({ElementType.METHOD}) // 作用在方法上
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Cache {

    long expire() default 1 * 60 * 1000;

    // 缓存标识key
    String name() default "";
}
```

#### 元注解
注解其他注解。

@Target：作用范围。可被作用在packages、types(类、接口、枚举、注解)、类型成员(方法、构造、成员、枚举值)、本地变量等。

@Retention：source源文件，classclass文件中，runtime运行时有效。

@Documented：加了表示被javadoc工具记录。

@Inherited：加了这个注解的注解，被用于一个Class，那么这个注解也会被用于Class的子类。



#### 通过反射获取注解信息
```java
// 某个注解加在一个类的成员变量上了
Field[] fields=clazz.getDeclaredFields();
for(Field field:fields) {
    if(field.isAnnotationPresent(FruitProvider)) {
        FruitProvider fruitProvider=(FruitProvider)field.
            getAnnotation(FruitProvider.class);
        int id=fruitProvider.id();
    }
}
```

### <font style="background-color:#1890FF;">异常</font>
#### 异常分类
Throwable：

1. 下面分为，**Error和Exception**。
2. 可以用来表示<font style="background-color:#FADB14;">任何可以异常抛出</font>的类。

Error：

1. **<font style="background-color:#FADB14;">Error</font>****表示****<font style="background-color:#FADB14;">JVM无法处理</font>****的错误，程序运行错误**。
2. 比如OOM，StackOverflowError。一些堆或者栈内存溢出。
3. 如果出现错误，程序会终止，通常是程序内部错误或者资源耗尽。

Exception：

1. **<font style="background-color:#FADB14;">Exception</font>****程序运行异常，分为两种**，受检异常（**非运行时异常**）。
2. 如**IOException、SQLException、ClassNotFoundException**等。
3. 可以通过try...catch...语句捕捉处理或者throws抛出，否则<font style="background-color:#FADB14;">不能通过</font>编译。



1. **运行时异常**。
2. 都是**RuntimeException类及其子类，如NullPointerException、IndexOutOfBoundsException等**。
3. 在程序<font style="background-color:#FADB14;">运行时</font>可能会发生的，所以程序<font style="background-color:#FADB14;">可以</font>捕捉，也可以不捕捉。
4. 这些错误一般是由程序本身的<font style="background-color:#FADB14;">逻辑</font>错误引起的，应该从程序逻辑的角度避免。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651544014374-5cf7bf8b-19a9-457c-8497-e0d5770f02d3.png)

#### <font style="background-color:#FADB14;">异常处理</font>
1. 抛出异常->throws、throw  
   抛出就是不处理，抛给调用者，调用者处理。异常中封装了方法执行过程中的错误信息，调用方获取该异常后根据业务情况选择处理或者继续抛出异常。程序throw执行后续代码不再执行了。
2. 捕获异常->try...catch...finally，catch就是捕获异常并处理。一般不会捕获error，因为通常error会导致程序直接退出，捕获处理没有意义，比如oom运行环境已经崩溃了，没办法恢复运行状态了。



throw和throws的区别

1. 位置，throw在方法内部，throws在方法的签名处，方法的声明处
2. 内容，throw+异常对象(运行时异常)，throws+异常的类型，可以多个类型，用拼接
3. 作用，throw异常出现的源头，制造异常。throws是<font style="background-color:#FADB14;">告诉</font>调用者，这个方法可能会出现我声明的这些异常。<font style="background-color:#FADB14;">调用者对</font>这个异常进行处理，要么自己处理，要么抛出。



## IO流和序列化
### 序列化
背景：

1. java对象在JVM运行时创建、更新、销毁。
2. JVM退出时，对象也会被销毁。

作用：

1. 保存对象信息。
2. 对象信息保存在字节数组中并持久化。

实现：

1. 实现Serializable接口。
2. private static final long serialVersionUID定义序列化ID。

特点：

1. 不序列化静态变量。
2. 需要序列化父类变量，父类也要实现Serializable接口。
3. 使用Transient关键字可以阻止变量被序列化。

代码示例：

Java生态中很多优秀的序列化框架，如protobuf，fastjson等。我们也可以基于原生JDK的ObjectOutputStream和ObjectInputStream实现对象的序列化。

```java
public static void main(String[] args) throws Exception {
    FileOutputStream fos=new FileOutputStream("worker.out");
    ObjectOutputStream oos=new ObjectOutputStream(fos);
    Wroker testObject = new Wroker();
    testObject.setName("alex");
    oos.writeObject(testObject);
    oos.flush();
    oos.close();
    // 反序列化
    FileInputStream fis=new FileInputStream("worker.out");
    ObjectInputStream ois = new ObjectInputStream(fis);
    Wroker deTest=(Wroker)ois.readObject();
    System.out.println(deTest.getName());
}
```

### IO流
字节流是直接对文件本身操作，字符流在操作时用到了缓冲区，通过缓冲区再操作文件。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651562831835-76d1adb6-d1d8-4c32-ac67-24f7cc10501f.png)

<font style="color:rgb(51, 51, 51);">字节：InputStream和OutputStream，字符：</font>Reader、Writer作为基类。

根据不同的<font style="background-color:#FADB14;">数据载体</font>或<font style="background-color:#FADB14;">功能</font>派生出来很多IO流。<font style="color:rgb(51, 51, 51);">比如：</font>

+ <font style="color:rgb(51, 51, 51);">FileInputStream/FileOutputStream  基于字节流读取或者写入文件需要逐个字节处理原始二进制流的时候使用，效率低下。</font>
+ <font style="color:rgb(51, 51, 51);">FileReader/FileWriter 基于字符流，需要逐个字符处理的时候使用</font>
+ <font style="color:rgb(51, 51, 51);">StringReader/StringWriter 需要处理字符串的时候，可以将字符串保存为字符数组</font>
+ <font style="color:rgb(51, 51, 51);">PrintStream/PrintWriter 用来</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">包装</font><font style="color:rgb(51, 51, 51);">FileOutputStream 对象，方便直接将String字符串写入文件 </font>
+ <font style="color:rgb(51, 51, 51);">Scanner 用来包装System.in流，很方便地将输入的String字符串转换成需要的数据类型</font>
+ <font style="color:rgb(51, 51, 51);">InputStreamReader/OutputStreamReader ,  </font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">字节和字符</font><font style="color:rgb(51, 51, 51);">的转换桥梁，在网络通信或者处理键盘输入的时候用</font>
+ <font style="color:rgb(51, 51, 51);">BufferedReader/BufferedWriter ， BufferedInputStream/BufferedOutputStream ，</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;"> 缓冲流</font><font style="color:rgb(51, 51, 51);">用来包装字节流后者字符流，提升IO性能，BufferedReader还可以方便地读取一行，简化编程。</font>

**字节**：InputStream和OutputStream

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651562898472-39604c41-3584-481b-afd5-24b831d5fc3f.png)

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651562908313-8b1a3584-a53f-48ec-a296-99f65e1023aa.png)

字符：Reader、Writer作为基类。



![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651562938628-063fed22-d918-4416-94ee-6c95e122f5e5.png)



![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1651562951343-0ebaa87e-58b1-4968-a6bc-ffb7a61edf12.png)

javaIO流体系基于字符流（InputStream/OutputStream）和字节流（Reader/Writer）作为基类，根据不同的数据载体或功能派生出来。



**文件流**

FileInputStream/FileOutputStream，FileReader/FileWriter。需要关闭流对象，7之后try(打开流)，不需要关闭流对象。

```java
package io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class TestIO {
    public static void FileInputStreamTest() throws IOException {
        FileInputStream fis = new FileInputStream("tmp2.txt");
        byte[] buf = new byte[1024];
        int hasRead = 0;

        //read()返回的是单个字节数据（字节数据可以直接专程int类型)，但是read(buf)返回的是读取到的字节数，真正的数据保存在buf中
        while ((hasRead = fis.read(buf)) > 0) {
            //每次最多将1024个字节转换成字符串，这里tmp2.txt中的字符小于1024，所以一次就读完了
            //循环次数 = 文件字符数 除以 buf长度
            System.out.println(new String(buf, 0 ,hasRead));
            /*
             * 将字节强制转换成字符后逐个输出，能实现和上面一样的效果。但是如果源文件是中文的话可能会乱码

            for (byte b : buf)    {
                char ch = (char)b;
                if (ch != '\r')
                System.out.print(ch);
            }
            */
        }
        //在finally块里close更安全
        fis.close();
    }

    public static void FileReaderTest() throws IOException {

        try (
                // 在try() 中打开的文件， JVM会自动关闭
                FileReader fr = new FileReader("tmp2.txt")) {
            char[] buf = new char[32];
            int hasRead = 0;
            // 每个char都占两个字节，每个字符或者汉字都是占2个字节，因此无论buf长度为多少，总是能读取中文字符长度的整数倍,不会乱码
            while ((hasRead = fr.read(buf)) > 0) {
                // 如果buf的长度大于文件每行的长度，就可以完整输出每行，否则会断行。
                // 循环次数 = 文件字符数 除以 buf长度
                System.out.println(new String(buf, 0, hasRead));
                // 跟上面效果一样
                // System.out.println(buf);
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public static void FileOutputStreamTest() throws FileNotFoundException, IOException {
        try (
                //在try()中打开文件会在结尾自动关闭
                FileInputStream fis = new FileInputStream("tmp2.txt");
                FileOutputStream fos = new FileOutputStream("tmp3.txt");
                ) {
            byte[] buf = new byte[4];
            int hasRead = 0;
            while ((hasRead = fis.read(buf)) > 0) {
                //每读取一次就写一次，读多少就写多少
                fos.write(buf, 0, hasRead);
            }
            System.out.println("write success");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void FileWriterTest() throws IOException {
        try (FileWriter fw = new FileWriter("tmp4.txt")) {
            fw.write("天王盖地虎\r\n");
            fw.write("宝塔镇河妖\r\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) throws IOException {
        //FileInputStreamTest();
        //FileReaderTest();
        //FileOutputStreamTest();
        FileWriterTest();
    }
}
```



包装流：**<font style="color:rgb(0, 0, 0);">PrintStream/PrintWriter/Scanner</font>**

PrintStream可以封装（包装）直接与文件交互的节点流对象OutputStream, 使得编程人员可以忽略设备底层的差异，进行一致的IO操作。因此这种流也称为处理流或者包装流。

PrintWriter除了可以包装字节流OutputStream之外，还能包装字符流Writer

Scanner可以包装键盘输入，方便地将键盘输入的内容转换成我们想要的数据类型。



**<font style="color:rgb(51, 51, 51);">字符串流：StringReader/StringWriter</font>**

这两个操作的是专门操作String字符串的流，其中StringReader能从String中方便地读取数据并保存到char数组，而StringWriter则将字符串类型的数据写入到StringBuffer中（因为String不可写）。



**<font style="color:rgb(51, 51, 51);">转换流：InputStreamReader/OutputStreamReader</font>**

这两个类可以将字节流转换成字符流，被称为字节流与字符流之间的桥梁。我们经常在读取键盘输入(System.in)或网络通信的时候，需要使用这两个类。



**<font style="color:rgb(51, 51, 51);">缓冲流：BufferedReader/BufferedWriter ， BufferedInputStream/BufferedOutputStream</font>**

**<font style="color:rgb(51, 51, 51);"></font>**

没有经过Buffered处理的IO， 意味着每一次读和写的请求都会由OS底层直接处理，这会导致非常低效的问题。

<font style="color:rgb(255, 0, 0);">经过Buffered处理过的输入流将会从一个buffer内存区域读取数据，本地API只会在buffer空了之后才会被调用（可能一次调用会填充很多数据进buffer）。</font>

<font style="color:rgb(255, 0, 0);">经过Buffered处理过的输出流将会把数据写入到buffer中，本地API只会在buffer满了之后才会被调用。</font>

<font style="color:rgb(51, 51, 51);">BufferedReader/BufferedWriter可以将字符流(Reader)包装成缓冲流，这是最常见用的做法。</font>

<font style="color:rgb(51, 51, 51);">另外，</font>**<font style="color:rgb(51, 51, 51);">BufferedReader提供一个readLine()可以方便地读取一行</font>**<font style="color:rgb(51, 51, 51);">，而FileInputStream和FileReader只能读取一个字节或者一个字符，</font>

<font style="color:rgb(51, 51, 51);">因此BufferedReader也被称为行读取器</font>

```java
package io;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.PushbackReader;
import java.io.StringReader;
import java.io.StringWriter;

public class TestIO {
    public static void printStream() throws FileNotFoundException, IOException {
        try (
                FileOutputStream fos = new FileOutputStream("tmp.txt");
                PrintStream ps = new PrintStream(fos)) {
            ps.println("普通字符串\n");
            //输出对象
            ps.println(new TestIO());
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("输出完成");

    }
    public static void stringNode() throws IOException {
        String str = "天王盖地虎\n"
                + "宝塔镇河妖\n";
        char[] buf = new char[32];
        int hasRead = 0;
        //StringReader将以String字符串为节点读取数据
        try (StringReader sr = new StringReader(str)) {
            while ((hasRead = sr.read(buf)) > 0) {
                System.out.print(new String(buf, 0, hasRead));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        //由于String是一个不可变类，因此创建StringWriter时，实际上是以一个StringBuffer作为输出节点
        try (StringWriter sw = new StringWriter()) {
            sw.write("黑夜给了我黑色的眼睛\n");
            sw.write("我却用它寻找光明\n");
            //toString()返回sw节点内的数据
            System.out.println(sw.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void keyIn() throws IOException {
        try (
                //InputStreamReader是从byte转成char的桥梁
                InputStreamReader reader = new InputStreamReader(System.in);
                //BufferedReader(Reader in)是char类型输入的包装类
                BufferedReader br = new BufferedReader(reader);
                ) {
            String line = null;
            while ((line = br.readLine()) != null) {
                if (line.equals("exit")) {
                    //System.exit(1);
                    break;
                }
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void pushback() throws FileNotFoundException, IOException {
        try (PushbackReader pr = new PushbackReader(new FileReader("C:/PROJECT/JavaBasic/PROJECT_JavaBasic/src/io/TestIO.java"),64)) {
            char[] buf = new char[32];
            String lastContent = "";
            int hasRead = 0;
            while ((hasRead = pr.read(buf)) > 0) {
                String content = new String(buf, 0, hasRead);
                int targetIndex = 0;
                if ((targetIndex = (lastContent + content).indexOf("targetIndex = (lastContent + content)")) > 0) {
                    pr.unread((lastContent + content).toCharArray());
                    if (targetIndex > 32) {
                        buf = new char[targetIndex];
                    }
                    pr.read(buf , 0 , targetIndex);
                    System.out.println(new String(buf, 0 , targetIndex));
                    System.exit(0);
                } else {
                    System.out.println(lastContent);
                    lastContent = content;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws IOException {
        printStream();
        //stringNode();
        //keyIn();
        //pushback();
    }
}
```





