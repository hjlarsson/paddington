function Exhaust(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'exhaust');

    this.game = game;

    this.animations.add('walk');
    this.animations.play('walk', 20, true);
    this.scale.x = 0.4;
    this.scale.y = 0.4;
    this.x = -15;
    this.y = 40;
    this.visible = false;
}

Exhaust.constructor = Exhaust;
Exhaust.prototype = Object.create(Phaser.Sprite.prototype);

Exhaust.prototype.setVisibility = function (value) {
    this.visible = value;
};

Exhaust.preload = function (game) {
    game.load.spritesheet('exhaust', 'assets/exhaust.png', 91, 128, 4);
};

module.exports = Exhaust;
