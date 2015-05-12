var Star = require("./Star");

function StarSystem(game) {
    this.game = game;
    this.spawnTime = 1000;


    this.spawnTimer = game.time.events.add(game.rnd.integerInRange(this.spawnTime, this.spawnTime + 4000), this.createStar);

    //  Our bullet group
    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    //this.bombs.createMultiple(5, 'bomb');
    this.stars.setAll('anchor.x', 0.5);
    this.stars.setAll('anchor.y', 1);
    this.stars.setAll('outOfBoundsKill', true);
    this.stars.setAll('checkWorldBounds', true);

    for (i = 0; i < 10; i++) {
        this.stars.add(new Star(this.game));
    }

}

//Background.prototype = Object.create(Phaser.TileSprite.prototype);
StarSystem.constructor = StarSystem;

StarSystem.prototype.createStar = function () {
    console.log("Sparning star");
    var star = this.stars.getFirstExists(false);
    if (star) {
        star.reset(game.rnd.integerInRange(200, this.game.width - 200), game.rnd.integerInRange(200, this.game.height - 200));
    }

};

StarSystem.prototype.update = function () {
    this.tilePosition.x = -this.game.camera.x;
    this.tilePosition.y = -this.game.camera.y;
};

StarSystem.preload = function (game) {

};

module.exports = StarSystem;
