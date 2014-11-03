/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Arrow = UIButton.extend({
    init: function(imageName, legendSprite, x, y, onclick) {

        this._super(UIButton, 'init',
            [x, y, {
                imageName: imageName,
                onclick: onclick
            }]
        );

        this.legendSprite = legendSprite;
    },

    onPointerUp: function () {
        //console.log("OnPointerUp");
        var self = this;
        this.touchStartTween.stop();
        this.touchEndTween.to({x: 1, y: 1}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
            })
            .start();

        if (this.onclick != null) {
            this.onclick(self.legendSprite);
        }
    },
});