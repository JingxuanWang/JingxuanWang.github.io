---
layout: post
title:  "Perl语言再学习(6): 闭包的性能"
date:   2013-09-05 12:00:00
categories: perl
---

最近经常见到这种写法：

{% highlight perl %}
	 
	sub returning(&) {
		my ($code) = @_;
		return $code->();
	}

	my $ret = returning(sub{
		return 0 if $cond1;
		return 0 if $cond2;
		return 1;
	});
	
{% endhighlight %}

直觉上觉得这个效率并不是很好，但是又不知道差多少，所以稍微做了个实验比了一下。
测试代码如下：

{% highlight perl %}
	 
	#!/usr/bin/perl

	use strict;
	use Benchmark qw(:all);

	sub returning(&) {
		my ($code) = @_; 
		return $code->();
	}

	sub calc {
		my ($a, $b) = @_; 
		return $a * $a + $b * $b; 
	}

	sub main {

		my $r = timethese(
			10_000_000, 
			{   
				'2_flat' => q{
					my $a = int(rand(100));
					my $b = int(rand(100));
					my $c = $a * $a + $b * $b;
				},
				'3_sub' => q{
					my $a = int(rand(100));
					my $b = int(rand(100));
					my $c = calc($a, $b);
				},
				'1_closure' => q{
					my $a = int(rand(100));
					my $b = int(rand(100));
					my $c = returning(sub {
						return $a * $a + $b * $b;
					});
				},
			}   
		);  
		cmpthese $r; 
	}

	main();
	
{% endhighlight %}

结果如下：

	Benchmark: timing 10000000 iterations of 1_closure, 2_flat, 3_sub...
	 1_closure: 36 wallclock secs (36.20 usr +  0.01 sys = 36.21 CPU) @ 276166.80/s (n=10000000)
		2_flat:  6 wallclock secs ( 5.94 usr +  0.00 sys =  5.94 CPU) @ 1683501.68/s (n=10000000)
		 3_sub: 12 wallclock secs (11.86 usr +  0.00 sys = 11.86 CPU) @ 843170.32/s (n=10000000)
				   Rate 1_closure     3_sub    2_flat
	1_closure  276167/s        --      -67%      -84%
	3_sub      843170/s      205%        --      -50%
	2_flat    1683502/s      510%      100%        --


#### 总结：

* 闭包是一种很灵活的写法，使用得当可以极大地提高程序的通用性和灵活性。
* 和任何好东西一样，滥用会有性能上的代价。
* 尤其是在循环内或者经常会被执行到的地方，特别应该慎用闭包。应该尽可能的改写成一般的子函数。
