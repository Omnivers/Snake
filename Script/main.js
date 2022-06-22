const canvas =  document.getElementById("game");
const ctx = canvas.getContext("2d");



class snakePart{
    constructor(x, y){
      this.x = x;
      this.y = y;
    }
}


let score=0;

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
  // let result = isGameOver();
  // if(result){
  //   return;
  // }
  clearScreen();
  checkCollision();
  drawApple();
  drawSnake();
  setTimeout(drawGame, 1000/ speed);
}
// function isGameOver(){
//   var gameOver=false;
//   if(headX<0){
//     gameOver=true;
//   }
//   return gameOver;
// }
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
    document.getElementById("Score").innerHTML=score;
  }
}

function keyDown(event){
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



drawGame();
