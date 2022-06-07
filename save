// haal de informatie uit html op en sla deze op in variabelen.
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const score = document.querySelector("#score");
const resetButton = document.querySelector("#resetBtn");
// de hoogte en de breedte van het Spel.
const gameWidth = gameBoard.gameWidth;
const gameHeight = gameBoard.gameHeight;
// kleuren van de game canvas en paddles.
const gameBoardBackGroundColor = "black";
const paddle1Color = "white";
const paddle2Color = "white";
const paddleBorder = "black";
const ballColor = "white";
const ballBorderColor = "black";
const ballRadius = 12.5;
// de snelheid van de game de snelheid van de ball is belangrijk zodat ik de game kan versnellen na elk punt.
let intervalId;
const paddleSpeed = 50;
let ballSpeed = 1;
// de dimensies van het spel in de Canvas.
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
// bij het begin van het spel is de score van zowel speler 1 als speler 2 natuurlijk 0, Dit is let want de score veranderd natuurlijk tijdens het spel.
let player1Score = 0;
let player2Score = 0;

let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// roep de functies op want functies werken pas wanneer je ze oproept.
gameStart();
drawPaddles();

// een functie om de te starten
const gameStart = function(){


};

const nextTick = function(){

};

const clearBoard = function(){

};
// de game is in canvas gemaakt dus de game moet ge-drawed worden telkens.
const drawPaddles = function(){
    ctx.strokeStyle = paddleBorder;
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
};

// teken de bal op het scherm
const drawBall = function(){

};
// beweeg de bal op het scherm functie
const moveBall = function(){

};
// create de bal.
const createBall = function(){

};
// zorgt ervoor dat de bal niet bijvoorbeeld door de paddles heen gaat.
const checkCollision = function(){

};

const changeDirection = function(){

};
// houdt de score bij.
const updateScore = function(){

};
// reset de game wanneer de game op de knop drukt.
const resetFunction = function(){

};
