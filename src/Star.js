function Star(game) {
    this.game = game;
    this.sprite = null;
}
Star.constructor = Star;

Star.prototype.preload = function () {
    this.game.load.image('star', 'assets/star_gold.png');
};

Star.prototype.create = function () {
    this.sprite = this.game.add.sprite(300, 300, 'star');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};

Star.prototype.update = function () {
};

module.exports = Star;