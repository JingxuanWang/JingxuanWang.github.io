---
layout: post
title:  "Perl语言再学习(3): 垃圾回收"
date:   2013-05-16 12:00:00
categories: perl
---

#### Perl的垃圾回收机制

之前一直没怎么关注过这个问题。
直到前两天线上出了个疑似内存泄漏的事情，让我去查一查，才解除了相关的一些知识。
归结起来大致如下：

Perl的垃圾回收机制是在每次从一个block里退出时被触发的，比如：

{% highlight perl %}
{
	my $var = "hello world";
	my $ret = func();
}
{% endhighlight %}

这个code block可能是一个子函数，一个循环，一个if-else分支，甚至可能只是如上边这样的代码块。
当perl退出这样的block的时候会回收在代码块内部定义的变量。
但是有一个特殊情况，如果变量的`引用计数`不是0的话，则这个变量不会被回收。

于是就有了如下问题：

{% highlight perl %}
{
	my ($a, $b) = @_;
	$a = \$b;
	$b = \$a;
}
{% endhighlight %}

这样的代码由于`$a`和`$b`相互引用形成环，而使得**两个变量都没有被释放**。<br>
上边这个例子更简单的版本是这样的：

{% highlight perl %}
{
	my $a;
	$a = \$a;
}
{% endhighlight %}

当然，在程序退出的时候，Perl会采用一种[mark-and-sweep](http://www.brpreiss.com/books/opus5/html/page424.html)的方法释放内存，可以彻底的释放掉所有使用的内存。<br>
所以对于CGI程序来说，以适当的间隔重启可以有效防止内存泄漏吃光机器的内存。

另一个解决方法是使用弱引用`WeakRef`。
CPAN上有这个模块，这样的引用不会影响引用计数。
不过我觉得只要注意一下，倒是不必须使用这样的模块。

### 检测内存泄漏的方法

尝试过几个库，[LeakTrace.pm](http://search.cpan.org/~gfuji/Test-LeakTrace-0.14/lib/Test/LeakTrace.pm)应该是最好用的一个。

下面是一个简单的例子：

{% highlight perl %}
#/usr/bin/perl

use strict;
use Test::LeakTrace;

sub memory_leak {
	my @array;
	$array[10000] = 1;

	my $ref = +{
		2 => "b",
		a => 1,
	};  
	
	# memory leak
	$ref->{c} = $ref;
}

my $cb = sub {
	my @caller = caller(3);
	print "Memory Leak Detected!! File: $caller[1] Line: $caller[2]\n";
};

sub main {
	eval {
		leaktrace {
			memory_leak();
		} \&$cb;
	};  
	if ($@) {
		print $@; 
	}   
}

&main();
{% endhighlight %}

当然，也有缺点，因为检测比较费时间，所以基本上线上跑这个比较困难。<br>
这对于大型项目来说自然不是什么好消息。<br>
不过好在这玩意开源，需要的话自己改吧~

