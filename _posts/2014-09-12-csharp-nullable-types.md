---
layout: post
title:  《CSharp In Depth》读书笔记(5)——Nullable Types
date:   2014-09-12 11:21:34
categories: CSharp
---


## 到底如何定义NULL?

这个问题已经被争论了很多年。
有些人认为NULL是一个值，而另外一些人认为NULL代表“没有值”。

为什么NULL是不是一个值这种问题会困扰人们这么多年呢？
NULL什么时候可以被看做一个值什么时候又不是一个值呢?


### 无值行为

在CSharp中常见的问题是：为什么编译器会阻止我将NULL赋值给一个值类型的变量?
CSharp中存在一种“说法”，即值类型变量不能赋给NULL值的(not nullable)。

为什么？


#### 为什么值类型的变量不可以是NULL?

之前讨论过值类型变量和引用类型变量的区别：值类型变量里边是值本身，引用类型变量里边是指向某个对象的引用。
所以当一个引用类型对象的值是NULL时，等价于“引用实际上不指向任何对象”。

不指向任何对象的引用在内存中的实现是一串0。
之所以用一串0代表空引用主要是出于实现方便考虑。
将一个引用置空只需要清除这块内存的数据即可，而且这也为将来的赋值提供了方便。

同样是一块全0的内存，作为值类型却已经拥有了其他的语义(比如0本身)。
这就是值类型“不可为NULL”的最重要的原因。

然而这不等于现实当中不存在将值型变量置为NULL的需求存在。
最典型例子的就是数据库。
很多数据库都允许各种类型的字段值为NULL。
当你写程序从数据库取数据时，几乎总会遇到上述问题。

所以为什么数据库可以让这些类型的变量为NULL，而CSharp却不行?
因为一个字段是否为NULL在实际的数据库应用场景中很重要。
所以在设计的时候不惜以增加额外的状态位来支持可以为NULL这样的特性。
但是在CSharp的设计中，设计者不希望引入额外的状态位来解决这个问题。

那么，怎么办?


#### CSharp1中对于值形变量NULL值的解决方案

方案1：Magic Value

这是一种最简单粗暴的解决方法。
用特定值代表NULL的状态在实现上不需要任何额外的代价。
但是在语义上则会变得相当的麻烦。
使用者从此无法区分Magic Value本身和NULL。
对于IEEE-754中定义的float和double，有很多代表NaN的值可以用作NULL语义。
然而并不是每一个类型都恰好有一个用不上的值可以拿来用在这里。
所以这显然不是一个令人满意的方案。

方案2：装箱

之前介绍装箱时，系统会生成一个新的引用类型变量，其指向对象的值为被装箱元素的值。
这种方法可以搞定没有额外的值可以用作NULL语义的类型。
但是缺点也很明显，对于每一个想要判断其是否为NULL的值类型，
我们都必须写很多额外的代码才能实现“判断一个值是否为NULL”这种操作。
而且装箱时额外生成的对象会对gc造成一定的负担。
总的来说还是不很令人满意。

方案3：额外的状态位

这就回到了我们之前讨论的内容上。
这种方法以额外的内存空间的代价避免了前两种问题的弊端。
这种方案基本是后期CSharp2处理值型变量NULL值的雏形。


## System.Nullable\<T\>和System.Nullable

System.Nullable\<T\>是所有Nullable类型的核心struct(它是个struct，嗯)。
System.Nullable是一个静态类，里边提供了必要的Utility函数。
为了简短起见，下文的讨论会去掉namespace。


### Nullable\<T\>

Nullable\<T\>是一个generic类型的struct，T被限制为值类型。
所以任何例如Nullable<string>的定义都是非法的。

Nullable\<T\>这个struct有两个属性(properties)，HasValue和Value。
根据上文的讨论，我们很容易想到HasValue就是那个额外的状态位，而Value就是值类型的变量本身。

如果HasValue为false，Nullable\<T\>在装箱操作的时候会得到一个引用值为NULL的object。


### Nullable

承载数据的是Nullable\<T\>，而为这个类提供一些Utility的是静态类Nullable。
这个类里边定义了一些经常会被Nullable\<T\>类型用到的函数。

{% highlight csharp %}
public static int Compare<T>(Nullable<T> n1, Nullable<T> n2)
public static bool Equals<T>(Nullable<T> n1, Nullable<T> n2)
public static Type GetUnderlyingType(Type nullableType)
{% endhighlight %}


### CSharp2中为Nullabe类型准备的语法糖——“?”

形如Nullable<int>、Nullable<bool>这样的类型看上去和本身要表达的int、bool想去甚远。
因此CSharp中提供了一个语法糖方便我们记忆。

{% highlight csharp %}
int? nullableInt = 5;
bool? nullableBool = null;
{% endhighlight %}

上边的写法看起来自然多了，不是么？

### “??”运算符

除了类似于“?”的语法糖。CSharp还准备了“??”操作符这样的东西使得代码更简洁。
这个双目运算符的语义很简单：如果第一个变量不为Null，则返回其值，反之则返回第二个变量的值。

{% highlight csharp %}
int? a = null;
int b = 3;
int c = a ?? b;
{% endhighlight %}


### Nullable类型的陷阱

因为Nullable类型实际是可能是Null的值类型变量，所以其语义不完全等同于纯粹的值类型变量。
比如bool?类型的真值表就与bool不同，这一点在使用的时候一定要注意。
个人的体会是：在没有必要的情况下，尽量的避免使用Nullable类型以避免不必要的误会。


## 小结

* 当需要让一个值类型具有Null语义时，可以使用Nullable类型完成这种任务。
* 当值类型具有了Null语义时很多操作（如比较、求值等）都会具有不同的行为，使用时务必需要小心。 
* 善用“?”，“??”等CSharp中提供的元素可以使代码更加简单易读。

