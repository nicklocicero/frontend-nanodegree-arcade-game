// Enemies our player must avoid.
var Enemy = function(bugLane) {
  // Set evil character's image.
  this.sprite = 'images/enemy-bug.png';
  // Initiate evil off screen.
  this.x = -101;
  // Give evil a lane.
  this.y = bugLane; // 51 // 134, 217
};

// Update the enemy's position.
// "dt" is a time delta between ticks.
Enemy.prototype.update = function(dt) {
  // Give evil a random speed.
  this.speed = [Math.floor((Math.random() * 3)) + 1];
  if (this.x < 505) {
    this.x += (dt * 275) * this.speed;
  } else {
    // Put evil back.
    this.x = -101;
  }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 300;
};

// Update the player's position.
Player.prototype.update = function(dt) {
  // Unused.
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

// Draw the player on the screen.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Bring evil into form.
var enemy1 = new Enemy(51);
var enemy2 = new Enemy(134);
var enemy3 = new Enemy(217);
// Combine evil.
var allEnemies = [enemy1, enemy2, enemy3];
// Bring player into form.
var player = new Player();

// Check if evil has brought hell to player, forsaking his life.
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    if ((-10 < enemy.x - player.x && enemy.x - player.x < 10) &&
        (-10 < enemy.y - player.y && enemy.y - player.y < 10)) {
      // Rise player, you are a phoenix, anew.
      player.x = 200;
      player.y = 300;
    }
  });
}



// Listen for key presses and sends the keys to the player.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
