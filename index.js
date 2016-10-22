var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//config values
var port = 3000;

http.listen(port, function(){
  console.log('Listening on port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(client){
  console.log('User (' + client.id + ") connected. Asking for username!");
  io.to(client.id).emit('set username');

  client.on('set username', function(data) {
    client.username = data;
    console.log(client.id + " is now known as " + data);
  });

  client.on('disconnect', function(){
    console.log(client.username + ' (' + client.id + ') disconnected!');
  });
});

