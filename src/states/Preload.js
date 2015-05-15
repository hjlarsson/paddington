var Preload = function (game) {
  this.game = game;
};

Preload.prototype.preload = function () {
    var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loading");
    loadingBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loadingBar);

    var infoText = this.game.add.text(0, 0, "LOADING", { font: "87px Tahoma", fill: "#ffffff", wordWrap: true, wordWrapWidth: 300, align: "center" });
    infoText.anchor.set(0.5);
    infoText.x = this.game.world.centerX + 10;
    infoText.y = this.game.world.centerY - 100;

    // The rest of the stuff to preload
    this.game.load.image("gameover","assets/gameover.png");
    this.game.load.image("menupanel","assets/glassPanel_cornerTL.png");
    this.game.load.image("buttonBlue","assets/buttonBlue.png");
    this.game.load.spritesheet('exhaust', 'assets/exhaust.png', 91, 128, 4);
    this.game.load.bitmapFont('spacefont', 'assets/spacefont/spacefont.png', 'assets/spacefont/spacefont.xml');
    this.game.load.image('ammo', 'assets/turretBase_small.png');
    this.game.load.image('turret', 'assets/turret.png');
    this.game.load.image('star', 'assets/star_gold.png');
    this.game.load.image('player', 'assets/ship_red.png');
    this.game.load.image('star_gold', 'assets/star_gold.png');
    this.game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);

    var number = this.game.rnd.integerInRange(1, 7);
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