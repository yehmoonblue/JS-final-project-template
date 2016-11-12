var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;
var enemies = [];
var clock = 0;

var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var slime = document.createElement("img");
slime.src = "images/slime.gif";
var rukia = document.createElement("img");
rukia.src = "images/rukia.gif";
var tower1 = document.createElement("img");
tower1.src = "images/tower-btn.png";
var tower2 = document.createElement("img");
tower2.src = "images/tower.png";

var enemyPath = [
  {x:96,y:60},
  {x:382,y:60},
  {x:382,y:190},
  {x:224,y:190},
  {x:224,y:314},
  {x:542,y:314},
  {x:542,y:92}
  ];



function Enemy(){
  this.x = 96;
  this.y = 480-32;
  this.speedx=0;
  this.speedy=-64
  this.pathDes = 0;
  this.speed = 64; 
  this.move = function(){
    if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y,this.x,this.y, this.speed/FPS, this.speed/FPS)){
      this.x = enemyPath[this.pathDes].x,
      this.y = enemyPath[this.pathDes].y,
      this.pathDes++;
      console.log("qq")
    
      if(this.x>enemyPath[this.pathDes].x){
         this.speedx=-64;
         this.speedy=0;
         }
        else if(this.x<enemyPath[this.pathDes].x){
         this.speedx=64;
         this.speedy=0;
         }
         else if(this.y>enemyPath[this.pathDes].y){
         this.speedx=0;
         this.speedy=-64;
         }
        else {
      this.speedx=0;
      this.speedy=64;
        }
    }else{
    this.x=this.x+this.speedx/FPS;
    this.y=this.y+this.speedy/FPS;
      }
  }
};
var enemy = new Enemy();


var towerbutton={
  x: 580,
  y: 420,
  width: 60,
  height: 60
};


function draw(){
  for(var i=0;i<enemies.length;i++){
    enemies[i].move();
    ctx.drawImage(enemyImg,enemies[i].x,enemies[i].y);
  }
    if (clock%80==0){
    var newEnemy = new Enemy();
    enemies.push(newEnemy);
  }
  enemy.move();
  ctx.drawImage(bglmg,0,0);
  ctx.drawImage(slime,0,0);
  ctx.drawImage(rukia,enemy.x,enemy.y);
  ctx.drawImage(tower1,towerbutton.x,towerbutton.y,towerbutton.width,towerbutton.height);
  if(isBuilding){
    ctx.drawImage(tower2,cursor.x,cursor.y);
  }
  ctx.drawImage(tower2,tower.x,tower.y);
  clock++;
};

var isBuilding = false;
var tower={};
var cursor = {};
$( "#game-canvas" ).on( "click", function(){
  if(isCollided(cursor.x, cursor.y, 590, 432, 50, 50)){
    if(isBuilding){
    isBuilding= false;
  }
    else{
    isBuilding = true;
  }
  }
  else if(isBuilding){
  tower.x=cursor.x-cursor.x %32;
  tower.y=cursor.y-cursor.y %32;
  isBuilding=false;
  }
  
 
});


$("#game-canvas").on("mousemove",function( event ){
cursor = {
x:event.offsetX,
y:event.offsetY
};
});

function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}


setInterval(draw, 1000/FPS);
