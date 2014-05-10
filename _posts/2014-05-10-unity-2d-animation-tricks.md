---
layout: post
title:  Unity 2D动画小技巧(1)
date:   2014-05-10 13:42:53
categories: Unity
---

### Sprite的量产与换皮

Unity的2D功能刚发布没有多久，很多2D功能的支持还不是很完善。

#### 批量SpriteSlice操作

举个栗子：
在费尽九牛二虎之力用Sprite Editor切好一个Sprite Sheet之后发现还有100+个一样布局的Sprite Sheet需要进行Slice。。。

这时候有没有一种想死的感觉？
Unity目前的版本(笔者的是4.3.4f1)还没有开放很多的SpriteEditor的API供开发者使用。
批量去切不规则的Sprite Sheet绝对是一个费力不讨好的工作。

如果你也遇到过类似的问题不如尝试一下下面的解决办法。

先说操作步骤：

1. Edit->ProjectSettings->Editor
	* Version Control设置为Visible Meta Files
	* Asset Serialization设置为Force Text
2. 找到已经切好的Sprite的.meta文件，比如Sprite.png.meta
	用vim之类的文本编辑器打开
3. 找到一个未进行slice操作的Sprite的.meta文件，比如UnslicedSprite.png.meta
	用vim之类的文本编辑器打开
4. 替换除了GUID之外的所有内容

原理：

* Unity的Asset的信息都是存储在.meta文件里
* 所以理所当然的，对于Sprite的Slice相关的信息可以在.meta文件里找到
* 所以..直接hack这些.meta文件就好了

是不是有一种如释重负的赶脚？
不过这方面API估计过一段时间就会开放出来，到时候就可以直接用EditorScript解决了。

#### Animation换皮

批量切好了Sprite，很快又会遇到一个让大家头疼的问题，Animation的换皮。

Unity对这方面的支持不是很好，不过这个问题并不是不能解决的。

举个例子：
你想用刚切好的100+个Sprite做对应的SpriteAnimation，但是却不想对于每一个Sprite都做一套Animator+AnimationClip。

正常人都不会想要做100+套Animator+AnimationClip。
怎么办呢？

这招是从Unite 2014上学来的：

{% highlight csharp %}
// 使用LateUpdate函数，在所有其他Update完成之后被调用
void LateUpdate()
{
	// 加载用于换皮的Sprite
	var subSprites = Resources.LoadAll<Sprite>(spriteSheetName);

	// 拿到当前SpriteRender中有效的SpriteName
	string spriteName = spriteRenderer.sprite.name;

	// 在候选队列里找名字相同的Sprite
	Sprite newSprite = Array.Find(subSprites, item => item.name == spriteName);

	// 如果有，则替换
	if (newSprite)
	{
		spriteRenderer.sprite = newSprite;
	}
}
{% endhighlight %}

简单来说原理就是在每一帧的最后将当前SpriteRender中有效的Sprite替换成其他同名的Sprite。
虽然这种做法看上去不是那么"干净"，但是这估计是目前最可行的做法了。
不然Unity的人也不会在大会上介绍这种方法。

