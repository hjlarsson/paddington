function Turret(game, ammo, player) {
    Phaser.Sprite.call(this, game, 0, 0, 'turret');

    this.game = game;
    this.ammo = ammo;
    this.player = player;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.3, 0.3);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.spawnTimer = this.game.time.events.add(200, this.fireWeapon.bind(this));

}
Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.constructor = Turret;

Turret.prototype.fireWeapon = function () {
    var bullet = this.ammo.getFirstExists(false);
    if (bullet) {
        bullet.reset(this.body.x + this.width / 2, this.body.y + this.height / 2);
        this.game.physics.arcade.moveToObject(bullet, this.player.player, 200);
    }

    this.spawnTimer = this.game.time.events.add(200, this.fireWeapon.bind(this));
};

Turret.prototype.update = function () {
};

Turret.preload = function (game) {
    game.load.image('turret', 'assets/turret.png');
};

module.exports = Turret;
