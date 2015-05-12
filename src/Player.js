var Exhaust = require("./Exhaust");

var ACCLERATION = 900;
var DRAG = 400;
var MAXSPEED = 400;
var BASE_TEXTURE_ROTATION = 90 * (Math.PI / 180);

function Player(game) {
    this.game = game;
    this.player = null;
    this.exhaust = new Exhaust(this.game);
    this.cursors = null;
    this.shipTrail = null;
    this.fireButton = null;
    this.bombTimer = 0;
    this.bombs = null;
    this.explosions = null;
}

Player.constructor = Player;

Player.prototype.preload = function () {
    this.exhaust.preload();

    this.game.load.image('player', 'assets/ship.png');

    this.game.load.image('star_gold', 'assets/star_gold.png');
    this.game.load.image('bomb', 'assets/pill_red.png');
    this.game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);

};


Player.prototype.create = function () {
    this.exhaust.create();

    this.player = this.game.add.sprite(0, 0, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.x = 0.3;
    this.player.scale.y = 0.3;
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    this.player.body.drag.setTo(DRAG, DRAG);
    this.player.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.camera.follow(this.player);
    this.game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    this.game.camera.focusOnXY(0, 0);


    this.player.addChild(this.exhaust.sprite);

    //  Add an emitter for the ship's trail
    this.shipTrail = this.game.add.emitter(this.player.x, this.player.y + 10, 400);
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
    this.player.addChild(this.shipTrail);

    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //  Our bullet group
    this.bombs = this.game.add.group();
    this.bombs.enableBody = true;
    this.bombs.physicsBodyType = Phaser.Physics.ARCADE;
    this.bombs.createMultiple(5, 'bomb');
    this.bombs.setAll('anchor.x', 0.5);
    this.bombs.setAll('anchor.y', 1);
    this.bombs.setAll('outOfBoundsKill', true);
    this.bombs.setAll('checkWorldBounds', true);

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
        this.player.body.angularVelocity = -250;
    }
    else if (this.cursors.right.isDown) {
        this.player.body.angularVelocity = 250;
    } else {
        this.player.body.angularVelocity = 0;
    }

    if (this.cursors.up.isDown) {
        this.exhaust.setVisability(true);
        this.game.physics.arcade.accelerationFromRotation(this.player.rotation - BASE_TEXTURE_ROTATION, ACCLERATION, this.player.body.acceleration);
    } else {
        this.player.body.acceleration.set(0);
    }

    //  Fire bullet
    if (this.player.alive && (this.fireButton.isDown || this.game.input.activePointer.isDown)) {
        this.fireBullet();
    }

    this.game.physics.arcade.overlap(this.player, this.bombs, shipCollide, null, this);

};

Player.prototype.fireBullet = function () {
    console.log("Firing");
    if (this.game.time.now > this.bombTimer) {
        var BULLET_SPEED = 400;
        var BULLET_SPACING = 250;
        //  Grab the first bullet we can from the pool
        var bomb = this.bombs.getFirstExists(false);

        if (bomb) {
            //  And fire it
            //  Make bullet come out of tip of ship with right angle
            var bombOffset = 20 * Math.sin(this.game.math.degToRad(this.player.angle));
            bomb.reset(this.player.x + bombOffset, this.player.y);
            bomb.angle = this.player.angle;
            this.game.physics.arcade.velocityFromAngle(bomb.angle - 90, BULLET_SPEED, 0);
            //bomb.body.velocity.x += this.player.body.velocity.x;


            this.bombTimer = this.game.time.now + BULLET_SPACING;
        }
    }
};


function shipCollide(player, enemy) {
    var explosion = this.explosions.getFirstExists(false);
    if (explosion) {
        explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
    }
}

module.exports = Player;
