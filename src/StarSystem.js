var Star = require("./Star");

function StarSystem(game) {
    this.game = game;
    this.spawnTime = 500;


    //  Our bullet group
    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    //this.stars.enableBodyDebug = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    //this.stars.createMultiple(5, 'star');
    this.stars.setAll('anchor.x', 0.5);
    this.stars.setAll('anchor.y', 1);
    this.stars.setAll('outOfBoundsKill', true);
    this.stars.setAll('checkWorldBounds', true);


    for (i = 0; i < 10; i++) {
        console.log("Adding star");
        var star = new Star(this.game);

        this.stars.add(star);
        //this.game.world.add(star);
    }
    this.stars.callAll('kill');

    this.spawnTimer = this.game.time.events.add(game.rnd.integerInRange(this.spawnTime, this.spawnTime + 1000), this.createStar.bind(this));

}

//Background.prototype = Object.create(Phaser.TileSprite.prototype);
StarSystem.constructor = StarSystem;

StarSystem.prototype.createStar = function () {
    console.log("Spawning star", this.stars.length);
    var star = this.stars.getFirstDead();
    console.log("Got star", star);
    if (star) {

        var bounds = this.game.world.getBounds();
        console.log("Bounds", bounds);
        var x = this.game.rnd.integerInRange(200, this.world._width - 200);
        var y = this.game.rnd.integerInRange(200, this.world._height - 200);
        console.log("Resetting star", x, y, this.world._width);
        star.reset(x, y);
    }

    this.spawnTimer = this.game.time.events.add(this.game.rnd.integerInRange(this.spawnTime, this.spawnTime + 4000), this.createStar.bind(this));
};

StarSystem.prototype.update = function () {
};

StarSystem.preload = function (game) {
    game.load.image('star', 'assets/star_gold.png');
};

module.exports = StarSystem;
