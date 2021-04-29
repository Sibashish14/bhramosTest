var tank,angle=0,agniG,tank2,edges;
function preload(){
  agniImg=loadImage("Agni-5.png");
}
function setup() {
  createCanvas(displayWidth,600);
  tank=createSprite(100,520,100,50);
  tank.shapeColor="green";
  agniG=new Group();
  tank2=createSprite(displayWidth-150,520,100,50);
  tank2.shapeColor="green";
  ground=createSprite(displayWidth/2,575,displayWidth,50);
  ground.shapeColor="brown";
}

function draw() {
  background(0);  
  edges=createEdgeSprites();
  tank.collide(ground);
  tank2.collide(ground);
  tank.velocityY+=1;
  tank2.velocityY+=1
  push();
  translate(tank.x,tank.y);
  rotate(angle);
  rect(0,0,100,20);
  pop();
  push();
  translate(tank2.x,tank2.y+10);
  rotate(200);
  rect(0,0,100,20);
  pop();
  if(keyDown("up")){
    angle-=5;
  }
  if(keyDown("down")){
    angle+=5;
  }
  for(var i=0;i<agniG.length;i++){
    agniG.get(i).velocityY+=0.001;
  }
  for(var i=0;i<agniG.length;i++){
    if(agniG.get(i).x>=150){
      agniG.get(i).attractionPoint(1,tank2.x,tank2.y);
      agniG.get(i).rotation=0;
    }
  }
  for(var i=0;i<agniG.length;i++){
    if(agniG.get(i).y<=450){
      agniG.get(i).attractionPoint(4,tank2.x,tank2.y);
      agniG.get(i).rotation=0;
    }
  }
    for(var i=0;i<agniG.length;i++){
      if(agniG.get(i).isTouching(tank2)){
        agniG.get(i).destroy();
      }
    
  }
  drawSprites();
}
function keyPressed(){
  if(keyCode === 32){
    var agni=createSprite(tank.x,tank.y,30,20);
    agni.addImage(agniImg);
    agni.setCollider("rectangle",0,0,1000,500);
    agni.scale=0.125;
    agni.setSpeedAndDirection(4,angle);
    agni.rotation=angle;
    agniG.add(agni);
  }
}