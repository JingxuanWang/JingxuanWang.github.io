/**
 * Created by wang.jingxuan on 14-11-8.
 */

function getApiUrl() {
	if (window.location.origin == "http://localhost:8001") {
		return "http://pd.iuv.net/game.php";
	} else {
		return window.location.origin + "/game.php";
	}
}

function stackTrace() {
	var err = new Error();
	return err.stack;
}

function getAspectRatio() {
    return window.screen.availWidth / window.screen.availHeight;
}

function isWeixinBrowser() {
	var ua = navigator.userAgent.toLowerCase();
	return (/micromessenger/.test(ua)) ? true : false ;
}

function isAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("android") > -1;
}

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function ajax(method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    if (xhr.overrideMimeType) {
        xhr.overrideMimeType("application/json");
    }

    xhr.open(method, url, true);

    //console.log(method + " : " + url);

    // set the callbacks
    xhr.ontimeout = onError;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // status = 0 when file protocol is used, or cross-domain origin,
            // (With Chrome use "--allow-file-access-from-files --disable-web-security")
            if ((xhr.status === 200) || ((xhr.status === 0) && xhr.responseText)) {
                if (onSuccess != null) {
                    // fire the callback
                    onSuccess(xhr.responseText);
                }
            }
            else {
                if (onError != null) {
                    onError();
                }
            }
        }
    };
    // send the request
    xhr.send(null);
};

var QueryString = function () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
} ();

// convert game info from string into hash
// Should be a string of game_id:game_score,game_id:game_score ...
function deserializeGameInfo(game_str) {
	var parsed_game_info = {};
	
	if (game_str === undefined || game_str === null || game_str == "") {
		return parsed_game_info;
	}
	
	game_str.split(',').map(function(game) {
		
		if (game !== undefined) {
			var values = game.split(':');
			
			if (values[0] !== undefined && values[1] !== undefined) {
				parsed_game_info[values[0]] = values[1];
				//console.log(values[0] + " : " + values[1]);
			}
		}
	});

	return parsed_game_info;
}

// convert game info into string
// Should be a string of game_id:game_score,game_id:game_score ...
function serializeGameInfo(games) {
	return Object.keys(games).map(function(key) {
		return key + ":" + games[key];
	}).join(',');
} 

// From https://github.com/errcw/gaussian

// Complementary error function
// From Numerical Recipes in C 2e p221
function erfc(x) {
  var z = Math.abs(x);
  var t = 1 / (1 + z / 2);
  var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
          t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
          t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
          t * (-0.82215223 + t * 0.17087277)))))))))
  return x >= 0 ? r : 2 - r;
};

// Inverse complementary error function
// From Numerical Recipes 3e p265
function ierfc(x) {
  if (x >= 2) { return -100; }
  if (x <= 0) { return 100; }

  var xx = (x < 1) ? x : 2 - x;
  var t = Math.sqrt(-2 * Math.log(xx / 2));

  var r = -0.70711 * ((2.30753 + t * 0.27061) /
          (1 + t * (0.99229 + t * 0.04481)) - t);

  for (var j = 0; j < 2; j++) {
    var err = erfc(r) - xx;
    r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
  }

  return (x < 1) ? r : -r;
};

// Construct a new distribution from the precision and precisionmean
function fromPrecisionMean(precision, precisionmean) {
  return gaussian(precisionmean/precision, 1/precision);
};

// Models the normal distribution
var Gaussian = function(mean, variance) {
  if (variance <= 0) {
    throw new Error('Variance must be > 0 (but was ' + variance + ')');
  }
  this.mean = mean;
  this.variance = variance;
  this.standardDeviation = Math.sqrt(variance);
}
// Probability density function
Gaussian.prototype.pdf = function(x) {
  var m = this.standardDeviation * Math.sqrt(2 * Math.PI);
  var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
  return e / m;
};

// Cumulative density function
Gaussian.prototype.cdf = function(x) {
  return 0.5 * erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));
};

// Add distribution of this and d
Gaussian.prototype.add = function(d) {
  return gaussian(this.mean + d.mean, this.variance + d.variance);
};

// Subtract distribution of this and d
Gaussian.prototype.sub = function(d) {
  return gaussian(this.mean - d.mean, this.variance + d.variance);
};

// Scales this distribution by constant c
Gaussian.prototype.scale = function(c) {
  return gaussian(this.mean*c, this.variance*c*c);
};

Gaussian.prototype.mul = function(d) {
  if(typeof(d)==="number"){ return this.scale(d); }
  var precision = 1/this.variance;
  var dprecision = 1/d.variance;
  return fromPrecisionMean(precision+dprecision, 
    precision*this.mean+dprecision*d.mean);
};

Gaussian.prototype.div = function(d) {
  if(typeof(d)==="number"){ return this.scale(1/d); }
  var precision = 1/this.variance;
  var dprecision = 1/d.variance;
  return fromPrecisionMean(precision-dprecision, 
    precision*this.mean-dprecision*d.mean);
};

Gaussian.prototype.ppf = function(x) {
  return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);
};

// jQuery extention on disable text selection
$.fn.extend({ 
	disableSelection : function() { 
	   this.each(function() { 
		   this.onselectstart = function() { return false; }; 
		   this.unselectable = "on";
           $(this).css('-webkit-touch-callout', 'none');
		   $(this).css('-webkit-user-select', 'none');
           $(this).css('-khtml-user-select', 'none');
           $(this).css('-moz-user-select', 'none');
           $(this).css('-ms-user-select', 'none');
           $(this).css('user-select', 'none');

			//$(this).css('position', 'absolute');
			//$(this).css('overflow', 'hidden');
	   }); 
   } 
});


/**
 * Created by wang.jingxuan on 14-11-3.
 */
var UILabel = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, settings) {

        this.settings = settings || {};

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        if (this.settings.bitmapFont == true) {
            // create a font
            this.font = new me.BitmapFont(
                this.settings.font || "32x32_font",
                this.settings.size || 32,
                this.settings.scale || null,     // no resize
                this.settings.firstChar || null  // 0x20 for default
            );

            this.font.set(
                this.settings.textAlign || "left"
            );
        }
        else
        {
            this.font = new me.Font(
                this.settings.font  || "Arial",
                this.settings.size  || 32,
                this.settings.fillStyle || "black",
                this.settings.textAlign || "left"
            );
        }

        // make sure we use screen coordinates
        this.floating = true;

        this.text = this.settings.text || "NEW LABEL";
    },

    /**
     * draw the score
     */
    draw : function (context) {
        if (this.settings.bitmapFont == true) {
            this.font.draw (context, this.text, this.pos.x, this.pos.y);
        } else {
            var ctx = context.getContext();
            this.font.measureText(ctx, this.text);
            this.font.draw (ctx, this.text, this.pos.x, this.pos.y);
        }
    }
});
/**
 * Created by wang.jingxuan on 14-11-9.
 */
var Avatar = me.Container.extend({
    init : function(x, y, userData) {

        this.speedNormal = 100;
        this.speedMax = 50;
        this.speedMin = 200;
        this.labelOffsetX = 100;
        this.labelOffsetY = 150;

        this._super(me.Container, 'init');

        this.animSprite = new me.AnimationSheet(x, y, {
                image: me.loader.getImage("caonima"),
                spritewidth: 240,
                spriteheight: 320
            }
        );

        this.userData = userData;

        this.animSprite.addAnimation("walk", [0, 1, 2, 3, 4], this.speedNormal);
        this.animSprite.setCurrentAnimation("walk");
        this.animSprite.setAnimationFrame(Math.floor(Math.random() * 4));

        this.label = new UILabel(
            ~~(x) + this.labelOffsetX,
            ~~(y) + this.labelOffsetY,
            {
                size: 20
            }
        );

        this.addChild(this.animSprite, 1);
        this.addChild(this.label, 2);
    },

    update: function(dt) {
        this.label.pos.x = this.animSprite.pos.x + this.labelOffsetX;
        this.label.pos.y = this.animSprite.pos.y + this.labelOffsetY;
        this.label.text = "ID: " + this.userData.user_id + "\n" + this.userData.score;
        return this._super(me.Container, 'update', [dt]);
    },

    speedUp: function (targetX, targetY) {
        this.animSprite.current.animationspeed = this.speedMax;

        this.moveToTop();
        this.animSprite.scaleFlag = true;
        var scaleTween = new me.Tween(this.animSprite.scale)
            .to({x: 1.5, y: 1.5}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();

        this.moveEffect(targetX, targetY);
    },

    speedDown: function(targetX, targetY) {
        this.animSprite.current.animationspeed = this.speedMin;
        this.moveEffect(targetX, targetY);
    },

    moveEffect: function(targetX, targetY) {
        var self = this;
        var offsetTween = new me.Tween(this.animSprite.pos)
            .to({x: targetX, y: targetY}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function(){
                self.animSprite.current.animationspeed = self.speedNormal;

                self.animSprite.scaleFlag = true;
                var scaleTween = new me.Tween(self.animSprite.scale)
                    .to({x: 1, y: 1}, 200)
                    .easing(me.Tween.Easing.Linear.None)
                    .start();

                if (self.expired == true) {
                    self.toBeRemove = true;
                }
            })
            .start();
    }
});
/**
 * Created by wang.jingxuan on 14-11-9.
 */
var game = {

    resources: [
        {name: "logo",        type:"image", src: "data/img/Logo.png"},
        {name: "32x32_font",  type:"image", src: "data/img/32x32_font.png"},
        {name: "caonima",     type:"image", src: "data/img/Caonima.png"}
    ],

    data: {
        expireTime: 3600,
        screenWidth: 1280,
        screenHeight: 960,
        gameId: QueryString.game_id || 100,
        apiUrl: "http://pd.iuv.net/game.php"
    },

    "onload": function() {

        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, game.data.screenWidth, game.data.screenHeight, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.state.set(me.state.LOADING, new game.LoadingScene());
        me.state.set(me.state.PLAY, new game.PlayScene());

        me.loader.load(
            {name: "logo", type:"image", src: "data/img/Logo.png"},
            this.onLogoLoaded.bind(this)
        );
    },

    "onLogoLoaded" : function() {
        // Load the resources.
        me.loader.preload(game.resources);
        me.loader.onload = this.loaded;

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    "loaded": function() {
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};


game.PlayScene = me.ScreenObject.extend({
    onResetEvent: function() {
        // add background
        this.background = new me.ColorLayer("background", "#FFFFFF", 0);
        me.game.world.addChild(this.background, 0);

        this.avatars = {};

        // start timer
        me.timer.setInterval(this.updateData.bind(this), 3000, false);
    },

    updateData: function() {
        //console.log("UpdateData Called");
        var self = this;
        ajax("GET", game.data.apiUrl + "?m=fetch&game_id=" + game.data.gameId, function(json) {
            //console.log(json);
            var data = JSON.parse(json);
            var userDatas = data.data;

            var hiScore = 500;
            var loScore = 0;

            // remove filtered avatars
            for (var user_id in self.avatars) {
                var avatar = self.avatars[user_id];
                if (avatar.toBeRemove == true) {
                    //console.log("Removing user : " + user_id);
                    me.game.world.removeChild(avatar);
                    avatar.destroy();
                    delete self.avatars[user_id];
                }
            }

            // update score
            // add new avatars
            while(userDatas.length > 0) {
                var userData = userDatas.shift();
                var avatar = self.avatars[userData.user_id];

                // if this user_id not exists, then create
                if (avatar == null) {
                    var currentTimestamp = Math.round(+new Date()/1000);
                    if (currentTimestamp <= ~~(userData.update_time) + game.data.expireTime) {
                        //console.log("Adding user : " + userData.user_id);
                        var avatar = new Avatar(
                            game.data.screenWidth - 50,
                            Math.random() * (game.data.screenHeight - 200) - 50,
                            {
                                user_id: ~~(userData.user_id),
                                score: ~~(userData.score),
                                update_time: ~~(userData.update_time)
                            }
                        );
                        self.avatars[avatar.userData.user_id] = avatar;
                        me.game.world.addChild(avatar, 100 - Math.round(Math.random() * 10));
                    }
                } else {
                    avatar.userData = userData;
                }
            }

            // filter out expired score
            // update hiScore and loScore
            for (var user_id in self.avatars) {
                var avatar = self.avatars[user_id];

                var currentTimestamp = Math.round(+new Date() / 1000);
                //console.log(currentTimestamp);
                //console.log(~~(avatar.userData.update_time) + game.data.expireTime);
                if (currentTimestamp > ~~(avatar.userData.update_time) + game.data.expireTime) {
                    avatar.expired = true;
                    continue;
                }

                // Debug! update avatar score
                // avatar.userData.score = Math.floor(3000 * Math.random());

                // Update hiScore
                if (~~(avatar.userData.score) > hiScore) {
                    hiScore = avatar.userData.score;
                }

                // Update loScore
                if (~~(avatar.userData.score) < loScore) {
                    loScore = avatar.userData.score;
                }
            }


            // update position
            for (var user_id in self.avatars) {
                var avatar = self.avatars[user_id];
                var percentage = (avatar.userData.score - loScore) / (hiScore - loScore);
                var targetX = 800 - percentage * (800 - 100);

                if (avatar.expired == true) {
                    targetX = game.data.screenWidth - 50
                }

                if (targetX < avatar.animSprite.pos.x) {
                    me.game.world.moveToTop(avatar);
                    avatar.speedUp(targetX, avatar.animSprite.pos.y);
                } else {
                    avatar.speedDown(targetX, avatar.animSprite.pos.y);
                }
            }
        });
    },

    onDestroyEvent: function() {
        // remove the hud from the game world
    }
});

/**
 * Created by wang.jingxuan on 14/11/4.
 */
game.LoadingScene = me.ScreenObject.extend({
    // call when the loader is reset
    onResetEvent : function () {
        me.game.reset();

        // background color
        me.game.world.addChild(new me.ColorLayer("background", "#FFFFFF", 0));

        // progress bar
        var progressBar = new ProgressBar(
            new me.Vector2d(),
            game.data.screenWidth,
            //me.video.renderer.getHeight()
            20
        );
        this.handle = me.event.subscribe(
            me.event.LOADER_PROGRESS,
            progressBar.onProgressUpdate.bind(progressBar)
        );
        me.game.world.addChild(progressBar, 1);

        // melonJS text & logo
        var icon = new me.Sprite(
            game.data.screenWidth / 2 - 336,
            game.data.screenHeight / 2 - 177,
            me.loader.getImage("logo"),
            672,
            354
        );

        me.game.world.addChild(icon, 1);
    },

    // destroy object at end of loading
    onDestroyEvent : function () {
        // cancel the callback
        if (this.handle)  {
            me.event.unsubscribe(this.handle);
            this.handle = null;
        }
    }
});

// a basic progress bar object
var ProgressBar = me.Renderable.extend({

    init: function (v, w, h) {
        me.Renderable.prototype.init.apply(this, [v.x, v.y, w, h]);
        // flag to know if we need to refresh the display
        this.invalidate = false;

        // default progress bar height
        this.barHeight = 40;

        // current progress
        this.progress = 0;
    },

    // make sure the screen is refreshed every frame
    onProgressUpdate : function (progress) {
        this.progress = Math.floor(progress * this.width);
        this.invalidate = true;
    },

    // make sure the screen is refreshed every frame
    update : function () {
        if (this.invalidate === true) {
            // clear the flag
            this.invalidate = false;
            // and return true
            return true;
        }
        // else return false
        return false;
    },

    // draw function
    draw : function (renderer) {
        var context = renderer.getContext();
        // draw the progress bar
        context.fillStyle = "black";
        context.fillRect(0, (this.height / 2) - (this.barHeight / 2), this.width, this.barHeight);
        context.fillStyle = "#55aa00";
        context.fillRect(2, (this.height / 2) - (this.barHeight / 2), this.progress, this.barHeight);
    }
});