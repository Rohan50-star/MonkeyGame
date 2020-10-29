var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score, survivalTime

function preload()
{
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() 
{
  createCanvas(400,400);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
  
  score=0;
  survivalTime=0;
}

function draw() 
{
  background(250);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:" + score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:" + survivalTime, 100,50);

  if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
  
  
  if(keyDown("space") && monkey.y>=200)
    {
      monkey.velocityY=-12;  
    }
  
  monkey.velocityY=monkey.velocityY + 0.8; 
  
  monkey.collide(ground);
  
  spawnBanana();
  
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(monkey))
    {
      monkey.velocityY = 0;
      ground.velocityX = 0;
      
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    }
  
  drawSprites();
}

function spawnObstacles()
{
  if(frameCount%300===0)
  {
    obstacle=createSprite(600,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX = -3;
    
    obstacle.lifetime=200;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanana()
{
  if(frameCount%80===0)
    {
      banana=createSprite(600,120,40,10);
      banana.y=Math.round(random(120,200));
      banana.addImage(bananaImage);
      banana.scale=0.1;
      banana.velocityX = -3;
      
      banana.lifetime=200;
      
      FoodGroup.add(banana);
    }
}