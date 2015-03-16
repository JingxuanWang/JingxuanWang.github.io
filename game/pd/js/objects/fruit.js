/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Fruit = me.Sprite.extend({
    init: function(imageName, x, y, imgSize) {
        me.Sprite.prototype.init.apply(this, [x, y, me.loader.getImage(imageName), 220, 220]);

        this.imageName = imageName;

        //this.alpha = 0;
        this.resize(0.05, 0.05);

        this.targetScale =  imgSize / 220;
        //this.targetScale = 1;

        this.isScaling = false;

    },

    update : function(dt) {
        // force update
        return true;
    },

    open: function () {
        var self = this;
        var scaleTween = new me.Tween(this.scale)
            .to({x: self.targetScale, y: self.targetScale}, 200)
            .onComplete(function() {
                self.resize(self.targetScale, self.targetScale);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();
    },

    setDefaultSize: function () {
        this.resize(this.targetScale, this.targetScale);
        this.scaleFlag = true;
    },

    move: function(legendSprite) {
        var offsetTween = new me.Tween(this.pos)
            .to({x: legendSprite.pos.x, y: legendSprite.pos.y}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();
    },

    close: function () {
        var alphaTween = new me.Tween(this)
            .to({alpha: 0}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();
    }
});
