var Background = require("../Background");

var MainMenu = function (game) {
    this.game = game;
};

MainMenu.prototype.preload = function () {

};

MainMenu.prototype.create = function () {
    this.game.world.add(new Background(this.game));

    //gameOver = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'spacefont', 'GAME OVER!', 110);
    //gameOver.x = gameOver.x - gameOver.textWidth / 2;
    //gameOver.y = gameOver.y - gameOver.textHeight / 3;

    var menuButton = this.add.button(this.game.world.centerX, this.game.world.centerY,
        'buttonBlue', this.startGame, this, 1, 0, 2);
    menuButton.anchor.setTo(0.5, 0.5);

    var menuPanel = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, "menupanel");
    menuPanel.anchor.setTo(0.5, 0.5);
    menuPanel.scale.setTo(5, 2);

    var infoText = this.game.add.text(0, 0, "Mission: Collect stars, avoid death!", { font: "30px Tahoma", fill: "#ff", wordWrap: true, wordWrapWidth: 300, align: "center" });
    infoText.anchor.set(0.5);
    infoText.x = this.game.world.centerX;
    infoText.y = this.game.world.centerY - 80;


    var buttonText = this.game.add.text(0, 0, "Lets go!", { font: "28px Tahoma", fill: "#ff", wordWrap: true, wordWrapWidth: menuPanel.width, align: "center" });
    buttonText.anchor.set(0.5);
    buttonText.x = this.game.world.centerX;
    buttonText.y = this.game.world.centerY + 2;

    this.music = this.game.add.audio('intromusic');
    this.music.loopFull(1);
    this.music.play();
};

MainMenu.prototype.startGame = function () {
    this.music.stop();
    this.game.state.start("Game");
};

module.exports = MainMenu;