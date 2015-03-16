function getApiUrl(){return"http://localhost:8001"==window.location.origin?"http://pd.iuv.net/game.php":window.location.origin+"/game.php"}function getAspectRatio(){return window.screen.availWidth/window.screen.availHeight}function isWeixinBrowser(){var a=navigator.userAgent.toLowerCase();return/micromessenger/.test(a)?!0:!1}function shuffle(a){for(var b,c,d=a.length;d;b=Math.floor(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a}function ajax(a,b,c,d){var e=new XMLHttpRequest;e.overrideMimeType&&e.overrideMimeType("application/json"),e.open(a,b,!0),e.ontimeout=d,e.onreadystatechange=function(){4===e.readyState&&(200===e.status||0===e.status&&e.responseText?null!=c&&c(e.responseText):null!=d&&d())},e.send(null)}function deserializeGameInfo(a){var b={};return void 0===a||null===a||""==a?b:(a.split(",").map(function(a){if(void 0!==a){var c=a.split(":");void 0!==c[0]&&void 0!==c[1]&&(b[c[0]]=c[1])}}),b)}function serializeGameInfo(a){return Object.keys(a).map(function(b){return b+":"+a[b]}).join(",")}function erfc(a){var b=Math.abs(a),c=1/(1+b/2),d=c*Math.exp(-b*b-1.26551223+c*(1.00002368+c*(.37409196+c*(.09678418+c*(-.18628806+c*(.27886807+c*(-1.13520398+c*(1.48851587+c*(-.82215223+.17087277*c)))))))));return a>=0?d:2-d}function ierfc(a){if(a>=2)return-100;if(0>=a)return 100;for(var b=1>a?a:2-a,c=Math.sqrt(-2*Math.log(b/2)),d=-.70711*((2.30753+.27061*c)/(1+c*(.99229+.04481*c))-c),e=0;2>e;e++){var f=erfc(d)-b;d+=f/(1.1283791670955126*Math.exp(-(d*d))-d*f)}return 1>a?d:-d}function fromPrecisionMean(a,b){return gaussian(b/a,1/a)}var game={data:{score:0,hitScore:10,maxScore:3e3,totalRank:1e4,level:1,round:1,correct_count:0,combo:0,totalTime:45,curTime:0,startTime:0,roundStartTime:0,screenWidth:640,screenHeight:960,spriteSize:192,margin:0},onload:function(){if(!me.video.init("screen",me.video.CANVAS,game.data.screenWidth,game.data.screenHeight,!0,"auto"))return void alert("Your browser does not support HTML5 canvas.");if(isWeixinBrowser()){var a=document.getElementById("screen").firstChild,b=function(a){a.touches.length<2&&a.preventDefault()};a.addEventListener("touchstart",b,!0)}me.state.set(me.state.LOADING,new game.LoadingScene),me.state.set(me.state.PLAY,new game.PlayScene),me.state.set(me.state.GAMEOVER,new game.GameOverScene),me.loader.load({name:"logo",type:"image",src:"data/img/Logo.png"},this.onLogoLoaded.bind(this))},onLogoLoaded:function(){me.loader.preload(game.resources),me.loader.onload=this.loaded,me.state.change(me.state.LOADING)},loaded:function(){me.state.change(me.state.PLAY)}};game.resources=[{name:"logo",type:"image",src:"data/img/Logo.png"},{name:"left",type:"image",src:"data/img/Left.png"},{name:"right",type:"image",src:"data/img/Right.png"},{name:"correct",type:"image",src:"data/img/common/correct.png"},{name:"miss",type:"image",src:"data/img/common/miss.png"},{name:"star",type:"image",src:"data/img/common/icon_1.png"},{name:"time",type:"image",src:"data/img/common/icon_2.png"},{name:"ok",type:"image",src:"data/img/common/icon_3.png"},{name:"quit",type:"image",src:"data/img/Quit.png"},{name:"retry",type:"image",src:"data/img/Retry.png"},{name:"button",type:"image",src:"data/img/speed_sort/button.png"},{name:"background",type:"image",src:"data/img/speed_sort/back.png"},{name:"fruit-1",type:"image",src:"data/img/speed_sort/0.png"},{name:"fruit-2",type:"image",src:"data/img/speed_sort/1.png"},{name:"fruit-3",type:"image",src:"data/img/speed_sort/2.png"},{name:"fruit-4",type:"image",src:"data/img/speed_sort/3.png"},{name:"food-1",type:"image",src:"data/img/speed_sort/4.png"},{name:"food-2",type:"image",src:"data/img/speed_sort/5.png"},{name:"food-3",type:"image",src:"data/img/speed_sort/6.png"},{name:"food-4",type:"image",src:"data/img/speed_sort/7.png"},{name:"number-0",type:"image",src:"data/img/number_order/0.png"},{name:"number-1",type:"image",src:"data/img/number_order/1.png"},{name:"number-2",type:"image",src:"data/img/number_order/2.png"},{name:"number-3",type:"image",src:"data/img/number_order/3.png"},{name:"number-4",type:"image",src:"data/img/number_order/4.png"},{name:"number-5",type:"image",src:"data/img/number_order/5.png"},{name:"number-6",type:"image",src:"data/img/number_order/6.png"},{name:"number-7",type:"image",src:"data/img/number_order/7.png"},{name:"number-8",type:"image",src:"data/img/number_order/8.png"},{name:"number-9",type:"image",src:"data/img/number_order/9.png"},{name:"number--1",type:"image",src:"data/img/number_order/-1.png"},{name:"number--2",type:"image",src:"data/img/number_order/-2.png"},{name:"number--3",type:"image",src:"data/img/number_order/-3.png"},{name:"number--4",type:"image",src:"data/img/number_order/-4.png"},{name:"number--5",type:"image",src:"data/img/number_order/-5.png"},{name:"number--6",type:"image",src:"data/img/number_order/-6.png"},{name:"number--7",type:"image",src:"data/img/number_order/-7.png"},{name:"number--8",type:"image",src:"data/img/number_order/-8.png"},{name:"number--9",type:"image",src:"data/img/number_order/-9.png"},{name:"circle-0",type:"image",src:"data/img/number_order/border_0.png"},{name:"circle-1",type:"image",src:"data/img/number_order/border_1.png"},{name:"circle-2",type:"image",src:"data/img/number_order/border_2.png"},{name:"circle-3",type:"image",src:"data/img/number_order/border_3.png"},{name:"circle-4",type:"image",src:"data/img/number_order/border_4.png"},{name:"circle-5",type:"image",src:"data/img/number_order/border_5.png"},{name:"circle-6",type:"image",src:"data/img/number_order/border_6.png"},{name:"circle-7",type:"image",src:"data/img/number_order/border_7.png"},{name:"circle-8",type:"image",src:"data/img/number_order/border_8.png"},{name:"circle-9",type:"image",src:"data/img/number_order/border_9.png"},{name:"icon-1",type:"image",src:"data/img/matching_pair/icon_1.png"},{name:"icon-2",type:"image",src:"data/img/matching_pair/icon_2.png"},{name:"icon-3",type:"image",src:"data/img/matching_pair/icon_3.png"},{name:"icon-4",type:"image",src:"data/img/matching_pair/icon_4.png"},{name:"icon-5",type:"image",src:"data/img/matching_pair/icon_5.png"},{name:"icon-6",type:"image",src:"data/img/matching_pair/icon_6.png"},{name:"icon-7",type:"image",src:"data/img/matching_pair/icon_7.png"},{name:"icon-8",type:"image",src:"data/img/matching_pair/icon_8.png"},{name:"icon-9",type:"image",src:"data/img/matching_pair/icon_9.png"},{name:"icon-10",type:"image",src:"data/img/matching_pair/icon_10.png"},{name:"icon-11",type:"image",src:"data/img/matching_pair/icon_11.png"},{name:"icon-12",type:"image",src:"data/img/matching_pair/icon_12.png"},{name:"icon-13",type:"image",src:"data/img/matching_pair/icon_13.png"},{name:"icon-14",type:"image",src:"data/img/matching_pair/icon_14.png"},{name:"icon-15",type:"image",src:"data/img/matching_pair/icon_15.png"},{name:"icon-16",type:"image",src:"data/img/matching_pair/icon_16.png"},{name:"icon-17",type:"image",src:"data/img/matching_pair/icon_17.png"},{name:"icon-18",type:"image",src:"data/img/matching_pair/icon_18.png"},{name:"icon-19",type:"image",src:"data/img/matching_pair/icon_19.png"},{name:"icon-20",type:"image",src:"data/img/matching_pair/icon_20.png"},{name:"icon-21",type:"image",src:"data/img/matching_pair/icon_21.png"},{name:"icon-22",type:"image",src:"data/img/matching_pair/icon_22.png"},{name:"icon-23",type:"image",src:"data/img/matching_pair/icon_23.png"},{name:"icon-24",type:"image",src:"data/img/matching_pair/icon_24.png"},{name:"border-1",type:"image",src:"data/img/matching_pair/border_1.png"},{name:"border-2",type:"image",src:"data/img/matching_pair/border_2.png"},{name:"border-3",type:"image",src:"data/img/matching_pair/border_3.png"},{name:"border-4",type:"image",src:"data/img/matching_pair/border_4.png"},{name:"border-5",type:"image",src:"data/img/matching_pair/border_5.png"},{name:"border-6",type:"image",src:"data/img/matching_pair/border_6.png"},{name:"border-7",type:"image",src:"data/img/matching_pair/border_7.png"},{name:"border-8",type:"image",src:"data/img/matching_pair/border_8.png"},{name:"border-9",type:"image",src:"data/img/matching_pair/border_9.png"},{name:"border-10",type:"image",src:"data/img/matching_pair/border_10.png"},{name:"border-11",type:"image",src:"data/img/matching_pair/border_11.png"},{name:"border-12",type:"image",src:"data/img/matching_pair/border_12.png"},{name:"32x32_font",type:"image",src:"data/img/32x32_font.png"}];var QueryString=function(){for(var a={},b=window.location.search.substring(1),c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if("undefined"==typeof a[e[0]])a[e[0]]=e[1];else if("string"==typeof a[e[0]]){var f=[a[e[0]],e[1]];a[e[0]]=f}else a[e[0]].push(e[1])}return a}(),Gaussian=function(a,b){if(0>=b)throw new Error("Variance must be > 0 (but was "+b+")");this.mean=a,this.variance=b,this.standardDeviation=Math.sqrt(b)};Gaussian.prototype.pdf=function(a){var b=this.standardDeviation*Math.sqrt(2*Math.PI),c=Math.exp(-Math.pow(a-this.mean,2)/(2*this.variance));return c/b},Gaussian.prototype.cdf=function(a){return.5*erfc(-(a-this.mean)/(this.standardDeviation*Math.sqrt(2)))},Gaussian.prototype.add=function(a){return gaussian(this.mean+a.mean,this.variance+a.variance)},Gaussian.prototype.sub=function(a){return gaussian(this.mean-a.mean,this.variance+a.variance)},Gaussian.prototype.scale=function(a){return gaussian(this.mean*a,this.variance*a*a)},Gaussian.prototype.mul=function(a){if("number"==typeof a)return this.scale(a);var b=1/this.variance,c=1/a.variance;return fromPrecisionMean(b+c,b*this.mean+c*a.mean)},Gaussian.prototype.div=function(a){if("number"==typeof a)return this.scale(1/a);var b=1/this.variance,c=1/a.variance;return fromPrecisionMean(b-c,b*this.mean-c*a.mean)},Gaussian.prototype.ppf=function(a){return this.mean-this.standardDeviation*Math.sqrt(2)*ierfc(2*a)},$.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return!1},this.unselectable="on",$(this).css("-webkit-touch-callout","none"),$(this).css("-webkit-user-select","none"),$(this).css("-khtml-user-select","none"),$(this).css("-moz-user-select","none"),$(this).css("-ms-user-select","none"),$(this).css("user-select","none")})}});var UIButton=me.Sprite.extend({init:function(a,b,c){c=c||{},me.Sprite.prototype.init.apply(this,[a,b,me.loader.getImage(c.imageName),c.width||256,c.height||256]),this.scaleFlag=!0,this.touchStartTween=new me.Tween(this.scale),this.touchEndTween=new me.Tween(this.scale),this.onclick=c.onclick,this.alwaysUpdate=!0,me.input.registerPointerEvent("pointerdown",this,this.onPointerDown.bind(this)),me.input.registerPointerEvent("pointerup",this,this.onPointerUp.bind(this))},update:function(){return!0},onPointerDown:function(){var a=this;this.touchEndTween.stop(),this.touchStartTween.to({x:.75,y:.75},100).onComplete(function(){a.resize(1,1),a.scaleFlag=!0}).start()},onPointerUp:function(){var a=this;this.touchStartTween.stop(),this.touchEndTween.to({x:1,y:1},100).onComplete(function(){a.resize(1,1),a.scaleFlag=!0}).start(),null!=this.onclick&&this.onclick()},onDestroyEvent:function(){me.input.releasePointerEvent("pointerdown",this),me.input.releasePointerEvent("pointerup",this)}}),UILabel=me.Renderable.extend({init:function(a,b,c){this.settings=c||{},this._super(me.Renderable,"init",[a,b,10,10]),1==this.settings.bitmapFont?(this.font=new me.BitmapFont(this.settings.font||"32x32_font",this.settings.size||32,this.settings.scale||null,this.settings.firstChar||null),this.font.set(this.settings.textAlign||"left")):this.font=new me.Font(this.settings.font||"Arial",this.settings.size||32,this.settings.fillStyle||"black",this.settings.textAlign||"left"),this.floating=!0,this.text=this.settings.text||"NEW LABEL"},draw:function(a){if(1==this.settings.bitmapFont)this.font.draw(a,this.text,this.pos.x,this.pos.y);else{var b=a.getContext();this.font.measureText(b,this.text),this.font.draw(b,this.text,this.pos.x,this.pos.y)}}}),Retry=UIButton.extend({init:function(){this._super(UIButton,"init",[game.data.screenWidth/4*3-128,game.data.screenHeight/2+128,{imageName:"retry",onclick:function(){me.state.change(me.state.PLAY)}}]),this.resize(.01,.01),this.enable=!1,this.show()},show:function(){this.fadeInTween=new me.Tween(this.scale);var a=this;this.fadeInTween.stop(),this.fadeInTween.to({x:1,y:1},1e3).onComplete(function(){a.scaleFlag=!0,a.enable=!0}).start()},onPointerDown:function(){this.enable&&this._super(UIButton,"onPointerDown")},onPointerUp:function(){this.enable&&this._super(UIButton,"onPointerUp")}}),ReturnToIndex=UIButton.extend({init:function(){this._super(UIButton,"init",[game.data.screenWidth/4-128-5,game.data.screenHeight/2+128,{imageName:"quit",onclick:function(){window.location.href="./index.html"}}]),this.resize(.01,.01),this.enable=!1,this.show()},show:function(){this.fadeInTween=new me.Tween(this.scale);var a=this;this.fadeInTween.stop(),this.fadeInTween.to({x:1,y:1},1e3).onComplete(function(){a.scaleFlag=!0,a.enable=!0}).start()},onPointerDown:function(){this.enable&&this._super(UIButton,"onPointerDown")},onPointerUp:function(){this.enable&&this._super(UIButton,"onPointerUp")}}),Upload=UIButton.extend({init:function(a,b){this._super(UIButton,"init",[game.data.screenWidth/4*3-128,game.data.screenHeight/2-128,{imageName:"correct",onclick:function(){ajax("GET",game.data.apiUrl+"?m=post&game_id="+game.data.gameId+"&user_id="+game.data.playerId+"&score="+game.data.score,a,b)}}])}}),Mark=me.Sprite.extend({init:function(a,b,c){me.Sprite.prototype.init.apply(this,[b,c,me.loader.getImage(a),256,256]),this.alpha=0,this.imageName=a,this.fadeIn=new me.Tween(this),this.fadeOut=new me.Tween(this),this.fadeIn.to({alpha:1},200).chain(this.fadeOut.to({alpha:0},400)).start(),this.alwaysUpdate=!0},update:function(){return!0}}),Correct=me.Sprite.extend({init:function(a,b){var c=187,d=134;this.imageName="correct",me.Sprite.prototype.init.apply(this,[a-c/2,b-d/2,me.loader.getImage(this.imageName),c,d]),this.alpha=0,this.fadeIn=new me.Tween(this),this.fadeOut=new me.Tween(this),this.fadeIn.to({alpha:1},200).chain(this.fadeOut.to({alpha:0},400)).start(),this.alwaysUpdate=!0},update:function(){return!0}}),Miss=me.Sprite.extend({init:function(a,b){var c=157,d=156;this.imageName="miss",me.Sprite.prototype.init.apply(this,[a-c/2,b-d/2,me.loader.getImage(this.imageName),c,d]),this.alpha=0,this.fadeIn=new me.Tween(this),this.fadeOut=new me.Tween(this),this.fadeIn.to({alpha:1},200).chain(this.fadeOut.to({alpha:0},400)).start(),this.alwaysUpdate=!0},update:function(){return!0}});game.hud=game.hud||{},game.hud.Container=me.Container.extend({init:function(){this._super(me.Container,"init"),this.isPersistent=!0,this.z=1/0,this.name="hud",this.addChild(new background,10);var a=3;this.scoreIcon=new me.Sprite(92,21+a,me.loader.getImage("star"),24,26),this.addChild(this.scoreIcon,11),this.score=new UILabel(130,20+a,{font:"Microsoft Yahei",fillStyle:"#4d696d",size:28,text:"得分"}),this.addChild(this.score,11),this.timeIcon=new me.Sprite(269,20+a,me.loader.getImage("time"),27,28),this.addChild(this.timeIcon,11),this.time=new UILabel(310,20+a,{font:"Microsoft Yahei",fillStyle:"#4d696d",size:28,text:"计时"}),this.addChild(this.time,11),this.comboIcon=new me.Sprite(457,23+a,me.loader.getImage("ok"),29,21),this.addChild(this.comboIcon,11),this.combo=new UILabel(500,20+a,{font:"Microsoft Yahei",fillStyle:"#4d696d",size:28,text:"连中"}),this.addChild(this.combo,11),this.addChild(new game.hud.Score(130,72),11),this.addChild(new game.hud.Time(345,72),11),this.addChild(new game.hud.Combo(510,72),11)}});var background=me.Renderable.extend({init:function(a,b,c){this.settings=c||{},this._super(me.Renderable,"init",[a,b,10,10])},draw:function(a){var b=a.getContext();b.fillStyle="#D7D7D9",b.fillRect(0,0,game.data.screenWidth,2),b.fillStyle="#F2F2F2",b.fillRect(0,0,game.data.screenWidth,160),b.fillStyle="#FFB204",b.fillRect(0,160,game.data.screenWidth,2)}});game.hud.Score=UILabel.extend({init:function(a,b){this._super(UILabel,"init",[a,b,{font:"Microsoft Yahei",textAlign:"center",size:72,fillStyle:"#435060",text:game.data.score}])},update:function(){return this.text=game.data.score,!1}}),game.hud.Time=UILabel.extend({init:function(a,b){this._super(UILabel,"init",[a,b,{font:"Microsoft Yahei",textAlign:"center",size:72,fillStyle:"#435060",text:game.data.totalTime}])},update:function(){var a=me.timer.getTime()-game.data.startTime;return game.data.curTime>0&&(game.data.curTime=game.data.totalTime-~~(a/1e3)),game.data.curTime<0&&(game.data.curTime=0),0==game.data.curTime&&(console.log("GameOver"),me.state.change(me.state.GAMEOVER)),this.text=game.data.curTime+"″",!0}}),game.hud.Combo=UILabel.extend({init:function(a,b){this._super(UILabel,"init",[a,b,{font:"Microsoft Yahei",textAlign:"center",size:72,fillStyle:"#435060",text:game.data.combo}])},update:function(){return this.text=game.data.combo>0?game.data.combo:0,!1}});var SelectableObject=me.Container.extend({init:function(a,b,c,d,e,f,g){this._super(me.Container,"init"),this.spriteName=c,this.sprite=new me.Sprite(a,b,me.loader.getImage(c)),this.frame=new me.Sprite(a,b,me.loader.getImage(d)),this.frame.alpha=0,this.targetSize=null==g?128:g,this.targetScale=this.targetSize/this.sprite.width,this.sprite.resize(.05,.05),this.addChild(this.sprite,1),this.addChild(this.frame,2),this.isSelected=!1,this.onSelect=e,this.onDeselect=f,this.collider=new me.Rect(a,b,g,g),me.input.registerPointerEvent("pointerup",this.collider,this.onPointerUp.bind(this)),this.open()},open:function(){{var a=this;new me.Tween(this.sprite.scale).to({x:a.targetScale,y:a.targetScale},200).onComplete(function(){a.resize(a.targetScale,a.targetScale),a.scaleFlag=!0,a.isScaling=!1}).start()}},onPointerUp:function(){this.isSelected?null!=this.onDeselect&&this.onDeselect(this.spriteName)&&(this.isSelected=!this.isSelected,this.frame.alpha=1-this.frame.alpha):null!=this.onSelect&&this.onSelect(this.spriteName)&&(this.isSelected=!this.isSelected,this.frame.alpha=1-this.frame.alpha)},disable:function(){me.input.releasePointerEvent("pointerup",this.collider)},destroy:function(){me.input.releasePointerEvent("pointerup",this.collider),this._super(me.Container,"destroy"),this.collider=null,this.sprite=null,this.frame=null}});game.data.gameId=1003,game.data.title="从小到大";var imgSize=202,Round=me.Container.extend({init:function(){this.prefix="number-",this.countArray=[4,4,6,6,9],this.elemPositions={4:[[game.data.screenWidth/3,game.data.screenHeight/3],[2*game.data.screenWidth/3,game.data.screenHeight/3],[game.data.screenWidth/3,2*game.data.screenHeight/3],[2*game.data.screenWidth/3,2*game.data.screenHeight/3]],6:[[game.data.screenWidth/3,game.data.screenHeight/4],[2*game.data.screenWidth/3,game.data.screenHeight/4],[game.data.screenWidth/3,game.data.screenHeight/2],[2*game.data.screenWidth/3,game.data.screenHeight/2],[game.data.screenWidth/3,3*game.data.screenHeight/4],[2*game.data.screenWidth/3,3*game.data.screenHeight/4]],9:[[game.data.screenWidth/6,game.data.screenHeight/4],[game.data.screenWidth/2,game.data.screenHeight/4],[5*game.data.screenWidth/6,game.data.screenHeight/4],[game.data.screenWidth/6,game.data.screenHeight/2],[game.data.screenWidth/2,game.data.screenHeight/2],[5*game.data.screenWidth/6,game.data.screenHeight/2],[game.data.screenWidth/6,3*game.data.screenHeight/4],[game.data.screenWidth/2,3*game.data.screenHeight/4],[5*game.data.screenWidth/6,3*game.data.screenHeight/4]]},this._super(me.Container,"init",[0,0,game.data.screenWidth,game.data.screenHeight]),this._init()},_init:function(){game.data.roundStartTime=game.data.curTime,this.ready=!0,this.count=game.data.level<this.countArray.length?this.countArray[game.data.level-1]:this.countArray[this.countArray.length-1],this.objList=[],this.selectedObjs=[];var a=[1,2,3,4,5,6,7,8,9];game.data.level>=5&&(a=[-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9]);for(var b=0;b<this.count;b++){var c=Math.floor(Math.random()*a.length),d=a.splice(c,1),e="circle-";if(d>=0)e+=~~d;else{var f=10+~~d;e+=f}var g=new SelectableObject(this.elemPositions[this.count][b][0]-imgSize/2,this.elemPositions[this.count][b][1]-imgSize/2+70,this.prefix+d,e,this.onSelect.bind(this),this.onDeselect.bind(this),imgSize);this.objList.push(g),this.addChild(g,10)}var h=this;this.numList=this.objList.map(function(a){return~~a.spriteName.replace(h.prefix,"")}).sort(function(a,b){return a-b})},onSelect:function(a){var b=~~a.replace(this.prefix,"");return this.numList[this.selectedObjs.length]<b?void this._onMiss():(0==this.selectedObjs.length||b>this.selectedObjs[this.selectedObjs.length-1]?this._onCorrect(b):this._onMiss(),game.data.score+=game.data.hitScore,!0)},onDeselect:function(a){var b=a.replace(this.prefix,"");return b==this.selectedObjs[this.selectedObjs.length-1]?(this.selectedObjs.pop(),!0):!1},_onCorrect:function(a){this.selectedObjs.push(a),this.selectedObjs.length==this.count&&this._onClear()},_onMiss:function(){if(this.ready){this.ready=!1,this.disableObjects(),game.data.combo=0,game.data.level--,game.data.round++,game.data.level<1&&(game.data.level=1),this.addChild(new Miss(game.data.screenWidth/2,game.data.screenHeight/2+70),30);var a=this;this.finish(!1,function(){a.restart()})}},_onClear:function(){if(this.ready){this.ready=!1,this.disableObjects(),game.data.score+=(game.data.level+2*game.data.combo)*game.data.hitScore,game.data.level++,game.data.combo++,game.data.round++,game.data.correct_count++,this.addChild(new Correct(game.data.screenWidth/2,game.data.screenHeight/2+70),30);var a=this;this.finish(!0,function(){a.restart()})}},finish:function(a,b){this.ready=!1;new me.Tween(this).delay(800).to({alpha:0},400).onComplete(function(){null!=b&&b()}).start()},_spawn:function(a){var b=this.leftId;Math.random()>.5&&(b=this.rightId);var c=new Fruit(this.elems[b],this.headX,this.headY-64*a);return c.open(),this.addChild(c,10-a),c},disableObjects:function(){for(var a=0;a<this.objList.length;a++)this.objList[a].disable()},restart:function(){for(this.selectedObjs=[];this.objList.length>0;){var a=this.objList.shift();this.removeChild(a),a.destroy(),a=null}this.objList=[],this._init(),this.open()},open:function(){new me.Tween(this).to({alpha:1},200).start()},close:function(){new me.Tween(this).to({alpha:0},200).start()}});game.LoadingScene=me.ScreenObject.extend({onResetEvent:function(){me.game.reset(),me.game.world.addChild(new me.ColorLayer("background","#FFFFFF",0));var a=new ProgressBar(new me.Vector2d,game.data.screenWidth,20);this.handle=me.event.subscribe(me.event.LOADER_PROGRESS,a.onProgressUpdate.bind(a)),me.game.world.addChild(a,1);var b=new me.Sprite(game.data.screenWidth/2-336,game.data.screenHeight/2-177,me.loader.getImage("logo"),672,354);me.game.world.addChild(b,1)},onDestroyEvent:function(){this.handle&&(me.event.unsubscribe(this.handle),this.handle=null)}});var ProgressBar=me.Renderable.extend({init:function(a,b,c){me.Renderable.prototype.init.apply(this,[a.x,a.y,b,c]),this.invalidate=!1,this.barHeight=40,this.progress=0},onProgressUpdate:function(a){this.progress=Math.floor(a*this.width),this.invalidate=!0},update:function(){return this.invalidate===!0?(this.invalidate=!1,!0):!1},draw:function(a){var b=a.getContext();b.fillStyle="black",b.fillRect(0,this.height/2-this.barHeight/2,this.width,this.barHeight),b.fillStyle="#55aa00",b.fillRect(2,this.height/2-this.barHeight/2,this.progress,this.barHeight)}});game.PlayScene=me.ScreenObject.extend({onResetEvent:function(){this.background=new me.ColorLayer("background","#FFFFFF",0),me.game.world.addChild(this.background,0),game.data.score=0,game.data.level=1,game.data.curTime=game.data.totalTime,game.data.startTime=me.timer.getTime(),this.hud=new game.hud.Container,me.game.world.addChild(this.hud),this.round=new Round,me.game.world.addChild(this.round,10),this.round.open()},onDestroyEvent:function(){me.game.world.removeChild(this.hud),me.game.world.removeChild(this.round),this.hud=null,this.round=null}}),game.GameOverScene=me.ScreenObject.extend({init:function(){},onResetEvent:function(){this.background=new me.ColorLayer("background","#FFFFFF",90),me.game.world.addChild(this.background,0),this.loadingLabel=new UILabel(game.data.screenWidth/2-100,game.data.screenHeight/2-50,{font:"Microsoft Yahei",fillStyle:"#4d696d",size:28,text:"全球排名计算中..."}),me.game.world.addChild(this.loadingLabel,11),this.hiScore=0;var a;1001==game.data.gameId?a="matching-pair-game-over.html":1002==game.data.gameId?a="speed-sort-game-over.html":1003==game.data.gameId&&(a="number-order-game-over.html");var b=game.data.correct_count+"/"+(game.data.round-1),c=((game.data.totalTime-game.data.roundStartTime)/(game.data.round-1)).toFixed(2)+"″";1==game.data.round&&(c=game.data.totalTime.toFixed(2)+"″"),$.cookie("score",game.data.score),$.cookie("correct_rate",b),$.cookie("avg_clear_time",c);var d=$.cookie("session_id"),e=$.cookie("user_name")||"",f=$.cookie("iuvU")||"",g=md5(d+game.data.gameId+game.data.score+f),h=this,i=getApiUrl()+"?m=post&game_id="+game.data.gameId+"&session_id="+d+"&user_name="+e+"&score="+game.data.score+"&key="+g;try{$.ajax({url:i,timeout:1e4}).done(function(b){try{for(var c,d,e=JSON.parse(b),f=e.data,g=0;g<f.length;g++)if(f[g].gameId==game.data.gameId){c=f[g].score,d=f[g].rank;break}void 0!==d&&(h.rank=d),h.hiScore=game.data.score>c?game.data.score:c,h.calcRank(),$.cookie("hi_score",h.hiScore),$.cookie("global_rank",h.rate)}catch(i){return console.log(i),void alert(i.message)}window.location.href=a}).fail(function(a,b,c){return"timeout"===b?void $.ajax(this):(console.log(a),console.log(b),console.log(c),void alert("Ajax Request Failed: "+b))})}catch(j){console.log(j),alert(j.message)}},showResult:function(){this.messages=[],this.messages[0]=new UILabel(game.data.screenWidth/2,game.data.screenHeight/2-256-128,{textAlign:"center",size:48,text:"本次得分"}),this.messages[1]=new UILabel(game.data.screenWidth/2,game.data.screenHeight/2-256-128+48+16,{textAlign:"center",size:128,text:game.data.score||"0"}),this.messages[2]=new UILabel(game.data.screenWidth/2,game.data.screenHeight/2-256-128+48+128+32,{textAlign:"center",size:48,text:"个人最佳："+this.hiScore}),this.messages[3]=new UILabel(game.data.screenWidth/2,game.data.screenHeight/2-256-128+128+96+64,{textAlign:"center",size:48,text:"总分排名："+this.rank+"\n\n超越了全球"+this.rate+"%的用户"}),this.messages.map(function(a){me.game.world.addChild(a,101)}),this.retry=new Retry,me.game.world.addChild(this.retry,100),this.returnToIndex=new ReturnToIndex,me.game.world.addChild(this.returnToIndex,100)},calcRank:function(){if(void 0===game.data.score||0==game.data.score)this.rate=0,this.rank=game.data.totalRank;else if(game.data.score>=game.data.maxScore)this.rate=100,this.rank=1;else{var a=3*game.data.maxScore/7,b=game.data.maxScore/4,c=new Gaussian(a,b*b),d=c.cdf(game.data.score);this.rate=Math.round(100*d),this.rank=this.rank||Math.round(game.data.totalRank-game.data.totalRank*d)}},onDestroyEvent:function(){this.retry=null,this.returnToIndex=null,this.message=[]}});