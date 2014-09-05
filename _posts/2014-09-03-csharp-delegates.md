---
layout: post
title:  《CSharp In Depth》读书笔记(1)——Delegates
date:   2014-09-03 19:35:42
categories: CSharp
---


最近在网上看到有人推荐《CSharp In Depth》这本书。  
找来一看发现确实不错，非常适合CSharp进阶。  
于是决定把读书笔记一点一点整理放上来，算作近期学习的主要内容。  


## 定义

如果用一句话描述delegate是什么，我想我会说delegate比较类似于C中的函数指针。  
CSharp中的delegate提供了一种对函数的抽象。使得我们可以将函数“放”进一个对象中，并让对象“执行”操作。
当然也可以认为一个delegate是一个只包含一个函数的接口(single-method interface)，而delegate对象则是实现了这个接口的对象。

## 使用

在程序中定义并使用delegate大概是下面这个感觉。
{% highlight csharp %}
// definition
public delegate void MyDelegate(string parameter);

// Create delegate instance
MyDelegate d1, d2;

d1 = new MyDelegate(StaticMethods.Print);
d2 = new MyDelegate(instance.Print);

// Execute delegate
d1("hello");
d2("world");
{% endhighlight %}

需要注意的是MyDelegate实际上是一个类型，而不是某个具体的函数。  
所以下面可以用MyDelegate来创建实例。
在我们这个例子里MyDelegate继承了System.MulticastDelegate，这个类是System.Delegate的子类。  

这里需要说明的是MyDelegate是一个delegate类型(delegate type)，而d1和d2是delegate实例(delegate instance)。  
二者的关系就像<code>string str</code>中的string和str。
如果搞不清楚这一点，实际用的时候非常容易搞混。


### delegate与gc

一般的非静态delegate在创建的时候通常需要一个target：即定义了该函数的类的实例。 
上边的例子中d1是一个静态方法的delegate，而d2是非静态方法的delegate。
需要注意的是非静态方法的delegate可能会使其关联的方法的对象不能被gc及时回收而造成内存泄漏。
诸如“让一个生命周期很短的对象去监听一个生命周期很长的对象”之类的做法就是典型的错误用法。
因为这使得长生命周期很对象间接的拥有了短生命周期对象的引用，因而使得这个对象得不到及时释放。


### delegate的调用(invoke)

一般的用法与调用普通函数完全一样。  
但是delegate实例还提供了异步调用的方法: BeginInvoke和EndInvoke。  
这个超出了本篇的讨论范围，如果读者有兴趣可以去看MSDN上的说明。  


### 调用链(invocation list)

每一个delegate实例上可以包含多个方法。通过Delegate.GetInvocationList可以取到调用链上的所有方法。
当delegate被调用的时候所有的方法都被顺序调用。delegate的返回值则是最后一个被执行的方法的返回值。  
因为delegate有这种特性，所以在实际应用中很少会声明一个拥有返回值的delegate。  
如果在顺序执行方法的过程中出现了异常，那么未被执行的方法不会被继续调用。
CSharp中提供了非常简单的增加、移除调用链上方法的手段——“+=和-=”。
如果调用链上本身没有任何元素，则可以用诸如“d1 == null”的方法进行判断。


### delegate和event

delegate实例和event非常容易搞混。但是event不是delegate实例。
二者最主要的区别在于——event不是field。
event实际上更加近似于封装了AddXXXHandler和RemoveXXXHandler的类型为delegate的属性。


## 小结

* 简单来说delegate赋予了程序“将函数扔给别人执行”的能力。
* 可以将delegate看做只定义了一个方法的接口，把delegate实例看做实现了这个接口的对象。
* event只是封装了add/remove方法，但是其本身并不是delegate实例。


## 参考文献

[1] [Delegates and Events](http://csharpindepth.com/Articles/Chapter2/Events.aspx)
