var Boot = require("./states/Boot");
var Preload = require("./states/Preload");
var Game = require("./states/Game");
var GameOver = require("./states/GameOver");

var game = new Phaser.Game(window.innerWidth , window.innerHeight, Phaser.AUTO, 'Paddington');
game.state.add("Boot", Boot);
game.state.add("Preload", Preload);
game.state.add("Game", Game);
game.state.add("GameOver", GameOver);
game.state.start("Boot");

function render() {
    //game.debug.body(star.sprite);
    /*
     defenceSystem.turrets.forEach(function (child) {
     game.debug.body(child);
     }, this, true);
     */

}




