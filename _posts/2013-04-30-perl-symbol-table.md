---
layout: post
title:  "Perl语言再学习(1): 符号表"
date:   2013-04-30 12:00:00
categories: perl
---


最近感觉自己基本功应该重新补一补了。
正好在工位附近的书架上看到了这本《Programming Perl》，一看是Perl的作者Larry Wall写的。
看到书里面有很多关于Perl内部机制的内容，就果断将其“霸占”。
接下来的一段时间每天看一点，顺便将吸收的东西作为笔记记录下来。
希望这轮学习以后，功力可以再上一个档次。

先来讲讲Perl的符号表。

### 什么是符号表

Perl中符号表的概念其实跟包的概念联系的非常紧密。
书中原文是：包的内容集合即为符号表。

例如:

*	对于包Red::Blue，它的符号表是%Red::Blue::
*	对于main，它的符号表是%main::（或者直接简写为%::）
	main的符号表还包含所有上层其他符号表。比如：%main::Red::Blue::。

可见符号表是“与包同名的哈希”。

### 符号表的访问方式

访问符号表变量最显著的特征就是变量名前加型`*`，比如：

	*sym = *main::varialbe
	*sym = $main::{"variable"}

第一种方式是在编译期进行的访问，因而更加高效。
如果符号表中之前没有这一项，那么将会被自动创建。

下列代码可以dump出整个main包的符号表：

{% highlight perl %}
#!/usr/bin/perl

use Data::Dumper;

for my $symname (sort keys %main::) {
	local *sym = $main::{$symname};
	print $sym if defined $sym;
	print Dumper \@sym if @sym;
	print Dumper \%sym if %sym;
}
{% endhighlight %}


### 一个重要的概念——typeglob

型为`*Name`的变量叫做typeglob。
顾名思义，就是针对type（类型）的glob（自动匹配与扩展，参考fileglob）。
typeglob在使用的时候不针对特定类型。
例如上边的程序，如果某次循环中遇到的变量类型是数组则@sym变为非空。
这个机制看上去有点向C++的void *，加上自动的类型匹配（转换）。
即一开始是无类型（其实是包含所有类型，后文有说明），等到确定类型以后就转换为相应类型。
PS: 如果这玩意用C实现，应该是个Union吧？——某一块内存同时只有一个变量有效

typeglob的基本操作如下例：

{% highlight perl %}
*sym = *oldvar;
*sym = \*oldvar;    # the same to previous one, autodereferenced by perl
*sym = *{"oldvar"}; # explicit symbol table lookup
*sym = "oldvar";    # implicit symbol talbe lookup
{% endhighlight %}

当直接对一个typeglob进行赋值时，实际上是等于做了以下几个赋值的其中之一：

{% highlight perl %}
*sym = \$var;
*sym = \@arr;
*sym = \%hash;
*sym = \&foo;
{% endhighlight %}

typeglob其实也可以看做一个hash，里面包含了所有可能的变量类型（key）及其对应的引用（value）。

{% highlight perl %}
*pkg::sym{SCALAR}    # same as \$pkg::sym
*pkg::sym{ARRAY}     # same as \@pkg::sym
*pkg::sym{HASH}      # same as \%pkg::sym
*pkg::sym{CODE}      # same as \&pkg::sym
*pkg::sym{GLOB}      # same as \*pkg::sym
*pkg::sym{IO}        # internal file/dir handle, no direct equivalent
*pkg::sym{NAME}      # "sym" (not a reference)
*pkg::sym{PACKAGE}   # "pkg" (not a reference)
{% endhighlight %}

在程序中操作符号表可以创建变量别名，比如：

	*alias = *base;

我们访问alias的时候实际上访问了base。
当然，这不安全。

所以想要创建变量或者函数别名的时候，可以使用引用，比如

	*alias = \$var;

其实这正是Exporter在将一个包的所有变量导出到另一个包的时候做的事情。

	*SomePack::dick = \&OtherPack::richard;

