const express = require("express");
const app = express();
var port = process.env.PORT || 3001;
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = [];

app.get('/',(req,res) => res.send("Hello Souvik"));

app.get('/chat', function(req, res){
    res.sendFile(__dirname + '/views/index.html');    
});

io.on('connection', function(socket){
    //console.log('A user connected');
    socket.on('setUsername', function(data){
        //console.log(data);
        if(users.indexOf(data) > -1){
            socket.emit('userExists', data + ' username already taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', {username: data});
        }
    });
    socket.on('msg', function(data){        
        io.sockets.emit('newmsg', data);
    })
});  

http.listen(port, function(){
    console.log("Server running on port "+port)
 });