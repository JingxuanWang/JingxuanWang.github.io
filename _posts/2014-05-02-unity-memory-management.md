---
layout: post
title:  Unity内存管理
date:   2014-05-02 19:54:32
categories: Unity
---

### Unity的内存区域

Unity中内存主要分两块：Managed Space(Mono)和Native Space(Unity)

以下分别展开介绍

#### Managed Memory Space

即内存中由Mono管理的部分。这部分内存可以再细分成两块：栈和堆。

在讨论栈和堆之前，必须明确一个概念——变量的Value Type和Reference Type。

C#中变量分为值类型(Value Type)和引用类型(Reference Type)分别对应栈空间和堆空间上的变量。

以下这些属于值类型变量：

* int
* unsigned int
* float
* double
* char
* struct
* bool
* byte
* enum
* long
* short

而这些属于引用类型变量：

* string 
* array
* object

值类型变量的特点：

* 存在于栈空间
* 离开其被声明的作用域之后会被“回收”
* 作为参数被传给函数的时候，是值传递——即在函数内部编辑的结果不会影响到函数之外的变量值

相对的，引用类型变量的特点：

* 存在于堆空间
* 代码上的变量实际上只是一个引用。因此变量为null并不代表其申请的内存已经被释放。
* 作为参数被传递给函数的时候，是引用传递——即在函数中编辑的结果会影响到函数之外的值(注意string例外)

Mono Heap和GC机制

Mono Heap上的变量不会被自动释放，释放其内存的方法只有一个那就是GC。
GC释放的原理是引用计数。
即如果一块内存没有被任何地方引用，则会在下一次GC中被释放掉。
因此对于引用类型变量，将所有的引用设为null不会导致内存的立即释放，需要等到下一次GC。
而GC触发的时机是不规律的，经常是系统感觉内存不够用了才会触发，或者调用了包含System.GC.Collect()。
而一次GC因为要扫描堆上的所有对象，并且计算引用计数，所以会非常慢。
因此在Unity中触发GC的时机非常的有讲究。
频繁GC会导致卡顿、帧速下降等等问题。内存占用过高则比较容易导致游戏Crash。
因此对于Mono内存的优化主要在于控制GC的实际和频度。

#### Native Memory Space

即Unity保有的内存，一般包括：

* AssetData
	* Textures
	* Audio
* GameObject
* Engine Internals
	* Rendering
	* Particle
	* Web Streams(WWW)

简单来说，自己写的代码之外的占用的内存基本都是Unity来替我们管理的。
这部分内存不能够直接调用GC进行回收，但是Unity提供了一些方法让我们可以销毁掉不用的Native内存：

* Destory
* Application.LoadLevel
* Resources.UnloadUnusedAssets
* www.Dispose
* assetBundle.Unload

这些函数都包含回收Unity内存的部分。
但是注意它们的应用的场合不尽相同，在使用时需要仔细甄别。

### Unity的内存管理技巧

针对Unity两部分内存的性质，大致有如下的内存管理技巧。

#### 控制GC的调用时机

控制GC的时机主要是指防止GC被调用的过于频繁。一般来说，GC被过于频繁的触发都是因为Mono Heap上出现了过于频繁的创建对象的操作。
对此，有一些经典的策略可供参考。

**对象池**

对象池是指用SetActive操作代替Instantiate/Destory。即在对象“销毁”的时候并不调用Destory函数，而只是用SetActive将其设置为disable。
在“创建”的时候用SetActive再将其置为enable。这样对于大量存在创建-销毁对象的游戏会有不错的优化效果。

**用struct代替class**

对于反复创建、销毁的对象，还有一个方法就是使用struct代替class。因为struct使用的是栈内存，离开作用域之后立刻就会被回收，不会对GC产生任何影响。
Unity中的Vector3、Color等其实都是struct实现的。

**在适当的时机主动触发GC**

主动触发System.GC.Collect在大多数时候都不是一个好主意，但是也有一些例外的情况。
在不影响用户体验的前提下，主动触发GC可以防止GC发生在预期之外的地方。

#### 防止Memory Spike

Unity内存管理中的另外一个话题是突然的内存增加(Memory Spike)导致游戏Crash。
这方面可用的策略比较灵活，这里简单介绍几个。

**先弃后取**

这个策略最经典的应用是在Scene Loading上边。
Unity的Scene Loading是先将Scene的内容加载进来，然后再释放掉之前Scene上的资源。
因此如果直接使用Application.LoadLevel之类的函数有可能会导致两个Scene的资源同时出现在内存中，此时非常容易Crash。
很多游戏在Scene切换的时候会引入一个Loading Scene，然后再加载下一个Scene，这样可以防止两个充满了资源的Scene的所有内容被同时加载到内存中。

**化整为零**

一般来说，加载巨大的单个资源比较容易出问题。
因此将单个的资源进行细分，根据当前的内存状况进行加载会使问题得到很大缓解。

**适当复用**

和对象池类似，频繁的对象创建有可能导致游戏在GC被触发之前就Crash，因此对于对内存的一定程度上的复用可以避免这类问题。
注意除了对象可以复用之外，数组也是可以复用的。



