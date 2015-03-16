function getApiUrl(){return"http://localhost:8001"==window.location.origin?"http://pd.iuv.net/game.php":window.location.origin+"/game.php"}function stackTrace(){var a=new Error;return a.stack}function getAspectRatio(){return window.screen.availWidth/window.screen.availHeight}function isWeixinBrowser(){var a=navigator.userAgent.toLowerCase();return/micromessenger/.test(a)?!0:!1}function isAndroid(){var a=navigator.userAgent.toLowerCase();return a.indexOf("android")>-1}function shuffle(a){for(var b,c,d=a.length;d;b=Math.floor(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a}function ajax(a,b,c,d){var e=new XMLHttpRequest;e.overrideMimeType&&e.overrideMimeType("application/json"),e.open(a,b,!0),e.ontimeout=d,e.onreadystatechange=function(){4===e.readyState&&(200===e.status||0===e.status&&e.responseText?null!=c&&c(e.responseText):null!=d&&d())},e.send(null)}function deserializeGameInfo(a){var b={};return void 0===a||null===a||""==a?b:(a.split(",").map(function(a){if(void 0!==a){var c=a.split(":");void 0!==c[0]&&void 0!==c[1]&&(b[c[0]]=c[1])}}),b)}function serializeGameInfo(a){return Object.keys(a).map(function(b){return b+":"+a[b]}).join(",")}function erfc(a){var b=Math.abs(a),c=1/(1+b/2),d=c*Math.exp(-b*b-1.26551223+c*(1.00002368+c*(.37409196+c*(.09678418+c*(-.18628806+c*(.27886807+c*(-1.13520398+c*(1.48851587+c*(-.82215223+.17087277*c)))))))));return a>=0?d:2-d}function ierfc(a){if(a>=2)return-100;if(0>=a)return 100;for(var b=1>a?a:2-a,c=Math.sqrt(-2*Math.log(b/2)),d=-.70711*((2.30753+.27061*c)/(1+c*(.99229+.04481*c))-c),e=0;2>e;e++){var f=erfc(d)-b;d+=f/(1.1283791670955126*Math.exp(-(d*d))-d*f)}return 1>a?d:-d}function fromPrecisionMean(a,b){return gaussian(b/a,1/a)}var QueryString=function(){for(var a={},b=window.location.search.substring(1),c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if("undefined"==typeof a[e[0]])a[e[0]]=e[1];else if("string"==typeof a[e[0]]){var f=[a[e[0]],e[1]];a[e[0]]=f}else a[e[0]].push(e[1])}return a}(),Gaussian=function(a,b){if(0>=b)throw new Error("Variance must be > 0 (but was "+b+")");this.mean=a,this.variance=b,this.standardDeviation=Math.sqrt(b)};Gaussian.prototype.pdf=function(a){var b=this.standardDeviation*Math.sqrt(2*Math.PI),c=Math.exp(-Math.pow(a-this.mean,2)/(2*this.variance));return c/b},Gaussian.prototype.cdf=function(a){return.5*erfc(-(a-this.mean)/(this.standardDeviation*Math.sqrt(2)))},Gaussian.prototype.add=function(a){return gaussian(this.mean+a.mean,this.variance+a.variance)},Gaussian.prototype.sub=function(a){return gaussian(this.mean-a.mean,this.variance+a.variance)},Gaussian.prototype.scale=function(a){return gaussian(this.mean*a,this.variance*a*a)},Gaussian.prototype.mul=function(a){if("number"==typeof a)return this.scale(a);var b=1/this.variance,c=1/a.variance;return fromPrecisionMean(b+c,b*this.mean+c*a.mean)},Gaussian.prototype.div=function(a){if("number"==typeof a)return this.scale(1/a);var b=1/this.variance,c=1/a.variance;return fromPrecisionMean(b-c,b*this.mean-c*a.mean)},Gaussian.prototype.ppf=function(a){return this.mean-this.standardDeviation*Math.sqrt(2)*ierfc(2*a)},$.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return!1},this.unselectable="on",$(this).css("-webkit-touch-callout","none"),$(this).css("-webkit-user-select","none"),$(this).css("-khtml-user-select","none"),$(this).css("-moz-user-select","none"),$(this).css("-ms-user-select","none"),$(this).css("user-select","none")})}});var UILabel=me.Renderable.extend({init:function(a,b,c){this.settings=c||{},this._super(me.Renderable,"init",[a,b,10,10]),1==this.settings.bitmapFont?(this.font=new me.BitmapFont(this.settings.font||"32x32_font",this.settings.size||32,this.settings.scale||null,this.settings.firstChar||null),this.font.set(this.settings.textAlign||"left")):this.font=new me.Font(this.settings.font||"Arial",this.settings.size||32,this.settings.fillStyle||"black",this.settings.textAlign||"left"),this.floating=!0,this.text=this.settings.text||"NEW LABEL"},draw:function(a){if(1==this.settings.bitmapFont)this.font.draw(a,this.text,this.pos.x,this.pos.y);else{var b=a.getContext();this.font.measureText(b,this.text),this.font.draw(b,this.text,this.pos.x,this.pos.y)}}}),Avatar=me.Container.extend({init:function(a,b,c){this.speedNormal=100,this.speedMax=50,this.speedMin=200,this.labelOffsetX=100,this.labelOffsetY=150,this._super(me.Container,"init"),this.animSprite=new me.AnimationSheet(a,b,{image:me.loader.getImage("caonima"),spritewidth:240,spriteheight:320}),this.userData=c,this.animSprite.addAnimation("walk",[0,1,2,3,4],this.speedNormal),this.animSprite.setCurrentAnimation("walk"),this.animSprite.setAnimationFrame(Math.floor(4*Math.random())),this.label=new UILabel(~~a+this.labelOffsetX,~~b+this.labelOffsetY,{size:20}),this.addChild(this.animSprite,1),this.addChild(this.label,2)},update:function(a){return this.label.pos.x=this.animSprite.pos.x+this.labelOffsetX,this.label.pos.y=this.animSprite.pos.y+this.labelOffsetY,this.label.text="ID: "+this.userData.user_id+"\n"+this.userData.score,this._super(me.Container,"update",[a])},speedUp:function(a,b){this.animSprite.current.animationspeed=this.speedMax,this.moveToTop(),this.animSprite.scaleFlag=!0;new me.Tween(this.animSprite.scale).to({x:1.5,y:1.5},200).easing(me.Tween.Easing.Linear.None).start();this.moveEffect(a,b)},speedDown:function(a,b){this.animSprite.current.animationspeed=this.speedMin,this.moveEffect(a,b)},moveEffect:function(a,b){{var c=this;new me.Tween(this.animSprite.pos).to({x:a,y:b},2e3).easing(me.Tween.Easing.Linear.None).onComplete(function(){c.animSprite.current.animationspeed=c.speedNormal,c.animSprite.scaleFlag=!0;new me.Tween(c.animSprite.scale).to({x:1,y:1},200).easing(me.Tween.Easing.Linear.None).start();1==c.expired&&(c.toBeRemove=!0)}).start()}}}),game={resources:[{name:"logo",type:"image",src:"data/img/Logo.png"},{name:"32x32_font",type:"image",src:"data/img/32x32_font.png"},{name:"caonima",type:"image",src:"data/img/Caonima.png"}],data:{expireTime:3600,screenWidth:1280,screenHeight:960,gameId:QueryString.game_id||100,apiUrl:"http://pd.iuv.net/game.php"},onload:function(){return me.video.init("screen",me.video.CANVAS,game.data.screenWidth,game.data.screenHeight,!0,"auto")?(me.state.set(me.state.LOADING,new game.LoadingScene),me.state.set(me.state.PLAY,new game.PlayScene),void me.loader.load({name:"logo",type:"image",src:"data/img/Logo.png"},this.onLogoLoaded.bind(this))):void alert("Your browser does not support HTML5 canvas.")},onLogoLoaded:function(){me.loader.preload(game.resources),me.loader.onload=this.loaded,me.state.change(me.state.LOADING)},loaded:function(){me.state.change(me.state.PLAY)}};game.PlayScene=me.ScreenObject.extend({onResetEvent:function(){this.background=new me.ColorLayer("background","#FFFFFF",0),me.game.world.addChild(this.background,0),this.avatars={},me.timer.setInterval(this.updateData.bind(this),3e3,!1)},updateData:function(){var a=this;ajax("GET",game.data.apiUrl+"?m=fetch&game_id="+game.data.gameId,function(b){var c=JSON.parse(b),d=c.data,e=500,f=0;for(var g in a.avatars){var h=a.avatars[g];1==h.toBeRemove&&(me.game.world.removeChild(h),h.destroy(),delete a.avatars[g])}for(;d.length>0;){var i=d.shift(),h=a.avatars[i.user_id];if(null==h){var j=Math.round(+new Date/1e3);if(j<=~~i.update_time+game.data.expireTime){var h=new Avatar(game.data.screenWidth-50,Math.random()*(game.data.screenHeight-200)-50,{user_id:~~i.user_id,score:~~i.score,update_time:~~i.update_time});a.avatars[h.userData.user_id]=h,me.game.world.addChild(h,100-Math.round(10*Math.random()))}}else h.userData=i}for(var g in a.avatars){var h=a.avatars[g],j=Math.round(+new Date/1e3);j>~~h.userData.update_time+game.data.expireTime?h.expired=!0:(~~h.userData.score>e&&(e=h.userData.score),~~h.userData.score<f&&(f=h.userData.score))}for(var g in a.avatars){var h=a.avatars[g],k=(h.userData.score-f)/(e-f),l=800-700*k;1==h.expired&&(l=game.data.screenWidth-50),l<h.animSprite.pos.x?(me.game.world.moveToTop(h),h.speedUp(l,h.animSprite.pos.y)):h.speedDown(l,h.animSprite.pos.y)}})},onDestroyEvent:function(){}}),game.LoadingScene=me.ScreenObject.extend({onResetEvent:function(){me.game.reset(),me.game.world.addChild(new me.ColorLayer("background","#FFFFFF",0));var a=new ProgressBar(new me.Vector2d,game.data.screenWidth,20);this.handle=me.event.subscribe(me.event.LOADER_PROGRESS,a.onProgressUpdate.bind(a)),me.game.world.addChild(a,1);var b=new me.Sprite(game.data.screenWidth/2-336,game.data.screenHeight/2-177,me.loader.getImage("logo"),672,354);me.game.world.addChild(b,1)},onDestroyEvent:function(){this.handle&&(me.event.unsubscribe(this.handle),this.handle=null)}});var ProgressBar=me.Renderable.extend({init:function(a,b,c){me.Renderable.prototype.init.apply(this,[a.x,a.y,b,c]),this.invalidate=!1,this.barHeight=40,this.progress=0},onProgressUpdate:function(a){this.progress=Math.floor(a*this.width),this.invalidate=!0},update:function(){return this.invalidate===!0?(this.invalidate=!1,!0):!1},draw:function(a){var b=a.getContext();b.fillStyle="black",b.fillRect(0,this.height/2-this.barHeight/2,this.width,this.barHeight),b.fillStyle="#55aa00",b.fillRect(2,this.height/2-this.barHeight/2,this.progress,this.barHeight)}});