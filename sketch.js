var spacebg,spacebgimg;

var spaceship,spaceshipimg;

var spaceshotimg,spaceshot;

var asteroidimg,asteroid;

var asteroidGroup;

var life=3;

var score=0;
var spaceshotGroup;

var spaceshipGroup;

var gameState=0;

var startButton, startButtonimg;

var restart, restartimg,restart2;

var earth,earthimg;

var endSound, crashSound, asteroidShot, gameWon,restartSound,startSound, bgSound;

function preload (){

spacebgimg=loadImage("spacebg2.jpg");
//spaceshipimg=loadImage("spaceshipProject.png");
startButtonimg=loadImage("startButton.png");
spaceshotimg=loadImage("spacelaser.png");
asteroidimg=loadImage("asteroid1.png");
restartimg=loadImage("restart.png");
earthimg=loadImage("earth2.png");

endSound=loadSound("gameOver.wav");
crashSound=loadSound("asteroidHit.wav");
asteroidShot=loadSound("asteroidSHOT.wav");
gameWon=loadSound("gameWon.wav");
restartSound=loadSound("restartSound.wav");
startSound=loadSound("startSound.wav");
//bgSound=loadSound("bgSound.ogg");

}

function setup(){

    createCanvas(1200,700);

   

   //spacebg=createSprite(950,350,50,50);
    //spacebg.addImage(spacebgimg);
   //spaceship=createSprite(600,590);
  // spaceship.addImage(spaceshipimg);
   //spaceship.scale=0.55;

   startButton=createSprite(600,250);
   startButton.addImage(startButtonimg);
   startButton.scale=0.2;

   restart=createSprite(600,400);
   restart.addImage(restartimg);
   restart.scale=0.3;
   restart.visible=false;

   earth=createSprite(600,200);
   earth.addImage(earthimg);
   earth.visible=false;
   earth.scale=2;
   
  //  earth.debug=true;
    earth.setCollider("circle",0,-20,10);
  
   asteroidGroup=new Group();
    spaceshotGroup= new Group();
    shipGroup=new Group();

    spaceship=new spaceShip(600,590);

   
  
}

function draw(){
    
   // background(spacebgimg);

  // bgSound.loop();

    if(gameState===0){
        background("black");

        textSize(20);
        text("Use left and right arrows to move, and press space to shoot. Shoot as many asteroids as you can to win!!",100,100)

        //textSize(30);
       // fill("white");
       // text("Press R Key To Start!",470,300);

       startButton.visible=true;
        


       restart.visible=false;

        if(mousePressedOver(startButton)){
            startSound.play();
            gameState=1;
            startButton.visible=false;
            restart.visible=false;
        }
    }

    if(gameState===1){


        background(spacebgimg);

        startButton.visible=false;

      //  startButton.setCollider("rectangle",0,0,0,0);
       //earth.visible=false;

      
        restart.visible=false;

        obstacles();

        if(score<5){
            asteroidGroup.setVelocityYEach(4);
            //console.log(2);
           // alert("2");
        }

        if(score>=5){
            asteroidGroup.setVelocityYEach(5);
           // console.log(4);
        //   alert("4");

        }

        if(score>=15 ){
            asteroidGroup.setVelocityYEach(7);
            //console.log(6);
           // alert("6");
        }

        if(score>=25 ){
            asteroidGroup.setVelocityYEach(9);
            
        }

        if(score>=35){
            asteroidGroup.setVelocityYEach(11);
        }

        if(score>=45){
            asteroidGroup.setVelocityYEach(13);
        }
        

        

    for (var i = 0; i < asteroidGroup.length; i++) {
        if (asteroidGroup.get(i).isTouching(spaceshotGroup)) {
            asteroidGroup.get(i).destroy();
            spaceshotGroup.destroyEach();

            asteroidShot.play();
            
            score+=1;
          
        }
      
    }

    if(score===50){
        gameState=2;
        gameWon.play();
      
    }

   

    if(asteroidGroup.isTouching(shipGroup)){
        life-=1;
        crashSound.play();
        asteroidGroup.destroyEach();
    }

    if(life===0){
        gameState=3;
        endSound.play();
    }

}

if(gameState===2){
    background("black");
   
    textSize(30);
    text("Congratulations, you've finally reached Earth!",400,450);
   
    earth.visible=true;
    asteroidGroup.destroyEach();

  //  restart2=createSprite(200,200);
  //  restart2.addImage(restartimg);
  //  restart2.scale=0.5;

  restart.x=200;

  
    restart.visible=true;

    //if(mousePressedOver(restart2)){
      //  gameState=0;
       // earth.visible=false;
        
    //}

}



    if(gameState===3){
        background("black");
       
        

        restart.visible=true;
     //   startButton.visible=false;

       // if(mousePressedOver(restart)){
         //   gameState=0;
           // restart.visible=false;
           // startButton.visible=false;
        //}

       


        spaceshotGroup.destroyEach();
     }


    
     	if(mousePressedOver(restart)&&(gameState===2||gameState===3)){
            console.log("hi");

            restartSound.play();

           // gameState=0;
            life=3;
            score=0;
            earth.visible=false;
            //spaceship.y=590;
            gameState=0;
         }
    

    


    textSize(20);
    fill("white");
    text("Life:"+life,1070,640);

    text("Score:"+score,1070,670);
    

spaceship.display();
 
   


    drawSprites();
}

function obstacles(){

    

    if(frameCount%20===0){
        var rand= Math.round(random(100,1100));
        var rand2=Math.round(random(0,4));

       

       // console.log(rand2);
        asteroid=createSprite(500,50,20,20);
        asteroid.x=rand;
        asteroid.addImage(asteroidimg);

        switch(rand2){
            case 1:asteroid.scale=0.5;
            break;
            case 2:asteroid.scale=0.6;
            break;
            case 3:asteroid.scale=0.7;
            break;
            case 4:asteroid.scale=0.8;
            break;
            case 0:asteroid.scale=0.4;
            break;
            default:break;
        }

       // asteroid.scale=rand2;
       // asteroid.velocityY=7;

        asteroidGroup.add(asteroid);
       // drawSprites();
    }
}