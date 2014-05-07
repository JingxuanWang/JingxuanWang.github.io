---
layout: post
title:  "Perl语言再学习(4): 子程序执行"
date:   2013-07-25 12:00:00
categories: perl
---

### perl的系统命令/外部子程序调用方法

大致说来是以下几种

* exec($cmd)
* system($cmd)
* `$cmd`
* Open2($cmd)

#### exec函数

用法：

	exec LIST
	exec PROGRAM LIST

特征：

* 只执行子程序，不返回任何信息
	* 在程序/命令不存在或不经shell执行时会返回false
	* 所以不能这么用： exec ('foo') or die "error"

#### system函数

用法：

	system LIST
	system PROGRAM LIST

特征：

* 会返回程序的exit status code，即：$?	

当然，也可以用下面代码检查程序的返回状态

{% highlight perl %}
if ($? == −1) {
   print "failed to execute: $!\n";
}
elsif ($? & 127) {
   printf "child died with signal %d, %s coredump\n",
	   ($? & 127),  ($? & 128) ? 'with' : 'without';
}
else {
   printf "child exited with value %d\n", $? >> 8;
}
{% endhighlight %}

#### `` (反引号，backticks) 

用法：

	`LIST`
	`PROGRAM LIST`

特征：

* 会返回程序执行的结果，即stdout的部分
	* 如果加上 2>&1 则会连带stderr部分也返回



#### IPC::Open2 IPC::Open3


用法：

{% highlight perl %}
use IPC::Open2;
$pid = open2(\*CHLD_OUT, \*CHLD_IN, 'some cmd and args');

# or without using the shell
$pid = open2(\*CHLD_OUT, \*CHLD_IN, 'some', 'cmd', 'and', 'args');

# or with handle autovivification
my($chld_out, $chld_in);
$pid = open2($chld_out, $chld_in, 'some cmd and args');

# or without using the shell
$pid = open2($chld_out, $chld_in, 'some', 'cmd', 'and', 'args');
waitpid( $pid, 0 );
my $child_exit_status = $? >> 8;
{% endhighlight %}


特征：
	
* 与上边的命令不同的是，open2打开了双向通道。
	除了子程序的stdout还有stdin，这代表可以同时动态的给子程序输入信息。
	对于需要动态的交互的两个程序而言是有用的设定。
* Open2使用了C标准库的I/O缓存模式。
	使用Open2则不得不以更高的频率手动刷新这些缓存，否则就会丢失输出。
	《Programming Perl》一书上也说Open2在很多地方都会用出问题。
* 容易死锁。可以考虑一下两个程序互相等待对方输出的情况。
* Open2使用了Open3的接口，Open3比Open2多了stderr句柄
* 基本上来说不推荐用，尤其是在FCGI里。
	FCGI重定向了脚本的标准输入和输出到Unix Socket上，所以就更加麻烦。


### 附注：

为了防止丢失输出一般用IO::Handle中的autoflush()函数刷新缓冲区。
或者设定autoflush参数 $| = 1;
