TODO List
=========

### 关于这个Todo List
这里汇集了一些日常的“小问题”。问题虽小，但是弄明白背后的原理都会是不小的收获。  
因此把所有没有弄明白的“小问题”汇集于此，等日后有时间慢慢调查整理。  

#### Mac OS X中的Terminal和Xterm有什么不同？(done)
之前因为改乱了/usr/bin/里头的权限，造成login不可用，于是使用不了Terminal。  
因为Terminal默认要进行login，而login权限不对导致terminal直接退出。  
因此用了xterm，这个不需要login的shell，才算将权限设置正确。  
但是后来发现terminal中如果不进行login，sudo会出现password不正常的现象。  
而用xterm则无此问题。所以希望能整理这两者到底有什么不同。

以下内容来自:[《Mac OS X for Unix Geeks》](#http://docstore.mik.ua/orelly/unix3/mac/ch01_02.htm)

There are several important differences between Mac OS X's Terminal application and the xterm common to Unix systems running X Windows:

* You cannot customize the characteristics of the Terminal with command-line switches such as -fn, -fg, and -bg. Instead, you must use the Terminal's Show Info dialog.
* Unlike xterm, in which each window corresponds to a separate process, a single master process controls the Terminal. However, each shell session is run as a separate child process of the Terminal.
* The Terminal selection is not automatically put into the clipboard. Use Command-C to copy, Command-V to paste. Even before you press Command-C, the current text selection is contained in a selection called the pasteboard. The operations described in Section 1.4, later in this chapter, use the pasteboard.
* The value of $TERM is vt100 when running under Terminal (it's set to xterm under xterm by default).
* Pressing PageUp or PageDown scrolls the Terminal window, rather than letting the running program handle it.
* On compatible systems (generally, a system with an ATI Radeon or NVidia GeForce AGP graphics adapter), the Mac OS X Terminal (and all of the Aqua user interface) will use Quartz Extreme acceleration to make everything faster and smoother.

If you need an xterm, you can have it; however, you will have to install a compatible version of the X Window System first. See Chapter 9 for more information about the X Window System.

PS: 其实是否login，在Preference中是可以设置的。

PS2: /usr/bin/login和/usr/bin/bash的区别。

* if you pick /bin/login, then this program will check in the user database what your default shell is and run that shell as a login shell, thereby invoking the rc files that are run only when the shell is run as a login shell (in case of bash those are /etc/profile, ~/.bash_profile, ~/.bash_login and , and ~/.profile.
* if you pick /bin/bash, that shell will be executed as a login shell, independently of what shell is set in the user database. This can come in useful when the shell in the user database does not work properly, or you want to be able to use different shells.

if you have not changed your login shell from the default, which is /bin/bash, and you have not changed the rc files of this shell, then the difference will not be noticeable.


#### 4755权限和755权限到底有什么不同？(done)
很多/usr/bin下的可执行程序包括sudo 就是因为设置了755导致不可用。  
所以要搞清楚两种权限到底有何不同。

[wikipedia上的说明](#http://zh.wikipedia.org/wiki/Chmod)  

	模式	八进制	含义
	S_ISUID	04000	执行时设置用户ID,setuid权限
	S_ISGID	02000	执行时设置组ID，setgid权限
	S_ISVTX	01000	粘贴位
	S_IRUSR, S_IREAD	00400	所有者读
	S_IWUSR, S_IWRITE	00200	所有者写
	S_IXUSR, S_IEXEC	00100	所有者执行
	S_IRGRP	00040	由组读
	S_IWGRP	00020	由组写
	S_IXGRP	00010	由组执行
	S_IROTH	00004	其他人读
	S_IWOTH	00002	其他人写
	S_IXOTH	00001	其他人执行

man chmod说明如下：

	4000    (the set-user-ID-on-execution bit) Executable files with this bit set will run with effective uid set to the uid of the file owner.  Direc-
	        tories with the set-user-id bit set will force all files and sub-directories created in them to be owned by the directory owner and not by
	        the uid of the creating process, if the underlying file system supports this feature: see chmod(2) and the suiddir option to mount(8).
	2000    (the set-group-ID-on-execution bit) Executable files with this bit set will run with effective gid set to the gid of the file owner.
	1000    (the sticky bit) See chmod(2) and sticky(8).
	0400    Allow read by owner.
	0200    Allow write by owner.
	0100    For files, allow execution by owner.  For directories, allow the owner to search in the directory.
	0040    Allow read by group members.
	0020    Allow write by group members.
	0010    For files, allow execution by group members.  For directories, allow group members to search in the directory.
	0004    Allow read by others.
	0002    Allow write by others.
	0001    For files, allow execution by others.  For directories allow others to search in the directory.

setuid和setgid的意义在于，让执行者在执行的时候具有文件所有者的uid和gid。  
这样就很容易理解sudo和passwd为什么需要这种特殊的设定了。  

顺带看了一眼sticky的说明，挺有意思，摘录如下：

	STICKY DIRECTORIES
	
	A directory whose `sticky bit' is set becomes an append-only directory, or, more accurately, a directory in which the deletion of files is restricted.  A
	file in a sticky directory may only be removed or renamed by a user if the user has write permission for the directory and the user is the owner of the
	file, the owner of the directory, or the super-user.  This feature is usefully applied to directories such as /tmp which must be publicly writable but
	should deny users the license to arbitrarily delete or rename each others' files.

简单来说，如果一个目录被设置为sticky。那么其中的内容则只能增不能减。  
