//this game will have only 1 state

var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('chicken', 'assets/images/chicken.png');
    this.load.image('horse', 'assets/images/horse.png');
    this.load.image('pig', 'assets/images/pig.png');
    this.load.image('sheep', 'assets/images/sheep.png');
    this.load.image('arrow', 'assets/images/arrow.png');




  },



  //executed after everything is loaded
  create: function() {

    //define the scale mode for the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;


    //create sprites and position them
    this.background = this.game.add.sprite(0, 0,'background');
    this.horse = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'horse');
    this.horse.anchor.setTo(0.5);
    this.horse.scale.setTo(1);
    ;
    //animate sprites
    this.horse.inputEnabled = true;
    this.horse.input.pixelPerfectClick = true;
    this.horse.events.onInputDown.add(this.animateAnimal, this)

    // group of animals in an array along with array text
    var animalData = [
      {key: 'chicken' , text: 'CHICKEN'},
      {key: 'horse' , text: 'HORSE'},
      {key: 'pig' , text: 'PIG'},
      {key: 'sheep' , text: 'SHEEP'}
    ];
    this.animals = this.game.add.group();

    var self = this;

    //for each function loop that will loop through the animal elements.
    animalData.forEach(function(element){
    animal =  self.animals.create(200, self.game.world.centerY, element.key);
    animal.customParams = {text: element.text};
    animal.anchor.setTo(0.5);
    animal.inputEnabled = true;
    animal.pixelPerfectClick = true;
    animal.events.onInputDown.add(self.animateAnimal, self);

    });

    this.currentAnimal = this.animals.next();
    // set position of animal from the array element
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
// left arrow
    this.leftArrow = this.game.add.sprite(80, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    //left arrow custom paramater giving direction to the left -1
    this.leftArrow.customParams = {direction: -1};

    //left arrow user input enable
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);


// right arrow
    this.rightArrow = this.game.add.sprite(560, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    //right arrow custom paramater giving direction to the right +1
    this.rightArrow.customParams = {direction: 1};
    //right arrow user input enable
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);



  },

  //this is executed multiple times per second
  update: function() {


  },
switchAnimal: function(sprite, event) {
   //get the direction of the arrow
if (sprite.customParams.direction > 0) {
newAnimal = this.animals.next();
endX 640 + this.currentAnimal.width/2;
} else {
new = this.animals.previous();
endX = - this.currentAnimal.width/2;
}
   //get the next animal

   //move current animal to final destination

   //set the next animal as the new animal in view
},

animateAnimal: function(sprite, event) {
  console.log('animate animal');
},

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

    game.state.add('GameState', GameState);
    game.state.start('GameState');
