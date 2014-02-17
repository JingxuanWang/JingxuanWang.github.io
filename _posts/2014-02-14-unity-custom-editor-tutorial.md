---
layout: post
title:  Unity自定义Editor简明教程
date:   2014-02-14 18:42:58
categories: Unity
---

### [Unity Custom Editor][1]

Unity中可以通过编写脚本实现[自定义的Editor][1]。好用Editor可以使开发事半功倍。
Asset Store上大部分第三方插件如NGUI、PlayMaker等都包含自定义Editor的部分。
自定义Editor主要包含两部分：[Editor Window][2]和[Custom Editor][3]。

#### [Editor Window][2]

<img src="http://docs.unity3d.com/Documentation/Images/manual/editor-EditorWindows-0.jpg" height="50%" width="50%"><br>
顾名思义就是一个单独窗口的Editor。

简单的例子在官方网站上可以找到，这里不再赘述。  
这里讨论几个比较重要的部分：

**1, 区域划分**

Unity提供了`EditorGUILayout.BeginHorizontal()`、`EditorGUILayaout.BeginVertical()`这样的方法，用于声明一个元素是横向/纵向排列的新block。
其用法类似于HTML中的`<table><tr>`、`<table><td>`。
当然，不要忘记在结束一个区域的时候调用`EditorGUILayout.EndHorizontal()`和`EditorGUILayaout.EndVertical()`。
特别是在代码中有break, return的时候要注意。
区域不闭合Unity会报错的。

**2, 格式调整与样式定义**

一般有两种方法：GUILayoutOption和GUIStyle

[GUILayoutOption][6]

* Height
* Width
* MaxHeight
* MaxWidth
* MinHeight
* MinWidth
* ExpandHeight
* ExpandWidth

基本上就是以上这几种。涵盖了默认长宽，最大/最小长宽，是否可以拉伸长宽等等设定。
如果对于格式要求不多的话以上基本够用。
用法如下：

{% highlight csharp %}


	EditorGUILayout.BeginVertical(
		GUILayout.Width(blockWidth),
		GUILayout.ExpandHeight(true)
	);

{% endhighlight %}

[GUIStyle][5]

如果一定要像在HTML里一样自定义Margin, Border, Padding, OnHover, OnFocus...那么推荐使用GUIStyle。
使用方法是新建一个GUISkin，然后编辑，最后在代码中载入编辑好的GUISkin中对应的样式。
GUIStyle可以满足对于自定义样式的种种需求，但是缺点是需要很多“准备工作”，并不像GUILayoutOption一样拿来就能用。
例子如下：

{% highlight csharp %}


	GUISkin editorGUISkin = (GUISkin)Resources.Load("EditorGUISkin");
	GUIStyle blockStyle = editorGUISkin.customStyles[0];
	EditorGUILayout.BeginVertical(blockStyle, GUILayout.Width(stateListBlockWidth));

{% endhighlight %}

**3, 事件处理**

这里主要讨论鼠标事件处理。

Event.current.Type

当前事件的类型，典型的有

* EventType.mouseDown
* EventType.mouseUp
* EventType.mouseDrag
* EventType.scrollWheel

Event.current.button

当前按键类型，默认值为

* 0 => 鼠标左键
* 1 => 鼠标右键
* 2 => 鼠标中键

Event.current.delta

这是一个Vector2的变量，可以用在处理鼠标滚轮事件上。
判断Event.current.delta.y的值即可。

以上的变量结合起来使用基本上可以编写出大部分处理鼠标事件的代码。
当然Editor Window也可以处理键盘事件，但是用的不是很广泛这里不复赘述。

重绘的时机

Editor Window的窗口绘制基本上在OnGUI()函数中进行，而OnGUI函数并不是每一帧都被调用的。
通常只有满足了重绘条件时才会被调用，比如将键盘焦点汇集到窗口上或者元素被更新等等。
也可以在脚本中通过this.Repaint()手动触发重绘操作。

因此想要使得Editor Window拥有更加流畅的体验则必须注意触发重绘函数的时机。
实际上Unity本身提供的组件如SlideBar, ScrollView等等都不需要进行特殊的设置即可满足我们的要求。
问题在于一些自定义的UI组件。
如果一个自定义的UI组件在相应各类事件时有卡顿的现象，则说明其重绘的时机可能有问题。
一般而言，是重绘没有跟上UI元素的更新，解决方法是在想要更新UI组件表现的时候使用Event.current.Use()函数。

Event.current.Use()

这个函数的作用是“吃掉”当前的事件，使得在这行代码之下的代码无法继续使用这个事件。（会看到Event.current.Type == EventType.Used）
同时，在本次OnGUI执行完成后会立即进行重绘，及时更新UI的信息。
很多自定义组件的Drag操作，如果不使用Event.current.Use()函数都会变的很不自然，就是因为更新了UI信息（比如位置）之后没有及时触发重绘操作导致的。


**4，例子——可变尺寸区域**

按照上述方法基本可以很快的划分好窗口的区域并将各个元素放到指定的位置。
相比于Unity的默认窗口，使用Unity提供的默认组件无法简单的构建一个可以自动调节大小的区域。
以下的例子实现了一个可以调节大小的区域。

{% highlight csharp %}


	void drawVerticalResizeBlock(ref float parameterToResize)
	{
		float blockWidth = 0f;
		Rect blockRect = EditorGUILayout.BeginVertical(
			GUILayout.Width(blockWidth),
			GUILayout.ExpandHeight(true)
		);
		EditorGUILayout.EndVertical();
		
		Rect resizeBlockRect = 
			new Rect(
				blockRect.xMin - resizeDetectSize,
				blockRect.yMin,
				blockRect.width + 2 * resizeDetectSize,
				blockRect.height
			);
		EditorGUIUtility.AddCursorRect(resizeBlockRect, MouseCursor.ResizeHorizontal);
		
		if (resizeBlockRect.Contains(Event.current.mousePosition))
		{
			if (Event.current.type == EventType.mouseDown)
			{
				mouseOffset = Event.current.mousePosition.x - parameterToResize;
				Event.current.Use();
			}
			
			if (Event.current.type == EventType.mouseDrag)
			{
				parameterToResize = Event.current.mousePosition.x - mouseOffset;
				Event.current.Use();
			}
		}
	
	}
	
	void drawHorizontalResizeBlock(ref float parameterToResize)
	{
		float blockHeight = 0f;
		Rect blockRect = EditorGUILayout.BeginHorizontal(
			GUILayout.Height(blockHeight),
			GUILayout.ExpandWidth(true)
		);
		EditorGUILayout.EndHorizontal();
		
		Rect resizeBlockRect = 
			new Rect(
				blockRect.xMin,
				blockRect.yMin - resizeDetectSize,
				blockRect.width,
				blockRect.height + 2 * resizeDetectSize
			);
		EditorGUIUtility.AddCursorRect(resizeBlockRect, MouseCursor.ResizeVertical);
		
		if (resizeBlockRect.Contains(Event.current.mousePosition))
		{
			if (Event.current.type == EventType.mouseDown)
			{
				mouseOffset = Event.current.mousePosition.y - parameterToResize;
				Event.current.Use();
			}
			
			if (Event.current.type == EventType.mouseDrag)
			{
				parameterToResize = Event.current.mousePosition.y - mouseOffset;
				Event.current.Use();
			}
		}
	}

{% endhighlight %}


#### [Custom Editor][3]

Custom Editor包含Inspector、Scene等部分，这里主要讨论Custom Inspector的部分。

**1, OnInspectorGUI与DrawDefaultInspector**

Custom Editor的使用方法与Editor Window大同小异。
需要注意的是Inspector的绘制是在OnInspectorGUI函数中完成的。
此外，所继承的基类不是EditorWindow而是UnityEditor.Editor。
这个类中提供了一个DrawDefaultInspector的函数，调用即可绘制默认的Inspector。

**2，serializedObject与Target**

Inspector的主要用途在于编辑其所依附的MonoBehavior的数据。
编辑的方法通常有两种。

[serializedObject][7]

OnInspectorGUI中可以操作一个名为serializedObject的对象。
这个对象即为MonoBehavior序列化之后的实例。
通过调用serializedObject.FindProperty("PropertyName")可以得到一个类型为SerializedProperty的属性。
可以通过把该属性绑定到编辑框里（一般是PropertyField）来实现在Inspector上编辑该属性的效果。
实例如下：


{% highlight csharp %}

	// 更新serializedObject的值
	serializedObject.Update();

	SerializedProperty sp = serializedObject.FindProperty("intField");
	EditorGUILayout.PropertyField(sp, new GUIContent("IntField"), GUILayout.Width("100"));

	// 将更新的值写回
	serializedObject.ApplyModifiedProperties();

{% endhighlight %}


target

一般的默认类型属性都可以通过serializedObject + PropertyField搞定。
但是对于自定义类型的属性有些时候行不通，这时候需要依靠target对象。
例子如下：

{% highlight csharp %}


	CustomClass cc = target as CustomClass;
	
	cc.IntField = 30;
	cc.CustomMethod("Hello World");

	//提示Unity更新target信息
	EditorUtility.SetDirty(target);

{% endhighlight %}


#### 自定义Editor的其他玩法

除了可以自定义Editor Window和Inspector，还可以在UnityEditor.Editor类里实现OnSceneGUI函数自定义SceneView中的表现。
篇幅所限，这里不加赘述，有兴趣的读者可以参考[文档][4]。

[1]: http://docs.unity3d.com/Documentation/Components/ExtendingTheEditor.html
[2]: http://docs.unity3d.com/Documentation/Components/editor-EditorWindows.html
[3]: http://docs.unity3d.com/Documentation/Components/editor-CustomEditors.html
[4]: http://docs.unity3d.com/Documentation/ScriptReference/Editor.OnSceneGUI.html
[5]: http://docs.unity3d.com/Documentation/ScriptReference/GUIStyle.html
[6]: http://docs.unity3d.com/Documentation/ScriptReference/GUILayoutOption.html
[7]: http://docs.unity3d.com/Documentation/ScriptReference/SerializedObject.html
