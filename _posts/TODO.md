TODO List
=========

### 关于这个Todo List
这里汇集了一些日常的“小问题”。问题虽小，但是弄明白背后的原理都会是不小的收获。  
因此把所有没有弄明白的“小问题”汇集于此，等日后有时间慢慢调查整理。  

#### Mac OS X中的Terminal和Xterm有什么不同？
之前因为改乱了/usr/bin/里头的权限，造成login不可用，于是使用不了Terminal。  
因为Terminal默认要进行login，而login权限不对导致terminal直接退出。  
因此用了xterm，这个不需要login的shell，才算将权限设置正确。  
但是后来发现terminal中如果不进行login，sudo会出现password不正常的现象。  
而用xterm则无此问题。所以希望能整理这两者到底有什么不同


#### 4755权限和755权限到底有什么不同？
很多/usr/bin下的可执行程序包括sudo 就是因为设置了755导致不可用。  
所以要搞清楚两种权限到底有何不同。


