function Background(game) {
    this.game = game;
    this.sprite = null;
}
Background.constructor = Background;

Background.prototype.preload = function () {
    this.game.load.image('background', 'assets/background/background2.jpg');
};

Background.prototype.create = function () {
    this.sprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.sprite.fixedToCamera = true;
};

Background.prototype.update = function () {
    this.sprite.tilePosition.x = -this.game.camera.x;
    this.sprite.tilePosition.y = -this.game.camera.y;
};

module.exports = Background;