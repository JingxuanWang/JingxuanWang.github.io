// regist event handlers
function _init() {
	$('#user_name_submit').click(onSubmit);
}

// load cookie values and set values to DOM elemnts
function _loadCookieValues() {

	// User name
	var user_name = $.cookie("user_name")
	if (user_name !== undefined) {
		$("#user_name").val(user_name);
		$("#user_name_submit").html("更改");
	}

	// TODO: use php template to implement logic below

	// Game Info (DUMMY DATA)
	var games = deserializeGameInfo($.cookie("games"));

	var total_score = 0;
	var titles = {};
	for (game_id in games) {
		var score = games[game_id];
		total_score += ~~(score);

		if (score !== undefined && ~~(score) > 0) {
			// set score
			var title = $("#" + game_id + " #box #title").html();
			titles[game_id] = title;
			$("#" + game_id + " #box #title").html(title + "(本节最佳：" + games[game_id] + "分)")
			/*
			$("#" + game_id + " #box #title")
			.mouseenter(function() {
				var game_id = $(this).parent().parent().attr("id");
				$(this).html("本节最佳：" + games[game_id] + "分");
			})
			.mouseleave(function() {
				var game_id = $(this).parent().parent().attr("id");
				$(this).html(titles[game_id]);
			});
			*/
		}
	}

	//var rank = $.cookie("rank");
	var rank;
	var rate;

	if (total_score > 0) {
		$("#total_score").html("总分：" + total_score);

		var maxScore = 9000;
		var totalRank = 10000;

		var mean = maxScore * 3 / 7;
		var stddev = maxScore / 4;
	
		// generate gaussian distribution and get z-rate
		var distribution = new Gaussian(mean, stddev * stddev);
		var zRate = distribution.cdf(total_score);

		// calculate rand and rank according to user score
		rate = Math.round(zRate * 100);
		rank = Math.round(totalRank - totalRank * zRate);

		if (rank !== undefined) {
			$("#rank").html("排名：" + rank + "位");
		}

		if (rate !== undefined) {
			$("#rate").html("超越了" + rate + "%的用户");
		}
	} else {
		$("#status").remove();
	}
}

// called when onload
function onLoad() {
	_init();
	_loadCookieValues();
}

// called when submit was clicked
function onSubmit() {
	var user_name = $("#user_name").val();
	if (user_name !== undefined) {
		$.cookie("user_name", user_name);
	}

	$("#user_name").remove();
	$("#user_name_submit").remove();
	
	$("#name").html("你好，" + user_name);
}
