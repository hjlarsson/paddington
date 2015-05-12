function ShipTrail(game) {
    this.game = game;
    this.sprite = null;
}
ShipTrail.constructor = Star;

ShipTrail.prototype.preload = function () {
    this.game.load.image('star', 'assets/star_gold.png');
};

ShipTrail.prototype.create = function () {
    this.sprite = this.game.add.sprite(300, 300, 'star');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};

ShipTrail.prototype.update = function () {
};

module.exports = ShipTrail;