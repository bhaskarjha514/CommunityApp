const express = require("express");

var http = require("http");

const app = express();

require('dotenv').config()

var server = http.createServer(app);
var io = require("socket.io")(server);


app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to Hoody");
})

io.on('connection', function(socket){

    console.log('User Conncetion');
  
    socket.on('connect user', function(user){
      console.log("Connected user ");
      io.emit('connect user', user);
    });
  
    socket.on('on typing', function(typing){
      console.log("Typing.... ");
      io.emit('on typing', typing);
    });
  
    socket.on('chat message', function(msg){
      console.log("Message " + msg['message']);
      io.emit('chat message', msg);
    });
  });

const port = process.env.PORT || 5000;

server.listen(port, "0.0.0.0", () => {
    console.log(`server started at ${port}`);
  });

