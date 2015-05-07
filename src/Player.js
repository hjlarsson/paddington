var ACCLERATION = 900;
var DRAG = 400;
var MAXSPEED = 400;
var BASE_TEXTURE_ROTATION = 90 * (Math.PI/180);

function Player(game) {
    this.game = game;
    this.player = null;
    this.exhaust = null;
    this.cursors = null;
}

Player.constructor = Player;

Player.prototype.preload = function () {
    this.game.load.image('player', 'assets/ship.png');
    this.game.load.spritesheet('exhaust', 'assets/exhaust.png', 91, 128, 4);
};


Player.prototype.create = function () {
    // Player stuff
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

    this.exhaust = this.game.add.sprite(300, 200, 'exhaust');
    this.exhaust.animations.add('walk');
    this.exhaust.animations.play('walk', 20, true);
    this.exhaust.scale.x = 0.4;
    this.exhaust.scale.y = 0.4;
    this.exhaust.x = -12;
    this.exhaust.y = 40;
    this.exhaust.visible = false;
    this.player.addChild(this.exhaust);
};


Player.prototype.update = function () {
    this.exhaust.visible = false;

    if (this.cursors.left.isDown)
    {
        this.player.body.angularVelocity = -250;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.angularVelocity = 250;
    } else {
        this.player.body.angularVelocity = 0;
    }

    if (this.cursors.up.isDown)
    {
        this.exhaust.visible = true;
        this.game.physics.arcade.accelerationFromRotation(this.player.rotation - BASE_TEXTURE_ROTATION, ACCLERATION, this.player.body.acceleration);
    } else {
        this.player.body.acceleration.set(0);
    }
};

module.exports = Player;