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
const Paddle1Color = "white";
const Paddle2Color = "white";
const ballColor = "white";
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

