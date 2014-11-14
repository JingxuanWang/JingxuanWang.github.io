/**
 * Created by wang.jingxuan on 14-11-9.
 */
var game = {

    resources: [
        {name: "logo",        type:"image", src: "data/img/Logo.png"},
        {name: "32x32_font",  type:"image", src: "data/img/32x32_font.png"},
        {name: "caonima",     type:"image", src: "data/img/Caonima.png"}
    ],

    data: {
        screenWidth: 1280,
        screenHeight: 960
    },

    "onload": function() {

        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, game.data.screenWidth, game.data.screenHeight, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.state.set(me.state.LOADING, new game.LoadingScene());
        me.state.set(me.state.PLAY, new game.PlayScene());

        me.loader.load(
            {name: "logo", type:"image", src: "data/img/Logo.png"},
            this.onLogoLoaded.bind(this)
        );
    },

    "onLogoLoaded" : function() {
        // Load the resources.
        me.loader.preload(game.resources);
        me.loader.onload = this.loaded;

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    "loaded": function() {
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};


game.PlayScene = me.ScreenObject.extend({
    onResetEvent: function() {
        // add background
        this.background = new me.ColorLayer("background", "#FFFFFF", 0);
        me.game.world.addChild(this.background, 0);

        this.avatars = {};
        this.userData = {};

        for (var i = 0; i < 30; i ++) {
            var avatar = new Avatar(
                game.data.screenWidth - 50,
                Math.random() * (game.data.screenHeight - 200) - 50,
                {
                    user_id: "ID: " + i,
                    score: 0
                }
            );
            this.avatars[avatar.userData.user_id] = avatar;
            //this.avatars.push(avatar);
            me.game.world.addChild(avatar, 100 - i);
        }

        // start timer
        me.timer.setInterval(this.updateData.bind(this), 3000, false);
    },

    updateData: function() {
        console.log("UpdateData Called");
        //ajax("http://localhost:8001/data.json", function(data) {
            //console.log(data);
        //    var newData = JSON.parse(data);
        //});
        var hiScore = null;
        var loScore = null;
        for (var user_id in this.avatars) {
            var avatar = this.avatars[user_id];

            // Debug! update avatar score
            var score = Math.floor(3000 * Math.random());
            if (score > avatar.userData.score) {
                avatar.userData.score = score;
            }

            // Update hiScore
            if (hiScore == null || avatar.userData.score > hiScore) {
                hiScore = avatar.userData.score;
            }

            // Update loScore
            if (loScore == null || avatar.userData.score < loScore) {
                loScore = avatar.userData.score;
            }
        }

        for (var user_id in this.avatars) {
            var avatar = this.avatars[user_id];
            var percentage = (avatar.userData.score - loScore) / (hiScore - loScore);
            var targetX = 800 - percentage * (800 - 100);

            if (targetX < avatar.animSprite.pos.x) {
                me.game.world.moveToTop(avatar);
                avatar.speedUp(targetX, avatar.animSprite.pos.y);
            } else {
                avatar.speedDown(targetX, avatar.animSprite.pos.y);
            }
        }
    },

    _onDataFetched: function(response) {
        console.log(response);
    },

    onDestroyEvent: function() {
        // remove the hud from the game world
    }
});
