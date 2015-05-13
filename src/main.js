var Background = require("./Background");
var Player = require("./Player");
var Star = require("./Star");
var StarSystem = require("./StarSystem");

var game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var background = null;
var player = new Player(game);
var star = null;

function render() {
    //game.debug.body(star.sprite);
    //game.debug.body(player.player);
}

function preload() {

    Background.preload(game);
    Star.preload(game);
    StarSystem.preload(game);
    player.preload();


}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(-1000, -1000, 2000, 2000);



    background = new Background(game);

    game.world.add(background);

    var starSystem = new StarSystem(game);
    player.create();

    star = new Star(game, 300, 300);
    game.world.add(star);

}

function update() {
    background.update();
    player.update();
    star.update();

    game.physics.arcade.overlap(player.player, star, function (a, b) {
        player.showTrail();
        star.visible = false;
    }, null, this);
}