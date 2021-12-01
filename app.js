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
  this.load.image('mountain', 'assets/img/mountain.sprite.png');
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
  stars.create(22, 100, "star");
  stars.create(122, 200, "star");
  stars.create(222, 50, "star");
  stars.create(322, 250, "star");
  stars.create(422, 100, "star");
  stars.create(522, 60, "star");
  stars.create(622, 260, "star");
  stars.create(722, 50, "star");

  
  ship = this.physics.add.sprite(380, 500, "ship");
  ship.setCollideWorldBounds(true);
  this.physics.add.collider(ship, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(mountain, platforms);

  cursors = this.input.keyboard.createCursorKeys();

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
    if (cursors.up.isDown)
    {
        this.physics.velocityFromRotation(ship.rotation, 200, ship.body.acceleration);
    }
    else
    {
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