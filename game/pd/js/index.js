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
