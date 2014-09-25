---
layout: post
title: 解决Unity无法在新版本的Xcode下Build And Run的问题
date:   2014-09-25 18:23:53
categories: Unity
---

## Unity的bug

这应该是一个由来已久的bug。
Unity无法在最新版本的Xcode环境下执行Build And Run。
执行了以后会出现这个错误。

{% highlight text %}
UnityException: Launching iOS project via Xcode4 failed. Check editor log for details
{% endhighlight %}

## 解决办法

Unity其实已经提供了[解决这个bug的方案](http://forum.unity3d.com/threads/nityexception-launching-ios-project-via-xcode4-failed.234557/)。

但是这是个不是很漂亮的方法，因此在Unity在最新的版本fix之前，想要在最新的Xcode下继续执行Build And Run只能进行手动修复。


### 打开Unity4XC.xcplugin的Info.plist

{% highlight csharp %}
// 注意以前是在这个位置
Unity.app/Contents/BuildTargetTools/iPhonePlayer/Unity4XC.xcplugin/Contents/Info.plist

// 现在改到了这个位置
Unity.app/Contents/PlaybackEngines/iOSSupport/Tools/OSX/Unity4XC.xcplugin/Contents/Info.plist
{% endhighlight %}

### 将最新版Xcode的DVTPluginCompatibilityUUID加入Info.plist中

* 找到Xcode包中的Info.plist文件
* 文件是二进制的，所以用Xcode打开
* 找到DVTPlugInCompatibilityUUID域，将其值复制到Unity4XC.xcplugin的Info.plist中

{% highlight xml %}
<key>DVTPlugInCompatibilityUUIDs</key>
<array>
	<string>A2E4D43F-41F4-4FB9-BB94-7177011C9AED</string>
	<string>63FC1C47-140D-42B0-BB4D-A10B2D225574</string>
	<string>37B30044-3B14-46BA-ABAA-F01000C27B63</string>
	<string>AD68E85B-441B-4301-B564-A45E4919A6AD</string>
	<string>C4A681B0-4A26-480E-93EC-1218098B9AA0</string> <!-- Xcode6 -->
</array>
{% endhighlight %}


**这样就可以在最新的Xcode下执行Build And Run了~**
