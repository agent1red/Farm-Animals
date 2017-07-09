//this game will have only 1 state

var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('arrow', 'assets/images/arrow.png');


    // sprite sheet preload code - last part specifies the width, height, and specific frame to start with
    this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
    this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
    this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
    this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);

    // preload audio

    this.load.audio('chickenSound', ['assets/audio/chicken.oog', 'assets/audio/chicken.mp3']);
    this.load.audio('horseSound', ['assets/audio/horse.oog', 'assets/audio/horse.mp3']);
    this.load.audio('pigSound', ['assets/audio/pig.mp3', 'assets/audio/pig.mp3']);
    this.load.audio('sheepSound', ['assets/audio/sheep.oog', 'assets/audio/sheep.mp3']);



  },
  //executed after everything is loaded
  create: function() {

    //define the scale mode for the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //create sprites and position them
    this.background = this.game.add.sprite(0, 0, 'background');
    //animate sprites
    // group of animals in an array along with array text
    var animalData = [{
        key: 'chicken',
        text: 'hhhhh',
        audio: 'chickenSound'
      },
      {
        key: 'horse',
        text: 'HORSE',
        audio: 'horseSound'
      },
      {
        key: 'pig',
        text: 'PIG',
        audio: 'pigSound'
      },
      {
        key: 'sheep',
        text: 'SHEEP',
        audio: 'sheepSound'
      }
    ];
    this.animals = this.game.add.group();
    var self = this
    var animal;
    //for each function loop that will loop through the animal elements.
    animalData.forEach(function(element) {
      // set variblae animal to -1000 to make sure elements of array that are not the current animal view are off the map
      animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
      animal.customParams = {
        text: element.key,
        sound: self.game.add.audio(element.audio)
      };
      animal.anchor.setTo(0.5);

      // creating animation of spritesheet here

      // call animations.add - call the animation a name (key value), then tell it to play what frames in what sequence, then at how many seconds, then enable or disable looping in this case looping false
      animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);



      animal.inputEnabled = true;
      animal.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);

    });
    // first animal goes to center of map
    this.currentAnimal = this.animals.next();
    // set position of animal from the array element
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
    // show text decribing animal

    this.showText(this.currentAnimal);


    // left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    //left arrow custom paramater giving direction to the left -1
    this.leftArrow.customParams = {
      direction: -1
    };

    //left arrow user input enable
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);


    // right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    //right arrow custom paramater giving direction to the right +1
    this.rightArrow.customParams = {
      direction: 1
    };
    //right arrow user input enable
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);



  },

  //this is executed multiple times per second
  update: function() {


  },
  switchAnimal: function(sprite, event) {


    //method for disabling arrows during switch movement

    if (this.isMoving) {
      return false;
    }

    this.isMoving = true;

    // hide animal text
    this.animalText.visible = false;

    var newAnimal, endX;
    //get the direction of the arrow
    if (sprite.customParams.direction > 0) {
      // these are the initial position of the element animal
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width / 2;
      endX = 640 + this.currentAnimal.width / 2;
    } else {
      //these are the initial position of the element animal
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width / 2;
      endX = -this.currentAnimal.width / 2;
    }
    //Tween animation - smooth motion of sprites this part defines how the new animal will move from off map

    var newAnimalMovement = this.game.add.tween(newAnimal);

    //the newAnimalMovement will be sent "to" position x which is centered to world "or game board" center and 1000 miliseconds or 1 second speed
    newAnimalMovement.to({
      x: this.game.world.centerX
    }, 1000);
    //calling method to pass if moving stops "false" then another animall can move
    newAnimalMovement.onComplete.add(function() {
      this.isMoving = false;
      this.showText(newAnimal);
    }, this);
    //Tween initiated and now needs to start
    newAnimalMovement.start();


    // Tween animation - smooth animation for current animal to move off map

    var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({
      x: endX
    }, 1000);
    currentAnimalMovement.start();

    this.currentAnimal = newAnimal;
  },


  animateAnimal: function(sprite, event) {
    //then use sprite.play and the name of the animation method on line 52
    sprite.play('animate');
    // play the sound
    sprite.customParams.sound.play();
  },
  //show text from animal array of elements with style
  showText: function(animal) {
    if (!this.animalText) {
      var style = {
        font: 'bold 50pt Arial',
        fill: '#D0171B',
        align: 'center'
      }
      this.animalText = this.game.add.text(this.game.width / 2, this.game.height * 0.85, '', style);
      this.animalText.anchor.setTo(0.5);
    }
    this.animalText.setText(animal.customParams.text);
    this.animalText.visible = true;
  }


};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
