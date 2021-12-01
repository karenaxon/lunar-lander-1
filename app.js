import Phaser from 'phaser'

const config = {
  width: 1000,
  height: 800,
  backgroundColor: 0x333333,
  scene: {
    preload,
    create,
    update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 },
      debug: false
    }
  }
}

const game = new Phaser.Game(config);

function preload() {
  this.load.image('ground', 'assets/img/ground.png');
  this.load.spritesheet('player', 'assets/img/ship.png', 'assets/json/spritesPositions.json')
}
// this.player.scale.setTo(-2, -1);

function create() {

  let platforms = this.physics.add.staticGroup();
  platforms.create(400, 588, "ground");

  // this.player = this.game.add.sprite(0, 0, 'ship');
  // this.player.anchor.setTo(0.5, 0.5);
  // this.player.angle = -90; // Point the ship up
  
  player = this.physics.add.sprite(0, 0, "player");
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
  
  // this.anims.create({
  //   key: 'left',
  //   frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
  //   frameRate: 10,
  //   repeat: -1
  // })
  
  // this.anims.create({
  //   key: 'right',
  //   frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
  //   frameRate: 10,
  //   repeat: -1
  // })

  let score = 0
  let scoreText = this.add.text(16, 16, "Stars: 0", {
    fontSize: "32px",
    fill: "#ffffff",
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
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else if (cursors.up.isDown){
    player.setAccelerationY(-160);
  } else{
    player.setAccelerationY(160);
  }

}

let player;

let cursors;