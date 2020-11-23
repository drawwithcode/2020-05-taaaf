let socket;

function preload(){

}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background(0);

  socket = io.connect("http://localhost:3000");
  socket.on("mouse", newDrawing);
}

function newDrawing(data){
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x,data.y, 30);
}

function mouseDragged(){
  console.log("Sending: " + mouseX + ", " + mouseY);

  let data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit("mouse", data);

  noStroke();
  fill(255);
  ellipse(mouseX,mouseY,30);
}

function draw() {

}
