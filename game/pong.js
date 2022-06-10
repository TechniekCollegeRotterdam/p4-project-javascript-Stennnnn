// selecteer de canvas element.
const canvas = document.getElementById("pong");
// haal de context op "2d" zodat we 2d objecten kunnen tekeken op het canvas.
const ctx = canvas.getContext("2d");
// de start knop ophalen.
let body = (document.querySelector("body").style.backgroundColor = "lightblue");

/* start scherm tekst laten drawen op het canvas.
verder staan er font-sizes en margins in */
ctx.font = "30px Arial";
ctx.color = "red";
ctx.fillText("Click on the canvas to play Pong!", 80, 200);

const startGame = function () {
  /* hieronder wordt ervoor gezorgd dat je niet nog een keer left-click kunt doen op de canvas, 
    dit zorgde voor een bug dat je meerdere games in dezelfde canvas kunt aanzetten.*/
  canvas.removeEventListener("click", startGame);
  // koppel de audio aan variabelen
  let hit = new Audio();
  let wall = new Audio();
  let userScore = new Audio();
  let comScore = new Audio();

  // geluids effecten als de functie wordt aangeroepen dus bijvoorbeeld als je het balletje raakt.
  hit.src = "sounds/bounce.mp3";
  wall.src = "sounds/bounce.mp3";
  comScore.src = "sounds/missed.mp3";
  userScore.src = "sounds/win.mp3";

  // de ball zelf als hoe die op het canvas verschijnt.
  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: "AQUA",
  };

  // het streepje als gebruiker als hoe hij op het canvas verschijnt.
  const user = {
    x: 0, // zorgt ervoor dat hij links blijft staan in de canvas
    y: (canvas.height - 100) / 2, // -100 grootte van de speler
    width: 10,
    height: 100,
    score: 0,
    color: "AQUA",
  };

  // COM Paddle
  const com = {
    x: canvas.width - 10, // - de breedte van de speler
    y: (canvas.height - 100) / 2, // -100 de hoogte van de speler
    width: 10,
    height: 100,
    score: 0,
    color: "AQUA",
  };

  // hieronder zetten we de breedte en andere properties van het net in het midden.
  const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "AQUA",
  };

  // teken een rechthoek op het canvas. hiermee worden de spelers gemaakt op het canvas.
  function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  // teken het balletje op het canvas.
  function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  // 
  canvas.addEventListener("mousemove", getMousePos);

  function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
  }

  // when COM or USER scores, we reset the ball
  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  }

  // draw the net
  function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
      drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
  }

  // draw text
  function drawText(text, x, y) {
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
  }

  // collision detection
  function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return (
      p.left < b.right &&
      p.top < b.bottom &&
      p.right > b.left &&
      p.bottom > b.top
    );
  }

  // update function, the function that does all calculations
  function update() {
    // Hier wordt bepaald of de conmputer of de speler een punt krijgt.
    if (ball.x - ball.radius < 0) {
      com.score++;
      comScore.play();
      resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
      user.score++;
      userScore.play();
      resetBall();
    }

    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // computer plays for itself, and we must be able to beat it
    // simple AI
    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    // when the ball collides with bottom and top walls we inverse the y velocity.
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.velocityY = -ball.velocityY;
      wall.play();
    }

    // we check if the paddle hit the user or the com paddle
    let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

    // if the ball hits a paddle
    if (collision(ball, player)) {
      // play sound
      hit.play();
      // we check where the ball hits the paddle
      let collidePoint = ball.y - (player.y + player.height / 2);
      // normalize the value of collidePoint, we need to get numbers between -1 and 1.
      // -player.height/2 < collide Point < player.height/2
      collidePoint = collidePoint / (player.height / 2);

      // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
      // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
      // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
      // Math.PI/4 = 45degrees
      let angleRad = (Math.PI / 4) * collidePoint;

      // change the X and Y velocity direction
      let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);

      // speed up the ball everytime a paddle hits it.
      ball.speed += 0.1;
    }
  }

  // render function, the function that does al the drawing
  function render() {
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");

    // draw the user score to the left
    drawText(user.score, canvas.width / 4, canvas.height / 5);

    // draw the COM score to the right
    drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);

    // voer de functie drawNet uit, die een net laat verschijnen in het midden van het canvas.
    drawNet();

    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);

    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
  }
  function game() {
    update();
    render();
  }
  // number of frames per second
  let framePerSecond = 50;

  //call the game function 50 times every 1 Sec
  let loop = setInterval(game, 1000 / framePerSecond);
};
canvas.addEventListener("click", startGame);

//Het ziet er goed uit stan, ga zo door!!!
