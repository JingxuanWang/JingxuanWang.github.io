---
layout: post
title:  Unity Editor Coroutine
date:   2014-10-20 10:20:12 
categories: Unity
---


## 为什么需要Editor Coroutine

在一些大型项目中，因为涉及到得数据比较多，处理时间比较久，所以执行Editor Script的时候经常会出现Editor卡死的情况。
解决这类问题的思路其实和在游戏中解决类似问题的思路一样——使用Coroutine。
然而Unity的StartCoroutine函数只可以在Runtime时使用，在Editor的执行环境中可不可以拥有类似于Coroutine的机制呢？

答案是：**可以**。

## Editor Coroutine Excecuter

问题的关键在于在Editor的执行环境中是否拥有类似于Update的函数。
如果有了类似于Update的函数，我们就可以在每一“帧”对于正在运行的Coroutine执行MoveNext并且取Current，达到执行Coroutine的效果。
很幸运，Unity在最近提供了EditorApplication.update这个delegate。
于是，万事俱备，动手可以写了。


### EditorCoroutine Class

首先需要实现的类是EditorCoroutine类。
这个类的主要作用是实现IEnumerator接口。

#### 注意点

如果要实现类似Unity中`yield return StartCoroutine(CoroutineFunc());`的功能，
则需要在EditorCoroutine类中维护一个执行栈。
Coroutine相互之间的依赖关系是一个树结构，但是在Coroutine运行的时候只相当于深度优先遍历树结构。
所以我们不需要存储整个树结构，只需要动态的维护一个Coroutine的调用栈即可。

以下是部分函数的实现：

{% highlight csharp %}

public bool MoveNext()
{
	// Get the top element of execution stack
	IEnumerator i = this.executionStack.Peek();

	// iterate
	if (i.MoveNext())
	{
		// Get Current
		object result = i.Current;

		// If we get a new IEnumerator, then add to execution stack
		if (result != null && result is IEnumerator)
		{
			this.executionStack.Push((IEnumerator)result);
		}

		return true;
	}
	else
	{
		// No more iteration on current node, back to parent node
		if (this.executionStack.Count > 1)
		{
			this.executionStack.Pop();
			return true;
		}
	}

	return false;
}

public object Current
{
	// Returns the Current of top element in execution stack
	get { return this.executionStack.Peek().Current; }
}
{% endhighlight %}


### EditorCoroutineRunner Class

EditorCoroutineRunner主要负责在每次Update的时候执行各个EditorCoroutine的MoveNext函数。

#### 注意点

如果想要实现类似`yield return StartCoroutine(CoroutineFunc());`的写法，
则需要注意StartCoroutine()的调用发生在Current被调用的时候。

如果在StartCoroutine函数中直接向editorCoroutineList中添加IEnumerator会导致该IEnumerator在同一帧里被执行两次。
所以在这个地方需要简单做一下去重的判断处理。

重要部分代码如下：

{% highlight csharp %}

private static List<EditorCoroutine> editorCoroutineList;
private static List<IEnumerator> buffer;

public static IEnumerator StartEditorCoroutine(IEnumerator iterator)
{
	if (editorCoroutineList == null)
	{
		editorCoroutineList = new List<EditorCoroutine>();
	}
	if (buffer == null)
	{
		buffer = new List<IEnumerator>();
	}
	if (editorCoroutineList.Count == 0)
	{
		EditorApplication.update += Update;
	}

	// add iterator to buffer first
	buffer.Add(iterator);

	return iterator;
}

private static void Update()
{
	// EditorCoroutine execution may append new iterators to buffer
	// Therefore we should run EditorCoroutine first
	editorCoroutineList.RemoveAll
	(
		coroutine => { return coroutine.MoveNext() == false; }
	);

	// If we have iterators in buffer
	if (buffer.Count > 0)
	{
		foreach (IEnumerator iterator in buffer)
		{
			// If this iterators not exists
			if (!Find(iterator))
			{
				// Added this as new EditorCoroutine
				editorCoroutineList.Add(new EditorCoroutine(iterator));
			}
		}

		// Clear buffer
		buffer.Clear();
	}

	// If we have no running EditorCoroutine
	// Stop calling update anymore
	if (editorCoroutineList.Count == 0)
	{
		EditorApplication.update -= Update;
	}
}

{% endhighlight %}


#### [完整版代码见这里](https://gist.github.com/JingxuanWang/82313ddef0792d82e984)

觉得好就给个星吧~
