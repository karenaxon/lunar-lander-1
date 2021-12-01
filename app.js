import Phaser from 'phaser'

const config = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: {
    preload,
    create,
    update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 80 },
      debug: false
    }
  }
}

const game = new Phaser.Game(config);

function preload() {
  this.load.image('mountain', 'assets/img/mountain.png');
  this.load.image('star', 'assets/img/star.png');
  this.load.spritesheet('ship', 'assets/img/ship.png', {
    frameWidth: 32,
    frameHeight: 32
  })
}

function create() {

  let platforms = this.physics.add.staticGroup();
  let mountain = platforms.create(400, 500, "mountain");
  
  let stars = this.physics.add.staticGroup();
  for (let i = 0; i < 8; i++) {
    stars.create(Math.floor(Math.random() * 700 + 50), Math.floor(Math.random() * 250 + 50), "star");
  }

  ship = this.physics.add.sprite(380, 500, "ship");
  ship.setCollideWorldBounds(true);
  this.physics.add.collider(ship, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(mountain, platforms);

  cursors = this.input.keyboard.createCursorKeys();
  
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 1 }),
    frameRate: 30,
    repeat: -1
  })

  this.anims.create({
    key: 'still',
    frames: [{ key: 'ship', frame: 1 }],
    frameRate: 20
  })

  let score = 0
  let scoreText = this.add.text(16, 16, "Stars: 0", {
    fontSize: "32px",
    fill: "#ffffff",
  })

  this.physics.add.overlap(
    ship,
    stars,
    (ship, star) => {
      star.disableBody(true, true)
      score += 1
      scoreText.setText("Stars: " + score)
    },
    null,
    this
  )
}

function update ()
{
  if (cursors.up.isDown && fuel > 0)
  {
    ship.anims.play('up', true);
    this.physics.velocityFromRotation(ship.rotation, 200, ship.body.acceleration);
    fuel--;
  }
  else
  {
    ship.anims.play('still');
    ship.setAcceleration(0);
  }

  if (cursors.left.isDown)
  {
    ship.setAngularVelocity(-300);
  }
  else if (cursors.right.isDown)
  {
    ship.setAngularVelocity(300);
  }
  else
  {
    ship.setAngularVelocity(0);
  }
}

let ship;

let cursors;

let fuel = 2000;