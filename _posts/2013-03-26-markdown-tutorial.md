---
layout: post
title:  "Markdown语法入门"
date:   2013-03-26 12:00:00
categories: markdown
---


最近在Github上逛的时候，注意到一个事：绝大多数的readme都使用.md的后缀名。
虽然看这种.md后缀名的文件也有一段时间了，但是确实没研究过为什么最近大家都用这种格式。
于是稍微调查了一下。

*   [什么是Markdown语法](#markdown-1)
*   [Markdown语法基础](#markdown-2)
	*   [段落与换行(paragraph)](#paragraph)
	*   [标题(header)](#header)
	*   [列表(list)](#list)
	*   [代码块(codeblock)](#codeblock)
	*   [引用块(quoteblock)](#quoteblock)
	*   [分割线(hr)](#hr)
	*   [链接(link)](#link)
	*	[强调(emphasis)](#emphasis)
	*	[代码(code)](#code)
	*	[图片(image)](#image)
*   [其他](#misc)
	*   [自动链接(automaticlinks)](#automaticlinks)
	*   [反斜线转义(backslashescape)](#backslashescape)
	*	[Github页面内anchor无法使用的问题](#githubanchor)

<h2 id="markdown-1">什么是Markdown语法</h2>

Markdown语言是一种轻量级标签语言。
是一种纯文本的模式的“易读易写”的语言(easy-to-read, easy-to-write)。
用该语言书写的内容可以简单的被其转换为XHTML/HTML。
其中保留了纯文本邮件中大量使用的约定。

Markdown本身又是一个从纯文本转换到HTML语言的转换器，有很多种实现。
在Github，Stack Overflow等网站上被广泛应用于用户(程序员)之间的互动。
的确，对于像我这样的程序员，能够以简单的纯文本格式写出一段具有简单格式而又清楚易读的文字是挺重要的。
(以上内容翻译、整理自维基百科，详细内容参考[原文](http://en.wikipedia.org/wiki/Markdown))

####个人理解####
Markdown更接近于一种`元语言`，由翻译器根据特定的规则转换为HTML。
实际上大家在网页上看到的仍然是HTML。
但是对于Markdown而言，其优势在于比HTML满屏幕的标签更加的“所见即所得”。
对于写者而言可以不用考虑HTML的各种标签，非常的友好。

而且因为最终的翻译目标是HTML，因此Markdown是支持inline HTML的。
在Markdown格式中插入的HTML文本不会被翻译，会被保留原来的形态加入到最终的输出文本中。


####注意####
以下内容基本翻译自[Daring Fireball上的原文][7]。
本人在翻译的基础上对原文进行了一定的修改和重排，可能会造成一定的误解。
如有任何问题请以*原文为准*。

<h2 id="markdown-2">Markdown语法基础</h2>

个人感觉Markdown的语法跟之前使用过的一些wiki的语法有相似之处。
比如最简单的\*强调\*就是在要强调的内容两边加上星号。

<h3 id="paragraph">段落与换行(paragraph)</h3>

段落是连续若干行的文本，由一个或多个空行分隔。
被转换为HTML之后，Markdown会在段尾加入`<br/>`标签。
如果想要人为地在某个位置将转换后的文本中插入一个`<br/>`标签的话，
可以在换行之前插入多于两个空格。

这看上去可能有点奇怪，甚至于比输入`<br/>`更麻烦。
但是可以使得`<br>=换行`的定律失效。
而这在涉及到块引用和列表元素的时候犹为重要。
往下看吧:)

<h3 id="header">标题(header)</h3>
Marksown支持两种格式的标题[Setext][1]和[atx][2]。

Setext风格的标题如下例:

	标题一
	======
	
	标题二
	------

atx风格的标题如下例:

	#标题一

   	##标题二

   	###标题三

你也可以选择将井号的“标签”闭合，比如:

	#标题一#
	
	##标题二##

	###标题三######

<h3 id="list">列表(list)</h3>

Markdown支持有序和无序表，对应HTML的相应`<ul>`和`<ol>`。

很多种符号都可以表示无序表，比如`*`或`+`或`-`:

	*	列表元素1
	*	列表元素2
	*	列表元素3

	+	列表元素1
	+	列表元素2
	+	列表元素3
	
	-	列表元素1
	-	列表元素2
	-	列表元素3

有序表使用数字加一点(英文字符的句点):

	1.	列表元素1
	2.	列表元素2
	3.	列表元素3

需要注意的是，有序表前边的数字*不是*实际显示给用户的数字。
所以，即使写成下边这样，仍然会得到一个按序的结果:

	1.	列表元素1
	1.	列表元素2
	1.	列表元素3

	3.	列表元素1
	1.	列表元素2
	8.	列表元素3

这上提供了一种偷懒的做法。
实际上列表如果很长的话，修改或者增加列表元素的时候可能会很烦人。


可以通过tab锁紧将多行的列表元素整理的更好看，例如:

	*	列表元素1
		第二行
	*	列表元素2
		第二行
	*	列表元素3
		第二行

或者如果懒得整理，这样也可以:

	*	列表元素1
	第二行
	*	列表元素2
	第二行
	*	列表元素3
	第二行

如果列表元素之间存在空行，在转换位HTML的时候将会加入`<p>`标签，例如:

	*	Hello
	*	World

会被转换为

	<ul>
	<li>Hello</li>
	<li>World</li>
	</ul>

而

	*	Hello

	*	World

会被转换为

	<ul>
	<li><p>Hello</p></li>
	<li><p>World</p></li>
	</ul>


列表元素当然也可以包含多个段落，但是必须保证新起的段落段首要空四个空格或者一个tab。
例如:

	*	列表元素1
	
		第二自然段
		第二行

	*	列表元素2
		第二行

		第二自然段
		第二行

当然了，Markdown总是允许偷懒的写法的。
例如:

	*	列表元素1
	
		第二自然段
	第二行

	*	列表元素2
	第二行

		第二自然段
	第二行


如果要在列表元素里添加引用块，`>`符号需要缩进一个tab。
例如:

	*	列表元素1

		>	引用内容第一行
		>	引用内容第二行

如果有代码块，则这个块的代码需要缩进两次。

	*	列表元素1

			<code goes here>

因为有序列表的格式是数字，所以需要对`.`进行转义，比如:

	1986\\. What a great person.

####注意####
列表标识符`*`或者`1.`一般是写于行首，可以最多空三个空格。
在标识符和正文之间必须存在至少一个空格或者tab

反过来说，这些标识符只要在行首加入一个tab就会失效。
因此如果想要像本文一样输入一些格式的示例，在行首缩进一个tab即可。
具体原理可以参见下文代码块的说明。


<h3 id="codeblock">代码块(codeblock)</h3>

Markdown会把代码块包一层`<pre>`和`<code>`的标签。
想要创建一个代码块，需要把这一块的每一行都缩进一个tab或者4个空格。
比如:

	这是一段正常的文字。

		这是代码块。

上边的内容会生成:

	<p>这是一段正常的文字。</p>

	<pre><code>这是代码块。</code></pre>


代码块会持续到检测不到缩进的那一行为止。
在代码块内部的特殊符号`&`、`<`、`>`会自动转换为HTML实体。
这样的处理会使得引用一段HTML文本非常容易——只需要粘贴过来，缩进一下就可以了。
在代码块内部，普通的Markdown语法将不会再起作用。
所以想要显示一些Markdown源码只需要做一个缩进就可以了。


<h3 id="quoteblock">引用块(quoteblock)</h3>

Markdown使用email风格的`>`符号做块引用。
如果之前熟悉邮件里或者BBS里的这种风格，则不难掌握其使用方法。
简单来说就是每一行开头加上`>`符号，如下例。

	> 这里的文字是引用内容。
	> 引用的内容。

Markdown甚至允许一种偷懒的做法，就是只在段首使用`>`字符提示这是一个引用的段落，例如:
	
	> 这是一个引用的段落。
	虽然这一行没有`>`但是仍然是被引用的。

	> 换了下一段就不得不在段首添加`>`符号了。

块引用可以嵌套，熟悉email中做法的大概会很容易理解，看例子:

	> 这是第一层引用
	>
	> > 这是第二层引用
	> 回到第一层引用

引用块的内容仍然可以有效的显示其他语法，如下例:
	
	> ##这是标题
	> 
	> 1.	这是有序列表第一项
	> 2.	这是有序列表第二项
	> 
	> 这是代码:
	>	return a(n-1) + a(n-2);

<h3 id="hr">分割线(hr)</h3>

对应HTML中的`<hr/>`标签，以下各种方式都可以被转换成水平分割线。

	* * *

	***

	*****

	- - -
	
	--------------------------


<h3 id="link">链接(link)</h3>
Markdown支持两种链接形式: 链接和引用。
所有链接的形式中链接的显示文本用方括号圈出[square brackets]
链接指向的地址用写在方括号之后紧跟的圆括号里。
完整的链接形式如下[某个网站的链接](http://www.example.com)。
圆括号里头可以加入Title参数，例如:

	This is [an example](http://example.com/ "Title") inline link.

	[This link](http://example.net/) has no title attribute.

会被转换为:

	<p>This is <a href="http://example.com/" title="Title">
	an example</a> inline link.</p>

	<p><a href="http://example.net/">This link</a> has no
	title attribute.</p>

如果链接指向一个服务器内的资源，也可以使用相对路径，例如:

	See my [About](/about/) page for details.   

Markdown还支持一种引用类型的链接，跟论文中的Reference很像。
当多个链接指向同一个地址时，可以通过使用引用将这些链接指向的地址汇聚起来。
对于懒得将这些链接地址写很多次的人来说非常方便。

完成一个引用链接分两部分: 引用部分和被引用部分。

	This is [引用部分][id] reference-style link.

当然，之间可以加空格，比如:

	This is [引用部分] [id] reference-style link.

被引用部分如下，在同一文档的任意部分都有效。
当然，出于让整洁的目的，可以考虑统一放在最上或者最下部。

	[id]: http://example.com/  "Optional Title Here"

格式规则如下:

* 方括号将引用id括起来
* 后边紧跟冒号
* 后边可以跟一个或多个空格或者tab
* 后边是URL，注意这时候没有圆括号
* 链接后边跟着相关扩展属性，可以用单、双引号或者用小括号引起
Markdown1.0.1曾经有一个bug，单引号不能用做分隔符


其实链接地址也可以用尖括号圈起来，如下例:

	[id]: <http://example.com/>  "Optional Title Here"

对于长URL，可以将Title属性放在下一行，但是需要额外的缩进，比如:

	[id]: http://example.com/longish/path/to/resource/here
    	"Optional Title Here"

引用链接的标号只是用来标明这个链接需要对应地址的id，在最终生成的HTML文档中不会出现。
标号可以是字母、数字、空格或者标点，但是注意，它对于大小写不敏感:

	[link text][a]
	[link text][A]

引用链接的标号也可以省略，在这种情况下链接的显示文本会被作为引用链接的标号，比如:

	[Google][]

	[Google]: http://www.google.com

因为链接的显示文本可以包含空格，所以下边这种做法也是有效的:

	[Daring Fireball][]

	[Daring Fireball]: http://daringfireball.net


<h3 id="emphasis">强调(emphasis)</h3>
Markdown语法将`*`或者`_`包裹的文本视作被强调的内容。
被单`*`包裹的文本转换后会被`<em>`标签包含；
而被双`*`包裹的文本转换后会被`<strong>`标签包含。
但是注意，在一段强调文本中只能使用同一种符号。
比如下列:

	*single asterisks*

	_single underscores_

	**double asterisks**

	__double underscores__

会被转化为:

	<em>single asterisks</em>

	<em>single underscores</em>

	<strong>double asterisks</strong>

	<strong>double underscores</strong>


强调内容可以插入到文本的任意部分，比如:
	
	un*frigging*believable

如果用空格包含 * 或者 _ 他们会被当做普通字符被输出。


<h3 id="code">代码(code)</h3>
Markdown可以用很多种方式输出一段代码。
比如最简单的用 ` 包含这段代码。这是一种嵌在段落内的的方案。
如果这段代码本身包含 ` 符号，可以使用多重 ` 符号来包含一个代码块。
如下例:

	Use the `printf()` function.
	
	``There is a literal backtick (`) here.``

会被转换为

	<p>Use the <code>printf()</code> function.</p>
	
	<p><code>There is a literal backtick (`) here.</code></p>

\`符号可以包含的HTML标签将不会起作用，会被自动的转移为不同文本:

	Please do not use any `<blink>` tags.

会被转换为:

	<p>Please do not use any <code>&lt;blink&gt;</code> tags.</p>

<h3 id="image">图片(image)</h3>
Markdown作为一个纯文本的格式，本来不应该支持图片的。
但是Markdown还是提供了相关的语法。
与HTML类似，文档中的图片使用了类似链接的方式。
图片链接的语法如下:

	![Alt text](/path/to/img.jpg)

	![Alt text](/path/to/img.jpg "Optional title")

* 在链接之前加感叹号`!`
* 后边跟方括号，里边包含image的alt属性
* 再后边跟圆括号，里边包含图片文件的路径或者URL。后边跟可选的Title属性内容并用双引号引起。

图片链接也支持引用模式，与链接的做法类似:
	
	![Alt text][id]
	
	[id]: url/to/image  "Optional title attribute"


Markdown并不支持对于图片的其他操作，比如dimension属性。
如果实在想要控制这些属性的话，还是直接使用`<img>`标签吧:)



<h2 id="misc">其他(misc)</h2>

<h3 id="automaticlinks">自动链接(automaticlinks)</h3>
如果你想直接把URL作为链接文本呈现给用户的话，Markdown支持一种简单的写法。

	<http://example.com>

以上文本会被自动转换为:

	<a href="http://example.com/">http://example.com/</a>

自动链接在写email的时候尤其好用。而且被转义过后的email会生成如下文本

	<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;
	&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;
	&#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;
	&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>

这种经过escape过的文本可以有效的躲过很多spider，并且防止邮箱被spam。
但是这种格式的邮件地址被各路spider发现并识别也只是时间问题。



<h3 id="backslashescape">反斜线转义(backslashescape)</h3>
以下的特殊符号可以被反斜线转义:

	\   backslash
	`   backtick
	*   asterisk
	_   underscore
	{}  curly braces
	[]  square brackets
	()  parentheses
	#   hash mark
	+   plus sign
	-   minus sign (hyphen)
	.   dot
	!   exclamation mark

<h3 id="githubanchor">Github页面内anchor无法使用的问题</h3>
在[Daring Fireball][7]网站上Markdown语言页面跳转的写法在Github不好用。
稍微调查了一下，在Github上Markdown转换的结果跟[Daring Fireball][7]上头不一样。
比如:

	<h3 id="abc">test title</h3>

在Github上会被转换为:

	<h3><a name="-1" class="anchor" href="#-1"><span class="mini-icon mini-icon-link"></span></a>test title</h3>

貌似是header标签中的`id`属性会被过滤掉。
又试了试`<div>`和`<a>`标签，同样`id`属性也是被过滤掉的。
到现在为止试了很多种方法，以下这种可以实现页面内的链接:

	<h3><a name="abc">test title</a><h3>

但是缺陷在于因为手动加入了`<a>`标签，test title出的文字变成了链接的样式。
作为经常写Markdown的人来说，手动写style肯定是个很不爽的事情。

追加:
其实Github会对这种header的前边自动加一个anchor的，就是上文的这一段:

	<a name="-1" class="anchor" href="#-1"><span class="mini-icon mini-icon-link">

* 其中name是由header的内容转换过来的，同名的话就在后边加上-1 -2这样的数字。
* anchor变量名不支持中文和标点，所以header是中英混杂的情况下只会出现英文。
* 空格会被转化为横线`-`。比如`test link` => `#test-link`。
* 这种转换是忽略大小写的

例如:

	<h3>test link</h3>

会被转化为

	<h3><a name="test-link" class="anchor" href="#test-link"><span class="mini-icon mini-icon-link"></span></a>test title</h3>

然后在页面任何地方引用就可以了，比如:

	[text-of-test-link](#test-link)

####但是注意####

1. Github Issues不会给header自动生成一个anchor
2. 有些Markdown语法(比如上边的`####`如果后边不加空格直接跟标题文本)在Issues里是不被支持的



[1]: http://docutils.sourceforge.net/mirror/setext.html
[2]: http://www.aaronsw.com/2002/atx/
[3]: http://textism.com/tools/textile/
[4]: http://docutils.sourceforge.net/rst.html
[5]: http://www.triptico.com/software/grutatxt.html
[6]: http://ettext.taint.org/doc/
[7]: http://daringfireball.net/projects/markdown/syntax


