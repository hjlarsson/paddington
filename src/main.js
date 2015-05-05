
var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var player;
var backgroundTileSprite;

var ACCLERATION = 900;
var DRAG = 400;
var MAXSPEED = 400;
var BASE_TEXTURE_ROTATION = 90 * (Math.PI/180);

function preload() {
    game.load.image('background', 'assets/background/background2.jpg');
    game.load.image('player', 'assets/ship.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 2000, 2000);
    backgroundTileSprite = game.add.tileSprite(0, 0, game.width, game.height, 'background');
    backgroundTileSprite.fixedToCamera = true;

    // Player stuff
    player = game.add.sprite(0, 0, 'player');
    player.anchor.setTo(0.5, 0.5);
    player.scale.x = 0.3;
    player.scale.y = 0.3;
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    player.body.drag.setTo(DRAG, DRAG);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 500, 300);
    game.camera.focusOnXY(0, 0);
}

function update() {
    backgroundTileSprite.tilePosition.x = -game.camera.x;
    backgroundTileSprite.tilePosition.y = -game.camera.y;

    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 250;
    } else {
        player.body.angularVelocity = 0;
    }

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player.rotation - BASE_TEXTURE_ROTATION, ACCLERATION, player.body.acceleration);
    } else {
        player.body.acceleration.set(0);
    }
}