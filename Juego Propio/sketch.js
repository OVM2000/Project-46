const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerArcher, playerGif, playerimage;
var playerArrows = [];
var ground;

function preload() {
  backgroundImg = loadImage("IMG_0013.GIF");
 
  playerimage = loadImage("./assets/player.png");
  playerGif = loadImage("./assets/IMG-0032.gif");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight - 25);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(windowWidth/2,windowHeight/2 + 300,windowWidth, 10)

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  

  player = Bodies.rectangle(250, ground.body.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    ground.body.position.y - 112,
    120,
    120
  );
 
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();
    }
  }
  

  // Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("TIRO CON ARCO ÉPICO", width / 2, 100);
  running();
}

function running(){
  if(keyCode === LEFT_ARROW){
    player.distance -= 10;
    
  }
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
