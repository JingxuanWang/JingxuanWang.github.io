---
layout: post
title:  《CSharp In Depth》读书笔记(8)——Extension Methods
date:   2014-10-01 12:22:19
categories: CSharp
---


## Extension methods的基本概念

作为一门完全面向对象的语言，CSharp中不可避免的要实现各种设计模式。
然而幸运的是，使用CSharp实现各种设计模式并不像在Java中那样繁琐。
因为语言本身提供了很多方便的特性帮助我们用很少量的代码实现自己的意图。
比如之前介绍过的event，和这次将要介绍的extension method。


### 在没有extension method的时代

我们常常会碰到这种情况，对于某些类，想要在其之上添加一些自定义的方法。
但是出于种种原因，这个已经定义好的类出于种种原因既不能被改动（比如是其他DLL中的方法），
也不允许继承（被定义为sealed）。
在这种情况下，我们只能采用其他方法。

静态方法在某种程度上可以达到我们的目的。
但是这类静态方法必须带有一个本类型的实例作为参数。
这让代码看上去总不是那么整洁，比如像这样：

{% highlight csharp %}
public static class StringUtil
{
	public static void MyTransform(String str)
	{
		// Implement my transformation on the string
	}
}

// When using this util
StringUtil.MyTransform("Hello world");
{% endhighlight %}


### 使用extension method

Extension method解决了上述问题，
这个特性得以让新定义的方法与已经定义的类进行无缝整合。
使得我们：

* 无需更改类本身的代码却可以给这个类添加一个方法
* 无需在调用时传递类的实例作为参数
* 无需在调用时使用静态类来查找extension method进而实现链式调用

{% highlight csharp %}
// Using extension method
public static class StringUtil
{
	public static void MyTransform(this String str)
	{
		// Implement my transformation on the string
	}
}

// When using this util
new string("Hello world").MyTransform();
{% endhighlight %}

看上去是不是舒服了很多？


## 使用extension methods


### LINQ

在CSharp中extension method用的最广泛的地方当属LINQ。
典型的LINQ用法如下：

{% highlight csharp %}
var collection = Enumerable.Range(0, 10)
	.Where(x => x % 2 != 0)
	.Reverse()
	.Select(x => new { Original = x, SquareRoot = Math.Sqrt(x) } );

var collection = Enumerable.Range(-5, 11)
	.Select(x => new { Original = x, Square = x * x })
	.OrderBy(x => x.Square)
	.ThenBy(x => x.Original);
{% endhighlight %}

LINQ的实现大多是基于IEnumerable和IQueryable的extension method。
所以在using System.Linq;之后会发现一个实现了这些接口的类(比如Array)多出了很多新的方法。
LINQ广泛的使用extension method的做法即避免了修改原有的类与接口，又实现了对于数据集合的链式调用。
这样的结果是实现了一个可插拔的，能够大幅简化数据操作的库。
这应该是extension method应用最好的范例。


### Fluent Interfaces

简单来说Fluent Interface是一种能够自我解释的代码书写方式。
而extension methods使这种方式成为了可能。
比如像下边这样写代码：

{% highlight csharp %}
Meeting.Between("Jon")	// Returns SoloMeeting class
.And("Russell")			// Returns UntimedMeeting class
.At(8.OClock().Tomorrow());	// Returns Meeting
{% endhighlight %}

不过这种方法需要做的准备工作也比较多。
至于这种写法到底是不是“好”，这个见仁见智。
这里着重强调的是extension methods可以让我们在CSharp中实现这样的代码书写方式，足见其威力之强大。


### 关于extension methods的注意事项

正由于extension methods是威力强大的武器，所以使用这种武器的时候才应该加倍小心。
这里简单罗列一下基本的注意事项，供读者参考：

* 最好能够对extension method进行集中管理。
对于同一个类型的extension method最好能够写在一起。
这样可以防止不同的人在不同的地方对相同的类型写出extension，从而招致不必要的混乱。
* extension method最好能够放在独立的namespace中。
这样做主要是为了防止代码使用者以extension method以外的方式调用这些方法。
* 对于使用的比较广泛的基础类，慎用extension methods。
一方面，基础类很少会出现需要扩展的情况。另外一方面，这种做法影响范围太广，容易考虑不周。
* 不要让使用extension method成为一种习惯。
一般而言，世界上没有那么多需要做extension的类型。
* 注释要写明确，比如注明第一个参数是否可以为null。
因为extension method允许其附着的类型引用值为空。所以如果不事先约定明确则非常容易出现意想不到的错误。
* 编写extension method的时候要小心不要与该类型已有的方法冲突。


## 小结

* CSharp给我们提供了一种为已有类型追加方法的机制，即——extension method。
* 善用extension method，可以让我们在原有类型上追加各种方便的操作，简化代码复杂程度。这方面典型的例子就是LINQ。
* 使用extension method的同时务必要注意小心管理extension method，降低代码维护的成本。
