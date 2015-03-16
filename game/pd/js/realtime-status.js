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
        expireTime: 3600,
        screenWidth: 1280,
        screenHeight: 960,
        gameId: QueryString.game_id || 100,
        apiUrl: "http://pd.iuv.net/game.php"
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

        // start timer
        me.timer.setInterval(this.updateData.bind(this), 3000, false);
    },

    updateData: function() {
        //console.log("UpdateData Called");
        var self = this;
        ajax("GET", game.data.apiUrl + "?m=fetch&game_id=" + game.data.gameId, function(json) {
            //console.log(json);
            var data = JSON.parse(json);
            var userDatas = data.data;

            var hiScore = 500;
            var loScore = 0;

            // remove filtered avatars
            for (var user_id in self.avatars) {
                var avatar = self.avatars[user_id];
                if (avatar.toBeRemove == true) {
                    //console.log("Removing user : " + user_id);
                    me.game.world.removeChild(avatar);
                    avatar.destroy();
                    delete self.avatars[user_id];
                }
            }

            // update score
            // add new avatars
            while(userDatas.length > 0) {
                var userData = userDatas.shift();
                var avatar = self.avatars[userData.user_id];

                // if this user_id not exists, then create
                if (avatar == null) {
                    var currentTimestamp = Math.round(+new Date()/1000);
                    if (currentTimestamp <= ~~(userData.update_time) + game.data.expireTime) {
                        //console.log("Adding user : " + userData.user_id);
                        var avatar = new Avatar(
                            game.data.screenWidth - 50,
                            Math.random() * (game.data.screenHeight - 200) - 50,
                            {
                                user_id: ~~(userData.user_id),
                                score: ~~(userData.score),
                                update_time: ~~(userData.update_time)
                            }
                        );
                        self.avatars[avatar.userData.user_id] = avatar;
                        me.game.world.addChild(avatar, 100 - Math.round(Math.random() * 10));
                    }
                } else {
                    avatar.userData = userData;
                }
            }

            // filter out expired score
            // update hiScore and loScore
            for (var user_id in self.avatars) {
                var avatar = self.avatars[user_id];

                var currentTimestamp = Math.round(+new Date() / 1000);
                //console.log(currentTimestamp);
                //console.log(~~(avatar.userData.update_time) + game.data.expireTime);
                if (currentTimestamp > ~~(avatar.userData.update_time) + game.data.expireTime) {
                    avatar.expired = true;
                    continue;
                }

                // Debug! update avatar score
                // avatar.userData.score = Math.floor(3000 * Math.random());

                // Update hiScore
                if (~~(avatar.userData.score) > hiScore) {
                    hiScore = avatar.userData.score;
                }

                // Update loScore
                if (~~(avatar.userData.score) < loScore) {
                    loScore = avatar.userData.score;
                }
            }


            // update position
            for (var user_id in self.avatars) {
                var avatar = self.avatars[user_id];
                var percentage = (avatar.userData.score - loScore) / (hiScore - loScore);
                var targetX = 800 - percentage * (800 - 100);

                if (avatar.expired == true) {
                    targetX = game.data.screenWidth - 50
                }

                if (targetX < avatar.animSprite.pos.x) {
                    me.game.world.moveToTop(avatar);
                    avatar.speedUp(targetX, avatar.animSprite.pos.y);
                } else {
                    avatar.speedDown(targetX, avatar.animSprite.pos.y);
                }
            }
        });
    },

    onDestroyEvent: function() {
        // remove the hud from the game world
    }
});
