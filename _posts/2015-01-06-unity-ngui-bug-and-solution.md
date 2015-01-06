---
layout: post
title:  Unity NGUI bug and solution
date:   2015-01-06 21:42:13 
categories: Unity
---


## NGUI的Bug以及解决技巧一则

我们都知道NGUI中在UITexture设置Shader中的变量时，需要使用

{% highlight csharp %}

	texture.drawcall.dynamicMaterial.setFloat("_Param", value);

{% endhighlight %}

但是当同一画面元素非常多，效果又比较复杂的时候，常常需要同时控制很多变量。
这时，如果改变了同一个DrawCall其他元素的alpha，depth*有可能*会导致之前设定的shader参数失效。

解决办法是将相互影响的部分分开到不同的Panel下，即将相互影响的部分分为多个DrawCall描画。
这样做性能上虽然会有少许损失，不过不失为一种简单的解决办法。
