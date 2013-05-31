日积月累
========

Tag: 程序语言

Date: 20130515


目录
====

*	[CheatSheet] (#cheatsheet)
	*	[git] (#git)


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

