game.GameOverScene = me.ScreenObject.extend({
    init: function() {
    },

    onResetEvent: function() {

        this.background = new me.ColorLayer("background", "#FFFFFF", 90);
        //this.background.alpha = 0.75;
        me.game.world.addChild(this.background, 0);

		this.hiScore = 0;


		// get game score from cookie
		var games = deserializeGameInfo($.cookie("games"));
	
		// update score
		if (games[game.data.gameId] === undefined 
			|| games[game.data.gameId] < game.data.score) {
			games[game.data.gameId] = game.data.score;
		}
			
		// write back to cookie
		$.cookie("games", serializeGameInfo(games), { expires: 1, path: '/' });
	
		// get high score
		this.hiScore = games[game.data.gameId];

		
		// calculate rank from score
		this.calcRank();

		// Debug
		//for (var i = 0; i <= game.data.maxScore; i += 100) {
		//	game.data.score = i;
		//	this.calcRank();
		//}

		// Messages
		this.messages = [];
		this.messages[0] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128,
			{
				textAlign: "center",
				size: 48,
				text: "本次得分"
			}
		);
		this.messages[1] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128 + 48 + 16,
			{
				textAlign: "center",
				size: 128,
				text: game.data.score || "0"
			}
		);
		this.messages[2] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128 + 48 + 128 + 32,
			{
				textAlign: "center",
				size: 48,
				text: "个人最佳：" + this.hiScore
			}
		);


		this.messages[3] = new UILabel(
            game.data.screenWidth / 2,
            game.data.screenHeight / 2 - 256 - 128 + 128 + 96 + 64,
			{
				textAlign: "center",
				size: 48,
				text: "总分排名：" + this.rank + "\n\n超越了全球" + this.rate + "%的用户"
			}
		);

		// add all messages
		this.messages.map(function(message) {
			me.game.world.addChild(message, 101);
		});


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
			this.rank = Math.round(game.data.totalRank - game.data.totalRank * zRate);
		}
		//console.log("Score: " + game.data.score + " zRate: " + zRate + " rate: " + this.rate + " rank: " + this.rank);
	},

    onDestroyEvent: function() {
		this.messages.map(function(message) {
        	me.game.world.removeChild(message);
		});
        me.game.world.removeChild(this.retry);
        me.game.world.removeChild(this.returnToIndex);

        this.retry = null;
		this.returnToIndex = null;
		this.message = [];
    }
});
