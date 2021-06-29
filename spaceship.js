class spaceShip{

    constructor(x,y,width,height){

        this.spaceshipSprite=createSprite(x,y,width,height);
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;



        this.spaceshipimg=loadImage("spaceshipProject.png");
        this.shotimg=loadImage("spacelaser.png");
        this.shotSound=loadSound("spaceShot.wav");
        shipGroup.add(this.spaceshipSprite);

    }

    display(){
        this.spaceshipSprite.addImage(this.spaceshipimg);
        this.spaceshipSprite.scale=0.55;

        if(gameState===0){
            this.spaceshipSprite.y=this.y;
        }

        if(gameState===1){

            //this.spaceshipSprite.x=this.x;

        if(keyDown("right_arrow")){
            this.spaceshipSprite.x+=5;
        }
    
        if(keyDown("left_arrow")){
            this.spaceshipSprite.x-=5;
        }
    
        if(keyDown("space")){
            spaceshot=createSprite(600,500,50,50);
            spaceshot.x=this.spaceshipSprite.x;
            spaceshot.addImage(this.shotimg);
            spaceshot.scale=0.5;
            spaceshot.velocityY=-4;
            spaceshotGroup.add(spaceshot);

            this.shotSound.play();

        }

        if(this.spaceshipSprite.x>1200){
            this.spaceshipSprite.x=10;
        }

        if(this.spaceshipSprite.x<0){
            this.spaceshipSprite.x=1190;
        }

    }

    if(gameState===2){
        this.spaceshipSprite.velocityY=-2;
        earth.x=this.spaceshipSprite.x;
        if(this.spaceshipSprite.isTouching(earth)){
            this.spaceshipSprite.velocityY=0;
        }
    }

    if(gameState===3){
        this.spaceshipSprite.x=this.x;
    }

    
}

}