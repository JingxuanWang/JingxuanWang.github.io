/**
 * Created by wang.jingxuan on 14/11/5.
 */
var SelectableObject = me.Container.extend({
    init : function(x, y, spriteName, frameName, onSelect, onDeselect) {
        this._super(me.Container, 'init');

        this.targetScale = 0.5;

        this.spriteName = spriteName;
        this.sprite = new me.Sprite(x, y, me.loader.getImage(spriteName));
        this.frame = new me.Sprite(x, y, me.loader.getImage(frameName));
        this.frame.alpha = 0;

        this.sprite.resize(0.05, 0.05);

        this.addChild(this.sprite, 1);
        this.addChild(this.frame, 2);

        this.isSelected = false;
        this.onSelect = onSelect;
        this.onDeselect = onDeselect;

        this.collider = new me.Rect(x + 64, y + 64, 128, 128);
        me.input.registerPointerEvent('pointerup', this.collider, this.onPointerUp.bind(this));

        this.open();
    },

    open: function () {
        this.frame.resize(this.targetScale + 0.05, this.targetScale + 0.05);

        var self = this;
        var scaleTween = new me.Tween(this.sprite.scale)
            .to({x: self.targetScale, y: self.targetScale}, 200)
            .onComplete(function() {
                self.resize(self.targetScale, self.targetScale);
                self.scaleFlag = true;
                self.isScaling = false;
            })
            .start();
    },

    onPointerUp : function() {
        if (this.isSelected) {
            if (this.onDeselect != null && this.onDeselect(this.spriteName)) {
                this.isSelected = !this.isSelected;
                this.frame.alpha = 1 - this.frame.alpha;
            }
        } else {
            if (this.onSelect != null && this.onSelect(this.spriteName)) {
                this.isSelected = !this.isSelected;
                this.frame.alpha = 1 - this.frame.alpha;
            }
        }
    },

    destroy: function() {
        me.input.releasePointerEvent("pointerup", this.collider);

        this._super(me.Container, 'destroy');

        this.collider = null;
        this.sprite = null;
        this.frame = null;
    }
});