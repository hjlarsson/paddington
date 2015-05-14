var Preload = function (game) {
  this.game = game;
};

Preload.prototype.preload = function () {
    var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loading");
    loadingBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loadingBar);

    // The rest of the stuff to preload
    this.game.load.image("gameover","assets/gameover.png");
    this.game.load.image("menupanel","assets/glassPanel_cornerTL.png");
    this.game.load.image("buttonBlue","assets/buttonBlue.png");

    var number = this.game.rnd.integerInRange(1, 8);
    this.game.load.image('background', 'assets/background/background' + number + '.jpg');


    // Audio stuff
    this.game.load.audio('intromusic', ['assets/sound/introwavybgm_0.mp3']);
    this.game.load.audio('mainmusic', ['assets/sound/ancientbgm_0.mp3']);
    this.game.load.audio('starpickup', ['assets/sound/powerUp9.ogg']);
    this.game.load.audio('explode', ['assets/sound/136765_mitchelk_explode001.mp3']);
    this.game.load.audio('loosestars', ['assets/sound/pepSound3.ogg']);
    this.game.load.audio('laser', ['assets/sound/laser4.ogg']);
};

Preload.prototype.create = function () {
    this.game.state.start("MainMenu");
};

module.exports = Preload;