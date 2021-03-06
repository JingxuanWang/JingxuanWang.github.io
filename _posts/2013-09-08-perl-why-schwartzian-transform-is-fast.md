---
layout: post
title:  "Perl语言再学习(7): 施瓦茨变换为什么快?"
date:   2013-09-08 12:00:00
categories: perl
---


在perl中，如果想要把数组中的元素根据某函数的计算结果进行排序，一般会写成如下形式：

{% highlight perl %}
@sorted = sort { foo($a) <=> foo($b) } @unsorted;
{% endhighlight %}

学过perl的朋友对于[施瓦茨变换(schwartzian transform)](#http://en.wikipedia.org/wiki/Schwartzian_transform)这个词应该不会陌生。

施瓦茨变换是被公认为perl中“最快”的一种排序方法。
那么，施瓦茨变换快在哪？

我们先来看一看经典的施瓦茨变换：

{% highlight perl %}
@sorted = map  { 
	$_->[0] 
} sort { 
	$a->[1] cmp $b->[1] 
} map  { 
	[$_, foo($_)] 
} @unsorted;
{% endhighlight %}

从下往上看:

* 首先针对未排序的数组做了一次map，将每个元素映射成一个二元组[$_, foo($_))]
* 然后对经过处理的数组进行排序
* 最后在经过排序的二元组数组中，将初始的数组元素取出

是什么让两种排序具有不同的执行效率呢？

我们知道，基于比较的排序的时间复杂度是O(nlogn)。
那么对于非施瓦茨变换的排序方法，其具体的代价是：

* sort
	* nlogn次 foo($a)执行
	* nlogn次 foo($b)执行
	* nlogn次 结果比较

而施瓦茨变换的代价是：

* 前期map
	* n次foo($_)执行
	* 将执行结果存入二元组
	* O(n)
* 中期sort
	* nlogn次结果值比较
	* O(nlogn)
* 后期map
	* 一次遍历
	* O(n)
		
可见，二者的主要差别体现在foo函数的执行上。
普通的排序方法中，foo函数执行了2nlogn次，而施瓦茨变换只有n次。
特别是数组较大，foo函数较复杂的情况下，施瓦茨变换可以获得较好的性能提升。
反之，如果数组本身元素较少，或者(2nlogn-n)次foo函数执行代价比较小，甚至少于两次map的代价的话，那么使用施瓦茨变换则变得得不偿失。


#### 总结：

* 对于绝大多数自定义比较函数的排序操作，施瓦茨变换会有一定的性能提升
* 特别是对于那些自定义函数中带有比较复杂的处理的排序操作，性能提升会比较明显。
