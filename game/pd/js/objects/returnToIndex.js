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
