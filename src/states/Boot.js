var Boot = function (game) {
  this.game = game;
};

Boot.prototype.preload = function () {
    this.game.load.image("loading","assets/gamedev_over.png");
};

Boot.prototype.create = function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.setScreenSize();

    this.game.state.start("Preload");
};

module.exports = Boot;