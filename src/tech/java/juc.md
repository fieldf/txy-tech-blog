---
title: JUC
date: 2023-02-12
index: false
icon: laptop-code
category:
  - JUC
tag:
  - 多线程
  - 线程池
  - 锁
---

# ·线程
## 1线程
### 线程生命周期
锁池和等待池

Java中的对象有两个池，对对象加synchronized锁时必须获得对象锁，没有获得锁的线程进入锁池。获取到锁的线程如果调用了wait()方法就会进入等待池，进入等待池的线程不会竞争对象锁。



状态：

1. 新建New：new新建一个线程，处于新建状态。为线程分配内存并初始化成员变量的值。
2. 就绪Runnable：可运行态。start启动一个线程，处于就绪状态。
3. 运行Running：获取CPU资源后，执行run方法进入运行状态。
4. 阻塞Blocked
    1. 同步阻塞：运行线程尝试获取同步锁没有获取到，JVM会把线程放入锁池。
    2. 其他阻塞：运行线程执行sleep、I/O阻塞（等待用户输入），JVM会把线程转入阻塞状态。
5. waiting状态：
    1. 调用wait方法，进入waiting状态，会释放对象锁。被notify唤醒会变为runnable状态，被唤醒是从等待池进入锁池重新竞争锁，状态其实是blocked。获取到锁以后才是runnable。
    2. 调用join方法，也会让调用join的线程从runnable变成waiting。
6. 死亡Dead：处于运行状态的线程调用run方法或call方法执行完成后、调用stop方法停止线程、程序执行错误/异常退出，进入死亡状态。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1662652578758-529e74a9-7825-480a-8dec-b998298dc51a.png)

### 线程基本方法
定义：

1. wait
2. notify
3. notifyAll
4. sleep
5. join
6. yield

<font style="background-color:#FADB14;">wait：线程等待</font>

定义：

1. 调用wait进入WAITING状态。
2. 等到其他线程通知或者被中断才会返回。
3. 会释放对象锁。
4. 一般用于同步方法或同步代码块中。

<font style="background-color:#FADB14;">sleep：线程睡眠</font>

定义：

1. 调用sleep会导致当前线程休眠。
2. sleep方法不会释放当前锁。
3. 线程进入TIMED-WAITING状态。

<font style="background-color:#FADB14;">yield：线程让步</font>

定义：

1. 调用yeild会让当前线程释放CPU时间片。
2. 与其他线程一起重新竞争CPU时间片。

<font style="background-color:#FADB14;">interrupt：线程中断</font>

定义：

1. 调用interrupt会改变线程内部的中断标志位。
2. 线程本身不会改变状态。
3. 如果处于sleep阶段，比如调用sleep使线程处于TIMED-WAITING状态，
4. 调用interrupt会抛出InterruptedException。抛异常前会清除中断标志位。
5. 再调用isInterrupted会返回false。

应用：可以安全退出的线程

1. 写一个线程类继承Thread。
2. 重写run方法。
3. 如果isInterrupted是false，那么①正常执行我们的业务逻辑，②之后sleep一会。
4. 在这期间如果sleep过程中，线程被interrupt了，那么会抛异常。
5. 我们把异常捕获。
6. 因为抛异常前会把标志位置为false。
7. 所以我们异常处理中手动把标志位置为true。也就是我们手动interrupt一下。
8. 然后如果标志位是true，我们进行处理资源释放等工作。

代码：

```java
public class SafeInterruptThread extends Thread {
    @Override
    public void run() {
        if(!Thread.currentThread().isInterrupted()) {
            try {
                // 处理正常的线程业务逻辑
                sleep(10);
            } catch(InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        if(Thread.currentThread().isInterrupted()) {
            // 处理线程结束前的一些资源释放和清理工作。
        }
    }
}
SafeInterruptThread thread=new SafeInterruptThread();
thread.interrupt();
```

<font style="background-color:#FADB14;">join：线程加入</font>

定义：

1. join用于等待其他线程终止。
2. 如果当前线程调用一个线程join方法。
3. 则当前线程会阻塞，等到另一个线程结束。
4. 状态由阻塞变为就绪。

举例：

1. 主线程启动子线程。
2. 需要等待子线程返回结果并收集处理再退出。
3. 就需要用到join方法。

<font style="background-color:#FADB14;">notify：线程唤醒</font>

定义：

1. Object类的notify方法。
2. 用于唤醒在monitor对象上等待的一个线程。
3. 我们调用一个对象的wait方法在monitor的等待池中等待。
4. notifyAll类似，唤醒在monitor对象上等待的所有线程。

<font style="background-color:#FADB14;">setDaemon：后台守护线程</font>

定义：

1. 是后台线程。
2. 通过线程对象setDaemon(true)来设置。

例子：

1. 垃圾回收线程。

#### sleep与wait方法的区别？
1. sleep属于Thread类，wait属于Object类。
2. sleep暂停执行，让出CPU给其他线程。指定时间过后恢复运行状态。
3. sleep执行过程中线程不会释放对象锁。
4. wait方法线程会释放对象锁。进入对象的等待锁池。
5. 只有针对此对象调用notify方法，该线程才能进入锁池准备获取对象锁。

#### start方法与run方法区别？
1. start用于启动线程。不需要等待run执行完，可以继续向下执行。
2. 调用start启动一个线程，线程处于就绪状态。
3. 调用run方法后，线程才处于运行状态。



## 2线程的创建方式
1. 继承Thread类
2. 实现Runnable接口
3. 通过ExecutorService和Callable&lt;Class&gt;实现有返回值的线程。
4. 基于线程池创建线程

### 继承Thread类
步骤：

1. 写一个类，继承Thread类。
2. 重写里面的run方法
3. 实例化这个类。
4. 对象调用start()方法启动线程。

### 实现Runnable接口
步骤：

1. 一个类实现Runnable接口。
2. 实现里面的run方法。
3. 实例化这个类。
4. 创建一个线程，把这个对象传入线程实例。
5. 调用线程的start方法启动线程。

### 通过ExecutorService和Callable&lt;Class&gt;实现有返回值的线程
步骤：

1. 一个类实现Callable接口。
2. 实现call方法，并给出返回值。
3. 创建一个线程池。
4. 创建一个list，用于存储任务列表future。
5. 循环创建Callable对象，并提交到线程池执行，获取future并放入list。
6. 关闭线程池，等待线程执行结束。
7. 遍历future list，获取任务的返回值。

作用：

1. 多个子线程并发执行一个任务。
2. 每个线程会有返回的结果。
3. 将返回结果进行汇总。
4. 遍历future list，通过get方法获取返回值。

代码：

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    List<Future> list = new ArrayList<>();
    ExecutorService pool = Executors.newFixedThreadPool(5);
    for (int i=0;i<5;i++) {
        Callable c=new MyCallable(i+" ");
        Future future = pool.submit(c);
        list.add(future);
    }
    pool.shutdown();
    for (Future future: list) {
        System.out.println("get the result:"+future.get().toString());
    }
}
public static class MyCallable implements Callable {
    private String name;
    public MyCallable(String name) {
        this.name = name;
    }
    @Override
    public String call() throws Exception {
        return name;
    }
}
```

### 线程池
步骤：

1. 创建线程池。
2. 往线程池里提交多个任务并执行。

代码：

```java
ExecutorService threadPool=Executors.newFixedThreadPool(10);
for(int i=0;i<10;i++) {
    threadPool.execute(new Runnable() {
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
        }
    })
}
```



## 3线程池
### 好处
1. 可以<font style="background-color:#D3F5F0;">重复利用</font>已创建的线程资源，降低线程创建和销毁造成的消耗，减少资源浪费。

2. 任务到达可以不需要等到线程创建就立即执行，提高响应速度。

3. 由线程池实现对线程统一的<font style="background-color:#D3F5F0;">分配，创建，调优和监控</font>。如果线程无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性。

### 状态
RUNNING：能够接收任务的状态。线程池被创建的初始状态就是RUNNING状态。

SHUTDOWN：不接受新任务，但是已添加的任务可以继续执行。调用线程池的shutdown()接口，可以RUNNING->SHUTDOWN

STOP：停止，不接收新的，不处理已有的，正在处理的会中断。调用shutdownNow()接口。

TIDYING：如果是SHUTDOWN，阻塞队列为空并且执行的任务也为空，变为TIDYING。如果是STOP，执行的任务为空时，变为TIDYING。

TERMINATED：线程池彻底终止。有TIDYING状态调用terminated()会变为TERMINATED状态。



### JDK
java5之后引入，用executor启动线程易于<font style="background-color:#D3F5F0;">管理</font>，<font style="background-color:#D3F5F0;">效率</font>更高（线程池实现）。避免this逃逸问题（this逃逸是指在构造函数返回之前其他线程就持有该对象的引用，调用尚未构造完全的对象的方法可能引发令人疑惑的错误）。

Executor使用线程池流程：

1. 主线程创建实现Runnable或者Callable接口的<font style="background-color:#D3F5F0;">任务</font>对象。

2. 创建线程池（Executors.newFixedThreadPool(5)或者new ThreadPoolExecutor()构造创建）

3. 把Runnable对象或Callable对象提交给executorService执行。executorService.submit(Runnable task)或者executor.execute(Runnable command)，

4. 如果执行executorService.submit(),将返回一个实现Future接口的对象，

5. 最后，主线程可以执行FutureTask.get()方法来<font style="background-color:#D3F5F0;">等待</font>任务执行完成。主线程也可以执行FutureTask.cancel来<font style="background-color:#D3F5F0;">取消</font>次任务的执行。

#### 1. ThreadPoolExecutor
##### <font style="color:#000000;">线程池核心参数</font>
1. int corePoolSize：线程池核心线程数。
2. int maximumPoolSize：线程池的最大线程数。
3. long keepAliveTime：当线程数大于核心线程数时，多余的空闲线程存活时间。
4. TimeUnit unit：keepAliveTime时间单位。
5. BlockingQueue&lt;Runnable&gt; workQueue：任务队列，用来存储等待执行任务的队列。
6. ThreadFactory threadFactory：线程工厂，用来创建线程，可以自定义一般默认。
7. RejectedExecutionHandler handler：拒绝策略，当提交的任务过多而不能及时处理时，我们可以定制策略来处理任务。

##### 线程池拒绝策略
AbortPolicy：抛异常拒绝新任务

CallerRunsPolicy：用调用者的线程运行任务

DiscardPolicy：不处理，直接丢弃掉

DiscardOldestPolicy：丢弃最早的未处理的任务请求。

##### 流程
1. 当提交一个任务给线程池，executorService.submit(task)。
2. 如果运行线程数小于核心线程数，线程池会创建线程。
3. 如果线程数量>=corePoolSize，满了，看<font style="background-color:#D3F5F0;">等待队列</font>是否已满，如果没满，把任务加入任务队列。
4. 如果任务队列满了，看当前线程池<font style="background-color:#D3F5F0;">线程数</font>是否到达maximumPoolSize，最大线程数，如果没有满，创建线程。
5. 如果到最大线程数，按照<font style="background-color:#D3F5F0;">拒绝策略</font>处理。
6. 如果线程数超过corePoolSize，空闲时间超过keepAliveTime，会被认定空闲线程并停止。最后会到corePoolSize大小。



##### 线程池大小设计
如果线程池数量<font style="background-color:#D3F5F0;">太小</font>，如果同一时间<font style="background-color:#D3F5F0;">大量任务</font>需要处理，可能会导致大量请求/任务在排队<font style="background-color:#D3F5F0;">等待</font>，甚至出现任务队列满了之后任务无法处理的情况，或者大量任务堆积在任务队列导致OOM。CPU没有得到充分利用？

如果设置线程数量<font style="background-color:#D3F5F0;">太大</font>，大量线程争夺CPU资源，导致大量上下文<font style="background-color:#D3F5F0;">切换</font>，增加线程执行时间，影响效率。

<font style="background-color:#D3F5F0;">CPU密集型任务（N+1）：</font>这种任务消耗的主要是CPU资源，可以将线程数设置为N（cpu核心数）+1，比CPU核心多出来一个线程是为了防止线程偶发的缺页中断，或者其他原因导致的<font style="background-color:#D3F5F0;">任务暂停</font>而带来的影响。一旦任务暂停，CPU就会处于空闲状态，这种情况下多一个线程可以<font style="background-color:#D3F5F0;">充分利用</font>CPU的空闲时间。

<font style="background-color:#D3F5F0;">IO密集型任务（2N）：</font>这种任务应用起来，系统会用大部分时间来处理<font style="background-color:#D3F5F0;">IO交互</font>，而线程在处理IO的时间段内不会占用CPU，这时可以把<font style="background-color:#D3F5F0;">CPU交出</font>给其他线程使用。所以可以多配置一些线程，2N。

#### 2. newCachedThreadPool
定义：

1. 创建一个缓存线程池。

特点：

1. 创建新线程时，如果有可重用线程(任务已经完成但还没有关闭)，则重用。
2. 否则重新创建一个新的线程并添加线程池。
3. 重用线程提高性能。
4. 没有线程池数量限制，而且会回收不执行任务的线程。

```java
ExecutorService executorService1=Executors.newCachedThreadPool();
```

#### 3. newFixedThreadPool
定义：

1. 用于创建固定线程数量的线程池。和ThreadPoolExecutor类似。

特点：

1. 使用无界阻塞队列（容量Integer.MAX_VALUE）。
2. 当线程池中的线程数达到corePoolSize后，新任务在无界队列中等待。
3. 因此线程数不会超过corePoolSize。
4. 最大线程数maximumPoolSize将是一个无效参数，因为不可能存在任务队列满的情况，源码=corePoolSize。
5. 不会拒绝任务，当任务较多时会OOM。
6. 因此keepAliveTime将是无效参数。

```java
ExecutorService executorService=Executors.newFixedThreadPool(3);
```

#### 4. newScheduledThreadPool
定义：

1. 创建了一个可定时调度的线程池。
2. 可以设置给定延迟时间执行。
3. 可以设置定期执行某个任务。

```java
ScheduledExecutorService scheduledThreadPool=Executors.newScheduledThreadPool(3);
//1.创建一个延迟3秒执行的线程
scheduledThreadPool.schedule(new Runnable() {
    @Override
    public void run() {
        System.out.println("delay 3 seconds execu.");
    }
}, 3, TimeUnit.SECONDS);
//2.创建一个延迟1秒执行且每3秒执行一次的线程
scheduledThreadPool.scheduledAtFixedRate(new Runnable() {
    @Override
    public void run() {
        System.out.println("delay 1 seconds,repeat execute
                           every 3 seconds");
    }
},1,3,TimeUnit.SECONDS);
```

#### 5. newSingleThreadExecutor
定义：

1. 保证永远有且只有1个可用线程。
2. 如果线程出现了异常停止了，线程池会启动一个新的线程代替继续执行。

### Spring线程池
#### 1. spring普通线程池
ThreadPoolTaskExecutor

```java
@Autowired
private ThreadPoolTaskExecutor threadPoolTaskExecutor;
```

#### 2. spring可执行定时任务线程池：
ThreadPoolTaskScheduler

```java
@Autowired
private ThreadPoolTaskScheduler threadPoolTaskScheduler;
```

## 4实践
### 线程池实践之jdk线程池
```java
// 1.JDK普通线程池
@Test
public void testExecutorService() {
    Runnable task = new Runnable() {
        @Override
        public void run() {
            logger.debug("Hello ExecutorService");
        }
    };
    for (int i = 0; i < 10; i++) {
        executorService.submit(task);
    }
    sleep(10000);
}

// 2. JDK执行定时任务线程池
@Test
public void testScheduledExecutorService() {
    Runnable task = new Runnable() {
        @Override
        public void run() {
            logger.debug("Hello ScheduledExecutorService");
        }
    };
    // 延迟10000毫秒，时间间隔是1000毫秒，时间单位
    scheduledExecutorService.scheduleAtFixedRate(task, 10000, 1000, TimeUnit.MILLISECONDS);
    sleep(30000);
}
```

### 线程池实践之异步刷新阅读数
用户点开博文详情的时候，阅读数会对应的加一，这个阅读数加一是需要修改mysql数据库的数据的，是需要访问磁盘的，所以希望在不影响用户看文章的情况下进行数据库操作，所以采用了多线程异步刷新阅读数的操作，实现就通过spring的线程池实现的。

1. 线程池注入，使用spring的线程池，ThreadPoolTaskExecutor

```java
@Configuration
@EnableAsync
public class ThreadPoolConfig {
    @Bean("taskExecutor")
    public Executor asyncServiceExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // 设置核心线程数
        executor.setCorePoolSize(5);
        // 设置最大线程数
        executor.setMaxPoolSize(20);
        //配置队列大小
        executor.setQueueCapacity(Integer.MAX_VALUE);
        // 设置线程活跃时间（秒）
        executor.setKeepAliveSeconds(60);
        // 设置默认线程名称
        executor.setThreadNamePrefix("码神之路博客项目");
        // 等待所有任务结束后再关闭线程池
        executor.setWaitForTasksToCompleteOnShutdown(true);
        //执行初始化
        executor.initialize();
        return executor;
    }
}
```

2. 执行刷新阅读数操作，也就是线程池需要执行的任务，这个任务要做的事，首先获取阅读数，这里记录一下一会有用。这里使用了一个乐观锁，<font style="background-color:#D3F5F0;">阅读数</font>相当于一个版本号，在更新也就是阅读数+1的同时看一下当前数据库中的阅读数是不是和我刚才记录下来的阅读数一样，避免并发修改出现问题。

```java
@Component
public class ThreadService {
    // 期望此操作在线程池执行，不会影响原有的主线程
    @Async("taskExecutor")
    public void updateArticleViewCount(ArticleMapper articleMapper, Article article) {
        int viewCounts = article.getViewCounts();
        // 1个bug，创建对象，这个对象中值对应是基本类型，默认是0，mybatisplus把0值更新到数据库中.只要不为null，就更新
        // 我们要更新viewCount,但是把comment_counts,weight更新成0了。
        Article articleUpdate=new Article();

        articleUpdate.setViewCounts(viewCounts+1);
        LambdaUpdateWrapper<Article> updateWrapper=new LambdaUpdateWrapper<>();
        updateWrapper.eq(Article::getId,article.getId());
        //设置一个，为了在多线程的环境下线程安全
        updateWrapper.eq(Article::getViewCounts,viewCounts);
        // update article set view_count=100 where view_count =99 and id=***
        articleMapper.update(articleUpdate,updateWrapper);
        try {
            // Thread.sleep(5000);
            System.out.println("更新完成了");

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

3. 在访问查看文章详情接口时，执行异步刷新阅读数操作

```java
@Autowired
private ThreadService threadService;
@Override
public Result findArticleById(Long articleId) {
    /**
     * 1. 根据文章显示文章详情(文章->body，tag，分类categorid)
     * 2. 根据bodyId和categoryid去做关联查询
     */
    Article article = this.articleMapper.selectById(articleId);

    ArticleVo articleVo = copy(article, true, true,true,true);
    // 查看完文章了，新增阅读数，有没有问题呢？
    // 查看完文章之后，本应该直接返回数据了，这时候做了一个更新操作，更新时加写锁，阻塞其他读操作,性能会比较低
    // 更新 增加了此次接口的耗时，如果一旦更新出问题，不能影响查看文章的操作
    // 线程池，可以把更新操作扔到线程池中执行，和主线程就不相关了
    threadService.updateArticleViewCount(articleMapper,article);

    return Result.success(articleVo);
}
```



### 缓存击穿问题
kyx逻辑过期：不设置ttl。不保证一致性。

过期了，锁[开一个新线程去做更新，我就返回一个旧的。]释放。

如果一个线程查询到数据发现过期了，那么尝试获取锁，如果获取到锁了，那么新开一个线程去做缓存重建的工作，然后把逻辑过期的旧数据返回。这样另外一个线程在缓存重建未成功时进去了，也发现过期了，那么他也尝试获取锁，不过没获取到，那么它就知道有其他线程在做缓存重建的工作，那么它也是直接把旧数据返回。它不能保证数据的一致性，但是能保证可用性。

这里使用的线程池就是JDK普通线程池，ThreadPoolExecutor。

```java
private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);

public  <ID, R> R huancunjichuanluojiguoqi(
        String keypreix, ID id, Class<R> type, Function<ID, R> function, Long time, TimeUnit timeUnit) {
    // 从redis获取商铺信息
    String rstring = stringRedisTemplate.opsForValue().get(keypreix + id);

    // 如果为空返回空
    if (StrUtil.isBlank(rstring)) {
        // 因为热点数据默认缓存里都有，如果没有说明数据库里应该也没有
        return null;
    }
    // 如果不为空，判断expiretime是否过期
    RedisData redisData = JSONUtil.toBean(rstring, RedisData.class);
    JSONObject data = (JSONObject) redisData.getData();
    R r1 = JSONUtil.toBean(data, type);
    LocalDateTime expireTime = redisData.getExpireTime();
    if (expireTime.isAfter(LocalDateTime.now())) {
        // 如果没过期直接返回
        return r1;
    }
    // 如果过期了,看是否能获取锁
    boolean b1 = tryLock(LOCK_SHOP_KEY+id);
    // 如果获取不到锁,把旧的返回
    if (b1) {
        // 如果能获取锁,开一个线程去重建redis
        CACHE_REBUILD_EXECUTOR.submit(() -> {
            try {
                R r2 = function.apply(id);
                cunWithLjtime(keypreix, id, r2, time, timeUnit);
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                unLock(LOCK_SHOP_KEY+id);
            }
        });
    }
    // 重建还是没获取到锁都返回旧的值
    return r1;
}

private boolean tryLock(String key) {
    Boolean aBoolean = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", LOCK_SHOP_TTL, TimeUnit.SECONDS);
    return BooleanUtil.isTrue(aBoolean);
}
private void unLock(String key) {
    stringRedisTemplate.delete(key);
}

// 存redis逻辑过期时间
public <ID, R> void cunWithLjtime(String keypreix, ID id, R r, Long time, TimeUnit unit) {
    String key = keypreix + id;
    RedisData redisData = new RedisData();
    redisData.setData(r);
    redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)));
    stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
}
```



### 线程池实践之异步上传七牛云
消费者消费分享长图事件。用一个wk，toimage大概就是这么个工具，给他传递一个url，生成长图，存到服务端，某一个位置。然后用spring可执行定时任务的线程池，去执行定时查看是否生成成功，然后<font style="background-color:#FADB14;">上传</font>到七牛云的操作。

1. 创建任务，实现Runnable接口

```java
class UploadTask implements Runnable {
    // 文件名称
    private String fileName;
    // 文件后缀
    private String suffix;
    // 启动任务的返回值
    private Future future;
    // 开始时间
    private long startTime;
    // 上传次数
    private int uploadTimes;
    public UploadTask(String fileName, String suffix) {
        this.fileName = fileName;
        this.suffix = suffix;
        this.startTime = System.currentTimeMillis();
    }

    public void setFuture(Future future) {
        this.future = future;
    }

    @Override
    public void run() {
        // 生成失败
        if (System.currentTimeMillis() - startTime > 30000) {
            logger.error("执行时间过长，终止任务："+fileName);
            future.cancel(true);
            return;
        }
        // 上传失败
        if (uploadTimes >= 3) {
            logger.error("上传次数过多，终止任务："+fileName);
            future.cancel(true);
            return;
        }
        String path = wkImageStorage + "/" + fileName + suffix;
        File file = new File(path);
        if (file.exists()) {
            logger.info(String.format("开始第%d次上传[%s].", ++uploadTimes, fileName));
            // 设置响应信息
            StringMap policy = new StringMap();
            policy.put("returnBody", CommunityUtil.getJSONString(0));
            // 生成上传凭证
            Auth auth = Auth.create(accessKey, secretKey);
            String uploadToken = auth.uploadToken(shareBucketName, fileName, 3600, policy);
            // 指定上传机房
            UploadManager manager = new UploadManager(new Configuration(Zone.zone1()));
            try {
                // 开始上传图片
                Response response = manager.put(
                    path, fileName, uploadToken, null, "image/" + suffix, false
                );
                // 处理响应结果
                JSONObject json = JSONObject.parseObject(response.bodyString());
                if (json == null || json.get("code")==null||!json.get("code").toString().equals("0")) {
                    logger.info(String.format("第%d次上传失败[%s].",uploadTimes, fileName));
                } else {
                    logger.info(String.format("第%d次上传成功[%s].", uploadTimes, fileName));
                    future.cancel(true);
                }
            } catch (QiniuException e) {
                logger.info(String.format("第%d次上传失败[%d].", uploadTimes, fileName));
            }
        } else {
            logger.info("等待图片生成["+fileName+"].");
        }
    }
}
```

2. kafka消费者生成长图，线程池上传七牛云。

```java
@Autowired
private ThreadPoolTaskScheduler taskScheduler;

@KafkaListener(topics = TOPIC_SHARE)
public void handleShareMessage(ConsumerRecord record) {
    if (record == null || record.value() == null) {
        logger.error("消息的内容为空！");
        return;
    }
    Event event = JSONObject.parseObject(record.value().toString(), Event.class);
    if (event == null) {
        logger.error("消息格式错误！");
        return;
    }

    String htmlUrl = (String) event.getData().get("htmlUrl");
    String fileName = (String) event.getData().get("fileName");
    String suffix = (String) event.getData().get("suffix");

    String cmd = wkImageCommand + " --quality 75 "
        + htmlUrl + " " + wkImageStorage + "/" + fileName + suffix;

    try {
        Runtime.getRuntime().exec(cmd);
        logger.info("生成长图成功："+cmd);
    } catch (IOException e) {
        logger.error("生成长图失败："+e.getMessage());
    }

    // 启用定时器，监视该图片，一旦生成了，则上传至七牛云
    UploadTask task = new UploadTask(fileName, suffix);
    Future future = taskScheduler.scheduleAtFixedRate(task, 500);
    task.setFuture(future);
}
```

# ·锁
## <font style="color:rgb(36, 41, 46);">为什么要加锁？</font>
### <font style="color:rgb(36, 41, 46);">为什么加锁/分类</font>
1. 保障多线程并发情况下数据一致性。
2. 同一时刻只有一个线程访问共享变量。

分类：

1. 乐观悲观：乐观锁和悲观锁。
2. 公平性角度：公平锁和非公平锁。
3. 是否共享资源：共享锁和独占锁。
4. 锁的状态：偏向锁、轻量级锁和重量级锁。

### <font style="color:rgb(36, 41, 46);">乐观锁/悲观锁</font>
乐观锁：

1. 乐观
2. 每次读取数据认为别人不会修改，读不加锁。
3. 更新会判断别人有没有更新该数据。
4. 步骤：读，比较，写。
5. 读取版本号，比较当前版本号和上一次是否一致，如果一致写。否则重复。

举例：

1. java中乐观锁通过CAS操作实现。
2. 比较当前值和传入值是否一样，一样更新，否则不更新。

悲观锁：

1. 悲观。
2. 读取数据认为别人会修改数据。
3. 读写数据都加锁。
4. 这样别人读写数据会阻塞，直到获取到锁。

## <font style="color:rgb(36, 41, 46);">悲观锁</font>
### <font style="color:rgb(36, 41, 46);">synchronized</font>
#### <font style="color:rgb(36, 41, 46);">特点</font>
+ <font style="color:rgb(36, 41, 46);">JVM关键字。</font>
+ <font style="color:rgb(36, 41, 46);">可以加在方法、代码块上。实现线程安全。</font>
+ <font style="color:rgb(36, 41, 46);">作用于非静态方法，锁住的是对象实例。作用于静态方法，锁住的是Class对象。</font>
+ <font style="color:rgb(36, 41, 46);">非公平锁：获取锁的顺序不一定就是线程申请锁时的顺序。</font>
+ <font style="color:rgb(36, 41, 46);">可重入。外层函数获取锁后，内层递归函数仍然可以获取锁。</font>
+ <font style="color:rgb(36, 41, 46);">可以阻塞其他线程。</font>
+ <font style="color:rgb(36, 41, 46);">锁膨胀</font>
    - <font style="color:rgb(36, 41, 46);">偏向锁->轻量级锁->重量级锁。</font>
+ <font style="color:rgb(36, 41, 46);">锁优化</font>
    - <font style="color:rgb(36, 41, 46);">自旋锁、锁消除、锁粗化。</font>

#### <font style="color:rgb(36, 41, 46);">原理</font>
##### <font style="color:rgb(36, 41, 46);">对象头</font>
<font style="color:rgb(36, 41, 46);">对象的基本结构：  
</font>![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654763479270-11f6c320-b8a0-4ba8-a6e9-4a25cc2fcb72.png)<font style="color:rgb(36, 41, 46);">  
</font><font style="color:rgb(36, 41, 46);">MarkWord：下面给出Markword的5种情况。  
</font>![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654763479273-6588c6c1-dff2-42a0-a40a-b45f39387431.png)

##### <font style="color:rgb(36, 41, 46);">重量级锁</font>
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654763479285-c6593025-f861-41ec-9e8b-cd6e0bdb11c0.png)
<font style="color:rgb(36, 41, 46);">从上面MarkWord重量级锁的情况可以看出，末两位锁标志是10，同时存储Monitor对象引用。</font>
<font style="color:rgb(36, 41, 46);">Monitor：</font>

+ <font style="color:rgb(36, 41, 46);">owner：指向当前持有锁的线程。</font>
+ <font style="color:rgb(36, 41, 46);">EntryList：当有其他线程竞争锁没有获取到进入该队列，状态为Blocked。</font>
+ <font style="color:rgb(36, 41, 46);">WaitSet：当持有锁的线程调用wait方法，进入该队列，如果被唤醒会进入EntryList竞争锁。  
  </font><font style="color:rgb(36, 41, 46);">如果每次加锁都需要关联这样一个Monitor对象，正如它的名字一样，太“重”了，并且如果没有线程竞争锁，entrylist和waitSet就是空的，没有必要用这样一个monitor对象，因此出现了轻量级锁。</font>

##### <font style="color:rgb(36, 41, 46);">轻量级锁</font>
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654763479103-18035bbf-af28-408e-bee4-b0f6f24e808a.png)<font style="color:rgb(36, 41, 46);">每次加锁和释放都需要MarkWord和锁记录进行一次cas交换，如果是单线程，加锁和释放也需要交换，因此出现了偏向锁。</font>

##### <font style="color:rgb(36, 41, 46);">偏向锁</font>
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654763479133-479cd7eb-8c9c-43e3-be8f-023a16db5094.png)<font style="color:rgb(36, 41, 46);">如果单线程访问，只需要进行一次cas，发现对象头的线程id是我当前的线程，那么释放锁和加锁不需要向轻量级锁那样进行cas；如果多线程访问会发生锁膨胀。</font>

##### <font style="color:rgb(36, 41, 46);">锁膨胀流程</font>
<font style="color:rgb(36, 41, 46);">synchronized加锁首先加偏向锁，如果只是</font>**<font style="color:rgb(36, 41, 46);">单线程</font>**<font style="color:rgb(36, 41, 46);">访问，偏向锁只需要一次cas。  
</font><font style="color:rgb(36, 41, 46);">如果有</font>**<font style="color:rgb(36, 41, 46);">多线程</font>**<font style="color:rgb(36, 41, 46);">尝试获取锁，会膨胀成轻量级锁，每次加锁和释放都需要进行cas。  
</font><font style="color:rgb(36, 41, 46);">当</font>**<font style="color:rgb(36, 41, 46);">多线程同时竞争</font>**<font style="color:rgb(36, 41, 46);">锁，会膨胀成重量级锁，竞争的线程会被加入entrylist。</font>

#### <font style="color:rgb(36, 41, 46);">优化</font>
<font style="color:rgb(36, 41, 46);">JDK1.6做了很多关于synchronized的优化。</font>

##### <font style="color:rgb(36, 41, 46);">自旋锁</font>
<font style="color:rgb(36, 41, 46);">如果线程竞争锁失败会被加入EntryList，但是线程进行阻塞唤醒是耗费资源的，消耗CPU上下文切换。自旋锁优化就是在</font>**<font style="color:rgb(36, 41, 46);">竞争锁失败</font>**<font style="color:rgb(36, 41, 46);">时自旋重试几次，很有可能在重试过程中就获取到锁了，获取到锁就不必阻塞了。JDK1.6默认开启的，重试次数默认是10。缺点是自旋会占用CPU。</font>

##### <font style="color:rgb(36, 41, 46);">自适应自旋锁</font>
<font style="color:rgb(36, 41, 46);">顾名思义，就是会按照之前自旋次数进行自适应的改变。</font>

##### <font style="color:rgb(36, 41, 46);">锁消除</font>
<font style="color:rgb(36, 41, 46);">在一些没有操作共享资源的代码上加锁是没有必要的，jvm会自动进行锁消除。正常情况下我们是不会写出这样的代码的，有些特殊情况，比如StringBuffer内部是使用synchronized同步的，如果StringBuffer是局部变量，是不会被多线程访问的，当执行一些append方法，内部的synchronized锁会被jvm优化消除掉。</font>

##### <font style="color:rgb(36, 41, 46);">锁粗化</font>
<font style="color:rgb(36, 41, 46);">打个比方，循环100次，每次调用StringBuffer的append方法，会进行100次的加锁和释放操作。jvm会进行一个优化，把加锁和释放操作提到循环的外面，就不必做那么多次的加锁和释放了。</font>

### <font style="color:rgb(36, 41, 46);">ReentrantLock</font>
#### ReentrantLock
实现：

1. 实现Lock接口。
2. 是一个可重入的独占锁。
3. 通过自定义队列同步器AQS来实现锁的获取和释放。
4. 同一时刻只能一个线程获取锁，其他线程在同步队列中等待。

特点：

1. 可重入，一个线程对同一个资源执行多次加锁操作。
2. 支持公平锁和非公平锁(默认)。非<font style="color:rgb(36, 41, 46);">获取锁的顺序不一定就是线程申请锁时的顺序。</font>
3. <font style="color:rgb(36, 41, 46);">可响应中断锁。lock.lockInterruptibly();</font>
4. <font style="color:rgb(36, 41, 46);">可轮询锁请求。tryLock();返回true或false。</font>
5. <font style="color:rgb(36, 41, 46);">定时锁等345避免线程死锁的方法。tryLock(long time, timeUnit)</font>
6. <font style="color:rgb(36, 41, 46);">支持条件变量。</font>
7. <font style="color:rgb(36, 41, 46);">变量state代表重入锁的次数。如果释放多，抛IllegalMonitorStateException异常。</font>
8. <font style="color:rgb(36, 41, 46);">只有state=0时，其他线程才允许获得锁。</font>

<font style="color:rgb(36, 41, 46);">实现：</font>

```java
public static ReentrantLock lock=new ReentrantLock();
lock.lock();
try {
    // i++
} finally {
    lock.unlock();
}
```



## <font style="color:rgb(36, 41, 46);">乐观锁</font>
### <font style="color:rgb(36, 41, 46);">CAS</font>
#### <font style="color:rgb(36, 41, 46);">定义</font>
<font style="color:rgb(36, 41, 46);">CAS就是compare and swap，比较并交换，3个参数分别是V内存值,A旧值,B新值，只有当A等于V时，才把内存值更换为B。乐观锁的实现就可以采用CAS，如果CAS失败了，就循环重试，直到成功。</font>

#### <font style="color:rgb(36, 41, 46);">怎么用？</font>
<font style="color:rgb(36, 41, 46);">一般使用volatile关键字修饰共享变量保证可见性，while(true)循环中用CAS更新该变量，如果更新成功跳出循环。例如atomic包中的原子类大多采用CAS方式实现数据操作的原子性。</font>

#### <font style="color:rgb(36, 41, 46);">问题</font>
1. <font style="color:rgb(36, 41, 46);">ABA问题：变量从A变成B，再从B变成A，CAS会误判认为该变量没有发生过改变。可以加时间戳解决，例如atomic包下AtomicStampedReference。</font>
2. <font style="color:rgb(36, 41, 46);">循环时间长开销大，CAS自旋消耗CPU资源。</font>
3. <font style="color:rgb(36, 41, 46);">只能保证一个共享变量的原子操作。如果有多个需要加锁处理。</font>

## <font style="color:rgb(36, 41, 46);">锁优化</font>
1. 减少锁持有的时间。
2. 减小锁粒度。ConcurrentHashMap的分段锁。
3. 锁分离：读写锁。
4. 锁粗化。
5. 锁消除。

## 其他锁
### Semaphore
定义：

1. 基于计数的信号量。
2. 定义信号量对象时可以设定一个阈值。
3. 线程竞争到许可信号后可以执行业务逻辑。
4. 执行完以后释放许可信号。

特点：

1. 和ReentrantLock类似。
2. 设为1，可以用于互斥锁。

用法：

```java
Semaphore semp=new Semaphore(5);
try {
    semp.acquire(); // 申请许可
    try {
        // 业务逻辑
    } catch(Exception e) {}
    finally {
        semp.release(); //释放许可
    }
} catch(InterruptedException e) {}
```

### AtomicInteger
背景：

1. 多线程环境下++i，i++不具有线程安全。
2. 可以加synchronized锁或者ReentrantLock，不过都是重量级锁。
3. 因此一些原子操作类出现了。
4. 比如AtomicInteger为Integer提供原子操作。

使用：

1. 定义一个原子操作数。AtomicInteger safeCounter=new AtomicInteger(0);
2. 自增：safeCounter.getAndIncrement();



### ReadWriteLock接口
定义：

1. 读锁不互斥。
2. 读锁和写锁互斥。
3. 读的地方使用读锁。
4. 写的地方使用写锁。

实现：

1. ReentrantReadWriteLock

使用：

```java
private final ReentrantReadWriteLock rwLock=new ReentrantReadWriteLock();
private final Lock readLock=rwLock.readLock();
private final Lock wrietLock=rwLock.writeLock();
// 加读锁
readLock.lock();
try {
    // 读
} finally {readLock.unLock();}
```

### CountDownLatch
作用：

1. 主线程定义CountDownLatch。
2. 子线程执行完毕后，latch.countDown();计数器减一。
3. 主线程latch.await();主线程阻塞，当所有线程都执行完毕后。主线程继续执行。

```java
public class CountdownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        final int totalThread= 10;
        CountDownLatch countDownLatch=new CountDownLatch(totalThread);
        ExecutorService executorService= Executors.newCachedThreadPool();
        for(int i=0;i<totalThread;i++){
            executorService.execute(()->{
                System.out.print("run...");
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        System.out.println("end");
        executorService.shutdown();
    }
}
```

### CyclicBarrier
当多个线程同时到达一个条件时，一起向下执行。

```java
public class CyclicBarrierExample {
    public static void main(String[] args) {
        final int totalThread=10;
        CyclicBarrier cycliBarrier=new CyclicBarrier(totalThread);
        ExecutorService executorService= Executors.newCachedThreadPool();
        for(int i=0;i<totalThread;i++){
            executorService.execute(()->{
                System.out.print("before..");
                try{
                    cycliBarrier.await();
                }catch(InterruptedException| BrokenBarrierException e) {
                    e.printStackTrace();
                }
                System.out.print("after...");
            });
        }
        executorService.shutdown();
    }
}
```

### <font style="color:rgb(36, 41, 46);">AQS</font>
#### <font style="color:rgb(36, 41, 46);">定义</font>
1. 多线程访问共享资源的框架。
2. <font style="color:rgb(36, 41, 46);">用来实现锁或者同步器。</font>
3. <font style="color:rgb(36, 41, 46);">例如ReentrantLock、CountDownLatch、CyclicBarrier、Semaphore、ReentrantReadWriteLock、FutureTask。</font>

#### <font style="color:rgb(36, 41, 46);">原理</font>
1. 维护一个共享资源状态volatile int state。
2. 和一个先进先出队列。
3. <font style="color:rgb(36, 41, 46);">如果资源空闲，那么线程直接可以获取该资源。</font>
4. <font style="color:rgb(36, 41, 46);">如果不是空闲，会把线程加入到CLH队列等待被唤醒。</font>
5. <font style="color:rgb(36, 41, 46);">CLH是一个双向链表，节点代表线程。</font>
6. <font style="color:rgb(36, 41, 46);">对state的写操作是基于CAS实现的。  
   </font>

实现

1. <font style="color:rgb(36, 41, 46);">资源共享方式又分为共享式和独占式。</font>
2. <font style="color:rgb(36, 41, 46);">独占式的实现如：ReentrantLock。只能一个线程执行。</font>
3. <font style="color:rgb(36, 41, 46);">共享式的实现如：Semaphore、CountDownLatch。可以多个线程同时执行。</font>

#### <font style="color:rgb(36, 41, 46);">实现同步器</font>
1. <font style="color:rgb(36, 41, 46);">模板方法模式，写一个类继承AQS，实现里面的方法。</font>
2. <font style="color:rgb(36, 41, 46);">实现同步器传入AQS，里面调用方法，传入我们自己实现的类的对象，就可以执行我们自己重写的方法了。</font>

# ·<font style="color:rgb(36, 41, 46);">JMM</font>
## <font style="color:rgb(85, 85, 85);">计算机内存模型</font>
<font style="color:rgb(85, 85, 85);">Java内存模型相当于在计算机内存模型的基础上做了一些事情，那我先说一下计算机内存模型吧。</font>

1. <font style="color:rgb(85, 85, 85);">计算机在执行程序的时候，每条指令都是在CPU中执行的，而执行的时候需要进行数据的读写，数据是存放在内存中的。</font>
2. <font style="color:rgb(85, 85, 85);">CPU的执行速度是很快的。相比之下内存的读写速度就慢的多。这就会导致CPU每次操作都会因为内存而耗费很多时间。</font>
3. <font style="color:rgb(85, 85, 85);">所以，解决办法就是在CPU和内存之间增加缓存，用缓存就是保存一份数据。缓存的特点就是速度快，内存小，并且贵。</font>
4. <font style="color:rgb(85, 85, 85);">那么，在读数据时就可以从高速缓存中读，如果没有去主存拿，然后写入缓存。</font>
5. <font style="color:rgb(85, 85, 85);">CPU缓存可以分为一级缓存（L1），二级缓存（L2）和三级缓存（L3）。一级缓存离CPU最近，成本也最高，容量最小，速度最快。</font>
6. <font style="color:rgb(85, 85, 85);">单核CPU只含有一套L1，L2，L3缓存；如果CPU含有多个核心，即多核CPU，则每个核心都含有一套L1、L2、L3缓存，L3缓存是多核共享的。</font>

### <font style="color:rgb(85, 85, 85);">缓存一致性问题</font>
1. <font style="color:rgb(85, 85, 85);">单线程或者是单核多线程都不会产生缓存数据不一致问题，因为同一时刻只能有一个线程操作数据。</font>
2. **<font style="color:rgb(85, 85, 85);">单线程</font>**<font style="color:rgb(85, 85, 85);">：cpu核心的缓存只被一个线程访问。缓存独占，不会出现访问冲突等问题。</font>
3. **<font style="color:rgb(85, 85, 85);">单核CPU，多线程。</font>**<font style="color:rgb(85, 85, 85);">进程中的多个线程会同时访问进程中的共享数据，CPU将某块内存加载到缓存后，不同线程在访问相同的物理地址的时候，都会映射到相同的缓存位置，这样即使发生线程的切换，缓存仍然不会失效。但由于任何时刻只能有一个线程在执行，因此不会出现缓存访问冲突。</font>
4. **<font style="color:rgb(85, 85, 85);">多核CPU，多线程。</font>**<font style="color:rgb(85, 85, 85);">每个核都会有自己对应的缓存。多个线程执行可能在不同的cpu上运行，也就会访问不同核心上的缓存，不同核心的cache可能会产生数据不一致的情况。由于多核cpu是可以并行执行的，可能会出现多个线程同时写各自的缓存的情况，而各自的cache之间的数据就有可能不同。</font>

<font style="color:rgb(85, 85, 85);">在CPU和主存之间增加缓存，在多线程场景下就可能存在</font>**<font style="color:rgb(85, 85, 85);">缓存一致性问题</font>**<font style="color:rgb(85, 85, 85);">，也就是说，在多核CPU中，每个核的自己的缓存中，关于同一个数据的缓存内容可能不一致。</font>

### <font style="color:rgb(85, 85, 85);">指令重排</font>
1. <font style="color:rgb(85, 85, 85);">还有一个问题，我们的处理器可能会进行一些优化，对输入代码进行修改执行顺序，从而提高运算效率。</font>
2. <font style="color:rgb(85, 85, 85);">类似的比如java中，JVM的即时编译器（JIT）也会做</font>**<font style="color:rgb(85, 85, 85);">指令重排</font>**<font style="color:rgb(85, 85, 85);">。指令重排的话，可能会导致并发问题。</font>

## java内存模型
### <font style="color:rgb(85, 85, 85);">并发编程的问题</font>
1. <font style="color:rgb(85, 85, 85);">并发编程的问题：原子性问题，可见性问题和有序性问题。</font>
2. <font style="color:rgb(85, 85, 85);">导致这些问题的底层原因就是缓存一致性问题、处理器优化问题和指令重排问题等。</font>
3. **<font style="color:rgb(85, 85, 85);">原子性</font>**<font style="color:rgb(85, 85, 85);">是指一个操作要么不执行，要么就全部执行完成。</font>
4. **<font style="color:rgb(85, 85, 85);">可见性</font>**<font style="color:rgb(85, 85, 85);">是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。就是缓存一致性问题。</font>
5. **<font style="color:rgb(85, 85, 85);">有序性</font>**<font style="color:rgb(85, 85, 85);">即程序执行的顺序按照代码的先后顺序执行。就是指令重排问题。</font>

### <font style="color:rgb(85, 85, 85);">什么是内存模型</font>
<font style="color:rgb(85, 85, 85);">前面提到的，缓存一致性问题、处理器器优化的指令重排问题是硬件的不断升级导致的。</font>

1. <font style="color:rgb(85, 85, 85);">内存模型就是保证并发编程问题：原子性、可见性、有序性。对应处理器优化问题、缓存一致性问题和指令重排问题。</font>
2. <font style="color:rgb(85, 85, 85);">内存模型是一种规范。</font>
3. <font style="color:rgb(85, 85, 85);">规范对内存的读写操作，使指令正确执行，保证并发场景下的原子性一致性有序性。</font>
4. <font style="color:rgb(85, 85, 85);">内存模型解决并发问题主要采用两种方式：</font>**<font style="color:rgb(85, 85, 85);">限制处理器优化</font>**<font style="color:rgb(85, 85, 85);">和</font>**<font style="color:rgb(85, 85, 85);">使用内存屏障</font>**<font style="color:rgb(85, 85, 85);">。</font>

### <font style="color:rgb(85, 85, 85);">什么是Java内存模型</font>
定义：

1. Java内存模型是属于内存模型的一个实现，不同语言实现可能不同。
2. 内存模型就是保证并发编程问题：原子性、可见性、有序性。
3. Java内存模型就是一种规范。

实现：

1. <font style="color:rgb(85, 85, 85);">Java内存模型规定的内容就是所有的变量都存储在主内存中，主内存可以类比于主存。</font>
2. <font style="color:rgb(85, 85, 85);">每个线程有自己的工作内存，存储线程运行中是用到的变量的副本，类比于cpu和内存之间的缓存。</font>
3. <font style="color:rgb(85, 85, 85);">线程对变量的所有操作都在工作内存中进行，而不能直接操作主内存。</font>
4. <font style="color:rgb(85, 85, 85);">线程之间不能直接访问对方工作内存中的数据。</font>
5. <font style="color:rgb(85, 85, 85);">工作内存和主存之间可以进行数据传递，依赖主内存作为媒介，实现不同工作线程的数据传递。</font>
6. <font style="color:rgb(85, 85, 85);">比如写数据，需要把新值同步回主内存，在读数据，先从主内存刷新变量值。</font>

<font style="color:rgb(85, 85, 85);">注意：</font>

1. <font style="color:rgb(85, 85, 85);">主内存和工作内存与JVM内存结构中的Java堆、栈、方法区等并不是同一个层次的内存划分，无法直接类比。</font>
2. <font style="color:rgb(85, 85, 85);">如果一定要勉强对应起来的话，从变量、主内存、工作内存的定义来看，主内存主要对应于Java堆中的对象实例数据部分。工作内存则对应于虚拟机栈中的部分区域。</font>

## <font style="color:rgb(85, 85, 85);">Java内存模型的实现</font>
1. <font style="color:rgb(85, 85, 85);">比如</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">volatile</font><font style="color:rgb(85, 85, 85);">、</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">、</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">final</font><font style="color:rgb(85, 85, 85);">、</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">concurren</font><font style="color:rgb(85, 85, 85);">包等。</font>
2. <font style="color:rgb(85, 85, 85);">这些就是Java内存模型封装了底层的实现后提供的一些关键字。</font>
3. <font style="color:rgb(85, 85, 85);">我们可以直接使用这些关键字来控制并发。</font>
4. <font style="color:rgb(85, 85, 85);">需要关心底层的编译器优化、缓存一致性等问题。</font>
5. <font style="color:rgb(85, 85, 85);">所以，</font>**<font style="color:rgb(85, 85, 85);">Java内存模型，除了定义了一套规范，还提供了一系列原语，封装了底层实现后，供开发者直接使用。</font>**

### <font style="color:rgb(85, 85, 85);">原子性</font>
1. <font style="color:rgb(85, 85, 85);">在Java中可以使用</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">来保证方法和代码块内的操作是原子性的。</font>

### <font style="color:rgb(85, 85, 85);">可见性</font>
1. <font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">volatile</font><font style="color:rgb(85, 85, 85);">修饰的变量在被修改后可以立即同步到主内存。</font>
2. <font style="color:rgb(85, 85, 85);">每次读取都从主内存刷新。</font>
3. <font style="color:rgb(85, 85, 85);">因此，可以使用</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">volatile</font><font style="color:rgb(85, 85, 85);">来保证多线程操作时变量的可见性。</font>
4. <font style="color:rgb(85, 85, 85);">除了</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">volatile</font><font style="color:rgb(85, 85, 85);">，</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">和</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">final</font><font style="color:rgb(85, 85, 85);">两个关键字也可以实现可见性。</font>

### <font style="color:rgb(85, 85, 85);">有序性</font>
1. <font style="color:rgb(85, 85, 85);">在Java中，可以使用</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">和</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">volatile</font><font style="color:rgb(85, 85, 85);">来保证多线程之间操作的有序性。</font>
2. <font style="color:rgb(85, 85, 85);">实现方式有所区别：</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">volatile</font><font style="color:rgb(85, 85, 85);">关键字会禁止指令重排。</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">关键字保证同一时刻只允许一条线程操作。</font>

<font style="color:rgb(85, 85, 85);">注意：</font>

1. <font style="color:rgb(85, 85, 85);">好像</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">关键字是万能的，他可以同时满足以上三种特性，这其实也是很多人滥用</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">的原因。</font>
2. <font style="color:rgb(85, 85, 85);">但是</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">synchronized</font><font style="color:rgb(85, 85, 85);">是比较影响性能的，虽然编译器提供了很多锁优化技术，但是也不建议过度使用。</font>

## 可见性，原子性，有序性
### synchronized
synchroized是有可见性、有序性和原子性的。

#### synchronized与可见性
可见性：

1. 可见性是指当多个线程访问同一个变量时，一个线程修改了这个变量的值，其他线程能够立即看得到修改的值。
2. Java内存模型规定变量都存储在主内存中，每条线程有自己的工作内存，
3. 线程的工作内存中保存了该线程中是用到的变量的主内存副本拷贝，
4. 线程对变量的所有操作都必须在工作内存中进行，而不能直接读写主内存。
5. 不同的线程之间无法直接访问对方工作内存中的变量，线程间变量的传递均需要自己的工作内存和主存之间进行数据同步进行。
6. 所以，就可能出现线程1改了某个变量的值，但是线程2不可见的情况。

synchronized的可见性：

7. 前面我们介绍过，被synchronized修饰的代码，在开始执行时会加锁，执行完成后会进行解锁。
8. 而为了保证可见性，在对变量解锁之前，必须先把此变量同步回主存中。这样解锁后，后续线程就可以访问到被修改后的值。
9. 所以，synchronized关键字锁住的对象，其值是具有可见性的。

#### synchronized与有序性
1. 有序性即程序执行的顺序按照代码的先后顺序执行。
2. 由于synchronized修饰的代码，同一时间只能被同一线程访问。那么也就是单线程执行的。所以，可以保证其有序性。

#### synchronized具有原子性
1. 原子性就是要么全部执行，要么全部不执行。
2. 被synchronized锁定的部分是在执行期间获取到锁了，也就是不会被打扰。

### volatile
volatile关键字可以保证可见性，有序性。但是不能保证原子性，

#### <font style="color:rgb(36, 41, 46);">可见性</font>
1. <font style="color:rgb(36, 41, 46);">volatile修饰的变量，在修改后会立即刷新到内存，其他CPU核心的缓存对应的数据状态设置为无效，这样其他线程获取数据时从内存中获取。</font>
2. <font style="color:rgb(36, 41, 46);">如果volatile修饰数组会怎么样？  
   </font><font style="color:rgb(36, 41, 46);">如果volatile修饰数组，那么引用会受到volatile保护，也就是说如果线程A把数组的引用修改了，指向了其他数组，那么线程B会发觉到改变，但是如果修改数组内的元素，不会受到volatile的保护。</font>

#### <font style="color:rgb(36, 41, 46);">有序性</font>
1. <font style="color:rgb(36, 41, 46);">volatile会禁止指令重排序，分为读屏障和写屏障。</font>
2. <font style="color:rgb(36, 41, 46);">读屏障会防止读下面的程序跨过这条指令到上面去，写屏障会阻止上面的指令跨过它到下面去。  
   </font>![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654763480170-32ebf0f4-ec0f-4dc7-84c2-7ec3070a8ca1.png)

#### <font style="color:rgb(36, 41, 46);">实践（双检锁单例）</font>
<font style="color:rgb(36, 41, 46);">在懒汉式双检锁单例模式中，单例变量需要用volatile关键字修饰。</font>

```java
public class Singleton {
    private Singleton3() {}
    private static volatile Singleton INSTANCE = null;
    public static Singleton getInstance() {
        if (INSTANCE == null) {
            synchronized (Singleton.class) {
                if (INSTANCE == null) {
                    INSTANCE = new Singleton();
                }
            }
        }
        return INSTANCE;
    }
}
```



<font style="color:rgb(36, 41, 46);">INSTANCE=new Singleton();这一条代码其实是3条指令，分别是：</font>

1. <font style="color:rgb(36, 41, 46);">分配一块内存空间。</font>
2. <font style="color:rgb(36, 41, 46);">执行构造函数。</font>
3. <font style="color:rgb(36, 41, 46);">给INSTANCE引用赋值。</font>

<font style="color:rgb(36, 41, 46);">如果INSTANCE没有用volatile变量修饰，那么这3条指令的执行顺序可能就变成了132，那么在3操作执行完成后，INSTANCE已经有引用了，只不过指向的对象还没有被初始化。这时另外一个线程调用该方法发现INSTANCE不等于null，就直接返回了。</font>

### <font style="color:rgb(36, 41, 46);">比较</font>
<font style="color:rgb(36, 41, 46);">volatile和synchronized比较？  
</font><font style="color:rgb(36, 41, 46);">1. volatile只能修饰变量。synchronized可以修饰类、方法、代码块。  
</font><font style="color:rgb(36, 41, 46);">2. volatile是保证可见性和有序性，但不能保证原子性。synchronized可以保证原子性。  
</font><font style="color:rgb(36, 41, 46);">3. volatile是一种轻量级的线程同步。  
</font><font style="color:rgb(36, 41, 46);">4. volatile不会造成线程阻塞，而synchronized可以。</font>

## <font style="color:rgb(36, 41, 46);">final</font>
### <font style="color:rgb(36, 41, 46);">定义</font>
+ <font style="color:rgb(36, 41, 46);">final修饰基本类型，值不能变。修饰引用类型，引用不能变，但引用指向的对象可以边。</font>
+ <font style="color:rgb(36, 41, 46);">final修饰方法，方法不能被重写。</font>
+ <font style="color:rgb(36, 41, 46);">final修饰类，类不能被继承。</font>

### <font style="color:rgb(36, 41, 46);">不可变类</font>
<font style="color:rgb(36, 41, 46);">不可变类的对象一旦创建，就不能被改变了。String就是一个不可变类，内部的数组使用final修饰，并且没有提供改变数组元素的方法，可以保证线程安全。</font>

