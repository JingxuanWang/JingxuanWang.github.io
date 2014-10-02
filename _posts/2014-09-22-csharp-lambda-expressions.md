---
layout: post
title:  《CSharp In Depth》读书笔记(7)——Lamda expressions
date:   2014-09-22 19:22:19
categories: CSharp
---

## Lamda expressions

CSharp从3.0开始支持lambda表达式。
对于Lamda演算而言，CSharp支持的方式从复杂到简单如下所示：

{% highlight csharp %}
// Anonymous method, not lambda expression
delegate(string text) { return text.Length; }

// lambda expression
(string text) => { return text.Length; }

// single expression
(string text) => text.Length

// Let the compiler infer the parameter type
(text) => text.Length

// Remove unnecessary parentheses
text => text.Length
{% endhighlight %}


### Lamda表达式的应用

Lamda表达式在List<T>的用法最为典型。

{% highlight csharp %}
List<Film> films = new List<Film>{/* Initialization */};

// Print original list
films.ForEach(print);

// Filter using lambda expression
films.FindAll(film => film.Year < 1960).ForEach(print);

// Sort using lambda expression
films.Sort((f1, f2) => f1.Name.CompareTo(f2.Name));

// Print sorted list
films.ForEach(print);
{% endhighlight %}

Lamda表达式的应用使得对于集合操作变得更加简洁。

**注意：实际上List<T>.Sort()使用的Comparison<T>等函数都是delegate。所以实际上lambda表达式在编译期被转换成了delegate实例。**

### Expression trees

CSharp允许在程序中定义表达式。
所有的表达式都从Expression类继承出来，
其中LamdaExpression也是Expression的子类。
因此我们可以在代码中定义LamdaExpression。
下边是一个简单的例子：

{% highlight csharp %}
Expression firstArg = Expression.Constant(2);
Expression secondArg = Expression.Constant(3);
Expression ad = Expression.Add(firstArg, secondArg);

// Func<int>是无参数，返回值为int的delegate类型
Func<int> compiled = Expression.Lamda<Func<int>>(add).Compile();
console.WriteLine(compiled());
{% endhighlight %}

同样在上边这个例子中，**编译器将Lamda表达式转换成了delegate实例**。

当然Lamda表达式不仅可以编译成delegate实例，
也可以编译成Expression Tree。

{% highlight csharp %}
//
// Using lambda expression
//
Expression<Func<string, string, bool>> expression = (x, y) => x.StartsWith(y);

var compiled = expression.Compile();

Console.WriteLine(compiled("First", "Second"));
Console.WriteLine(compiled("First", "Fir"));

//
// Using a method call expressions tree
//
MethodInfo method = typeof(string).GetMethod("StartsWith", new[] {typeof(string)});

var target = Expression.Parameter(typeof(string), "x");
var methodArg = Expression.Parameter(typeof(string), "y");

Expression[] methodArgs = new[] { methodArg };
Expression call = Expression.Call(target, method, methodArgs);

var lambdaParameters = new[] { target, methodArg };
var lambda = Expression.Lamda<Func<string, string, bool>>(call, lambdaParameters);

var compiled = lambda.Compile();

Console.WriteLine(compiled("First", "Second"));
Console.WriteLine(compiled("First", "Fir"));
{% endhighlight %}

把Lamda表达式转换为expression tree的意义在于expression tree可以动态的转换成类似于SQL这样的命令式语句，实现LINQ-to-SQL这样的操作。
这类操作的好处在于可以经过编译器检查之后动态的执行SQL语句。
而一般情况下我们只能在“编译器检查”和“动态的在远程执行代码”中二择其一。

## 小结

* CSharp3的Lamda演算基本上代替了之前版本匿名函数的位置
* Lamda表达式在编译时会被转换成delegate的实例
* Lamda表达式可以转换成expression tree，使得CSharp可以兼具编译器检查和动态执行SQL的能力。
