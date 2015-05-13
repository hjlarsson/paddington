var Bomb = require("./Bomb");

function DefenceSystem(game) {
    this.game = game;
    this.spawnTime = 500;

    this.bombs = this.game.add.group();
    this.bombs.enableBody = true;

    this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
    //this.bombs.createMultiple(30, 'bomb');
    this.bombs.setAll('anchor.x', 0.5);
    this.bombs.setAll('anchor.y', 1);
    this.bombs.setAll('outOfBoundsKill', true);
    this.bombs.setAll('checkWorldBounds', true);

    for (i = 0; i < 30; i++) {
        this.bombs.add(new Bomb(this.game));
    }
    this.bombs.callAll('kill');

    this.spawnTimer = this.game.time.events.add(game.rnd.integerInRange(this.spawnTime, this.spawnTime + 500), this.createBomb.bind(this));
}

//Background.prototype = Object.create(Phaser.TileSprite.prototype);
DefenceSystem.constructor = DefenceSystem;

DefenceSystem.prototype.createBomb = function () {
    var bomb = this.bombs.getFirstExists(false);
    if (bomb) {
        var bounds = this.game.world.bounds;
        var x = this.game.rnd.integerInRange(bounds.x + 200, bounds.width - 200);
        var y = this.game.rnd.integerInRange(bounds.y + 200, bounds.height - 200);
        bomb.reset(x, y);
    }

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 1000), this.createBomb.bind(this));
};

DefenceSystem.prototype.update = function () {
};

DefenceSystem.preload = function (game) {
    Bomb.preload(game);
};

module.exports = DefenceSystem;
