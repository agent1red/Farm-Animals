'use strict';

//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function preload() {
    this.load.image('background', 'assets/images/background.png');
  },
  //executed after everything is loaded
  create: function create() {},
  //this is executed multiple times per second
  update: function update() {}

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
//# sourceMappingURL=main.js.map
