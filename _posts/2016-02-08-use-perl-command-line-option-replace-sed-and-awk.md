---
layout: post
title:  用perl command line option取代awk和sed
date:   2016-02-08 12:55:29 
categories: perl
---


## awk与sed的局限 

awk与sed都是linux下常用命令。但是最近经常因为Mac下aws与sed的行为与预期不一致头疼不已。
比如下边这个:

{% highlight bash %}

    sed -i 's/\t//g' file.txt

{% endhighlight %}

上边这段代码在Linux运行完全没有问题，但是在Mac环境下却不行。
man过以后才知道Mac下的sed在-i的选项之后必须制定备份文件的扩展名，不得省略。
其次是\t不被在Mac的sed命令中并不代表tab。想要替换tab需要用ctrl-v + tab的方法打出一个tab才可以。
经过修改变成了这个样子:

{% highlight bash %}

    sed -i "" 's/<ctrl-v><tab>//g' file.txt

{% endhighlight %}


## perl command line option

因为Mac上的sed和awk与Linux版本不一样，所以使用sed与awk的程序就不得不准备两套命令。
本来简单的脚本加上环境判断的逻辑就会显得很复杂。

不过perl的command line option却没有这个问题，它不会受到平台的影响而表现出不同的行为。
比如用perl实现上文sed的替换功能:

{% highlight perl %}

    # 不加备份原地替换
    perl -pi -e 's/\t//g' file.txt

    # 备份到.bak再替换
    perl -pi.bak -e 's/\t//g' file.txt

{% endhighlight %}

再比如用perl实现awk的功能:

{% highlight perl %}

    # 输出第一列
    perl -lane  'print "$F[1];"' file.txt

    # 输出最后一列
    # 分隔符为','
    perl -F',' -lane  'print "$F[-1];"' file.txt

    # 输出整行
    # 注意$F[0]里存的是文件名，所以需要先移除
    perl -lane  'shift @F, print join("\t", @F);' file.txt
    
{% endhighlight %}

