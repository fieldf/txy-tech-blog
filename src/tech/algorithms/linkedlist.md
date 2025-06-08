---
title: 链表数据结构
date: 2025-03-16
index: false
icon: laptop-code
category:
  - 数据结构
tags:
  - 链表
---


> 分享你在学习什么，遇到什么问题，怎么解决的，学到了哪些。

## 链表类型
单向链表、双向链表、循环链表

## 实现LinkedList
### 创建项目
- 创建项目：java-algorithms，[项目地址](https://github.com/fieldf/java-algorithms)
- 创建模块：data-structures
- 创建包：linked_list
### 接口：List&lt;E&gt;
```java
public interface List<E> {
    boolean add(E e);
    
    boolean addFirst(E e);
    
    boolean addLast(E e);
    
    boolean remove(Object o);
    
    E get(int index);
    
    void printLinkList();
}
```
### 实现类：LinkedList
```java
public class LinkedList<E> implements List<E> {

    transient int size = 0;

    transient Node<E> first;

    transient Node<E> last;

    public LinkedList() {
    }

    void linkFirst(E e) {
        final Node<E> f = first;
        final Node<E> newNode = new Node<>(null, e, f);
        first = newNode;
        if (f == null)
            last = newNode;
        else
            f.prev = newNode;
        size++;
    }

    void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null) {
            first = newNode;
        } else {
            l.next = newNode;
        }
        size++;
    }

    @Override
    public boolean add(E e) {
        linkLast(e);
        return true;
    }

    @Override
    public boolean addFirst(E e) {
        linkFirst(e);
        return true;
    }

    @Override
    public boolean addLast(E e) {
        linkLast(e);
        return true;
    }

    @Override
    public boolean remove(Object o) {
        if (o == null) {
            for (Node<E> x = first; x != null; x = x.next) {
                if (x.item == null) {
                    unlink(x);
                    return true;
                }
            }
        } else {
            for (Node<E> x = first; x != null; x = x.next) {
                if (o.equals(x.item)) {
                    unlink(x);
                    return true;
                }
            }
        }
        return false;
    }

    E unlink(Node<E> x) {
        final E element = x.item;
        final Node<E> next = x.next;
        final Node<E> prev = x.prev;

        if (prev == null) {
            first = next;
        } else {
            prev.next = next;
            x.prev = null;
        }

        if (next == null) {
            last = prev;
        } else {
            next.prev = prev;
            x.next = null;
        }

        x.item = null;
        size--;
        return element;
    }


    @Override
    public E get(int index) {
        return node(index).item;
    }

    @Override
    public void printLinkList() {
        if (this.size == 0) {
            System.out.println("链表为空");
        } else {
            Node<E> temp = first;
            System.out.print("目前的列表，头节点：" + first.item + " 尾节点：" + last.item + " 整体：");
            while (temp != null) {
                System.out.print(temp.item + "，");
                temp = temp.next;
            }
            System.out.println();
        }
    }

    Node<E> node(int index) {
        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

    /**
     * ？表示不确定的 java 类型
     * T (type) 表示具体的一个java类型
     * K V (key value) 分别代表java键值中的Key Value
     * E (element) 代表Element
     */
    private static class Node<E> {

        E item;
        Node<E> next;
        Node<E> prev;

        public Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }

    }

}
```
### 测试
```java
public class LinkedListTest {

    private final Logger logger = LoggerFactory.getLogger(LinkedListTest.class);

    @Test
    public void test_linked_list() {
        List<String> list = new LinkedList<>();
        // 添加元素
        list.add("a");
        list.addFirst("b");
        list.addLast("c");
        // 打印列表
        list.printLinkList();
        // 头插元素
        list.addFirst("d");
        // 删除元素
        list.remove("b");
        // 打印列表
        list.printLinkList();
    }

}
```

```text
结果：
目前的列表，头节点：b 尾节点：c 整体：b，a，c，
目前的列表，头节点：d 尾节点：c 整体：d，a，c，
```


