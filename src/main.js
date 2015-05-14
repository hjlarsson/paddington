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
var gameOver;
var fireButton;

function render() {
    //game.debug.body(star.sprite);
    /*
    defenceSystem.turrets.forEach(function (child) {
        game.debug.body(child);
    }, this, true);
    */

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


    //  Game over text

    gameOver = game.add.text(game.world.centerX, game.world.centerY, 'GAME OVER!', { font: '20px Arial', fill: '#fff' });
    //gameOver.x = gameOver.x;
    //gameOver.y = gameOver.y;
    gameOver.visible = false;
    gameOver.fixedToCamera = true;

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
        player.collide();
    }, null, this);

    game.physics.arcade.overlap(player.player, defenceSystem.ammo, function (a, ammo) {
        ammo.kill();
        player.collide();
    }, null, this);

    game.physics.arcade.collide(starSystem.stars, defenceSystem.ammo, null, null, null);

    //  Game over?
    if (! player.player.alive && gameOver.visible === false) {
        console.log("Game is over!");
        gameOver.visible = true;
        gameOver.alpha = 0;
        var fadeInGameOver = game.add.tween(gameOver);
        fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
        fadeInGameOver.onComplete.add(setResetHandlers);
        fadeInGameOver.start();
        function setResetHandlers() {
            //  The "click to restart" handler
            tapRestart = game.input.onTap.addOnce(_restart,this);
            spaceRestart = fireButton.onDown.addOnce(_restart,this);
            function _restart() {
                tapRestart.detach();
                spaceRestart.detach();
                console.log("Restarting game");
                restart();
            }
        }
    }
}

function restart () {
    gameOver.visible = false;
    starSystem.restart();
    defenceSystem.restart();
    player.restart();
}

