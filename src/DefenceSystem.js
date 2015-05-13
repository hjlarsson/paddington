var Turret = require("./Turret");

function DefenceSystem(game) {
    this.game = game;
    this.spawnTime = 500;

    this.ammo = this.game.add.group();
    this.ammo.enableBody = true;
    this.ammo.physicsBodyType = Phaser.Physics.ARCADE;
    this.ammo.createMultiple(50, 'ammo');
    this.ammo.setAll('anchor.x', 0.5);
    this.ammo.setAll('anchor.y', 1);
    this.ammo.setAll('scale.x', 0.5);
    this.ammo.setAll('scale.y', 0.5);
    this.ammo.setAll('outOfBoundsKill', true);
    this.ammo.setAll('checkWorldBounds', true);

    this.turrets = this.game.add.group();
    this.turrets.enableBody = true;
    this.turrets.physicsBodyType = Phaser.Physics.ARCADE;
    //this.bombs.createMultiple(30, 'bomb');
    this.turrets.setAll('anchor.x', 0.5);
    this.turrets.setAll('anchor.y', 1);
    this.turrets.setAll('outOfBoundsKill', true);
    this.turrets.setAll('checkWorldBounds', true);

    for (i = 0; i < 30; i++) {
        this.turrets.add(new Turret(this.game, this.ammo));
    }
    this.turrets.callAll('kill');



    this.spawnTimer = this.game.time.events.add(game.rnd.integerInRange(this.spawnTime, this.spawnTime + 500), this.createTurret.bind(this));
}

//Background.prototype = Object.create(Phaser.TileSprite.prototype);
DefenceSystem.constructor = DefenceSystem;

DefenceSystem.prototype.createTurret = function () {
    var turret = this.turrets.getFirstExists(false);
    if (turret) {
        var bounds = this.game.world.bounds;
        var x = this.game.rnd.integerInRange(bounds.x + 200, bounds.width - 200);
        var y = this.game.rnd.integerInRange(bounds.y + 200, bounds.height - 200);
        turret.reset(x, y);
    }

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 1000), this.createTurret.bind(this));
};

DefenceSystem.prototype.update = function () {
};

DefenceSystem.preload = function (game) {
    Turret.preload(game);
    game.load.image('ammo', 'assets/turretBase_small.png');
};

module.exports = DefenceSystem;
