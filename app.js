import Phaser from 'phaser'

const config = {
  width: 800,
  height: 600,
  backgroundColor: 0xffffff,
  scene: {
    preload,
    create,
    update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
}

const game = new Phaser.Game(config);

function preload() {
  this.load.image('ground', 'assets/img/ground.png');
  this.load.image('island', 'assets/img/island.png');
  this.load.image('star', 'assets/img/star.png');
  this.load.spritesheet('player', 'assets/img/player.png', {
    frameWidth: 100,
    frameHeight: 100
  })
}

function create() {

  let platforms = this.physics.add.staticGroup();
  platforms.create(400, 588, "ground");
  

  let stars = this.physics.add.staticGroup();
  stars.create(22, 100, "star");
  stars.create(122, 200, "star");
  stars.create(222, 50, "star");
  stars.create(322, 250, "star");
  stars.create(422, 100, "star");
  stars.create(522, 60, "star");
  stars.create(622, 260, "star");
  stars.create(722, 50, "star");

  
  player = this.physics.add.sprite(380, 500, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'still',
    frames: [{ key: 'player', frame: 4 }],
    frameRate: 20
  })
  
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })
  
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  })

  let score = 0
  let scoreText = this.add.text(16, 16, "Stars: 0", {
    fontSize: "32px",
    fill: "#000",
  })

  this.physics.add.overlap(
    player,
    stars,
    (player, star) => {
      star.disableBody(true, true)
      score += 1
      scoreText.setText("Stars: " + score)
    },
    null,
    this
  )
}
function update() { 
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else if (cursors.up.isDown){
    player.setAccelerationY(-360);
  } else{
    player.setAccelerationY(160);
  }
  
}


let player;

let cursors;