var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var blueBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  
   createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  heading = createElement("h1");
  scoreboard = createElement("h2");
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
 
  scoreboard.html("Score: "+ score);
    scoreboard.style('color:black');
    scoreboard.position(width -200,20);
    
    heading.html("Life: "+ life);;
    heading.style('color:red');
    heading.position(width -400,20);



  if(gameState===1){
    gun.y=mouseY  

    if (bulletGroup.isTouching(blueBubbleGroup)) {
      var blast = createSprite(bullet.x,bullet.y,10,10);
      blast.addImage(blastImg);
      handleBubbleCollision(blueBubbleGroup);
      blueBubbleGroup.destroyEach();
      bulletGroup.destroyEach();
      blast.scale = 0.2;
      blast.lifetime  = 10
    }

    if (bulletGroup.isTouching(redBubbleGroup)) {
      var blast = createSprite(bullet.x,bullet.y,10,10);
      blast.addImage(blastImg);
      handleBubbleCollision(redBubbleGroup);
      redBubbleGroup.destroyEach();
      bulletGroup.destroyEach();
      blast.scale = 0.2;
      blast.lifetime  = 10
    }
    if (keyDown("space")) {
      showBullet();
    }

    
    
    drawblueBubble();
    drawredBubble();


  }
    if (life <= 0) {
      gameState = 2;
    
        swal({

        title: 'game over',
        text: "oops you lost the game!!..........",
        text: "Your score is : " + score,
        imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "thanks for playing"
      });
    

    handleGameOver(redBubbleGroup);
    }

      

   


    drawSprites();
  }
     


function showBullet() {
  bullet = createSprite(gun.x +130,gun.y -40,30,30);
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  bullet.velocityX = 9;

  bullet.lifetime = 300;
  bulletGroup.add(bullet);
}

function drawblueBubble() {
  if (frameCount % 120 === 0) {
    var bluebubble = createSprite(900,120,40,10);
    bluebubble.y = Math.round(random(10,790));
    bluebubble.addImage(blueBubbleImg);
    bluebubble.scale = 0.2;
    bluebubble.velocityX = -2;
    
    bluebubble.lifetime = 600;
    
    blueBubbleGroup.add(bluebubble);
}
}

function drawredBubble() {
  if (frameCount % 150 === 0) {
    var redbubble = createSprite(900,120,40,10);
    redbubble.y = Math.round(random(10,790));
    redbubble.addImage(redBubbleImg);
    redbubble.scale = 0.2;
    redbubble.velocityX = -3;
    
    redbubble.lifetime = 550;
    
    redBubbleGroup.add(redbubble);                       
  }
}

function handleBubbleCollision(bubbleGroup) {

  if (life > 0) {
    score +=1;
  }
}

function handleGameOver(bubbleGroup) {
   
  if (bubbleGroup.isTouching(backBoard)) {
    life  -=1;
  }
}