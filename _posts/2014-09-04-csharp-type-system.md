---
layout: post
title:  《CSharp In Depth》读书笔记(2)——Type System
date:   2014-09-04 22:07:11
categories: CSharp
---

继续水。今天的内容是Type System。

## 类型系统(type system)

编程语言可以按照很多维度对类型系统进行划分。比如：

* strong/weak
* safe/unsafe
* static/dynamic

至于CSharp算哪一种，其实跟语言的演进也有关系。

书中称：CSharp1的类型系统是静态的、显式的、安全的(static, explicit and safe)。
那么我们先来看看静态类型和动态类型的定义。


### 静态类型与动态类型(static typing vs dynamic typing)

* 静态类型：每一个变量都必须有一个在编译期就可以被明确的类型。
这样编译器就可以保证只有被该类型接受的操作才可以被执行。
{% highlight csharp %}
object o = "hello";
Console.WriteLine(o.Length);
{% endhighlight %}
上边的代码在CSharp1中是不被允许的。  
因为Length属性不存在于object类型中，想要使用则必须经过显式的类型转换。

<b>所谓静态类型，就是变量可以执行的操作只和定义变量时的类型有关，而于变量实际的值无关。</b>  

与静态类型相对的是动态类型。
其本质在于变量没有所谓类型的概念，只有值。
一个变量可以执行什么操作与该变量的值直接相关。

CSharp4中加入了一些动态类型的要素，但是大部分的代码仍然属于静态类型的范畴。


### 显示类型与隐式类型(explicit typing vs implicit typing)

显示类型与隐式类型同属静态类型当中的概念，而与动态类型无关。

<b>显示类型的语言必须在定义时明确的给出变量的类型，而隐式类型则允许编译器推倒变量的类型。</b>  

我们都知道后来的CSharp中有var这个关键字。但是在CSharp1中是不允许类型推导的。

{% highlight csharp %}
string s = "hellow"; // 显式定义
var x = "world"; // 隐式推导
{% endhighlight %}

再次强调一次，无论显式定义还是隐式推导，编译器都在编译期明确的知道被定义变量的类型。
因此显式类型和隐式类型同属静态类型的范畴。


### 类型安全与非类型安全(type-safe and type-unsafe)

<b>类型是否安全主要是指编译器是否允许程序员将一个变量强制解释成一个与其定义类型“不相容”的类型。</b>

所谓“不相容”就是无法互相进行显式类型转换的意思——比如在C/C++中可以将char转换成int。
这种做法在CSharp中是不被允许的。

因此在类型系统这一点上，C/C++是非类型安全的，而CSharp是类型安全的。

### 集合，强类型和弱类型(collections, strong and weak)

<b>强类型和弱类型经常与静态类型、动态类型的概念混用。作者为了不引起歧义，将对强弱类型的讨论限制在了集合的范畴里。</b>

在.NET 1.1中的Collections大致分为三类

* 数组是强类型。
* 弱类型的collections定义在System.Collections里。
* 强类型的collections定义在System.Collections.Specialized里。


数组本身虽然是强类型的。
但是引用类型变量的数组支持协变(covariance)。
这就使得对于数组元素的隐式类型转换成为可能。

{% highlight csharp %}
// 数组的协变
string[] strs = new string{ "hello" };
object[] objs = strings; // OK

objects[0] = new Stream(); // Error
{% endhighlight %}

如上例，尽管可以将一个string的数组赋给一个object的数组，但是编译器仍然知道它里头的元素是string。
所以试图给一个string变量赋予别的类型值的操作都是失败的。

如ArrayList和Hashtable这样的集合是弱类型的。

对于ArrayList和Hashtable这样的集合，通常我们无法做到编译期安全——在编译期我们无法限定集合中只使用某个类型的变量。
这样的弱类型集合的使用更多的是一种双方的约定——如果大家都遵守约定，那么在执行期间则不会发生invalid cast之类的错误。

而对于强类型的集合，尽管不用担心发生类型错误，但是由于其适应面较窄，
对于每一个类型定义一种集合无疑增加了很多的冗余代码。

### 返回值的协变与参数的逆变

(这个等到总结协变与逆变的时候一起说吧，待更)

## 小结

* CSharp1是静态类型的。编译器在变量定义的时候就必须明确的知道变量时什么类型。
变量可以执行的操作是直接与其被定义的类型相关
* CSharp1是显示类型的。在定义的时候必须明确的指定变量的类型。
* CSharp1是类型安全的。不相容的类型之间是无法做类型转换的。
* 对于强类型的集合，必须每一个类型定义一种集合的做法增加了大量的冗余代码。
* CSharp不支持返回值的协变与参数的逆变。
