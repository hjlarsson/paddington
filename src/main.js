var Background = require("./Background");
var Player = require("./Player");
var StarSystem = require("./StarSystem");
var DefenceSystem = require("./DefenceSystem");

var game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var background = null;
var player = new Player(game);
//var star = null;
var starSystem = null;
var defenceSystem = null;
var shields;
function render() {
    //game.debug.body(star.sprite);
    defenceSystem.turrets.forEach(function (child) {
        game.debug.body(child);
    }, this, true);

    game.debug.body(defenceSystem.turrets);
}

function preload() {

    //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    Background.preload(game);
    DefenceSystem.preload(game);
    StarSystem.preload(game);

    player.preload();


}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Resize our game world to be a 2000 x 2000 square
    //game.world.setBounds(-1000, -1000, 2000, 2000);

    background = new Background(game);

    game.world.add(background);

    starSystem = new StarSystem(game);
    defenceSystem = new DefenceSystem(game, player);
    player.create();

    shields = game.add.text(game.width - 250, 50, 'Stars: ' + player.score, { font: '20px Arial', fill: '#fff' });
    shields.render = function () {
            shields.text = 'Stars: ' + Math.max(player.score, 0);
    };
    shields.fixedToCamera = true;
}

function update() {
    background.update();
    player.update();
    //star.update();
    shields.render();

    game.physics.arcade.overlap(player.player, starSystem.stars, function (a, star) {
        player.showTrail();
        player.score += 1;
        star.kill();
        //star.visible = false;
    }, null, this);

    game.physics.arcade.overlap(player.player, defenceSystem.turrets, function (a, star) {
        player.explode();
    }, null, this);
}


