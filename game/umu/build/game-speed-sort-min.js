var game={data:{score:0,hitScore:10,level:1,totalTime:60,curTime:0,startTime:0,screenWidth:640,screenHeight:960,spriteSize:192,margin:0},onload:function(){return me.video.init("screen",me.video.CANVAS,game.data.screenWidth,game.data.screenHeight,!0,"auto")?(me.state.set(me.state.LOADING,new game.LoadingScene),me.state.set(me.state.PLAY,new game.PlayScene),me.state.set(me.state.GAMEOVER,new game.GameOverScene),void me.loader.load({name:"logo",type:"image",src:"data/img/Logo.png"},this.onLogoLoaded.bind(this))):void alert("Your browser does not support HTML5 canvas.")},onLogoLoaded:function(){me.loader.preload(game.resources),me.loader.onload=this.loaded,me.state.change(me.state.LOADING)},loaded:function(){me.state.change(me.state.PLAY)}};game.resources=[{name:"logo",type:"image",src:"data/img/Logo.png"},{name:"left",type:"image",src:"data/img/Left.png"},{name:"right",type:"image",src:"data/img/Right.png"},{name:"correct",type:"image",src:"data/img/Correct.png"},{name:"miss",type:"image",src:"data/img/Miss.png"},{name:"quit",type:"image",src:"data/img/Quit.png"},{name:"retry",type:"image",src:"data/img/Retry.png"},{name:"frame",type:"image",src:"data/img/Frame.png"},{name:"banana",type:"image",src:"data/img/Banana.png"},{name:"cherry",type:"image",src:"data/img/Cherry.png"},{name:"grape",type:"image",src:"data/img/Grape.png"},{name:"pear",type:"image",src:"data/img/Pear.png"},{name:"pineapple",type:"image",src:"data/img/Pineapple.png"},{name:"watermelon",type:"image",src:"data/img/Watermelon.png"},{name:"number-1",type:"image",src:"data/img/1.png"},{name:"number-2",type:"image",src:"data/img/2.png"},{name:"number-3",type:"image",src:"data/img/3.png"},{name:"number-4",type:"image",src:"data/img/4.png"},{name:"number-5",type:"image",src:"data/img/5.png"},{name:"number-6",type:"image",src:"data/img/6.png"},{name:"number-7",type:"image",src:"data/img/7.png"},{name:"number-8",type:"image",src:"data/img/8.png"},{name:"number-9",type:"image",src:"data/img/9.png"},{name:"number-10",type:"image",src:"data/img/10.png"},{name:"number-11",type:"image",src:"data/img/11.png"},{name:"number-12",type:"image",src:"data/img/12.png"},{name:"number-13",type:"image",src:"data/img/13.png"},{name:"number-14",type:"image",src:"data/img/14.png"},{name:"number-15",type:"image",src:"data/img/15.png"},{name:"number-16",type:"image",src:"data/img/16.png"},{name:"number-17",type:"image",src:"data/img/17.png"},{name:"number-18",type:"image",src:"data/img/18.png"},{name:"number-19",type:"image",src:"data/img/19.png"},{name:"number-20",type:"image",src:"data/img/20.png"},{name:"number-21",type:"image",src:"data/img/21.png"},{name:"number-22",type:"image",src:"data/img/22.png"},{name:"number-23",type:"image",src:"data/img/23.png"},{name:"number-24",type:"image",src:"data/img/24.png"},{name:"number-25",type:"image",src:"data/img/25.png"},{name:"icon-1",type:"image",src:"data/img/icon-1.png"},{name:"icon-2",type:"image",src:"data/img/icon-2.png"},{name:"icon-3",type:"image",src:"data/img/icon-3.png"},{name:"icon-4",type:"image",src:"data/img/icon-4.png"},{name:"icon-5",type:"image",src:"data/img/icon-5.png"},{name:"icon-6",type:"image",src:"data/img/icon-6.png"},{name:"icon-7",type:"image",src:"data/img/icon-7.png"},{name:"icon-8",type:"image",src:"data/img/icon-8.png"},{name:"icon-9",type:"image",src:"data/img/icon-9.png"},{name:"icon-10",type:"image",src:"data/img/icon-10.png"},{name:"icon-11",type:"image",src:"data/img/icon-11.png"},{name:"icon-12",type:"image",src:"data/img/icon-12.png"},{name:"icon-13",type:"image",src:"data/img/icon-13.png"},{name:"icon-14",type:"image",src:"data/img/icon-14.png"},{name:"icon-15",type:"image",src:"data/img/icon-15.png"},{name:"icon-16",type:"image",src:"data/img/icon-16.png"},{name:"icon-17",type:"image",src:"data/img/icon-17.png"},{name:"icon-18",type:"image",src:"data/img/icon-18.png"},{name:"icon-19",type:"image",src:"data/img/icon-19.png"},{name:"icon-20",type:"image",src:"data/img/icon-20.png"},{name:"32x32_font",type:"image",src:"data/img/32x32_font.png"}];var UIButton=me.Sprite.extend({init:function(a,b,c){c=c||{},me.Sprite.prototype.init.apply(this,[a,b,me.loader.getImage(c.imageName),c.width||256,c.height||256]),this.scaleFlag=!0,this.touchStartTween=new me.Tween(this.scale),this.touchEndTween=new me.Tween(this.scale),this.onclick=c.onclick,this.alwaysUpdate=!0,me.input.registerPointerEvent("pointerdown",this,this.onPointerDown.bind(this)),me.input.registerPointerEvent("pointerup",this,this.onPointerUp.bind(this))},update:function(){return!0},onPointerDown:function(){var a=this;this.touchEndTween.stop(),this.touchStartTween.to({x:.75,y:.75},100).onComplete(function(){a.resize(1,1),a.scaleFlag=!0}).start()},onPointerUp:function(){var a=this;this.touchStartTween.stop(),this.touchEndTween.to({x:1,y:1},100).onComplete(function(){a.resize(1,1),a.scaleFlag=!0}).start(),null!=this.onclick&&this.onclick()},onDestroyEvent:function(){me.input.releasePointerEvent("pointerdown",this),me.input.releasePointerEvent("pointerup",this)}}),UILabel=me.Renderable.extend({init:function(a,b,c){this.settings=c||{},this._super(me.Renderable,"init",[a,b,10,10]),1==this.settings.bitmapFont?(this.font=new me.BitmapFont(this.settings.font||"32x32_font",this.settings.size||32,this.settings.scale||null,this.settings.firstChar||null),this.font.set(this.settings.textAlign||"left")):this.font=new me.Font(this.settings.font||"Arial",this.settings.size||32,this.settings.fillStyle||"black",this.settings.textAlign||"left"),this.floating=!0,this.text=this.settings.text||"NEW LABEL"},draw:function(a){if(1==this.settings.bitmapFont)this.font.draw(a,this.text,this.pos.x,this.pos.y);else{var b=a.getContext();this.font.measureText(b,this.text),this.font.draw(b,this.text,this.pos.x,this.pos.y)}}}),Fruit=me.Sprite.extend({init:function(a,b,c){me.Sprite.prototype.init.apply(this,[b,c,me.loader.getImage(a),256,256]),this.imageName=a,this.resize(.05,.05),this.targetScale=game.data.spriteSize/256,console.log(this.targetScale),this.isScaling=!1},update:function(){return!0},open:function(){{var a=this;new me.Tween(this.scale).to({x:a.targetScale,y:a.targetScale},200).onComplete(function(){a.resize(a.targetScale,a.targetScale),a.scaleFlag=!0,a.isScaling=!1}).start()}},move:function(a){new me.Tween(this.pos).to({x:a.pos.x,y:a.pos.y},200).easing(me.Tween.Easing.Linear.None).start()},close:function(){new me.Tween(this).to({alpha:0},200).easing(me.Tween.Easing.Linear.None).start()}}),Arrow=UIButton.extend({init:function(a,b,c,d,e){this._super(UIButton,"init",[c,d,{imageName:a,onclick:e}]),this.legendSprite=b},onPointerUp:function(){var a=this;this.touchStartTween.stop(),this.touchEndTween.to({x:1,y:1},100).onComplete(function(){a.resize(1,1),a.scaleFlag=!0}).start(),null!=this.onclick&&this.onclick(a.legendSprite)}}),Mark=me.Sprite.extend({init:function(a,b,c){me.Sprite.prototype.init.apply(this,[b,c,me.loader.getImage(a),256,256]),this.alpha=0,this.imageName=a,this.fadeIn=new me.Tween(this),this.fadeOut=new me.Tween(this),this.fadeIn.to({alpha:1},200).chain(this.fadeOut.to({alpha:0},400)).start(),this.alwaysUpdate=!0},update:function(){return!0}}),Retry=UIButton.extend({init:function(){this._super(UIButton,"init",[game.data.screenWidth/2-128,game.data.screenHeight/2,{imageName:"retry",onclick:function(){me.state.change(me.state.PLAY)}}])}});game.hud=game.hud||{},game.hud.Container=me.Container.extend({init:function(){this._super(me.Container,"init"),this.isPersistent=!0,this.z=1/0,this.name="hud",this.addChild(new game.hud.ScoreItem(0,0)),this.addChild(new game.hud.TimeItem(0,50))}}),game.hud.ScoreItem=UILabel.extend({init:function(a,b){this._super(UILabel,"init",[a,b,{bitmapFont:!0}])},update:function(){return this.text="SCORE: "+game.data.score,!1}}),game.hud.TimeItem=UILabel.extend({init:function(a,b){this._super(UILabel,"init",[a,b,{bitmapFont:!0}])},update:function(){var a=me.timer.getTime()-game.data.startTime;return game.data.curTime>0&&(game.data.curTime=game.data.totalTime-~~(a/1e3)),game.data.curTime<0&&(game.data.curTime=0),0==game.data.curTime&&(console.log("GameOver"),me.state.change(me.state.GAMEOVER)),this.text="TIME: "+game.data.curTime,!0}});var Round=me.Container.extend({init:function(){this.fruits=["banana","cherry","grape","pear","pineapple","watermelon"],this.countMax=9,this.countInit=5,this.count=this.countInit,this._super(me.Container,"init"),this._init()},_init:function(){this.alpha=0,this.leftId=Math.floor(Math.random()*this.fruits.length),this.rightId=Math.floor(Math.random()*this.fruits.length),this.leftId==this.rightId&&(this.leftId=(this.leftId+1)%this.fruits.length),this.leftSprite=new Fruit(this.fruits[this.leftId],0,game.data.screenHeight-448),this.rightSprite=new Fruit(this.fruits[this.rightId],game.data.screenWidth-256,game.data.screenHeight-448),this.leftSprite.open(),this.rightSprite.open(),this.addChild(this.leftSprite,20),this.addChild(this.rightSprite,20);var a=this;this.leftArrow=new Arrow("left",this.leftSprite,0,game.data.screenHeight-256,function(b){a.ready&&(a.curObj.imageName==b.imageName?a._onCorrect(b):a._onMiss())}),this.rightArrow=new Arrow("right",this.rightSprite,game.data.screenWidth-256,game.data.screenHeight-256,function(b){a.ready&&(a.curObj.imageName==b.imageName?a._onCorrect(b):a._onMiss())}),this.addChild(this.leftArrow),this.addChild(this.rightArrow),this.headX=game.data.screenWidth/2-128,this.headY=game.data.screenHeight-448,this.objList=[];for(var b=0;b<this.count;b++){var c=this._spawn(b);this.objList.push(c)}this.curObj=this.objList.shift(),this.ready=!0},_onCorrect:function(a){var b=this.curObj;b.move(a),b.close(),game.data.score+=game.data.hitScore;{var c=this;(new me.Tween).delay(400).onComplete(function(){c.removeChild(b)}).start()}if(this.objList.length>0){this.curObj=this.objList.shift(),this.curObj.move(b);for(var d=this.curObj,e=0;e<this.objList.length;e++)this.objList[e].move(d),d=this.objList[e]}else this._onClear()},_onMiss:function(){var a=new Mark("miss",game.data.screenWidth/2-128,game.data.screenHeight/2-128);this.addChild(a,30);var b=this;this.finish(!1,function(){b.restart()})},_onClear:function(){game.data.score+=this.count*game.data.hitScore,this.count<this.countMax&&(this.count++,game.data.level++);var a=new Mark("correct",game.data.screenWidth/2-128,game.data.screenHeight/2-128);this.addChild(a,30);var b=this;this.finish(!0,function(){b.restart()})},finish:function(a,b){this.ready=!1;new me.Tween(this).delay(800).to({alpha:0},400).onComplete(function(){null!=b&&b()}).start()},_spawn:function(a){var b=this.leftId;Math.random()>.5&&(b=this.rightId);var c=new Fruit(this.fruits[b],this.headX,this.headY-64*a);return c.open(),this.addChild(c,10-a),c},restart:function(){for(this.removeChild(this.leftArrow),this.removeChild(this.rightArrow),this.removeChild(this.leftSprite),this.removeChild(this.rightSprite),this.removeChild(this.curObj);this.objList.length>0;)this.removeChild(this.objList.shift());this.leftArrow=null,this.rightArrow=null,this.leftSprite=null,this.rightArrow=null,this.curObj=null,this.objList=[],this._init(),this.open()},open:function(){new me.Tween(this).to({alpha:1},200).start()},close:function(){new me.Tween(this).to({alpha:0},200).start()}});game.LoadingScene=me.ScreenObject.extend({onResetEvent:function(){me.game.reset(),me.game.world.addChild(new me.ColorLayer("background","#FFFFFF",0));var a=new ProgressBar(new me.Vector2d,game.data.screenWidth,20);this.handle=me.event.subscribe(me.event.LOADER_PROGRESS,a.onProgressUpdate.bind(a)),me.game.world.addChild(a,1);var b=new me.Sprite(game.data.screenWidth/2-336,game.data.screenHeight/2-177,me.loader.getImage("logo"),672,354);me.game.world.addChild(b,1)},onDestroyEvent:function(){this.handle&&(me.event.unsubscribe(this.handle),this.handle=null)}});var ProgressBar=me.Renderable.extend({init:function(a,b,c){me.Renderable.prototype.init.apply(this,[a.x,a.y,b,c]),this.invalidate=!1,this.barHeight=40,this.progress=0},onProgressUpdate:function(a){this.progress=Math.floor(a*this.width),this.invalidate=!0},update:function(){return this.invalidate===!0?(this.invalidate=!1,!0):!1},draw:function(a){var b=a.getContext();b.fillStyle="black",b.fillRect(0,this.height/2-this.barHeight/2,this.width,this.barHeight),b.fillStyle="#55aa00",b.fillRect(2,this.height/2-this.barHeight/2,this.progress,this.barHeight)}});game.PlayScene=me.ScreenObject.extend({onResetEvent:function(){this.background=new me.ColorLayer("background","#FFFFFF",0),me.game.world.addChild(this.background,0),game.data.score=0,game.data.level=1,game.data.curTime=game.data.totalTime,game.data.startTime=me.timer.getTime(),this.hud=new game.hud.Container,me.game.world.addChild(this.hud),this.round=new Round,me.game.world.addChild(this.round,10),this.round.open()},onDestroyEvent:function(){me.game.world.removeChild(this.hud),me.game.world.removeChild(this.round),this.hud=null,this.round=null}}),game.GameOverScene=me.ScreenObject.extend({init:function(){},onResetEvent:function(){this.background=new me.ColorLayer("background","#FFFFFF",90),me.game.world.addChild(this.background,0),this.dialog=new UILabel(game.data.screenWidth/2,game.data.screenHeight/2-256,{bitmapFont:!0,textAlign:"center",text:"TIME'S UP\n\nSCORE: "+game.data.score}),me.game.world.addChild(this.dialog,101),this.retry=new Retry,me.game.world.addChild(this.retry,100)},onDestroyEvent:function(){me.game.world.addChild(this.dialog),me.game.world.addChild(this.retry),this.dialog=null,this.retry=null}});