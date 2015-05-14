var Background = require("../Background");
var Player = require("../Player");
var StarSystem = require("../StarSystem");
var DefenceSystem = require("../DefenceSystem");

var background = null;
var player = null;
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

var Game = function (game) {
    this.game = game;
};

Game.prototype.preload = function () {
    this.game.load.bitmapFont('spacefont', 'assets/spacefont/spacefont.png', 'assets/spacefont/spacefont.xml');
    Player.preload(this.game);
    DefenceSystem.preload(this.game);
    StarSystem.preload(this.game);
};

Game.prototype.create = function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Resize our game world to be a 2000 x 2000 square
    //game.world.setBounds(-1000, -1000, 2000, 2000);

    background = new Background(this.game);

    this.game.world.add(background);

    starSystem = new StarSystem(this.game);

    player = new Player(this.game);
    this.game.world.add(player);

    defenceSystem = new DefenceSystem(this.game, player);

    shields = this.game.add.bitmapText(this.game.width - 350, 10, 'spacefont', 'Score: ' + player.score, 50);
    shields.render = function () {
        shields.text = 'Score: ' + Math.max(player.score, 0);
    };
    shields.render();
    shields.fixedToCamera = true;


    //  Game over text
    gameOver = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'spacefont', 'GAME OVER!', 110);
    gameOver.x = gameOver.x - gameOver.textWidth / 2;
    gameOver.y = gameOver.y - gameOver.textHeight / 3;
    gameOver.visible = false;
    gameOver.fixedToCamera = true;

    fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.bgMusic = this.game.add.audio('mainmusic');
    this.bgMusic.loopFull(1);
    this.bgMusic.play();

    this.starPickupSound = this.game.add.audio('starpickup');

};

Game.prototype.update = function () {
    background.update();
    player.update();
    //star.update();
    shields.render();

    var self = this;

    this.game.physics.arcade.overlap(player, starSystem.stars, function (a, star) {
        player.showTrail();
        player.score += 1;
        star.kill();
        self.starPickupSound.play();
        //star.visible = false;
    }, null, this);

    this.game.physics.arcade.overlap(player, defenceSystem.turrets, function (a, star) {
        player.collide();
    }, null, this);

    this.game.physics.arcade.overlap(player, defenceSystem.ammo, function (a, ammo) {
        ammo.kill();
        player.collide();
    }, null, this);

    this.game.physics.arcade.collide(starSystem.stars, defenceSystem.ammo, null, null, null);

    //  Game over?
    if (! player.alive && gameOver.visible === false) {
        gameOver.visible = true;
        gameOver.alpha = 0;
        var fadeInGameOver = this.game.add.tween(gameOver);
        fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
        fadeInGameOver.onComplete.add(setResetHandlers);
        fadeInGameOver.start();
        var self = this;
        function setResetHandlers() {
            //  The "click to restart" handler
            tapRestart = self.game.input.onTap.addOnce(_restart, this);
            spaceRestart = fireButton.onDown.addOnce(_restart, this);
            function _restart() {
                tapRestart.detach();
                spaceRestart.detach();
                console.log("Restarting game");
                self.bgMusic.stop();
                self.game.state.start("Game");
            }
        }
    }
};


module.exports = Game;