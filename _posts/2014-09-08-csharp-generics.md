---
layout: post
title:  《CSharp In Depth》读书笔记(4)——Generics
date:   2014-09-08 22:02:09
categories: CSharp
---

## 为什么需要泛型


### 没有泛型的CSharp1

CSharp1中没有提供泛型的支持，结果导致代码中出现了无数的类型转换操作(cast)。
在运行时进行类型转换在有些时候是必要的。
但是大量的类型转换操作不仅使代码变得不易读，并且使性能也受到影响。
因此提供泛型最早期的动机之一在于削减代码中的类型转换——如果能然编译器在编译期做更多的工作，在运行时就会轻松很多。


### 泛型的好处

泛型的好处自然就在于其解决的问题。

* 更加易读的代码。大量的减少了类型转换的出现机会。
* 更加严格的编译期类型检查。
* 性能的提升。
	* 在运行时需要进行的检查操作变少了。
	* JIT可以进一步优化值型变量(value type)的相关操作。在有些情况下可以完全免除装箱和拆箱的开销。


## 泛型的基础


### 泛型的基本结构

形如List\<T\>、Dictionary\<TKey, TValue\>这样的泛型是最经常出现的类型。
尖括号和其中的类型参数是其最显著的特征。

类型参数实际上相当与一个占位符。
之所以这么说是因为其最终会被实际的类型所替换。这个过程称作特化(Specification)。
经过特化的泛型称作“Constructed Type”，比如像这样——Dictionary<string, int>。
用户实际上使用的实例是由经过特化的泛型实例化出来的。

有趣的是，具有不同类型参数个数的同名类型是可以重载的。
比如：

{% highlight csharp %}
NewType
NewType<T>
NewType<T, U>
NewType<T, U, V>
{% endhighlight %}

之所以可以做到互不干扰是因为这些模板类在特化之后会变成下面的样子。

    System.Collections.Generic.Dictionary`2[System.String,System.Object]

所以只要类型参数个数不同，即使名字一样也能并行不悖。


### 泛型的类型限制(type constraints)

CSharp允许给泛型的类型参数加上限制。即限制类型参数的“取值范围”。

{% highlight csharp %}
struct Sample<T> where T : class
class Sample<T> where T : IEnumarator
class Sample<T> where T : MyClass, new()
class Sample<T> where T : struct
{% endhighlight %}

以上是类型限制的典型用法。
应该看到，无论是引用类型还是值类型都可以用作类型限制的条件。
定义类型和参数类型及其限制条件不会受到引用类型或是值类型的影响。
但是有一点需要注意，如果在where语句中使用了new()做类型限制（这意味着该类型必须定义了一个不带参数的构造函数），则必须出现在最后一位。


### 一些使用上的限制

<b>一切在下列三种转换中可以转换成限制类型的类型参数均视为合法。</b>

{% highlight csharp %}
// 类型转换
class Sample<T> where T : Stream
Sample<MemoryStream>

// 引用转换(实现了某接口)
class Sample<T> where T : IDisposable<T>
Sample<SqlConnection>

// 装箱转换(int -> object)
class Sample<T> where T : IComparable<T>
Sample<int>
{% endhighlight %}

<b>类型限制可以语句中可以出现多个接口，但是只能出现一个类。</b>

<b>类型限制中出现的类型不能够自相矛盾（限制条件的交集不能为空）。</b>


### 泛型函数中的类型推导

泛型函数在每次调用的时候还必须带上类型实参的写法有点反人类。
所以在CSharp2中添加了让编译器根据参数推导类型参数的功能。

{% highlight csharp %}
static List<T> MakeList<T>(T first, T second)
// 没有类型推导的情况
List<string> list = MakeList<string>("Line 1", "Line 2");

// 使用了类型推导
List<string> list = MakeList("Line 1", "Line 2");
{% endhighlight %}

这种写法的确享受了代码简短的好处，但是代价是使得泛型函数更加不易辨认。
所以需要看具体场景进行取舍。


## 泛型的缺陷(CSharp2)

* 缺乏泛型类型的变化(CSharp4中添加了这个特性)
* 缺乏操作符限制(对操作符的适用范围做出限制)
* 缺乏泛型类型的类成员


## 小结

* 使用泛型的动机——避免频繁的装箱、拆箱——代码可读性和性能的改善。
* 合理的使用泛型可以将运行时类型转换变为编译器检查，从而提升开发效率。
* 合理的运用类型限制与类型推导可以使代码变得更加易懂。
