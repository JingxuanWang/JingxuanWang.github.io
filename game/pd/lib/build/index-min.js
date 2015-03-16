function _init(){var a=$("#session_id").attr("value");(void 0===a||"{$sessionInfo.id}"==a)&&(a=105),$.cookie("session_id",a),_adjustHeader(),$.removeCookie("score"),$.removeCookie("correct_rate"),$.removeCookie("avg_clear_time"),$.removeCookie("hi_score"),$.removeCookie("global_rank")}function _adjustHeader(){var a=$(".header").height();$(".content").css("padding-top",a)}function _loadAjaxValues(){var a=getApiUrl()+"?m=fetch&session_id="+$.cookie("session_id");$.ajax({url:a}).done(function(a){var b=JSON.parse(a);setValues(b.data)}).fail(function(){})}function _disableMultipleTap(){if(isWeixinBrowser()&&!isAndroid()){var a=function(a){a.preventDefault()};document.addEventListener("touchend",a,!0)}}function setValues(a){for(var b,c=0,d={},e=0;e<a.length;e++){var f=a[e],g=f.gameId;if("total"!=g){var h=~~f.score;c+=~~h,void 0!==h&&~~h>=0&&($("#"+g+" #wrap").append('<span class="score">个人最佳<em>'+h+'</em></span><span class="icon played"></span>'),d[g]=h)}else b=f.rank}c>0&&_addStatus(c,b),$.cookie("games",serializeGameInfo(d))}function _addStatus(a,b){$("#tip").remove(),$("#top").addClass("data"),$("#top").append('<div class="item score"><span class="title"><span class="icon icon_score"></span>综合得分</span><span class="num">'+a+"</span></div>"),$("#top").append('<div class="item rank"><span class="title"><span class="icon icon_rank"></span>综合排名</span><span class="num">'+b+"</span></div>")}function _addHiScore(a){var b,c=deserializeGameInfo($.cookie("games"));void 0!==c&&(b=c[a]),void 0!==b&&$("#hi_score").append('<div class="top data"> <div class="item score"> <span class="title"><span class="icon icon_score"></span>个人最佳</span> <span class="num">'+b+"</span> </div> </div>")}function onClickGame(a){{var b;deserializeGameInfo($.cookie("games"))}1001==a?b="matching-pair-guide.html":1002==a?b="speed-sort-guide.html":1003==a&&(b="number-order-guide.html"),$.cookie("game_id",a),$.cookie("target_url",b),void 0===$.cookie("user_name")&&(b="nickname.html"),window.location.href=b}function onLoadIndex(){_init(),_loadAjaxValues()}function onLoadNickname(){var a=$("#title").html();(void 0===a||"{$sessionInfo.title}"==a)&&(a=$.cookie("title"),$("#title").html(void 0===a||"{$sessionInfo.title}"==a?"金道经理人培训":a));var b=$.cookie("UName");void 0!==b&&$("#user_name").val(b),_disableMultipleTap(),_adjustHeader()}function onLoadDocument(){_disableMultipleTap()}function onLoadGuide(a){_addHiScore(a),_disableMultipleTap()}function onSubmit(){var a=$("#user_name").val();void 0!==a&&$.cookie("user_name",a),window.location.href=$.cookie("target_url"),$.cookie("target_url","")}function onLoadGameOver(){_disableMultipleTap(),_adjustHeader(),$("#score").html($.cookie("score")),$("#correct_rate").html($.cookie("correct_rate")),$("#avg_clear_time").html($.cookie("avg_clear_time")),$("#hi_score").html($.cookie("hi_score")),$("#global_rank").html($.cookie("global_rank"))}function onRetry(a){var b;1001==a?b="matching-pair.html":1002==a?b="speed-sort.html":1003==a&&(b="number-order.html"),window.location.href=b}function getApiUrl(){return"http://localhost:8001"==window.location.origin?"http://pd.iuv.net/game.php":window.location.origin+"/game.php"}function stackTrace(){var a=new Error;return a.stack}function getAspectRatio(){return window.screen.availWidth/window.screen.availHeight}function isWeixinBrowser(){var a=navigator.userAgent.toLowerCase();return/micromessenger/.test(a)?!0:!1}function isAndroid(){var a=navigator.userAgent.toLowerCase();return a.indexOf("android")>-1}function shuffle(a){for(var b,c,d=a.length;d;b=Math.floor(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);return a}function ajax(a,b,c,d){var e=new XMLHttpRequest;e.overrideMimeType&&e.overrideMimeType("application/json"),e.open(a,b,!0),e.ontimeout=d,e.onreadystatechange=function(){4===e.readyState&&(200===e.status||0===e.status&&e.responseText?null!=c&&c(e.responseText):null!=d&&d())},e.send(null)}function deserializeGameInfo(a){var b={};return void 0===a||null===a||""==a?b:(a.split(",").map(function(a){if(void 0!==a){var c=a.split(":");void 0!==c[0]&&void 0!==c[1]&&(b[c[0]]=c[1])}}),b)}function serializeGameInfo(a){return Object.keys(a).map(function(b){return b+":"+a[b]}).join(",")}function erfc(a){var b=Math.abs(a),c=1/(1+b/2),d=c*Math.exp(-b*b-1.26551223+c*(1.00002368+c*(.37409196+c*(.09678418+c*(-.18628806+c*(.27886807+c*(-1.13520398+c*(1.48851587+c*(-.82215223+.17087277*c)))))))));return a>=0?d:2-d}function ierfc(a){if(a>=2)return-100;if(0>=a)return 100;for(var b=1>a?a:2-a,c=Math.sqrt(-2*Math.log(b/2)),d=-.70711*((2.30753+.27061*c)/(1+c*(.99229+.04481*c))-c),e=0;2>e;e++){var f=erfc(d)-b;d+=f/(1.1283791670955126*Math.exp(-(d*d))-d*f)}return 1>a?d:-d}function fromPrecisionMean(a,b){return gaussian(b/a,1/a)}var version=201501171029,QueryString=function(){for(var a={},b=window.location.search.substring(1),c=b.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if("undefined"==typeof a[e[0]])a[e[0]]=e[1];else if("string"==typeof a[e[0]]){var f=[a[e[0]],e[1]];a[e[0]]=f}else a[e[0]].push(e[1])}return a}(),Gaussian=function(a,b){if(0>=b)throw new Error("Variance must be > 0 (but was "+b+")");this.mean=a,this.variance=b,this.standardDeviation=Math.sqrt(b)};Gaussian.prototype.pdf=function(a){var b=this.standardDeviation*Math.sqrt(2*Math.PI),c=Math.exp(-Math.pow(a-this.mean,2)/(2*this.variance));return c/b},Gaussian.prototype.cdf=function(a){return.5*erfc(-(a-this.mean)/(this.standardDeviation*Math.sqrt(2)))},Gaussian.prototype.add=function(a){return gaussian(this.mean+a.mean,this.variance+a.variance)},Gaussian.prototype.sub=function(a){return gaussian(this.mean-a.mean,this.variance+a.variance)},Gaussian.prototype.scale=function(a){return gaussian(this.mean*a,this.variance*a*a)},Gaussian.prototype.mul=function(a){if("number"==typeof a)return this.scale(a);var b=1/this.variance,c=1/a.variance;return fromPrecisionMean(b+c,b*this.mean+c*a.mean)},Gaussian.prototype.div=function(a){if("number"==typeof a)return this.scale(1/a);var b=1/this.variance,c=1/a.variance;return fromPrecisionMean(b-c,b*this.mean-c*a.mean)},Gaussian.prototype.ppf=function(a){return this.mean-this.standardDeviation*Math.sqrt(2)*ierfc(2*a)},$.fn.extend({disableSelection:function(){this.each(function(){this.onselectstart=function(){return!1},this.unselectable="on",$(this).css("-webkit-touch-callout","none"),$(this).css("-webkit-user-select","none"),$(this).css("-khtml-user-select","none"),$(this).css("-moz-user-select","none"),$(this).css("-ms-user-select","none"),$(this).css("user-select","none")})}});