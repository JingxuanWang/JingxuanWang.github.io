/**
 * Created by wang.jingxuan on 14-11-3.
 */
var UILabel = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, settings) {

        this.settings = settings || {};

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        if (this.settings.bitmapFont == true) {
            // create a font
            this.font = new me.BitmapFont(
                this.settings.font || "32x32_font",
                this.settings.size || 32,
                this.settings.scale || null,     // no resize
                this.settings.firstChar || null  // 0x20 for default
            );

            this.font.set(
                this.settings.textAlign || "left"
            );
        }
        else
        {
            this.font = new me.Font(
                this.settings.font  || "Arial",
                this.settings.size  || 32,
                this.settings.fillStyle || "black",
                this.settings.textAlign || "left"
            );
        }

        // make sure we use screen coordinates
        this.floating = true;

        this.text = this.settings.text || "NEW LABEL";
    },

    /**
     * draw the score
     */
    draw : function (context) {
        if (this.settings.bitmapFont == true) {
            this.font.draw (context, this.text, this.pos.x, this.pos.y);
        } else {
            var ctx = context.getContext();
            this.font.measureText(ctx, this.text);
            this.font.draw (ctx, this.text, this.pos.x, this.pos.y);
        }
    }
});