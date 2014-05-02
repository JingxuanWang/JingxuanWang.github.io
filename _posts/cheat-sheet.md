---
layout: post
title:  CheatSheet
date:   2014-02-14 18:34:22
categories: CheatSheet
---


日积月累
========

目录
====

*	[CheatSheet] (#cheatsheet)
	*	[cmd] (#cmd)
		* [hdparm] (#hdparm)
		* [ps] (#ps)
	*	[git] (#git)
	*	[perl] (#perl)
	*	[bashrc] (#bashrc)
	*	[unity] (#unity)

<h3 id="cmd">cmd相关</h3>

登陆Server时出现如下错误提示：
```
-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8)
```
经查，是因为local机器的locale和远程server的locale不匹配导致。
重新设定local机器的locale解决。

检查可以使用`locale`。
可以在bashrc或bash_profile中更改设置
```
export LANG=en_US.UTF-8
export LC_CTYPE=zh_CN.UTF-8
export LC_ALL=ja_JP.UTF-8
```
等

<h4 id="hdparm">hdparm命令</h4>

	hdparm -tT /dev/sda

可以用来测定硬盘的读写速率

<h4 id="ps">ps命令</h4>

	ps auxf

f选项可以展现出进程的父子关系

<h3 id="cheatsheet">CheatSheet</h3>
都是一些日常积累出来的东西。
别的地方也可以查到，放在这里倒不是因为特别有技术含量，重在积累。


<h3 id="git">git相关</h3>

#### git config

#### 常用配置

	git config --global user.name "Wang Jingxuan"
	git config --global user.email "wang.jingxuan@example.com"
	git config --global color.diff auto # git diff 显示颜色
	git config --global color.status auto # git status 显示颜色
	git config --global color.branch auto # git branch 显示颜色
	git config --global core.editor "/usr/bin/vim" # 默认editor 当出现 Could not execute editor 错误时更改此设置

#### git log

设定如下alias可以在命令行里更容易的把握分支的情况。

	git config --global alias.graph 'log --graph -C -M --pretty=format:"<%h> %ad [%an] %Cgreen%d%Creset %s" --all --date=short'
	git config --global alias.config_private_username 'config --local user.name "JingxuanWang"'
	git config --global alias.config_private_email 'config --local user.email wjx1985@gmail.com'
	然后敲 `git graph`即可，有惊喜

#### git commit

修改commit的提交者

	git commit --amend --author="Author Name <email@address.com>"

#### git pull

	git pull --recurse-submodules

可以连带submodule一并更新

#### git branch

	git branch --set-upstream  local_branch origin/remote_branch
	git branch -m [old_branch_name] [new_branch_name]

#### git show

	git show [md5]
	git show [md5] --stat

可以直接看到某个提交的diff内容

#### git fetch

	git fetch -p

可以在本地清除已经被删掉的远程分支

#### git remote

在本地删除一个不用的远程仓库的关联

	git remote rm destination

#### git rev-parse

得到当前所在的分支(这个主要是程序读入用的)

	git rev-parse --abbrev-ref HEAD

#### git format-patch

将commit打包为path

	git format-patch -1 <sha>

读入path

	git am [patch-file]

#### git apply

读入一个补丁

	git diff > [patch-file]
	git apply [patch-file]

#### git reflog

用git reflog撤销已经执行的操作

比如错误的执行了git rebase，而且还成功了。。
这时候git reflog会看到这样的内容

	fb38585 HEAD@{16}: rebase finished: returning to refs/heads/feature/renewal/phase2_battle_quest
	fb38585 HEAD@{17}: rebase: change func name and fix tests
	c2f7cc8 HEAD@{18}: rebase: bug fix
	a685f6f HEAD@{19}: rebase: resume Quest/Toto
	b4ad608 HEAD@{20}: rebase: update 20130807
	064e609 HEAD@{21}: rebase: update 20130806
	08544cc HEAD@{22}: rebase: update
	8777f50 HEAD@{23}: rebase: update Models for quest
	989e074 HEAD@{24}: rebase: models for battle quest
	4c6cb93 HEAD@{25}: checkout: moving from feature/renewal/phase2_battle_quest to 4c6cb939043df7b972866e9f6820d6292d4ae082^0
	e96b4d8 HEAD@{26}: checkout: moving from feature/renewal/phase2 to feature/renewal/phase2_battle_quest

以上HEAD@{25}是rebase开始，HEAD@{16}是rebase结束，所以需要执行：

	git reset --hard HEAD@{26}

就可以回到rebase之前的状态了。

对于其他操作也一样，关键是找准之前的有效状态。


<h3 id="perl">perl相关</h3>

#### 判断一个模块中的函数是否已经定义

```
defined($module->func)即可
```

<h3 id="bashrc">bashrc设定相关</h3>

现在正在用的PS设定

	PS1='[\t]\[\033[32m\]\u@\h\[\033[00m\]:\[\033[34m\]\W\[\033[31m\]$(__git_ps1)\[\033[00m\]\$ '

稍微解释一下：

	\t --- 现在的时间
	\u --- 当前用户
	\h --- 当前host
	\W --- 当前目录，只有当前目录名
	\w --- 当前目录，全路径名
	$(__git_ps1) --- 当前git repo的当前分支，需要source git-completion.bash
	
	其余的诸如\[\033[32m\]是字体和颜色
	\[\033[00m\] --- 白色
	\[\033[01m\] --- 白色(粗体)
	\[\033[04m\] --- 白色(下划线)
	\[\033[30m\] --- 黑色
	\[\033[31m\] --- 红色
	\[\033[32m\] --- 绿色
	\[\033[33m\] --- 黄色
	\[\033[34m\] --- 蓝色(深蓝)
	\[\033[35m\] --- 粉色
	\[\033[36m\] --- 青色(浅蓝)
	\[\033[37m\] --- 灰色

以上不带字体和颜色的版本是：

	PS1='[\t]\u@\h:\W$(__git_ps1)\$ '

<h3 id="unity">unity相关</h3>

#### C#

不能够使用默认函数参数，比如：

	void foo(int a, int b = 0)

C# 4.0虽然支持这个特性，但是Unity中并不支持。

#### Input和以及简单的Character controll

* Input.GetAxis("Horizontal") 和 Input.GetAxis("Vertical")控制上下左右
* Input.GetButton("Fire1") 等可以控制射击等行为
* "Horizontal", "Vertical", "Fire1"等对应的按键映射在Edit->Project Settings->Input中可以找到

#### Scene controll

* 暂停或者全局的加速、减速可以通过设置Time.timeScale的方式实现：0就是暂停，1是正常速度。

#### Coroutine

类似定时触发的功能尽量用coroutine完成，全部在Update函数中判断会写的比较乱。

	IEmulator foo() 
	{
		Debug.Log("Coroutine Started!");
		
		// wait for 1.0 second and proceed
		yield return new WaitForSeconds(1.0F);
		
		Debug.Log("Hey! We are back!");
		
		yield return 0;
	}

#### Delegate / Event vs SendMessage

对于事件异步调用，不推荐使用SendMessage，因为其可以无视private的限制调私有方法，而且代码写起来不够优雅。

	// Event Invoker
	class Invoker {
		public event NotifyEventHandler<EventInformation> EventGenerate; // 注意定义Event要使用动词
		
		protected virtual void OnEventGenerate(object sender, NotifyEventHandler<EventInformation> args)
		{
			// 如果这个Event存在有Listener
			if (this.EventGenerate != null)
			{
				this.EventGenerate(sender, args);
			}
		}
		
		NotifyEventHandler<EventInformation> args = new NotifyEventHandler<EventInformation>();	
		this.OnEventGenerate(this, args);
		
		// ...
	}
	
	// Event Listener
	class Listener {
		Invoker invoker;
		invoker.EventGenerate += HandleEventGenerate;
		
		void HandleEventGenerate() {
			Debug.Log("HandleEventGenerate Called");
		}
	}

#### Serialize的坑

* 没有被序列化的对象或属性无法被保存在Scene文件中(.Unity)。
* 未被序列化的数据在Unity发生重新加载Assembly的时候会被抹掉。
* MonoBehaviour无法被序列化，但是可以将其属性设置为[SerializeField]以保存在Scene文件中。
* Class上加了[Serializable]属性不能保证所有field都被序列化，必须在想要被序列化的属性上加[SerializeField]
* Public属性是自动被序列化的
* [SerializeField]只有在属性(field)上加才有效，在Property(方法、getter/setter)上无效
* 如果被序列化时存在两个field指向一个对象的情况，序列化的结果会将该对象保存两份。这样在反序列化的时候就变成了指向不同的对象。
	* 解决方法是使用ScriptableObject。即让对象类继承ScriptableObject。
* 更多的可以参考这篇文章[Unity Serialization](#http://blogs.unity3d.com/2012/10/25/unity-serialization/)
* generics只有List可以被序列化。自定义的类则不行。

#### EditorGUI

* 主要是在OnGUI()里头进行操作
* 类似于HTML中的Table可以用
	* EditorGUILayout.BeginHorizontal
	* EditorGUILayout.EndHorizontal
	* EditorGUILayout.BeginVertical
	* EditorGUIlayout.EndVertical

#### InspectorGUI

* 主要在OnInspectorGUI里头定制Inspector的样式
* DrawDefaultInspector()可以绘制默认的InspectorGUI
* 基本上用EditorGUILayout.PropertyField()可以搞定一切Inspector对象赋值等麻烦的操作
* serializedObject是被序列化的部分，基本上是serializedObject.FindProperty("fieldName")进行操作
* target是对象的实例。不方便用serializedObject的时候（比如有自定义类的赋值之类），可以将target进行类型转换并进行赋值
* 如果是直接通过target进行赋值的话，记得要调用EditorUtility.SetDirty(target);


#### XML Serialization

* 使用System.Xml.Serialization进行序列化。
* 想要转换成XML的类最好不要使用ScriptableObject。因为会调用默认的构造函数，而ScriptableObject的创建方法是CreateInstance<TClass>()。
* 通过[XMLIgnore] [XMLAttribute]等属性控制序列化的方式。

#### AssetDatabase

* AssetDatabase.ExportPackage可以将Asset打包成package，注意需要自己指定扩展名。

#### 性能

* GameObject.Find()少用，效率低
* OnRenderImage函数不能用在移动设备上。
	会触发RenderTexture.GrabPixels导致FPS降低。
	即使函数体为空也会导致FPS下降。
