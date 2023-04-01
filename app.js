var cors         = require("cors");
var http         = require("http");
var express      = require("express");
var Moniker      = require('moniker');
var mongoose     = require("mongoose");
var dotEnv       = require('dotenv').config();
const bodyParser = require("body-parser");
const app        = express();
const mongoUrl   = "mongodb+srv://infonehby:Admin123@nehbycluster.txxx3re.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {
    console.log('db Connected')
}).catch((err) => {
    console.log('Failed to connect db' +err)
})

var server = http.createServer(app);
var io     = require("socket.io")(server);

app.get('/',(req,res)=>{
    res.send("Welcome to Hoody");
})

var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
console.log(formatName(names.choose()));

function formatName(name){
  let fName = name.split('-')[0];
  let lName = name.split('-')[1];
  return fName.charAt(0).toUpperCase() + fName.slice(1) + lName.charAt(0).toUpperCase() + lName.slice(1)
}


io.on('connection', function(socket){
    console.log('User Conncetion');
  
  socket.on('in the chat', function(user){
    console.log("Connected user ");
    io.emit('in the chat', user);
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

server.listen(port,() => {console.log(`server started at ${port}`)});

const authRoutes = require('./routes/user');
app.use('/api/auth',authRoutes)


