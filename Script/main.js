const canvas =  document.getElementById("game");
const ctx = canvas.getContext("2d");



class snakePart{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
}


let score=0;
var highscore = sessionStorage.getItem("highscore");
document.getElementById("highscore").innerHTML=highscore;



let speed=7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts=[];
let tailLength = 2;


let appleX=5;
let appleY=5;



let xVelocity=0;
let yVelocity=0;



function drawGame(){
  changePosition();
  let result = isGameOver();
  if(result){
    return;
  }
  clearScreen();
  checkCollision();
  drawApple();
  drawSnake();
  setTimeout(drawGame, 1000/ speed);
}
function isGameOver(){
  var gameOver=false;
  if(yVelocity === 0 && xVelocity === 0){
    return false;
  }
  if(headX<0 || headY<0){
    gameOver=true;
  }
  else if(headY === tileCount || headX === tileCount){
    gameOver=true;
  }
  for(i=0;i<snakeParts.length;i++){
    Part=snakeParts[i];
    if(Part.x === headX && Part.y === headY){
      gameOver=true;
      break;
    }
  }
  if(gameOver){
    location.replace("https://omnivers.github.io/Snake/replay.html");
    // location.replace("./replay.html");
  }


  return gameOver;

}
function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function changePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawSnake(){
  
  ctx.fillStyle = 'green'
  for(i=0;i<snakeParts.length;i++){
    let Part=snakeParts[i];
    ctx.fillRect(Part.x*tileCount ,Part.y*tileCount, tileSize,tileSize);
  }


  ctx.fillStyle = 'orange';
  ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);


  snakeParts.push(new snakePart(headX, headY))
  while(snakeParts.length>tailLength){
    snakeParts.shift();
  }

}

function drawApple(){
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function checkCollision(){
  if(appleX == headX && appleY == headY){
    appleX = Math.floor(Math.random()*tileCount);
    appleY = Math.floor(Math.random()*tileCount);
    tailLength++;
    score=score+100;
    speed=speed+0.5;
    document.getElementById("Score").innerHTML=score;
    if(highscore !== null){
      if (score > highscore) {
          sessionStorage.setItem("highscore", score);      
      }
    }
    else{
        sessionStorage.setItem("highscore", score);
    }
    }
}

function keyDown(event){
    // if(event.keyCode == 80){
    //   xVelocity = 0;
    //   yVelocity = 0;
    // } pour rajouté la pause 
    if(event.keyCode == 38){
        if(yVelocity == 1){
          return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }
    
    if(event.keyCode == 40){
      if(yVelocity == -1){
        return;
      }
      yVelocity = 1;
      xVelocity = 0;
  }

    if(event.keyCode == 37){
      if(xVelocity == 1){
        return;
      }
      xVelocity = -1;
      yVelocity = 0;
    }
    if(event.keyCode == 39){
      if(xVelocity == -1){
        return;
      }
      xVelocity = 1;
      yVelocity = 0;
    }

}
document.body.addEventListener("keydown",keyDown);
function newGame(){
  document.getElementById('canvas').style.display='none';
  document.body.classList.remove("replay");
  drawGame();
  document.body.style.backgroundColor='#5d0081'
  document.body.style.color="white"
}
document.getElementById("play").addEventListener("click", newGame);

  
