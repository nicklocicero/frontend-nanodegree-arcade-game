/*

   Welcome to the app.js file.  Where all the magic happens.
   Today we are using some psuedoclassical classes, and
   not just because it's a fun thing to say over and over, but
   because our hero, originally named player, wants to exists
   inside of a computer and hide from evil bugs.  Psuedoclassical
   classes will bring him to life!

   We are doing this by creating two classes, Enemy and Player.

   Let's get started!  You'll be alive soon, player!

   First, our hero needs an enemy.  Evil has to exist in the world
   to give our hero purpose.  Let's make some evil first, so the world
   suffers in a world without him.

*/

var Enemy = function(bugLane) {
  "use strict";
  // Set evil character's image.
  this.sprite = 'images/enemy-bug.png';
  // Initiate evil randomly, somwhere in the world.
  this.x = Math.random() * 505;
  // Give evil a lane to run over.
  this.y = bugLane;
};

/*  The enemy will need to be updated, so we can use the changes in time
    to move it, multiplying time by speed, and setting the location
    allong the x axis.  This lets evil run across the screen.
*/

Enemy.prototype.update = function(dt) {
  // Give evil a random speed.
  "use strict";
  if (this.x < 505) {
    // Update evil a little further to the right each iteration as long
    // as it is still on screen.
    this.x += (dt) * this.speed;
  } else {
    // Put evil back.
    this.x = -101;
    this.speed = Math.random() * (900 - 100) + 100;
  }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Set up a player class.  This will be what fights the evil.
*/

var Player = function() {
  "use strict";
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 300;
};


//  Update the player's position.  This isn't used, but it gets called by
//  the engine.
Player.prototype.update = function(dt) {};

/* Our hero will allow players to live vicariuosly in the fictitious world.
   This part will let players control the hero, so they feel important.

   The code is written to prevent the human player from moving the hero off
   screen.  When the hero gets to water, a new hero that looks exactly like
   the old one will appear.  This hero must make it to water.  Groundhogs
   day for the human player!  Mwuahahaha!!
*/
Player.prototype.handleInput = function(input) {
  "use strict";
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

// Finally, draw the payer on the screen.
Player.prototype.render = function() {
  "use strict";
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/* Now that the classes have been created, we can creates some instances
   of these classes.  The psuedoclassical class structure helps make this
   simple.

   We create three enemies, one for each lane.  The enemies are combined into one
   array.

   Then we create a player, who is initiated below the lanes.

   Let the games begin!
*/


var enemy1 = new Enemy(51);
var enemy2 = new Enemy(134);
var enemy3 = new Enemy(217);
// Combine evil.
var allEnemies = [enemy1, enemy2, enemy3];
// Bring player into form.
var player = new Player();

/*  And finally, the moment we've all be waiting for. What happens when the hero
    meets evil??

    There is a 50% chance he will dodge the evil.  Why not?  Hero's have to have
    some success!

    There is a 50% chance he dies and a new hero appears.  Yeah, it's not the
    same hero.
*/

function checkCollisions() {
  "use strict";
  allEnemies.forEach(function(enemy) {
    if ((-10 < enemy.x - player.x && enemy.x - player.x < 10) &&
        (-10 < enemy.y - player.y && enemy.y - player.y < 10)) {


      if (Math.random() * (10) > 5) {
        // Player dodges!
        player.y -= 81;
      } else {
        // Player dies!
        player.x = 200;
        player.y = 300;
      }
    }
  });
}



// Listen for key presses and sends the keys to the player.
document.addEventListener('keyup', function(e) {
  "use strict";
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
