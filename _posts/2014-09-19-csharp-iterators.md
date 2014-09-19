---
layout: post
title:  《CSharp In Depth》读书笔记(6)——Iterators
date:   2014-09-19 17:36:31
categories: CSharp
---

## Iterator的一般用法

在CSharp1中foreach可以接受任何实现了IEnumerable的类。
在经过编译之后，foreach将自动的调用GetEnumerator得到实现了IEnumerator的迭代器。
通过不断的调用迭代器的MoveNext/Current保证每次迭代传给循环体新的经过迭代的值。

下面是一个简单的IEnumerator的实现，这个迭代器可以在一个环形数组上迭代。

{% highlight csharp %}
class IterationSampleIterator : IEnumerator
{
	IterationSample parent;
	int position;
	
	internal IterationSampleIterator(IterationSample parent)
	{
		this.parent = parent;
		position = -1;
	}

	public bool MoveNext()
	{
		if (position != parent.values.Length)
		{
			position++;
		}
		return position < parent.value.Length;
	}

	public object Current
	{
		get
		{
			if (position == -1 || position == parent.value.Length) 
			{
				throw new InvalidOperationException();
			}
			int index = position + parent.startingPoint;
			index = index % parent.values.Length;
			return parent.values[index];
		}
	}

	public void Reset()
	{
		position = -1;
	}
}
{% endhighlight %}


## Iterators with yield statements

迭代器的设计初衷虽然很好，但是需要程序员自己实现大量的迭代器逻辑还是很麻烦。
于是CSharp2中引入了yield关键字。
yield的出现大幅简化了实现一个迭代器所需要的代码。

再来看下边的代码：

{% highlight csharp %}
public IEnumerator GetEnumerator()
{
	for (int index = 0; index < value.Length; index++)
	{
		yield return values[(index + startingPoint) % values.Length];
	}
}
{% endhighlight %}

上边这段代码看上去像是一个不同的循环语句，
但实际上编译器为我们创建了一个状态机。
这个状态机的作用基本等同于上边那个迭代器的作用：

* 设定一个初始状态
* 每次调用MoveNext的时候移动到下一个状态
* Current返回上一次yield的结果
* 当没有下一个状态的时候MoveNext返回false

当然上述的操作都是在编译器内部帮我们实现的。
而这一切的关键就是yield。


### yield return

yield return的作用相当于将执行“暂停”。
下次同一段代码再次被执行的时候则从上次被执行到的地方继续开始。
当然，这里的“执行”指的是MoveNext被调用的时候。
可以这样理解：yield return指令将一段代码划分成为若干个可迭代的部分。
每一次代码的迭代都会从上一次yield return的地方开始执行，直到遇到下一个yield return的时候终止。
这时候Current返回的是本次yield return的值。


### yield break

yield break的作用类似于break在循环中体的作用。
其实就是要break（打破）迭代（循环）的意思。
因此在函数中加入yield break可以直接使得MoveNext返回false，结束迭代。


### 其他的注意事项

在使用yield指令自动生成的迭代器中，有一些需要注意的细节，罗列如下：

* 在第一次MoveNext执行之前，Current总会返回该类型iterator yield之后的默认值
* 当MoveNext返回false之后，Current会一直保持最后一次yield返回的值
* 默认的Reset函数总是会抛出一个异常。因为正常情况下Reset函数几乎不会被调用到。
所以抛出异常是为了让使用者意识到如果想要使用这个函数必须自己事先定义好。
* 编译器生成的嵌套类总是会实现泛型版本和非泛型版本的IEnumerator(IEnumerable)


## iterator的应用

### 封装复杂的循环条件

比如下边的例子，用yield简单实现的iterator可以将复杂的循环条件封装起来。
调用的时候只要使用foreach就可以了。

{% highlight csharp %}
// 使用默认的for循环
for (DateTime day = StartDate; day <= timetable.EndDate; day = day.AddDays(1))
{
	// ...
}

// 使用iterator
public IEnumerable<DateTime> DateRange
{
	get
	{
		for (DateTime day = StartDate; day <= EndDate; day = day.AddDays(1))
		{
			yield return day;
		}
	}
}

foreach (DateTime dt in DateRange)
{
	// ...
}
{% endhighlight %}


### 用iterator进行过滤

因为Current只会返回yield return的值，
所以我们可以利用这一个特性选择性的返回一个集合中的元素。
这样的特性恰好是一个filter所需要的。

{% highlight csharp %}
// Implementing LINQ's where method using iterator blocks
public static IEnumerable<T> Where<T>(IEnumerable<T> source, Predicate<T> predicate)
{
	if (source == null || predicate == null)
	{
	   throw new ArgumentNullException();
	}
    return WhereImpl(source, predicate);
}

// Internal implementation
private static IEnumerable<T> WhereImpl<T>(IEnumerable<T> source, Predicate<T> predicate)
{
	foreach (T item in source)
	{
		if (predicate(item))
		{
			yield return item;
		}
	}
}

// Use like this
Predicate<string> predicate = (string line) => { return line.StartsWith("using");}; 

foreach (string line in Where(lines, predicate))
{
	Console.WriteLine(line);
}

{% endhighlight %}


### 伪同步的CCR与Coroutine

iterator与yield另外一个重要的意义是在于提供了一暂停/重启执行的异步逻辑框架。
Microsoft提供了Concurrency and Coordination Runtime(CCR)这个Library。
在Unity中也提供了类似的机制——Coroutine。

二者在代码大概是这个感觉：

{% highlight csharp %}
// Sample using CCR
static IEnumerator<ITask> ComputeTotalStockVal.(str.user,str.pass)
{
	string token = null;
	
	yield return Arbiter.Receive(false, AuthService.CcrCheck(user, pass),
		delegate(string t) { token = t; });
	
	IEnumerable<Holding> stocks = null;
	IDictionary<string,decimal> rates = null;
	
	yield return Arbiter.JoinedReceive(false,
		DbService.CcrGetStockHoldings(token),
		StockService.CcrGetRates(token),
		delegate(IEnumerable<Holding> s, IDictionary<string,decimal> r)
			{ stocks = s; rates = r; });

	OnRequestComplete(ComputeTotal(stocks, rates));		
}

// Sample using Unity Coroutine
public IEnumerator Task()
{
	// wait for next frame
	yield return null;

	WWW www = new WWW("http://file-to-download");

	// wait until download complete
	yield return www;

	// handle downloaded resources
}

{% endhighlight %}

* 没有threads
* 不需要复杂的加锁逻辑
* 在同一个函数中以同步的方式实现异步的逻辑

**iterator和yield极大地降低了实现异步逻辑的成本。**

## 小结

* CSharp1中需要自行定义一个IEnumerator的内部细节
* CSharp2中可以使用yield语句让编译器自动实现迭代器的相关细节
* 迭代器可以使得循环封装的更简洁或者用作集合过滤等方面
* 借助iterator和yield可以简单的实现Coroutine机制，大幅度的降低了异步逻辑的实现成本。
