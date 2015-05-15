var Turret = require("./Turret");

function DefenceSystem(game, player) {
    this.game = game;
    this.player = player;
    this.spawnTime = 3000;

    this.ammo = this.game.add.group();
    this.ammo.enableBody = true;
    this.ammo.physicsBodyType = Phaser.Physics.ARCADE;
    this.ammo.createMultiple(60, 'ammo');
    this.ammo.setAll('anchor.x', 0.5);
    this.ammo.setAll('anchor.y', 0.5);
    this.ammo.setAll('scale.x', 0.5);
    this.ammo.setAll('scale.y', 0.5);
    this.ammo.setAll('outOfBoundsKill', true);
    this.ammo.setAll('checkWorldBounds', true);
    this.ammo.callAll('kill');

    this.turrets = this.game.add.group();
    this.turrets.enableBody = true;
    this.turrets.physicsBodyType = Phaser.Physics.ARCADE;
    //this.bombs.createMultiple(30, 'bomb');
    this.turrets.setAll('anchor.x', 0.5);
    this.turrets.setAll('anchor.y', 0.5);
    this.turrets.setAll('outOfBoundsKill', true);
    this.turrets.setAll('checkWorldBounds', true);

    for (i = 0; i < 10; i++) {
        this.turrets.add(new Turret(this.game, this.ammo, this.player));
    }
    this.turrets.callAll('kill');

    this.spawnTimer = this.game.time.events.add(game.rnd.integerInRange(this.spawnTime, this.spawnTime + 5000), this.createTurret.bind(this));
}

DefenceSystem.constructor = DefenceSystem;

DefenceSystem.prototype.createTurret = function () {
    var turret = this.turrets.getFirstExists(false);
    if (turret) {
        var bounds = this.game.world.bounds;
        var x = this.game.rnd.integerInRange(bounds.x + 400, bounds.width - 400);
        var y = this.game.rnd.integerInRange(bounds.y + 400, bounds.height - 400);
        turret.reset(x, y);
    }

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 1000), this.createTurret.bind(this));
};

module.exports = DefenceSystem;
