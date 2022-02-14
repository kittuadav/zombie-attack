var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;


var roadImg,road;
var boy,boy_running;
var bodyGroup,body1,body2,body3,body4;
var restartImg,gameoverImg;

function preload(){
roadImg = loadImage("road.png");

boy_running = loadAnimation("boy2.png","boy3.png","boy4.png");

body1 = loadImage("body1.png");
body2 = loadImage("body2.png");
body3 = loadImage("body3.png");
body4 = loadImage("body4.png");

restartImg = loadImage("restart.png");
gameoverImg = loadImage("gameover.png");

}

function setup() {
    createCanvas(800,300);

    fill("yellow");
    road = createSprite(300,160);
    road.addImage("road",roadImg);
    road.velocityX=-5;

    boy = createSprite(100,250);
    boy.addAnimation("running",boy_running);
    boy.scale=0.4;

    gameover = createSprite(400,100);
    gameover.addImage("gameover",gameoverImg);
    gameover .scale = 1.5;

    

    restart = createSprite(400,270);
    restart.addImage("restart",restartImg);
    restart.scale = 0.1

    invisibleGround = createSprite(400,290,800,10);
    invisibleGround.visible = false;

    bodysGroup = createGroup();
    
    boy.setCollider("rectangle",0,0,boy.width,boy.height);
    boy.debug = false

   
   
    score = 0;
}
function draw() {
    background(51);
 
    text("score:"+ score,700,10);
      

    if(gameState === PLAY){

        gameover.visible = false;
        restart.visible = false;

        boy.changeAnimation("running",boy_running);
        road.velocityX = -(4 + 3* score/200)

        score = score + Math.round(getFrameRate()/60);

        if(road.x<260){
            road.x = 710;
        }
        
        if(keyDown("space")&& boy.y >= 170) {
           
            boy.velocityY = -12;
            
            
        }
        boy.velocityY = boy.velocityY + 0.8
        
        spawnbodys();

        
    }
    
 
    if(bodysGroup.isTouching(boy)){
        gameState = END;
    }
    
      if(gameState === END){
        gameover.visible = true;
        restart.visible = true;

        if(mousePressedOver(restart)){
            reset();
        }

        road.velocityX = 0;
        boy.velociyY = 0;
       bodysGroup.destroyEach();

        bodysGroup.setLifetimeEach(-1);
        bodysGroup.setVelocityXEach(0); 
    }
      
    
    

    boy.collide(invisibleGround);
   
    drawSprites();
}
 
function reset(){
    gameState = PLAY
    score=0
    bodysGroup.destroyEach();
    boy.changeAnimation("running",boy_running);
}



function spawnbodys(){
    if(frameCount % 70 === 0){
        var body = createSprite(600,240,20,50);
        body.velocityX = -(6 + score/200);

        var rand = Math.round(random(1,4));
        switch(rand){
            case 1: body.addImage(body1);
                    break;
            case 2: body.addImage(body2);
                    break;
            case 3: body.addImage(body3);
                    break;
            case 4: body.addImage(body4);
                    break;
            default: break;
            
        }

        body.scale = 0.2;
        body.lifetime = 400;
        
        bodysGroup.add(body);

        body.setCollider("rectangle",0,0,200,200);
        body.debug = false


    }
}





































