var Exhaust = require("./Exhaust");
var Star = require("./Star");

var ACCLERATION = 900;
var DRAG = 400;
var MAXSPEED = 400;
var BASE_TEXTURE_ROTATION = 90 * (Math.PI / 180);

function Player(game) {
    Phaser.Sprite.call(this, game, 0, 0, 'player');

    this.game = game;

    this.anchor.setTo(0.5, 0.5);
    this.scale.x = 0.3;
    this.scale.y = 0.3;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.body.drag.setTo(DRAG, DRAG);
    this.body.collideWorldBounds = true;

    this.exhaust = new Exhaust(this.game);
    this.cursors = null;
    this.shipTrail = null;
    this.fireButton = null;
    this.bombTimer = 0;

    this.explosions = null;
    this.score = 0;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.camera.follow(this);
    this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    this.game.camera.focusOnXY(0, 0);

    this.addChild(this.exhaust);

    //  Add an emitter for the ship's trail
    this.shipTrail = this.game.add.emitter(this.x, this.y + 10, 400);
    this.shipTrail.width = 10;
    this.shipTrail.y = 40;
    this.shipTrail.makeParticles('star_gold');
    this.shipTrail.setXSpeed(30, -30);
    this.shipTrail.setYSpeed(200, 180);
    this.shipTrail.setRotation(50, -50);
    this.shipTrail.setAlpha(1, 0.01, 800);
    this.shipTrail.setScale(0.1, 0.5, 0.1, 0.5, 2000, Phaser.Easing.Quintic.Out);
    this.shipTrail.start(false, 2000, 10);
    this.shipTrail.visible = false;
    this.addChild(this.shipTrail);

    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.enableBody = true;
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
    this.explosions.createMultiple(30, 'explosion');
    this.explosions.setAll('anchor.x', 0.5);
    this.explosions.setAll('anchor.y', 0.5);
    this.explosions.forEach(function (explosion) {
        explosion.animations.add('explosion');
    });

    //  Our star group
    this.stars = this.game.add.group();
    this.stars.enableBody = true;
    this.stars.enableBodyDebug = true;
    this.stars.physicsBodyType = Phaser.Physics.ARCADE;
    this.stars.setAll('anchor.x', 0.5);
    this.stars.setAll('anchor.y', 1);
    this.stars.setAll('outOfBoundsKill', true);
    this.stars.setAll('checkWorldBounds', true);

    for (i = 0; i < 5; i++) {
        this.stars.add(new Star(this.game));
    }
    this.stars.callAll('kill');
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.constructor = Player;


Player.prototype.create = function () {


};

Player.prototype.showTrail = function () {
    this.shipTrail.visible = true;
};

Player.prototype.hideTrail = function () {
    this.shipTrail.visible = false;
};

Player.prototype.update = function () {
    this.exhaust.setVisability(false);

    if (this.cursors.left.isDown) {
        this.body.angularVelocity = -250;
    }
    else if (this.cursors.right.isDown) {
        this.body.angularVelocity = 250;
    } else {
        this.body.angularVelocity = 0;
    }

    if (this.cursors.up.isDown) {
        this.exhaust.setVisability(true);
        this.game.physics.arcade.accelerationFromRotation(this.rotation - BASE_TEXTURE_ROTATION, ACCLERATION, this.body.acceleration);
    } else {
        this.body.acceleration.set(0);
    }
};

Player.prototype.releaseStars = function () {
    for (i = 0; i < Math.min(this.score, this.stars.length); i++) {
        var star = this.stars.getFirstDead();
        if (star) {
            var bounds = this.game.world.bounds;
            var x = this.game.rnd.integerInRange(bounds.x + 200, bounds.width - 200);
            var y = this.game.rnd.integerInRange(bounds.y + 200, bounds.height - 200);
            star.reset(this.body.x, this.body.y);
            this.game.physics.arcade.accelerateToXY(star, x, y, 700, 1200, 1200)
        }
    }
};

Player.prototype.collide = function () {
    console.log("Collision");
    if (this.score > 0) {
        console.log("Dispatch stars");
        this.releaseStars();
        this.score = 0;
    } else {
        this.explode();
    }
};

Player.prototype.explode = function () {
    var explosion = this.explosions.getFirstExists(false);
    if (explosion) {
        explosion.reset(this.body.x, this.body.y);
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
    }

    this.kill();
};

Player.preload = function (game) {
    game.load.image('player', 'assets/ship.png');
    game.load.image('star_gold', 'assets/star_gold.png');
    game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);
    Exhaust.preload(game);
};

module.exports = Player;
