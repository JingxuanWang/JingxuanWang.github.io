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
