var version = 201501171029;

// regist event handlers
function _init() {
	// DEBUG
	// save session_id in cookie
	var session_id = $("#session_id").attr("value");
	// set default value if we did not get value from template varialbe
	if (session_id === undefined || session_id == "{$sessionInfo.id}") {
		session_id = 105;
	}

	$.cookie("session_id", session_id);

	// set default value if we did not get value from template variable
	var title = $("#title").html();
	if (title === undefined || title == "{$sessionInfo.title}") {
		title = "金道经理人培训";
		$("#title").html(title);
	}

	//var headerHeight = $(".header").height();
	//$(".content").css("padding-top", headerHeight);


	$.cookie("title", title);

	$.removeCookie("score");
	$.removeCookie("correct_rate");
	$.removeCookie("avg_clear_time");
	$.removeCookie("hi_score");
	$.removeCookie("global_rank");
}

function _loadAjaxValues() {
	var url = getApiUrl() + "?m=fetch&session_id=" + $.cookie("session_id");
	//console.log(url);
	$.ajax({
        url: url
	})
	.done(function( json ) {
		//console.log(json);
		var data = JSON.parse(json);
		setValues(data.data);
	})
	.fail(function( jqXHR, textStatus, errorThrown ) {
	});
}

function _disableMultipleTap() {
	// disable default event only in WeiXin WebView
	if(!isWeixinBrowser()) {
		return;
	}
	
	var catcher = function(evt) {
		evt.preventDefault();
	};

	document.addEventListener('touchend', catcher, true);
}

function setValues(games) {
	var total_score = 0;
	//var titles = {};
	var total_rank;
	var game_hash = {};

	for (var i = 0; i < games.length; i++) {
		var game = games[i];
		var game_id = game.gameId;

		// total block, not specified game
		if (game_id == "total") {
			total_rank = game.rank;
			continue;
		}

		// game block
		var score = ~~(game.score);
		total_score += ~~(score);

		if (score !== undefined && ~~(score) > 0) {
			// set score
			//var title = $("#" + game_id + " #box #title").html();
			//titles[game_id] = title;

			$("#" + game_id + " #wrap").append("<span class=\"score\">个人最佳<em>" + score + "</em></span><span class=\"icon played\"></span>");

			// set score to game_hash
			game_hash[game_id] = score;
		}
	}

	var rate;
	if (total_score > 0) {
		_addStatus(total_score, total_rank);
	}

	// set score to cookies
	$.cookie("games", serializeGameInfo(game_hash));
}

function _addStatus(total_score, total_rank) {
		// remove tip element
		$("#tip").remove();

		// add class 'data' to top element
		$("#top").addClass("data");
		$("#top").append("<div class=\"item score\"><span class=\"title\"><span class=\"icon icon_score\"></span>综合得分</span><span class=\"num\">" + total_score + "</span></div>");
		$("#top").append("<div class=\"item rank\"><span class=\"title\"><span class=\"icon icon_rank\"></span>综合排名</span><span class=\"num\">" + total_rank + "</span></div>");
}

function _addHiScore(game_id) {
	var games = deserializeGameInfo($.cookie("games"));
	var score;
	if (games !== undefined) {
		score = games[game_id];
	}
	if (score !== undefined) {
		$("#hi_score").append("<div class=\"top data\"> <div class=\"item score\"> <span class=\"title\"><span class=\"icon icon_score\"></span>个人最佳</span> <span class=\"num\">"+ score +"</span> </div> </div>");
	}
}

function _updateTitle() {
	if (document.title == "{$sessionInfo.title}") {
		document.title = $.cookie("title");
	}
}


function onClickGame(game_id) {
	var url;
	var games = deserializeGameInfo($.cookie("games"));

	// TODO
	// Logic that determines target url should move to server side

	if (game_id == 1001) {
		url = "matching-pair-guide.html";
	}
	else if (game_id == 1002) {
		url = "speed-sort-guide.html";
	}
	else if (game_id == 1003) {
		url = "number-order-guide.html";
	}

	// save selected game_id to cookie
	$.cookie("game_id", game_id);

	// save target url to cookie
	$.cookie("target_url", url);

	// if we do not have user name yet
	// redirect to nickname page first
	if ($.cookie("user_name") === undefined) {
		url = "nickname.html";
	}

	// jump to target page
	window.location.href = url;
}


// called when onload
function onLoadIndex() {
	_init();
	_updateTitle();
	_loadAjaxValues();
	_disableMultipleTap();
}

function onLoadNickname() {
	// set default value if we did not get value from template variable
	var title = $("#title").html();
	if (title === undefined || title == "{$sessionInfo.title}") {
		title = $.cookie("title");
		if (title === undefined || title == "{$sessionInfo.title}") {
			$("#title").html("金道经理人培训");
		} else {
			$("#title").html(title);
		}
	}
	_updateTitle();
	_disableMultipleTap();
	//var headerHeight = $(".header").height();
	//$(".content").css("padding-top", headerHeight);
}

function onLoadDocument() {
	_updateTitle();
	_disableMultipleTap();
}

function onLoadGuide(game_id) {
	_addHiScore(game_id);
	_updateTitle();
	_disableMultipleTap();
}

// called when submit was clicked
function onSubmit() {
	var user_name = $("#user_name").val();
	if (user_name !== undefined) {
		$.cookie("user_name", user_name);
	}

	window.location.href = $.cookie("target_url");

	// remove target_url cookie
	$.cookie("target_url", "");
}

function onLoadGameOver() {
	_updateTitle();
	_disableMultipleTap();

	//var headerHeight = $(".header").height();
	//$(".content").css("padding-top", headerHeight);

	$("#score").html($.cookie("score"));
	$("#correct_rate").html($.cookie("correct_rate"));
	$("#avg_clear_time").html($.cookie("avg_clear_time"));
	$("#hi_score").html($.cookie("hi_score"));
	$("#global_rank").html($.cookie("global_rank"));
}

function onRetry(game_id) {
	var url;
	if (game_id == 1001) {
		url = "matching-pair.html";
	}
	else if (game_id == 1002) {
		url = "speed-sort.html";
	}
	else if (game_id == 1003) {
		url = "number-order.html";
	}

	// jump to target page
	window.location.href = url;
}

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

function getAspectRatio() {
    return window.screen.availWidth / window.screen.availHeight;
}

function isWeixinBrowser() {
	var ua = navigator.userAgent.toLowerCase();
	return (/micromessenger/.test(ua)) ? true : false ;
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

