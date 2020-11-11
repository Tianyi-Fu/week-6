var ballSize = 35;
var ballX;
var ballY;
var ballColor;
var ballSpeedVert = 0;
var gravity = 0.4;
var ballSpeedHorizon = 5;
var airfriction = 0.005;
var friction = 0.003;
var surface;
var racketColor;
var racketWidth;
var racketHeight;
var haddle;
var score = 0;
var gameScreen = 1;

function setup() {

  createCanvas(700, 700);
  ballColor = color(250, 180, 80);
  racketColor = color(0, 0, 0);
  ballX = width / 4;
  ballY = height / 5;
  smooth();
  racketWidth = 200;
  racketHeight = 15;
  haddle = 50;
  frameRate(60);

}

function draw() {

  if (gameScreen == 1) {
    gameplayScreen();
  } else if (gameScreen == 2) {
    gameOverScreen();
  }
}

function gameplayScreen() {

  background(220, 220, 220);
  drawBall();
  drawRacket();
  watchRacketBounce();
  applyGravity();
  applyHorizontalSpeed();
  keepInScreen();
  printScore();

}


function gameOverScreen() {
  background(0, 0, 0);
  textAlign(CENTER);


  fill(255, 255, 255);
  textSize(40);
  text("Score", width / 2, height / 7);
  textSize(60);
  text(score, width / 2, height / 4);


  fill(220, 220, 220);
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height / 2, 200, 150, 170);
  fill(255, 255, 255);
  textSize(35);
  text("Again", width / 2, height / 2);

}


function mousePressed() {

  if (gameScreen == 1) {
    startGame();
  }
  if (gameScreen == 2) {
    restart();
  }
}

function startGame() {
  gameScreen = 1;
}

function gameOver() {
  gameScreen = 2;
}

function restart() {
  ballSpeedHorizon = 10;
  ballSpeedVert = 0;
  score = 0;
  ballX = width / 4;
  ballY = height / 5;
  racketWidth = 200;
  gameScreen = 1;
  lastAddTime = 0;
  boards = [];
}

function drawBall() {
  fill(ballColor);
  ellipse(ballX, ballY, ballSize, ballSize);

}

function drawRacket() {
  fill(racketColor);
  rectMode(CENTER);
  if (score > 15) {
    racketWidth = 80;
  } else if (score > 25) {
    racketWidth = 50;
  } else {
    racketWidth = racketWidth;
  }
  rect(mouseX, mouseY - haddle, racketWidth, racketHeight, 5);
}



function keepInScreen() {
  if (ballY + (ballSize / 2) > height) {
    gameOver();
  }

  if (ballY - (ballSize / 2) < 0) {
    makeBounceTop(0);
  }

  if (ballX - (ballSize / 2) < 0) {
    makeBounceLeft(0);
  }

  if (ballX + (ballSize / 2) > width) {
    makeBounceRight(width);
  }
}

function applyGravity() {
  ballSpeedVert += gravity;
  ballSpeedVert -= (ballSpeedVert * airfriction);
  ballY += ballSpeedVert;
}

function applyHorizontalSpeed() {
  ballSpeedHorizon -= (ballSpeedHorizon * airfriction);
  ballX += ballSpeedHorizon;
}

function makeBounceBottom(surface) {
  ballY = surface - (ballSize / 2);
  ballSpeedVert *= -1;
  ballSpeedVert -= (ballSpeedVert * friction);
}

function makeBounceTop(surface) {
  ballY = surface + (ballSize / 2);
  ballSpeedVert *= -1;
  ballSpeedVert -= (ballSpeedVert * friction);
}

function makeBounceLeft(surface) {
  ballX = surface + (ballSize / 2);
  ballSpeedHorizon *= -1;
  ballSpeedHorizon -= (ballSpeedHorizon * friction);
}

function makeBounceRight(surface) {
  ballX = surface - (ballSize / 2);
  ballSpeedHorizon *= -1;
  ballSpeedHorizon -= (ballSpeedHorizon * friction);
}

function watchRacketBounce() {
  var overhead = mouseY - pmouseY;

  if ((ballX + (ballSize / 2) > mouseX - (racketWidth / 2)) && (ballX - (ballSize / 2) < mouseX + (racketWidth / 2))) {

    if (dist(ballX, ballY, ballX, mouseY - haddle) <= (ballSize / 2) + abs(overhead) + (racketHeight / 2)) {
      makeBounceBottom(mouseY - haddle - (racketHeight / 2));

      ballSpeedHorizon = ballSpeedHorizon + (ballX - mouseX) / 10;
      addScore();
      if (overhead < 0) {
        ballY += overhead;
        ballSpeedVert += overhead / 2;
      }
    }
  }
}



function addScore() {
  score++;
}

function printScore() {
  textAlign(CENTER);
  fill(0);
  textSize(30);
  text(score, width / 2, height / 20);
}
