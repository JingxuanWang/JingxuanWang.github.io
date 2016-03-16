---
layout: post
title:  在Mojolicious的App中建立动态别名
date:   2016-03-15 16:29:05
categories: perl mojolicious
---


## 关于Mojolicious

[Mojolicious](http://mojolicious.org/)是一个基于perl语言的web框架。
因其简便易用并且功能强大，使得Mojolicious在perl的社区中非常受欢迎。

Mojolicious一个非常方便的地方是可以将各种小功能打包成plugin并发布到网上。
开发者可以很方便的通过cpanm之类的命令下载这些插件并整合到自己的app中。

Plugin的例子可以看[这里](https://github.com/kraih/mojo/wiki/Plugins-on-cpan)

## Plugin机制

Plugin机制的优点无疑是非常有利于app的模块化。

缺点则是无法非常方便的导出变量与函数。

一般来说，在Mojolicious app中加载一个plugin是这样的：

{% highlight perl %}

    # Mojolicious::Lite
    plugin 'mail';

    # Mojolicious with config
    $self->plugin(mail => {
      from => 'sharifulin@gmail.com',
      type => 'text/html',
    });

    # in controller
    $self->mail(
      to      => 'sharifulin@gmail.com',
      subject => 'Test',
      data    => 'use Perl or die;',
    );

    # in controller, using render
    $self->mail(to => 'sharifulin@gmail.com', template => 'controller/action', format => 'mail');

    # template: controller/action.mail.ep
    % stash subject => 'Test';
    use Perl or die;

{% endhighlight %}

方法mail被加载到Mojolicious对象上。
在有这个对象的时候我们可以非常方便的调用，就像上边这个例子一样。
比如在Controller中，可以像这样调用：

{% highlight perl %}

    sub foo {
        my $c = shift;
        $c->app->mail(...);
    }

{% endhighlight %}

但是$app变量毕竟不是无处不在的。
如果想要自己写一些独立模块，但是又想要依赖摸个Plugin，这时候只能选择注入$app变量或者use package。

然而其实这两种选择都不好：

* 注入$app会导致传递不必要的参数，降低代码的可读性。
* 直接use package然后调用方法则会增加模块之间的耦合度。这就与Plugin设计的初衷背道而驰了。

## 使用symbol table建立别名

针对上述问题，可以使用的一个技巧是利用perl的符号表(symbol table)导出变量的别名。例如：

{% highlight perl %}

    *{"$namespace_of_alias"} = \$obj_to_be_exported;

    # for example
    *{"Global::App"} = \$app;

    # you can access app wherever you want
    $Global::App->mail(...);

{% endhighlight %}


至于为什么不用全局变量our而是直接操作符号表，
主要是考虑到使用our定义的全局变量名依赖于定义变量的package名，
而使用符号变导出的别名就没有这种限制。

然而必须指出的是，更大的自由度意味着更高的危险性。
使用这种方法创建别名的时候务必要小心，确认操作是否会污染其他的命名空间。


这里是另一个[例子](https://github.com/JingxuanWang/Mojolicious-Plugin-CustomLog)使用了这种技巧，有兴趣的可以参考。

关于perl符号表的基本介绍，可以参考[我之前的文章]({% post_url 2013-04-30-perl-symbol-table %})
