/**
 * Created by wang.jingxuan on 14-11-2.
 */
var Arrow = me.Sprite.extend({
    init: function(imageName, legendSprite, x, y, onclick) {
        me.Sprite.prototype.init.apply(this, [x, y, me.loader.getImage(imageName), 256, 256]);

        // will do scale anim
        this.scaleFlag = true;
        this.imageName = imageName;

        this.touchStartTween = new me.Tween(this.scale);
        this.touchEndTween = new me.Tween(this.scale);

        this.onclick = onclick;
        this.isScaling = false;
        this.alwaysUpdate = true;
        this.legendSprite = legendSprite;

        me.input.registerPointerEvent('pointerdown', this, this.onPointerDown.bind(this));
        me.input.registerPointerEvent('pointerup', this, this.onPointerUp.bind(this));
    },

    update: function() {
        // force update
        return true;
    },

    onPointerDown: function() {
        //console.log("OnPointerDown");
        var self = this;
        //this.isScaling = true;

        this.touchEndTween.stop();
        this.touchStartTween
            .to({x: 0.75, y: 0.75}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();
    },

    onPointerUp: function () {
        //console.log("OnPointerUp");
        var self = this;
        //this.isScaling = true;
        this.touchStartTween.stop();
        this.touchEndTween.to({x: 1, y: 1}, 100)
            .onComplete(function(){
                self.resize(1, 1);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();

        if (this.onclick != null) {
            this.onclick(self.legendSprite);
        }
    },

    onDestroyEvent: function() {
        me.input.releasePointerEvent("pointerdown", this);
        me.input.releasePointerEvent("pointerup", this);
    }
});