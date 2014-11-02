/**
 * Created by wang.jingxuan on 14-11-3.
 */
var Retry = me.Sprite.extend({
    // constructor
    init: function() {
        me.Sprite.prototype.init.apply(this,
            [
                game.data.screenWidth / 2 - 128,
                game.data.screenHeight / 2,
                me.loader.getImage("retry"),
                256,
                256
            ]
        );

        this.touchStartTween = new me.Tween(this.scale);
        this.touchEndTween = new me.Tween(this.scale);

        me.input.registerPointerEvent('pointerdown', this, this.onPointerDown.bind(this));
        me.input.registerPointerEvent('pointerup', this, this.onPointerUp.bind(this));
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
                me.state.change(me.state.MENU);
            })
            .start();
    },

    onDestroyEvent: function() {
        me.input.releasePointerEvent("pointerdown", this);
        me.input.releasePointerEvent("pointerup", this);
    }
});