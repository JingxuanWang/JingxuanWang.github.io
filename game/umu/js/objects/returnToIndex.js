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
                    	window.location.href = "./index.html";    
                    }
                }
            ]
        );
    }
});
