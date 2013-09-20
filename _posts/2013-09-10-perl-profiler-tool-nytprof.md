---
layout: post
title:  "Perl语言再学习(9): 性能调优工具NYTProf"
date:   2013-09-10 12:00:00
categories: perl 性能调优
---


Perl语言再学习(8): 性能调优工具NYTProf 
======================================

Tag: perl, 性能调优

Date: 20130918

[Devel::NYTProf](#http://search.cpan.org/~timb/Devel-NYTProf-5.05/lib/Devel/NYTProf.pm)是一个强大并且功能丰富的性能调优工具。

在写这篇文章的时候最新版是5.05

#### 安装流程

1. 去主页下载最新的代码。我的是(Devel-NYTProf-5.05.tar.gz)
2. tar -xzf Devel-NYTProf-5.05.tar.gz
3. cd Devel-NYTProf-5.05
4. perl Makefile.PL
5. make
6. make test
7. sudo make install


#### 使用方法

可以简单先尝试一下自带的例子。

在 ~/Devel-NYTProf-5.05/目录下运行

	perl demo/demo-run.pl

有惊喜。

#### 线上脚本运行方法

* 如果是使用了mod_perl模块，可以直接参照[官网上的方法](#http://search.cpan.org/~timb/Devel-NYTProf-5.05/lib/Devel/NYTProf/Apache.pm)。
* 或者执行脚本线程的时候带上命令行参数/环境变量


	# 在apache的httpd.conf中进行配置
	PerlModule Devel::NYTProf::Apache

	# 执行时带命令行参数
	perl -d:NYTProf some_perl.pl
	# 或者设置环境变量
	$ENV{PERL5OPT} = '-d:NYTProf'

#### 总结

* NYTProf这个工具非常强大，可以支持线下和线上的脚本执行性能分析。
* 虽然是用C写的性能有保障，但是原则上不推荐在线上跑，在Dev/Sandbox环境使用会比较理想。


