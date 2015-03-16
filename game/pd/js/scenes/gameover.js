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
