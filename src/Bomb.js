function Bomb(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'bomb');

    this.game = game;
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

}
Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.constructor = Bomb;

Bomb.prototype.update = function () {
};

Bomb.preload = function (game) {
    game.load.image('bomb', 'assets/pill_red.png');
};

module.exports = Bomb;
