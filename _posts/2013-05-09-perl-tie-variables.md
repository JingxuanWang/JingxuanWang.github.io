---
layout: post
title:  "Perl语言再学习(2): 变量绑定"
date:   2013-05-09 12:00:00
categories: perl
---

#### 什么是tie函数

tie是一个很有意思的函数。

标准用法是：`tie VARIABLE,CLASSNAME,LIST`

顾名思义，他可以“绑”东西。
简单而言就是将一个变量绑定到一个类上。
可以绑定的变量包括scalar、array、hash、filehandle等等。

可以理解为将某些变量绑定到某个类型的扩展类上。
这些扩展类必须实现了相应的函数才能够进行绑定。
这些扩展类有点像integer类、string类、vector、map容器的感觉。
当然，用户可以自行定义这些类中函数的行为。

#### 和bless的关系

tie和bless不同的是，bless只是将类名绑定到对象的引用上。
tie则是将变量绑定到一个定义好的类上，使之成为该类的一个对象。这个过程经常会调用bless。

#### 例子

下面的代码是将一个array改造成长度为12的循环数组的例子。
可以看到首先需要为想要绑定的变量编写一个类，用于定义绑定之后的行为。

注：未重新定义(override)的行为将会通过继承父类得到。<br>
具体是`our @ISA = 'Tie::StdArray';`这一句

{% highlight perl %}
#!/usr/bin/perl

package ClockArray;

use Tie::Array;

our @ISA = 'Tie::StdArray';

sub FETCH {
	my ($self, $place) = @_;
	$self->[$place % 12];
}

sub STORE {
	my ($self, $place, $value) = @_;
	$self->[$place % 12] = $value;
}

package main;

tie my @array, 'ClockArray';
@array = ("a".."z");

print join(',', @array), "\n";
{% endhighlight %}


对于各类变量绑定类中可以重写的函数列表以及其默认的行为，可以在这里查询。

	perldoc -m Tie::Scalar
	perldoc -m Tie::Hash
	perldoc -m Tie::Array
	perldoc -m Tie::Handle

CPAN上还有更多Tie的模块，包括DBI甚至Windows的注册表。<br>
可以自行在CPAN上搜索关键字Tie。

#### 最后

虽然这个很方便，不过容易被滥用，因此不推荐使用这个特性。<br>

