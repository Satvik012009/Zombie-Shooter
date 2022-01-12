var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullets, bulletsImg, bullets_shooting;
var obstacle, obstacleImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var lose, winning, explosionSound, gunSound;
var life;

var score = 0;
var life = 3;
var bullets = 70;

var gameState = "fight";

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  obstacleImg = loadImage("assets/zombie.png")

  bulletImg = loadImage("assets/bullet.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
  gunSound = loadSound("assets/Gunsound.mp3")


}

function setup() {
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage(heart1Img)
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage(heart2Img)
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale = 0.4;

  

  //creating the player sprite
  player = createSprite(displayWidth-1310, displayHeight-250, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = false
  player.setCollider("rectangle",0,0,300,300)

  obstaclesGroup = createGroup();
  bulletsGroup = new Group()
}

function draw() {
  background(0); 

if (gameState === "fight") {
  
  //display the appropriate image according to the lives remaining

  if(life === 3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }
  if(life === 2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }

  if(life === 1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }
  //go to gameState "lost" when 0 lives are remaining
  if(life === 0){
    gameState="lost"
  }

  if(score === 100){
    gameState="won"
  }

  //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   player.y = player.y+30
  }

  if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1150,player.y,20,10)
    bullet.velocityX = 20
    bullet.addImage(bulletImg)
    bullet.scale = 0.1
    bullet.lifetime = 300
    bulletsGroup.add(bullet)
    
    player.depth = bullets.depth
    player.depth = player.depth+2

    player.addImage(shooter_shooting)
    bullets = bullets-1 
    explosionSound.play();
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  else if(keyWentDown("space")){
    player.addImage(shooter_shooting)
  }

  if(bullets = 0){
    gameState = "bullet"
    lose.play();
  }

  if(obstaclesGroup.isTouching(bulletsGroup)){
    for(var i=0;i<obstaclesGroup.length;i++){     
      if(obstaclesGroup[i].isTouching(bulletsGroup)){
        obstaclesGroup[i].destroy()
        bulletsGroup.destroyEach()

        score = score+2
        
      }
     } 
  }

  if(obstaclesGroup.isTouching(player)){
    lose.play();

    for(var i=0;i<obstaclesGroup.length;i++){     
      if(obstaclesGroup[i].isTouching(player)){
        obstaclesGroup[i].destroy()
        life=life-1
      }
     }
  }
  
  spawnObstacle();
  
}

  
  drawSprites();

    //displaying the score and remaining lives and bullets
  textSize(20)
  fill("white")
  text("Bullets = " + bullets,displayWidth-200,displayHeight/2-250)
  text("Score = " + score,displayWidth-200,displayHeight/2-220)
  text("Lives = " + life,displayWidth-200,displayHeight/2-280)

  //destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  obstaclesGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  obstaclesGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  obstaclesGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}
}

function spawnObstacle () { 
  //write code here to spawn the obstacle
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(windowWidth-100,windowHeight-100,10,10);
    obstacle.y = Math.round(random(windowHeight-300,windowHeight-50));
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.debug = false
    obstacle.setCollider("rectangle",0,0,450,1000)
    //assign lifetime to the variable
    obstacle.lifetime = windowWidth;
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}





