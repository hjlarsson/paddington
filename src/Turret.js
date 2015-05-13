function Turret(game, ammo) {
    Phaser.Sprite.call(this, game, 0, 0, 'turret');

    this.game = game;
    this.ammo = ammo;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.3, 0.3);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.spawnTimer = this.game.time.events.add(500, this.fireWeapon.bind(this));

}
Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.constructor = Turret;

Turret.prototype.fireWeapon = function () {
    var bullet = this.ammo.getFirstExists(false);
    if (bullet) {
        var bounds = this.game.world.bounds;
        var x = this.game.rnd.integerInRange(bounds.x + 200, bounds.width - 200);
        var y = this.game.rnd.integerInRange(bounds.y + 200, bounds.height - 200);
        bullet.reset(x, y);
        bullet.body.velocity.x += 200;
    }

    this.spawnTimer = this.game.time.events.add(500, this.fireWeapon.bind(this));
};

Turret.prototype.update = function () {
};

Turret.preload = function (game) {
    game.load.image('turret', 'assets/turret.png');
};

module.exports = Turret;
