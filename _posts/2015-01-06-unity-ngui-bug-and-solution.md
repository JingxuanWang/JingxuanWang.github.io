---
layout: post
title:  Unity NGUI keep custom shader parameter from being reset
date:   2015-01-06 21:42:13 
categories: Unity
---


## NGUI中防止自定义Shader参数被重置

我们都知道NGUI中在UITexture设置Custom Shader中的变量时，需要使用

{% highlight csharp %}

	texture.drawcall.dynamicMaterial.setFloat("_Param", value);

{% endhighlight %}

但是当同一画面元素非常多，效果又比较复杂的时候，常常需要同时控制很多变量。
这时，如果改变了同一个DrawCall其他元素的alpha，depth*有可能*会导致之前设定的shader参数失效。
会导致这种情况的原因主要是其他元素的alpha，depth等变化导致了DrawCall的重新计算，而重新计算时之前设定的参数实效的缘故。

解决方法是使用onRender Callback。这样即使DrawCall被重新计算，也可以在绘制之前及时读取之前设定好的参数了。

{% highlight csharp %}

	texture.onRender = (Material mat) => 
	{
		mat.SetFloat("_Param", value);
	};

{% endhighlight %}
