/**
 * Created by wang.jingxuan on 14-11-3.
 */
UILable = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, settings) {

        settings = settings || {};

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // create a font
        this.font = new me.BitmapFont(
            settings.font || "32x32_font",
            settings.size || 32
        );

        this.font.set(
            settings.align || "left"
        );

        // make sure we use screen coordinates
        this.floating = true;

        this.text = settings.text || "NEW LABEL";
    },

    /**
     * draw the score
     */
    draw : function (context) {
        this.font.draw (context, this.text, this.pos.x, this.pos.y);
    }
});