// Enemies our player must avoid
var Enemy = function(bugLane) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -101;
  this.y = bugLane; // 51 // 134, 217
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // Give bug a random speed.
  this.speed = [Math.floor((Math.random() * 3)) + 1];
  if (this.x < 505) {
    this.x += (dt * 275) * this.speed;
  } else {
    // put bug back
    this.x = -101;
    // give the bug a random lane
    // this.y = [51, 134, 217][Math.floor((Math.random()+1)*3)]
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 300;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

Player.prototype.handleInput = function(input) {
  if (input === 'left') {
    if (this.x > 50) {
      this.x -= 100;
    }
  } else if (input === 'right') {
    if (this.x < 400) {
      this.x += 100;
    }
  } else if (input === 'down') {
    if (this.y < 383) {
      this.y += 83;
    }
  } else if (input === 'up') {
    if (this.y < 52) {
      this.x = 200;
      this.y = 300;
    } else {
      this.y -= 83;
    }
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(51);
var enemy2 = new Enemy(134);
var enemy3 = new Enemy(217);
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player
var player = new Player();

function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if ((-10 < enemy.x - player.x && enemy.x - player.x < 10)
           && (-10 < enemy.y - player.y && enemy.y - player.y < 10)) {
      player.x = 200;
      player.y = 300;
    }
  });
};



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
