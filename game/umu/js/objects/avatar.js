/**
 * Created by wang.jingxuan on 14-11-9.
 */
var Avatar = me.Container.extend({
    init : function(x, y, userData) {

        this.speedNormal = 100;
        this.speedMax = 50;
        this.speedMin = 200;
        this.labelOffsetX = 170;
        this.labelOffsetY = 150;

        this._super(me.Container, 'init');

        this.animSprite = new me.AnimationSheet(x, y, {
                image: me.loader.getImage("caonima"),
                spritewidth: 240,
                spriteheight: 320
            }
        );

        this.userData = userData;

        this.animSprite.addAnimation("walk", [0, 1, 2, 3, 4], this.speedNormal);
        this.animSprite.setCurrentAnimation("walk");
        this.animSprite.setAnimationFrame(Math.floor(Math.random() * 4));

        this.label = new UILabel(
            x + this.labelOffsetX,
            y + this.labelOffsetY,
            {
                bitmapFont: true,
                text: this.userData.user_id + " : " + this.userData.score
            }
        );

        this.addChild(this.animSprite, 1);
        this.addChild(this.label, 2);
    },

    update: function(dt) {
        this.label.pos.x = this.animSprite.pos.x + this.labelOffsetX;
        this.label.pos.y = this.animSprite.pos.y + this.labelOffsetY;
        this.label.text = this.userData.user_id + "\n" + this.userData.score;
        return this._super(me.Container, 'update', [dt]);
    },

    speedUp: function (targetX, targetY) {
        this.animSprite.current.animationspeed = this.speedMax;

        this.moveToTop();
        this.animSprite.scaleFlag = true;
        var scaleTween = new me.Tween(this.animSprite.scale)
            .to({x: 1.5, y: 1.5}, 200)
            .easing(me.Tween.Easing.Linear.None)
            .start();

        this.moveEffect(targetX, targetY);
    },

    speedDown: function(targetX, targetY) {
        this.animSprite.current.animationspeed = this.speedMin;
        this.moveEffect(targetX, targetY);
    },

    moveEffect: function(targetX, targetY) {
        var self = this;
        var offsetTween = new me.Tween(this.animSprite.pos)
            .to({x: targetX, y: targetY}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function(){
                self.animSprite.current.animationspeed = self.speedNormal;

                self.animSprite.scaleFlag = true;
                var scaleTween = new me.Tween(self.animSprite.scale)
                    .to({x: 1, y: 1}, 200)
                    .easing(me.Tween.Easing.Linear.None)
                    .start();
            })
            .start();
    }
});