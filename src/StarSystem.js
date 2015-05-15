var Star = require("./Star");

function StarSystem(game) {
    this.game = game;
    this.spawnTime = 500;

    //  Our star group
    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    this.stars.enableBodyDebug = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    this.stars.setAll('anchor.x', 0.5);
    this.stars.setAll('anchor.y', 1);
    this.stars.setAll('outOfBoundsKill', true);
    this.stars.setAll('checkWorldBounds', true);

    for (i = 0; i < 10; i++) {
        this.stars.add(new Star(this.game));
    }
    this.stars.callAll('kill');

    this.spawnTimer = this.game.time.events.add(game.rnd.integerInRange(this.spawnTime, this.spawnTime + 1000), this.createStar.bind(this));
}

//Background.prototype = Object.create(Phaser.TileSprite.prototype);
StarSystem.constructor = StarSystem;

StarSystem.prototype.createStar = function () {
    var star = this.stars.getFirstDead();
    if (star) {
        var bounds = this.game.world.bounds;
        var x = this.game.rnd.integerInRange(bounds.x + 200, bounds.width - 200);
        var y = this.game.rnd.integerInRange(bounds.y + 200, bounds.height - 200);
        star.reset(x, y);
    }

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 4000), this.createStar.bind(this));
};

module.exports = StarSystem;
