var Preload = function (game) {
  this.game = game;
};

Preload.prototype.preload = function () {
    console.log("asdasdasd");
    this.game.load.image("gameover","assets/gameover.png");
};

Preload.prototype.create = function () {
    console.log("Moving to state Game");
    this.game.state.start("Game");
};

module.exports = Preload;