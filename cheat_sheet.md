日积月累
========

Tag: 程序语言

Date: 20130515
Last Update: 20130808


目录
====

*	[CheatSheet] (#cheatsheet)
	*	[git] (#git)
	*	[perl] (#perl)
	*	[bashrc] (#bashrc)


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

#### git log

设定如下alias可以在命令行里更容易的把握分支的情况。

	git config --global alias.graph 'log --graph -C -M --pretty=format:"<%h> %ad [%an] %Cgreen%d%Creset %s" --all --date=short'
	然后敲 `git graph`即可，有惊喜

#### git branch

git branch --set-upstream  local_branch origin/remote_branch

#### git fetch

git fetch -p

可以在本地清除已经被删掉的远程分支

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

