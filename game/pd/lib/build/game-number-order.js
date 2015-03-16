var game = {
    data: {
        
		score : 0,
        hitScore : 10,
		maxScore : 3000,
		totalRank : 10000,
        
		level : 1,
        round : 1,
        correct_count : 0,
		combo : 0,
        totalTime: 45,
        curTime: 0,
        startTime: 0,
        roundStartTime: 0,

        screenWidth: 640,
        screenHeight: 960,

        spriteSize: 192,
        margin: 0
    },

    "onload": function() {
		// Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, game.data.screenWidth, game.data.screenHeight, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

		// disable double tap in WeiXin
		if (isWeixinBrowser()) {
			var elm = document.getElementById("screen").firstChild;
			var catcher = function(evt) {
				if (evt.touches.length < 2) {
					evt.preventDefault();
				}
			};

			elm.addEventListener('touchstart', catcher, true);
		}

        me.state.set(me.state.LOADING, new game.LoadingScene());
        me.state.set(me.state.PLAY, new game.PlayScene());
        me.state.set(me.state.GAMEOVER, new game.GameOverScene());

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

game.resources = [
    // logo
    {name: "logo",        type:"image", src: "data/img/Logo.png"},

    // common ui
    {name: "left",        type:"image", src: "data/img/Left.png"},
    {name: "right",       type:"image", src: "data/img/Right.png"},

    {name: "correct",     type:"image", src: "data/img/common/correct.png"},
    {name: "miss",        type:"image", src: "data/img/common/miss.png"},
    {name: "star",        type:"image", src: "data/img/common/icon_1.png"},
    {name: "time",        type:"image", src: "data/img/common/icon_2.png"},
    {name: "ok",        type:"image", src: "data/img/common/icon_3.png"},

    {name: "quit",        type:"image", src: "data/img/Quit.png"},
    {name: "retry",       type:"image", src: "data/img/Retry.png"},
    //{name: "frame",       type:"image", src: "data/img/Frame.png"},

    {name: "button",      type:"image", src: "data/img/speed_sort/button.png"},
    {name: "background",  type:"image", src: "data/img/speed_sort/back.png"},

    // fruits
    {name: "fruit-1",      type:"image", src: "data/img/speed_sort/0.png"},
    {name: "fruit-2",      type:"image", src: "data/img/speed_sort/1.png"},
    {name: "fruit-3",      type:"image", src: "data/img/speed_sort/2.png"},
    {name: "fruit-4",      type:"image", src: "data/img/speed_sort/3.png"},

    // food
    {name: "food-1",       type:"image", src: "data/img/speed_sort/4.png"},
    {name: "food-2",       type:"image", src: "data/img/speed_sort/5.png"},
    {name: "food-3",       type:"image", src: "data/img/speed_sort/6.png"},
    {name: "food-4",       type:"image", src: "data/img/speed_sort/7.png"},

    // numbers
    {name: "number-0",    type:"image", src: "data/img/number_order/0.png"},
    {name: "number-1",    type:"image", src: "data/img/number_order/1.png"},
    {name: "number-2",    type:"image", src: "data/img/number_order/2.png"},
    {name: "number-3",    type:"image", src: "data/img/number_order/3.png"},
    {name: "number-4",    type:"image", src: "data/img/number_order/4.png"},
    {name: "number-5",    type:"image", src: "data/img/number_order/5.png"},
    {name: "number-6",    type:"image", src: "data/img/number_order/6.png"},
    {name: "number-7",    type:"image", src: "data/img/number_order/7.png"},
    {name: "number-8",    type:"image", src: "data/img/number_order/8.png"},
    {name: "number-9",    type:"image", src: "data/img/number_order/9.png"},

    {name: "number--1",    type:"image", src: "data/img/number_order/-1.png"},
    {name: "number--2",    type:"image", src: "data/img/number_order/-2.png"},
    {name: "number--3",    type:"image", src: "data/img/number_order/-3.png"},
    {name: "number--4",    type:"image", src: "data/img/number_order/-4.png"},
    {name: "number--5",    type:"image", src: "data/img/number_order/-5.png"},
    {name: "number--6",    type:"image", src: "data/img/number_order/-6.png"},
    {name: "number--7",    type:"image", src: "data/img/number_order/-7.png"},
    {name: "number--8",    type:"image", src: "data/img/number_order/-8.png"},
    {name: "number--9",    type:"image", src: "data/img/number_order/-9.png"},

    // border of numbers
    {name: "circle-0",    type:"image", src: "data/img/number_order/border_0.png"},
    {name: "circle-1",    type:"image", src: "data/img/number_order/border_1.png"},
    {name: "circle-2",    type:"image", src: "data/img/number_order/border_2.png"},
    {name: "circle-3",    type:"image", src: "data/img/number_order/border_3.png"},
    {name: "circle-4",    type:"image", src: "data/img/number_order/border_4.png"},
    {name: "circle-5",    type:"image", src: "data/img/number_order/border_5.png"},
    {name: "circle-6",    type:"image", src: "data/img/number_order/border_6.png"},
    {name: "circle-7",    type:"image", src: "data/img/number_order/border_7.png"},
    {name: "circle-8",    type:"image", src: "data/img/number_order/border_8.png"},
    {name: "circle-9",    type:"image", src: "data/img/number_order/border_9.png"},

	// icons
    {name: "icon-1",    type:"image", src: "data/img/matching_pair/icon_1.png"},
    {name: "icon-2",    type:"image", src: "data/img/matching_pair/icon_2.png"},
    {name: "icon-3",    type:"image", src: "data/img/matching_pair/icon_3.png"},
    {name: "icon-4",    type:"image", src: "data/img/matching_pair/icon_4.png"},
    {name: "icon-5",    type:"image", src: "data/img/matching_pair/icon_5.png"},
    {name: "icon-6",    type:"image", src: "data/img/matching_pair/icon_6.png"},
    {name: "icon-7",    type:"image", src: "data/img/matching_pair/icon_7.png"},
    {name: "icon-8",    type:"image", src: "data/img/matching_pair/icon_8.png"},
    {name: "icon-9",    type:"image", src: "data/img/matching_pair/icon_9.png"},
    {name: "icon-10",   type:"image", src: "data/img/matching_pair/icon_10.png"},
    {name: "icon-11",   type:"image", src: "data/img/matching_pair/icon_11.png"},
    {name: "icon-12",   type:"image", src: "data/img/matching_pair/icon_12.png"},
    {name: "icon-13",   type:"image", src: "data/img/matching_pair/icon_13.png"},
    {name: "icon-14",   type:"image", src: "data/img/matching_pair/icon_14.png"},
    {name: "icon-15",   type:"image", src: "data/img/matching_pair/icon_15.png"},
    {name: "icon-16",   type:"image", src: "data/img/matching_pair/icon_16.png"},
    {name: "icon-17",   type:"image", src: "data/img/matching_pair/icon_17.png"},
    {name: "icon-18",   type:"image", src: "data/img/matching_pair/icon_18.png"},
    {name: "icon-19",   type:"image", src: "data/img/matching_pair/icon_19.png"},
    {name: "icon-20",   type:"image", src: "data/img/matching_pair/icon_20.png"},
    {name: "icon-21",   type:"image", src: "data/img/matching_pair/icon_21.png"},
    {name: "icon-22",   type:"image", src: "data/img/matching_pair/icon_22.png"},
    {name: "icon-23",   type:"image", src: "data/img/matching_pair/icon_23.png"},
    {name: "icon-24",   type:"image", src: "data/img/matching_pair/icon_24.png"},

    // borders
    {name: "border-1",    type:"image", src: "data/img/matching_pair/border_1.png"},
    {name: "border-2",    type:"image", src: "data/img/matching_pair/border_2.png"},
    {name: "border-3",    type:"image", src: "data/img/matching_pair/border_3.png"},
    {name: "border-4",    type:"image", src: "data/img/matching_pair/border_4.png"},
    {name: "border-5",    type:"image", src: "data/img/matching_pair/border_5.png"},
    {name: "border-6",    type:"image", src: "data/img/matching_pair/border_6.png"},
    {name: "border-7",    type:"image", src: "data/img/matching_pair/border_7.png"},
    {name: "border-8",    type:"image", src: "data/img/matching_pair/border_8.png"},
    {name: "border-9",    type:"image", src: "data/img/matching_pair/border_9.png"},
    {name: "border-10",   type:"image", src: "data/img/matching_pair/border_10.png"},
    {name: "border-11",   type:"image", src: "data/img/matching_pair/border_11.png"},
    {name: "border-12",   type:"image", src: "data/img/matching_pair/border_12.png"},

    // font
    {name: "32x32_font",  type:"image", src: "data/img/32x32_font.png"}
];

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
var UIButton = me.Sprite.extend({
    init: function(x, y, settings) {

        settings = settings || {};

        me.Sprite.prototype.init.apply(
            this,
            [
                x,
                y,
                me.loader.getImage(settings.imageName),
                settings.width || 256,
                settings.height || 256
            ]
        );

        // will do scale anim
        this.scaleFlag = true;

        this.touchStartTween = new me.Tween(this.scale);
        this.touchEndTween = new me.Tween(this.scale);

        this.onclick = settings.onclick;
        this.alwaysUpdate = true;

        me.input.registerPointerEvent('pointerdown', this, this.onPointerDown.bind(this));
        me.input.registerPointerEvent('pointerup', this, this.onPointerUp.bind(this));
    },

    update: function() {
        // force update
        return true;
    },

    onPointerDown: function() {
        var self = this;
        this.touchEndTween.stop();
        this.touchStartTween
            .to({x: 0.75, y: 0.75}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
            })
            .start();
    },

    onPointerUp: function () {
        var self = this;
        this.touchStartTween.stop();
        this.touchEndTween.
            to({x: 1, y: 1}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
            })
            .start();

        if (this.onclick != null) {
            this.onclick();
        }
    },

    onDestroyEvent: function() {
        me.input.releasePointerEvent("pointerdown", this);
        me.input.releasePointerEvent("pointerup", this);
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
 * Created by wang.jingxuan on 14-11-3.
 */
var Retry = UIButton.extend({
    // constructor
    init: function() {

        this._super(UIButton, 'init',
            [
                game.data.screenWidth / 4 * 3 - 128,
                game.data.screenHeight / 2 + 128,
                {
                    imageName: "retry",
                    onclick: function() {
                        me.state.change(me.state.PLAY);
                    }
                }
            ]
        );
       
		this.resize(0.01, 0.01);
		this.enable = false;
		this.show();
    },

	show: function() {
		this.fadeInTween = new me.Tween(this.scale);
        var self = this;
		this.fadeInTween.stop();
        this.fadeInTween
            .to({x: 1, y: 1}, 1000)
            .onComplete(function(){
                self.scaleFlag = true;
				self.enable = true;
            })
            .start();
	},

	onPointerDown: function() {
		if (this.enable) {
			this._super(UIButton, 'onPointerDown');
		}
	},
	onPointerUp: function() {
		if (this.enable) {
			this._super(UIButton, 'onPointerUp');
		}
	}
});

/**
 * Created by wang.jingxuan on 14-11-3.
 */
var ReturnToIndex = UIButton.extend({
    // constructor
    init: function() {

        this._super(UIButton, 'init',
            [
                game.data.screenWidth / 4 - 128 - 5,
                game.data.screenHeight / 2 + 128,
                {
                    imageName: "quit",
                    onclick: function() {
						setTimeout(function() {
							window.location.href = "./index.html";    
						}, 300);
                    }
                }
            ]
        );
		
		this.resize(0.01, 0.01);
		this.enable = false;
		this.show();
    },

	show: function() {
		this.fadeInTween = new me.Tween(this.scale);
        var self = this;
		this.fadeInTween.stop();
        this.fadeInTween
            .to({x: 1, y: 1}, 1000)
            .onComplete(function(){
                self.scaleFlag = true;
				self.enable = true;
            })
            .start();
	},

	onPointerDown: function() {
		if (this.enable) {
			this._super(UIButton, 'onPointerDown');
		}
	},
	onPointerUp: function() {
		if (this.enable) {
			this._super(UIButton, 'onPointerUp');
		}
	}
});

/**
 * Created by wang.jingxuan on 14-12-6.
 */
var Upload = UIButton.extend({
    // constructor
    init: function(onUploadSuccess, onUploadError) {

        this._super(UIButton, 'init',
            [
                game.data.screenWidth / 4 * 3 - 128,
                game.data.screenHeight / 2 - 128,
                {
                    imageName: "correct",
                    onclick: function() {
						ajax(
							"GET",
							game.data.apiUrl + "?m=post&game_id=" + game.data.gameId
							+ "&user_id=" + game.data.playerId
							+ "&score=" + game.data.score,
							onUploadSuccess,
							onUploadError
						);
                    }
                }
            ]
        );
    }
});

/**
 * Created by wang.jingxuan on 14-11-2.
 */
/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Mark = me.Sprite.extend({
    init: function(imageName, x, y) {
        me.Sprite.prototype.init.apply(this, [x, y, me.loader.getImage(imageName), 256, 256]);

        this.alpha = 0;
        this.imageName = imageName;

        this.fadeIn = new me.Tween(this);
        this.fadeOut = new me.Tween(this);

        this.fadeIn
            .to({alpha: 1}, 200)
            .chain(this.fadeOut.to({alpha: 0}, 400))
            .start();

        this.alwaysUpdate = true;
    },

    update: function() {
        // force update
        return true;
    }
});

var Correct = me.Sprite.extend({
    init: function(x, y) {
        var width = 187;
        var height = 134;
        this.imageName = "correct";

        me.Sprite.prototype.init.apply(this,
            [
                x - width / 2,
                y - height / 2,
                me.loader.getImage(this.imageName),
                width,
                height
            ]);

        this.alpha = 0;

        this.fadeIn = new me.Tween(this);
        this.fadeOut = new me.Tween(this);

        this.fadeIn
            .to({alpha: 1}, 200)
            .chain(this.fadeOut.to({alpha: 0}, 400))
            .start();

        this.alwaysUpdate = true;
    },

    update: function() {
        // force update
        return true;
    }
});

var Miss = me.Sprite.extend({
    init: function(x, y) {
        var width = 157;
        var height = 156;
        this.imageName = "miss";

        me.Sprite.prototype.init.apply(this,
            [
                x - width / 2,
                y - height / 2,
                me.loader.getImage(this.imageName),
                width,
                height
            ]);

        this.alpha = 0;

        this.fadeIn = new me.Tween(this);
        this.fadeOut = new me.Tween(this);

        this.fadeIn
            .to({alpha: 1}, 200)
            .chain(this.fadeOut.to({alpha: 0}, 400))
            .start();

        this.alwaysUpdate = true;
    },

    update: function() {
        // force update
        return true;
    }
});
game.hud = game.hud || {};

game.hud.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "hud";

        // add our child score object at the right-bottom position

		/*
        this.title = new UILabel(
            game.data.screenWidth / 2,
            30,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 36,
                text: game.data.title
            }
        );

        this.addChild(this.title);
		*/
        this.addChild(new background(), 10);

        var adjustPixel = 3;

        this.scoreIcon = new me.Sprite(
            90 + 2,
            21 + adjustPixel,
            me.loader.getImage("star"),
            24,
            26
        );
        this.addChild(this.scoreIcon, 11);

        this.score = new UILabel(
            130,
            20 + adjustPixel,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "得分"
            }
        );
        this.addChild(this.score, 11);

        this.timeIcon = new me.Sprite(
            269,
            20 + adjustPixel,
            me.loader.getImage("time"),
            27,
            28
        );
        this.addChild(this.timeIcon, 11);

        this.time = new UILabel(
            310,
            20 + adjustPixel,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "计时"
            }
        );
        this.addChild(this.time, 11);

        this.comboIcon = new me.Sprite(
            460 - 3,
            23 + adjustPixel,
            me.loader.getImage("ok"),
            29,
            21
        );
        this.addChild(this.comboIcon, 11);

        this.combo = new UILabel(
            500,
            20 + adjustPixel,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "连中"
            }
        );
        this.addChild(this.combo, 11);

        this.addChild(new game.hud.Score(130, 72), 11);
        this.addChild(new game.hud.Time(345, 72), 11);
        this.addChild(new game.hud.Combo(510, 72), 11);
    }
});

var background = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, settings) {

        this.settings = settings || {};

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        var context = renderer.getContext();
        context.fillStyle = "#D7D7D9";
        context.fillRect(0, 0, game.data.screenWidth, 2);
        context.fillStyle = "#F2F2F2";
        context.fillRect(0, 0, game.data.screenWidth, 160);
        context.fillStyle = "#FFB204";
        context.fillRect(0, 160, game.data.screenWidth, 2);
    }
});

/**
 * a basic hud item to display score
 */

game.hud.Score = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 72,
                fillStyle: "#435060",
                text: game.data.score
            }
        ]);
    },
    /**
     * update function
     */
    update : function (dt) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        this.text = game.data.score;
        return false;
    }
});

game.hud.Time = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 72,
                fillStyle: "#435060",
                text: game.data.totalTime
            }
        ]);
    },
    /**
     * update function
     */
    update : function (dt) {
        // we don't draw anything fancy here, so just
        // return true if the score has been updated
        var elapseTime = me.timer.getTime() - game.data.startTime;
        if (game.data.curTime > 0)
        {
            game.data.curTime = game.data.totalTime - ~~(elapseTime / 1000);
        }
        if (game.data.curTime < 0)
        {
            game.data.curTime = 0;
        }
        if (game.data.curTime == 0)
        {
			try
			{
				console.log("GameOver");
				me.state.change(me.state.GAMEOVER);
			}
			catch(err)
			{
				//alert(err);
				console.log(err);
			}
			return;
        }
        this.text = game.data.curTime + "″";

        return true;
    }
});

/**
 * a basic hud item to display combo
 */

game.hud.Combo = UILabel.extend({
    init : function(x, y) {
        this._super(UILabel, 'init', [x, y,
            {
                font: "Microsoft Yahei",
                textAlign: "center",
                size: 72,
                fillStyle: "#435060",
                text: game.data.combo
            }
        ]);
    },
    /**
     * update function
     */
    update : function (dt) {
        
		if (game.data.combo > 0) {
			this.text = game.data.combo;
		} else {
			this.text = 0;
		}
        return false;
    }
});



/**
 * Created by wang.jingxuan on 14/11/5.
 */
var SelectableObject = me.Container.extend({
    init : function(x, y, spriteName, frameName, onSelect, onDeselect, targetSize) {
        this._super(me.Container, 'init');

        this.spriteName = spriteName;
        this.sprite = new me.Sprite(x, y, me.loader.getImage(spriteName));
        this.frame = new me.Sprite(x, y, me.loader.getImage(frameName));
        this.frame.alpha = 0;

        this.targetSize = targetSize == null ? 128 : targetSize;
        this.targetScale = this.targetSize / this.sprite.width;

        this.sprite.resize(0.05, 0.05);

        this.addChild(this.sprite, 1);
        this.addChild(this.frame, 2);

        this.isSelected = false;
        this.onSelect = onSelect;
        this.onDeselect = onDeselect;

        this.collider = new me.Rect(x, y, targetSize, targetSize);
        me.input.registerPointerEvent('pointerup', this.collider, this.onPointerUp.bind(this));

        this.open();
    },

    open: function () {
        //this.frame.resize(this.targetScale + 0.05, this.targetScale + 0.05);

        var self = this;
        var scaleTween = new me.Tween(this.sprite.scale)
            .to({x: self.targetScale, y: self.targetScale}, 200)
            .onComplete(function() {
                self.resize(self.targetScale, self.targetScale);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();
    },

    onPointerUp : function() {
        if (this.isSelected) {
            if (this.onDeselect != null && this.onDeselect(this.spriteName)) {
                this.isSelected = !this.isSelected;
                this.frame.alpha = 1 - this.frame.alpha;
            }
        } else {
            if (this.onSelect != null && this.onSelect(this.spriteName)) {
                this.isSelected = !this.isSelected;
                this.frame.alpha = 1 - this.frame.alpha;
            }
        }
    },

	disable: function() {
        me.input.releasePointerEvent("pointerup", this.collider);
	},

    destroy: function() {
        me.input.releasePointerEvent("pointerup", this.collider);

        this._super(me.Container, 'destroy');

        this.collider = null;
        this.sprite = null;
        this.frame = null;
    }
});

/**
 * Created by wang.jingxuan on 14-11-2.
 */

game.data.gameId = 1003;
game.data.title = "从小到大";

var imgSize = 202;

var Round = me.Container.extend({

    init: function() {

        this.prefix = "number-";

        this.countArray = [4, 4, 6, 6, 9];
        this.elemPositions = {
            4: [
                [game.data.screenWidth / 3,     game.data.screenHeight / 3],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight / 3],
                [game.data.screenWidth / 3,     game.data.screenHeight * 2 / 3],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight * 2 / 3]
            ],
            6: [
                [game.data.screenWidth / 3,     game.data.screenHeight / 4],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight / 4],
                [game.data.screenWidth / 3,     game.data.screenHeight / 2],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight / 2],
                [game.data.screenWidth / 3,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth * 2 / 3, game.data.screenHeight * 3 / 4]
            ],
            9: [
                [game.data.screenWidth / 6,     game.data.screenHeight / 4],
                [game.data.screenWidth / 2,     game.data.screenHeight / 4],
                [game.data.screenWidth * 5 / 6, game.data.screenHeight / 4],
                [game.data.screenWidth / 6,     game.data.screenHeight / 2],
                [game.data.screenWidth / 2,     game.data.screenHeight / 2],
                [game.data.screenWidth * 5 / 6, game.data.screenHeight / 2],
                [game.data.screenWidth / 6,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth / 2,     game.data.screenHeight * 3 / 4],
                [game.data.screenWidth * 5 / 6, game.data.screenHeight * 3 / 4]
            ]
        };

        this._super(me.Container, 'init', [0, 0, game.data.screenWidth, game.data.screenHeight]);

        this._init();
    },

    _init: function() {
        game.data.roundStartTime = game.data.curTime;
        this.ready = true;
        if (game.data.level < this.countArray.length) {
            this.count = this.countArray[game.data.level - 1];
        } else {
            this.count = this.countArray[this.countArray.length - 1];
        }

        this.objList = [];
        this.selectedObjs = [];

        var array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (game.data.level >= 5) {
            array = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        }


        for(var i = 0; i < this.count; i++) {
            var index = Math.floor((Math.random() * array.length));
            var number = array.splice(index, 1);
            var frameName = "circle-";
            if (number >= 0) {
                frameName += ~~(number);
            } else {
                var frameNumber = 10 + ~~(number);
                frameName += frameNumber;
            }
            // create selectable number
            var elem = new SelectableObject(
                this.elemPositions[this.count][i][0] - imgSize / 2,
                this.elemPositions[this.count][i][1] - imgSize / 2 + 70,
                this.prefix + number,
                frameName,
                this.onSelect.bind(this),
                this.onDeselect.bind(this),
                imgSize
            );

            // insert into this.objList
            this.objList.push(elem);
            this.addChild(elem, 10);
       	}
		
		var self = this;
		this.numList = this.objList.map(function(elem) {
			return ~~(elem.spriteName.replace(self.prefix, ""));
		}).sort(function(a, b) {
			return a - b;
		});

    },

    onSelect: function(spriteName) {
        var number = ~~(spriteName.replace(this.prefix, ""));

		// if we selected the wrong one, treated as error
		if (this.numList[this.selectedObjs.length] < number) {
			this._onMiss();
			return;
		}

        if (this.selectedObjs.length == 0 ||
            number > this.selectedObjs[this.selectedObjs.length - 1]) {
            this._onCorrect(number);
        } else {
            this._onMiss();
        }
		
		game.data.score += game.data.hitScore;

        return true;
    },

    onDeselect: function(spriteName) {
        var number = spriteName.replace(this.prefix, "");

        if (number == this.selectedObjs[this.selectedObjs.length - 1]) {
            this.selectedObjs.pop();
            return true;
        }

        return false;
    },

    _onCorrect : function(number)
    {
        this.selectedObjs.push(number);

        if (this.selectedObjs.length == this.count) {
            this._onClear();
        }
    },

    _onMiss : function()
    {
		if (!this.ready) {
			return;
		}
		this.ready = false;
		this.disableObjects();

		game.data.combo = 0;
		game.data.level--;
        game.data.round++;
		if (game.data.level < 1) {
			game.data.level = 1;
		}

        this.addChild(new Miss(game.data.screenWidth / 2, game.data.screenHeight / 2 + 70), 30);

        var self = this;
        this.finish(
            false,
            function() {
                self.restart();
            }
        );
    },

    _onClear : function()
    {
		if (!this.ready) {
			return;
		}
		this.ready = false;
		this.disableObjects();
				
        game.data.score += (game.data.level + game.data.combo * 2) * game.data.hitScore;
        game.data.level++;
		game.data.combo++;
        game.data.round++;
        game.data.correct_count++;

        this.addChild(new Correct(game.data.screenWidth / 2, game.data.screenHeight / 2 + 70), 30);

        var self = this;
        this.finish(
            true,
            function() {
                self.restart();
            }
        );
    },

    finish : function(success, callback)
    {
        this.ready = false;
        var self = this;
        var finish = new me.Tween(this)
            .delay(800)
            .to({alpha: 0}, 400)
            .onComplete(function(){
                if (callback != null) {
                    callback();
                }
            })
            .start();
    },

    _spawn: function(index)
    {
        var id = this.leftId;
        if (Math.random() > 0.5)
        {
            id = this.rightId;
        }

        var sprite = new Fruit(
            this.elems[id],
            this.headX,
            this.headY - 64 * index
        );

        sprite.open();
        this.addChild(sprite, 10 - index);
        return sprite;
    },

	disableObjects: function() {
		for (var i = 0; i < this.objList.length; i++) {
			this.objList[i].disable();
		}
	},

    restart: function() {

        this.selectedObjs = [];
        while (this.objList.length > 0) {
            var elem = this.objList.shift();
            this.removeChild(elem);
            elem.destroy();
            elem = null;
        }
        this.objList = [];

        this._init();
        this.open();
    },

    open: function()
    {
        var alphaTween = new me.Tween(this)
            .to({alpha: 1}, 200)
            .start();

    },

    close: function()
    {
        var alphaTween = new me.Tween(this)
            .to({alpha: 0}, 200)
            .start();
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
game.PlayScene = me.ScreenObject.extend({
    onResetEvent: function() {
        // add background
        this.background = new me.ColorLayer("background", "#FFFFFF", 0);
        me.game.world.addChild(this.background, 0);

        // reset the initial data
        game.data.score = 0;
        game.data.level = 1;
		game.data.round = 1;
		game.data.correct_count = 0;
		game.data.combo = 0;
        game.data.curTime = game.data.totalTime;
        game.data.startTime = me.timer.getTime();
		game.data.roundStartTime = 0;

        // add our hud to the game world
        this.hud = new game.hud.Container();
        me.game.world.addChild(this.hud);

        this.round = new Round();
        me.game.world.addChild(this.round, 10);
        this.round.open();
    },

    onDestroyEvent: function() {
        // remove the hud from the game world
        me.game.world.removeChild(this.hud);
        me.game.world.removeChild(this.round);

        this.hud = null;
        this.round = null;
    }
});

game.GameOverScene = me.ScreenObject.extend({
    init: function() {
    },

    onResetEvent: function() {
        this.background = new me.ColorLayer("background", "#FFFFFF", 90);
        //this.background.alpha = 0.75;
        me.game.world.addChild(this.background, 0);

		// loading label
		this.loadingLabel = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 50,
            {
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 28,
                text: "全球排名计算中...",
				textAlign: "center"
            }
        );
		me.game.world.addChild(this.loadingLabel, 11);

		this.hiScore = 0;
		this.retryCount = 1;

		// Redirect to a common game-over.html
		var gameOverPage;
		if (game.data.gameId == 1001) {
			gameOverPage = "matching-pair-game-over.html";
		} else if (game.data.gameId == 1002) {
			gameOverPage = "speed-sort-game-over.html";
		} else if (game.data.gameId == 1003) {
			gameOverPage = "number-order-game-over.html";
		}

		var correct_rate = game.data.correct_count + "/" + (game.data.round - 1);
		var avg_clear_time = ((game.data.totalTime - game.data.roundStartTime) / (game.data.round - 1)).toFixed(2) + "″";
		if (game.data.round == 1) {
			avg_clear_time = game.data.totalTime.toFixed(2) + "″";
		}

		$.cookie("score", game.data.score);
		$.cookie("correct_rate", correct_rate);
		$.cookie("avg_clear_time", avg_clear_time);

		var session_id = $.cookie("session_id");
		var user_name = $.cookie("user_name") || "";
		var iuvU = $.cookie("iuvU") || "";
		var key = md5(session_id + game.data.gameId + game.data.score + iuvU);

		var targetUrl = getApiUrl() + "?m=post&game_id=" + game.data.gameId
				+ "&session_id=" + session_id
				+ "&user_name=" + user_name
				+ "&score=" + game.data.score
				+ "&key=" + key;

		//this.loadingLabel.text += "\nPrepare Ajax";

		this.finish = false;
		this.postResult(targetUrl, gameOverPage);

		//this.loadingLabel.text += "\nMain Func Ended";
	},

	postResult: function(targetUrl, gameOverPage) {
		try {
			if (this.finish) {
				return;
			}

			var self = this;
			//self.loadingLabel.text += "\n" + self.retryCount;
			self.retryCount++;

			$.ajax({
				url: targetUrl,
				timeout: 3000
			})
			.done(function( json ) {
				//console.log(json);
					try {
						//self.loadingLabel.text += "\nAjax Done Called";
						
						var data = JSON.parse(json);
						var games = data.data;

						var score;
						var rank;
						for (var i = 0; i < games.length; i++) {
							if (games[i].gameId == game.data.gameId) {
								score = games[i].score;
								rank = games[i].rank;
								break;
							}
						}

						if (rank !== undefined) {
							self.rank = rank;
						}

						// get high score
						self.hiScore = game.data.score > score ? game.data.score : score;

						// calculate rank from score
						self.calcRank();

						$.cookie("hi_score", self.hiScore);
						$.cookie("global_rank", self.rate);
					}
					catch (err)
					{
						console.log(err);
						//alert(err.message);
						self.onError(err);
						return;
					}
				
					//self.loadingLabel.text += "\nPrepare go to GameOverPage";
					try
					{
						if (!this.finish)
						{
							this.finish = true;
							window.location.href = gameOverPage;
						}
					}
					catch (err)
					{
						self.onError("GameOverPage Failed");
						return;
					}
			})
			.fail(function( jqXHR, textStatus, errorThrown ) {
				//self.loadingLabel.text += "\nAjax Fail Called";
				// show retry button
				if (textStatus === "timeout") {
					self.loadingLabel.text = "全球排名计算中... (" + self.retryCount + ")";
					self.retryCount++;
					
					//$.ajax(self);
					return;
				} else {
					//console.log(jqXHR);
					//console.log(textStatus);
					//console.log(errorThrown);
					//alert("Ajax Request Failed: " + textStatus);
					self.onError(textStatus);
					return;
				}
			});
		}
		catch (err)
		{
			//self.loadingLabel.text += "\nAjax Catch Called";
			self.onError(err);
			return;
		}

		setTimeout(function() {
			self.postResult(targetUrl, gameOverPage)
		}, 3000);
	},

	onError: function(err) {
		// delay onError for 1 second
		// On some devices there will be unknown error thrown even if it is executed correctly
		var self = this;
		setTimeout(function() {
			self.onErrorInternal(err)
		}, 1000);
	},

	onErrorInternal: function(err) {
		if (this.finish) {
			return;
		}
						 
		this.finish = true;
		//this.loadingLabel.font.textAlign = "center";
		this.loadingLabel.text = "没有网络连接\n\n请返回或重新开始游戏";

		var debugMsg = err.name + " : " + err.message + "\n";
		debugMsg += err.stack;
		this.stackTraceLabel = new UILabel(
            0,
			0,
			{
                font: "Microsoft Yahei",
                fillStyle: "#4d696d",
                size: 20,
                text: debugMsg
            }
        );
		//me.game.world.addChild(this.stackTraceLabel, 11);

		this.retry = new Retry();
        me.game.world.addChild(this.retry, 100);
      
		this.returnToIndex = new ReturnToIndex();
        me.game.world.addChild(this.returnToIndex, 100);
				 
	},

	calcRank: function() {
		if (game.data.score === undefined || game.data.score == 0) {
			this.rate = 0;
			this.rank = game.data.totalRank;
		} else if (game.data.score >= game.data.maxScore) {
			this.rate = 100;
			this.rank = 1;
		} else {
			// mean = 3/7 stddev = 1/7
			var mean = game.data.maxScore * 3 / 7;
			var stddev = game.data.maxScore / 4;
		
			// generate gaussian distribution and get z-rate
			var distribution = new Gaussian(mean, stddev * stddev);
			var zRate = distribution.cdf(game.data.score);

			// calculate rand and rank according to user score
			this.rate = Math.round(zRate * 100);
			this.rank = this.rank || Math.round(game.data.totalRank - game.data.totalRank * zRate);
		}
		//console.log("Score: " + game.data.score + " zRate: " + zRate + " rate: " + this.rate + " rank: " + this.rank);
	},

    onDestroyEvent: function() {
		this.finish = true;
		//this.loadingLabel.text += "\nOnDestroyEvent Called";
        if (this.retry != null) {
			me.game.world.removeChild(this.retry);
        	this.retry = null;
		}
		if (this.returnToIndex != null) {
        	me.game.world.removeChild(this.returnToIndex);
			this.returnToIndex = null;
		}
    }
});
