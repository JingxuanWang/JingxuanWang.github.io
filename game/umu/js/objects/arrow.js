/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Arrow = UIButton.extend({
    init: function(direction, legendSprite, x, y, imageWidth, imageHeight, onclick) {

        this._super(UIButton, 'init',
            [x, y, {
                imageName: "button",
                onclick: onclick,
                width: imageWidth,
                height: imageHeight
            }]
        );

        this.xScale = 1;
        if (direction == "right") {
            this.flipX(true);
            this.xScale = -1;
        }

        this.legendSprite = legendSprite;
    },

    onPointerDown: function() {
        var self = this;
        this.touchEndTween.stop();
        this.touchStartTween
            .to({x: self.xScale * 0.75, y: 0.75}, 100)
            .onComplete(function(){
                self.resize(self.xScale * 1, 1);
                self.scaleFlag = true;
            })
            .start();
    },

    onPointerUp: function () {
        //console.log("OnPointerUp");
        var self = this;
        this.touchStartTween.stop();
        this.touchEndTween.to({x: self.xScale * 1, y: 1}, 100)
            .onComplete(function(){
                self.resize(self.xScale * 1, 1);
                self.scaleFlag = true;
            })
            .start();

        if (this.onclick != null) {
            this.onclick(self.legendSprite);
        }
    },
});