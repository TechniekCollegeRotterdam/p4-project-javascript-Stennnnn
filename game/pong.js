// selecteer de canvas element.
const canvas = document.getElementById("pong");
// haal de context op "2d" zodat we 2d objecten kunnen tekenen op het canvas.
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

  // pak de muis positie voor muis-gameplay
  canvas.addEventListener("mousemove", getMousePos);
  function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
  }

  // Als er gescoord wordt dan resetten we de bal.
  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
  }

  // Het midden raster tekenen
  function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
      drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
  }

  // Tekst op het canvas verschijnen
  function drawText(text, x, y) {
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
  }

  //
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

  /* De update functie, De game werkt op een canvas en een canvas moet telkens opnieuw gedrawed worden. 
  In deze functie worden alle game-berekeningen gemaakt. */
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

    /* De computer speler. Snelheid van de bot staat op 0.1,
     want hij moet niet te moeilijk zijn.  */
    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    // Wanneer de bal de bovenkant of onderkant aantikt, Dan wordt de bal teruggekaatst in de tegenovergestelde richting.
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.velocityY = -ball.velocityY;
      wall.play();
    }

    // Of het balletje de computer aantikt of de paddle van de speler.
    let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

    // Als de ball de paddle aantikt.
    if (collision(ball, player)) {
      // play sound
      hit.play();
      // Waar raakt het balletje de paddle?
      let collidePoint = ball.y - (player.y + player.height / 2);
      // de collidepoint normaliseren
      collidePoint = collidePoint / (player.height / 2);

      // hieronder wordt gekeken waar het balletje objecten raakt en dan wordt vervolgens het balletje terug weerkaatst in de tegenovergestelde richting.
      let angleRad = (Math.PI / 4) * collidePoint;

      // verander de X en Y van het balletje
      let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);

      // Elke keer als we het balletje aantikken. maken we het balletje sneller
      ball.speed += 0.1;
    }
  }

  // De functie die al het tekenen op het canvas doet. 
  function render() {
    // Het canvas leegmaken voor de volgende render.
    drawRect(0, 0, canvas.width, canvas.height, "#000");

    // draw the user score to the left
    drawText(user.score, canvas.width / 4, canvas.height / 5);

    // draw the COM score to the right
    drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);

    // voer de functie drawNet uit, die een net laat verschijnen in het midden van het canvas.
    drawNet();

    // de paddle van de speler neerzetten. met de hoogte, breedte, en kleur.
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
  // fps
  let framePerSecond = 120;

  // Elke seconde de game functie 50 keer oproepen.
  let loop = setInterval(game, 1000 / framePerSecond);
};
canvas.addEventListener("click", startGame);
