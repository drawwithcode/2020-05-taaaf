let socket = io();
let d = 10;
let p = 0;
let timer = 10;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);

  socket.on("mouse", newDrawing);
  socket.on("key", newBackground);
  // socket.on("timer", updateTimer);
  // socket.on("connection", playerCount);
}



// function playerCount(tf){
//
//   if(tf){
//     p++;
//   }
//
//
// }

function mouseWheel(event) {

  d -= event.delta / 100;

  console.log(d);

}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, data.d);
}


function newBackground(dataKey) {
  if (dataKey.value) {
    background(0);
  }

}

function mouseDragged() {
  console.log("Sending: " + mouseX + ", " + mouseY);

  let data = {
    x: mouseX,
    y: mouseY,
    d: d
  }

  socket.emit("mouse", data);

  push();
  fill(255);
  ellipse(30, 30, d);
  pop();

}




function draw() {

  if (keyIsPressed === true) {
    background(0);
    let dataKey = {
      value: true
    }
    socket.emit("key", dataKey);
  }

  push();
  rectMode(CENTER);
  fill(0);
  rect(width/2, 40, 580, 60);
  pop();

  push();
  textSize(16);
  textAlign(CENTER);
  fill(255);
  text("drag to draw in the screen of others, press any key to delete all from all screens", width / 2, 30);
  text("try to draw something and see if someone will guess right", width / 2, 50);
  text("pencil dimensions" , 90, 60);
  text("scroll to change" , 90, 70);

  // text("Timer between rounds: " + timer, width/2, 70);

  pop();

  // if(frameCount%60 === 0 && timer > 0 ){
  //   timer--;
  // }
  // if(timer===0){
  //   timer = 10;
  // }
  //
  // let dataTimer = {
  //   t: timer
  // }
  //
  // socket.emit("timer", dataTimer);

}
//
// function updateTimer(dataTimer){
//
//   rectMode(CENTER);
//   fill(150);
//   rect(width/2,90,300,20);
//
//   push();
//   textSize(16);
//   textAlign(CENTER);
//   fill(255);
//   text("Time left before next round: " + dataTimer.t, width/2, 100);
//   pop();
//
//   console.log(dataTimer);
//
// }
