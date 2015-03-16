/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Arrow = UIButton.extend({
    init: function(direction, legendSprite, x, y, imageWidth, imageHeight, onclick) {

        var width = 220;
        var height = 220;

        this._super(UIButton, 'init',
            [x, y, {
                imageName: "button",
                onclick: onclick,
                width: width,
                height: height
            }]
        );

        this.targetScale = imgSize / width;
        this.resize(this.targetScale, this.targetScale);
        this.scaleFlag = true;

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
            .to({x: self.xScale * 0.75 * self.targetScale, y: 0.75 * self.targetScale}, 100)
            .onComplete(function(){
                self.resize(self.xScale * self.targetScale, self.targetScale);
                self.scaleFlag = true;
            })
            .start();
    },

    onPointerUp: function () {
        //console.log("OnPointerUp");
        var self = this;
        this.touchStartTween.stop();
        this.touchEndTween.to({x: self.xScale * self.targetScale, y: self.targetScale}, 100)
            .onComplete(function(){
                self.resize(self.xScale * self.targetScale, self.targetScale);
                self.scaleFlag = true;
            })
            .start();

        if (this.onclick != null) {
            this.onclick(self.legendSprite);
        }
    },
});