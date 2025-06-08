---
title: 数组
date: 2025-05-18
index: false
icon: laptop-code
category:
  - 数据结构
tags:
  - 数组
---


> 分享你在学习什么，遇到什么问题，怎么解决的，学到了哪些。

数组：
初始化阶段，如果没有指定大小，是给个空的，第一次add的时候初始化成容量为10，然后往里装到10了扩容1.5倍；
如果初始化阶段指定大小了，是给指定大小的数组，然后满了以后再按1.5倍扩容

删除元素，把删除元素的后面所有元素复制到被删除元素作为开始的位置，
System.arraycopy(elementData, index + 1, elementData, index, numMoved);
参数含义：旧数组、旧数组起始位置、新数组、新数组起始位置，要copy的元素个数



