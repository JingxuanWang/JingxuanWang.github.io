---
layout: post
title:  Unity iOS link error原因调查
date:   2014-12-15 16:31:24 
categories: Unity
---


## Reason Of "Error: ld: Unable to insert branch island. No insertion point available"

Unity的项目在后期代码比较多的时候，可能会出现如下错误。
	
	ld: Unable to insert branch island. No insertion point available

关于这个错误[这里](http://forum.unity3d.com/threads/unity-ios-linker-error-unable-to-insert-branch-island-no-insertion-point-available.239200/)讨论的已经比较多了。
现象就是dll.o文件过大导致链接失败。
解决方法无外乎是均摊这些代码，防止编译到同一个目标文件上的代码过多。

但是帖子上没有就这个错误的成因做很明确的说明。

前一阵正好也发生了这个错误，稍微调查了一下。发现了这个：    
[https://opensource.apple.com/source/ld64/ld64-241.9/src/ld/passes/branch_island.cpp](https://opensource.apple.com/source/ld64/ld64-241.9/src/ld/passes/branch_island.cpp)

这是XCode工具之一的ld的源代码。博主目前用的Xcode 6.1.1使用的是ld64-241.9。
在源码中，博主发现了如下代码。

{% highlight cpp %}

// Figure out how many regions of branch islands will be needed, and their locations.
// Construct a vector containing the atoms after which branch islands will be inserted,
// taking into account follow on fixups. No atom run without an island can exceed kBetweenRegions.
const uint64_t kBetweenRegions = maxDistanceBetweenIslands(opts, hasThumbBranches); // place regions of islands every 14MB in __text section
std::vector<const ld::Atom*> branchIslandInsertionPoints; // atoms in the atom list after which branch islands will be inserted
uint64_t previousIslandEndAddr = 0;
const ld::Atom *insertionPoint = NULL;
branchIslandInsertionPoints.reserve(totalTextSize/kBetweenRegions*2);
for (std::vector<const ld::Atom*>::iterator it=textSection->atoms.begin(); it != textSection->atoms.end(); it++) {
	const ld::Atom* atom = *it;
	// if we move past the next atom, will the run length exceed kBetweenRegions?
	if ( atom->sectionOffset() + atom->size() > previousIslandEndAddr + kBetweenRegions ) {
		// yes. Add the last known good location (atom) for inserting a branch island.
		if ( insertionPoint == NULL )
			throwf("Unable to insert branch island. No insertion point available."); // <- HERE!
		branchIslandInsertionPoints.push_back(insertionPoint);
		previousIslandEndAddr = insertionPoint->sectionOffset()+insertionPoint->size();
		insertionPoint = NULL;
	}
	// Can we insert an island after this atom? If so then keep track of it.
	if ( !atom->hasFixupsOfKind(ld::Fixup::kindNoneFollowOn) )
		insertionPoint = atom;
}

{% endhighlight %}


初步分析是由于dll.o文件的__TEXT区域过大导致linker找不到insert point。

详细的详细的原理等博主分析明白了再贴上来。（待更）
