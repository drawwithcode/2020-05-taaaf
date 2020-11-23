let socket = io();

function preload(){

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background(0);

  socket.on("mouse", newDrawing);
  socket.on("key", newBackground);
}

function newDrawing(data){
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x,data.y, 10);
}


function newBackground(dataKey){
  if(dataKey.value){
    background(0);
    }

}

function mouseDragged(){
  console.log("Sending: " + mouseX + ", " + mouseY);

  let data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit("mouse", data);

  // noStroke();
  // fill(255);
  // ellipse(mouseX,mouseY,30);
}




function draw() {

  if (keyIsPressed === true) {
    background(0);
    let dataKey = {
      value: true
    }
    socket.emit("key", dataKey);
  }

  textSize(16);
  textAlign(CENTER);
  fill(255);
  text("drag to draw in the screen of others, press a key to delete all from all screens", width/2, 50);

}
