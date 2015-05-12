function Exhaust(game) {
    this.game = game;
    this.sprite = null;
}
Exhaust.constructor = Exhaust;

Exhaust.prototype.preload = function () {
    this.game.load.spritesheet('exhaust', 'assets/exhaust.png', 91, 128, 4);
};

Exhaust.prototype.create = function () {
    this.sprite = this.game.add.sprite(0, 0, 'exhaust');
    this.sprite.animations.add('walk');
    this.sprite.animations.play('walk', 20, true);
    this.sprite.scale.x = 0.4;
    this.sprite.scale.y = 0.4;
    this.sprite.x = -15;
    this.sprite.y = 40;
    this.sprite.visible = false;
};

Exhaust.prototype.update = function () {
};

Exhaust.prototype.setVisability = function (value) {
    this.sprite.visible = value;
};

module.exports = Exhaust;