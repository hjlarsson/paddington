var Background = require("./Background");
var Player = require("./Player");

var game = new Phaser.Game(window.screen.width, window.screen.height, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var background = new Background(game);
var player = new Player(game);

function preload() {
    background.preload();
    player.preload();
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 2000, 2000);

    background.create();
    player.create();
}

function update() {
    background.update();
    player.update();
}