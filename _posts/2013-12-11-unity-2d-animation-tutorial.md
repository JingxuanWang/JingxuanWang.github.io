---
layout: post
title:  Unity 2D Sprite动画制作简明教程
date:   2013-12-11 12:42:53
categories: Unity
---

### 用Unity制作简单的2D Sprite动画

Unity Animation Editor (Mecanim)提供了非常强大的动画编辑系统。
本文结合一个例子简单介绍一下用这个动画系统制作简单的2D Sprite动画。

#### 事先准备

Unity版本在4.3以上。

SpriteSheet一张，比如这个：<br>
<img src="../../../../image/SpriteEditorSample.png" height="50%" width="50%"><br>

当然，如果没有现成的SpriteSheet也没问题。按帧切好的Sprite图也可以。

#### 具体步骤

1. 设定Sprite的基本属性
	* SpriteSheet拖入Unity编辑器中
	* 在Inspector中更改其Texture Type属性为Sprite。（默认是Texture）
	* 如果一张图片中含有多个Spirte，则将Sprite Mode属性置为Multiple。（即SpriteSheet的情况）
1. 在SpriteEditor中切分Sprite
	* 点击SpriteEditor键，打开Sprite编辑器
	* 在编辑器中可以将SpirteSheet切分成一个个Sprite。切分模式分为Automatic和Grid两种。如果所有的Sprite的大小都一样，建议选择Grid。Automatic切分根据图像复杂度不同效果会有出入。比如上边这张图的切分效果就不是很好。
	* 切分之后是可以对切分后的结果进行编辑的。点击切分好的Sprite即可。
	* 确认切分的方式无误之后，点击Apply键，完成切分。
1. Animation Clip的制作
	* 在Unity编辑器中Window->Animation打开动画编辑器。左上Create New Clip创建一个新的AnimationClip。
	* 将之前切分好的Sprite拖入，编辑展现顺序、FPS、特效。这样就完成了一个简单的帧动画。
	* 用[Add Curve](http://docs.unity3d.com/Documentation/Components/animeditor-AnimationCurves.html)编辑各类动画播放中的效果，颜色的变化等等。
	* 用[Animation Event](http://docs.unity3d.com/Documentation/Components/animeditor-AnimationEvents.html)可以在指定帧调用脚本中的函数，触发相应事件。
	* 如此往复，将所有的动画都做成独立的Animation Clip。
1. 用Animator将动画串联起来
	* 在Unity编辑器中Window->Animator打开Animator窗口
	* Animator是一个简单的状态机编辑器。通过创建状态(State)和迁移(Transition)可以完成动画的组合。
	* 作为迁移的触发条件的参数可以在左下角的Parameter处定义。这样在脚本中更改这些参数，就可以控制动画了。
	* 除了状态机，Animator还提供了Blend Tree来处理那些非常近似动画的切换。用Blend Tree可以使切换更加平滑。
	* 最后将Animator作为Component追加到相应的GameObject上，通过脚本控制参数就可以实现简单的动画效果了。

状态机<br>
<img src="../../../../image/AnimationControllerSample.png" height="400" width="400"><br>

Blend Tree<br>
<img src="../../../../image/BlendTreeSample.png" height="400" width="350"><br>

在脚本中的控制代码如下所示：


{% highlight csharp %}
using UnityEngine;
using System.Collections;
 
public class SpriteAnimationController : MonoBehaviour {
 
	private Animator animator;
 
	// Use this for initialization
	void Start () {
		this.animator = GetComponent<Animator>();
	}
	 
	// Update is called once per frame
	void Update () {
		float horizontal = Input.GetAxis("Horizontal");
		if ( horizontal < 0)
		{
			this.animator.SetBool("RightKeyDown", false);
			this.animator.SetBool("LeftKeyDown", true);
		}
		else if (horizontal > 0)
		{
			this.animator.SetBool("RightKeyDown", true);
			this.animator.SetBool("LeftKeyDown", false);
		}
		else
		{
			this.animator.SetBool("RightKeyDown", false);
			this.animator.SetBool("LeftKeyDown", false);
		}
	}
}
{% endhighlight %}
