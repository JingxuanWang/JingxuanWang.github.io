---
layout: post
title:  "Perl语言再学习(5): 定义与作用域"
date:   2013-08-23 12:00:00
categories: perl
---

看上去这应该是个挺简单的话题，但是并非如此。<br>
而且在某些关键概念上搞不清楚常常容易出问题。<br>

#### 声明与定义(declarations and definitions)

perl其实允许像C那样将函数的声明与定义分开。
当一个函数提供了一个可以执行的代码块时，
就会被识别为一个函数定义，而不是函数声明。

{% highlight perl %}
sub count(@);
my $x;
$x = count(3, 2, 1);
sub count(@) {@_;}
{% endhighlight %}

#### 全局定义

函数默认是全局定义的

{% highlight perl %}
package Bar;
sub foo {
	return 1;
}
1;
{% endhighlight %}

可以在其他包中被调用 Bar::foo();


#### 局部定义

* 被大括号框起来的代码块默认的作用域局限在大括号内
* package虽然是全局可见，但是其实是相当于默认加了一个大括号
	即：在package用my关键字定义的变量只在package内可见
* my/local/our的区别
	* our confines names to a scope
	* local confines values to a scope
	* my confines both names and values to a scope

例：

{% highlight perl %}
my ($a, @b, %c);
our ($d, @e, %f);
local (*g, $h{i});
{% endhighlight %}


* my
	* 子block可以看到父block的变量

例：

{% highlight perl %}
my $a;
{
	my $b;
	sub {my $c = $a + $b; return $c;}
}
{% endhighlight %}


* our 无视作用域的嵌套，只要名字相同总是指向相同的变量
	在包的任何地方定义效果都一样

* local 相当于在其作用域内将变量临时替换为新的值，等到出了这个作用域还会被恢复为老值

例：

{% highlight perl %}
{
	local $var = $newvalue;
	foo();
}
{% endhighlight %}


又一例：

{% highlight perl %}
{
	$oldvalue = $newvalue;
	$var = $newvalue;
	some_func();
}
continue {
	$var = $oldvalue;
}
{% endhighlight %}


有意思的是以local关键字定义的变量在以<b>任何方式</b>退出这个作用域时，都会恢复之前的值。
这也就是它为什么被称作dynamic scoping的原因，有点压栈弹栈的感觉。


#### 总结：

* 一般比较常用的是my
* 想要在一个包直接访问另一个包的变量，一般用our
* local在之前的perl代码中和一些库中用的比较多，不过个人不推荐

