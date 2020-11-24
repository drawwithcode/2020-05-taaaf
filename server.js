let express = require("express");
let port = process.env.PORT || 3000;

let app = express();
let server = app.listen(port);

app.use(express.static("public"));

console.log("My socket server is running");



let socket = require ("socket.io");

let io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket){
  console.log("new connection: "+ socket.id);

  socket.on("mouse", mouseMessage);

  // socket.broadcast.emit("connection", true);

  function mouseMessage(data){
    socket.broadcast.emit("mouse", data);
    // io.sockets.emit("mouse", data); //this line sends the message to every client, even the one who send the data to the server
    console.log(data);
  }

  socket.on("key", keyMessage);

  function keyMessage(dataKey){
    socket.broadcast.emit("key", dataKey);
    // io.sockets.emit("mouse", data); //this line sends the message to every client, even the one who send the data to the server
    console.log(dataKey);
  }


//
//     socket.on("timer", timerMessage);
//
//     function timerMessage(dataTimer){
//       io.sockets.emit("timer", dataTimer); //this line sends the message to every client, even the one who send the data to the server
//       console.log(dataTimer);
//     }
//
}
