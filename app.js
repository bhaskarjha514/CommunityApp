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

var clients = {};

io.on("connection", (socket) => {
    console.log("connetetd");
    console.log(socket.id, "has joined");

    socket.on("signin", (id) => {
      console.log('Id---',id);
      clients[id] = socket;
      console.log('Clients---',clients);
    });

    socket.on("message", (msg) => {
      console.log('MSG----',msg);
      let targetId = msg.targetId;
      if (clients[targetId]){
        clients[targetId].emit("message", msg);
      }
    });
});

const port = process.env.PORT || 5000;

server.listen(port, "0.0.0.0", () => {
    console.log(`server started at ${port}`);
  });

