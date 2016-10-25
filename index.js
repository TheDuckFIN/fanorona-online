var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var shortid = require('shortid');

var games = {};

//config values
var port = 3000;

http.listen(port, function(){
  console.log('Listening on port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(client){
  console.log('User (' + client.id + ") connected. Asking for username!");

  //Ask username from the client
  io.to(client.id).emit('set username');

  //Client sent the username it wants
  client.on('set username', function(data) {
    client.username = data;

    io.to(client.id).emit('username confirmation', {
      username: client.username,
      id: client.id
    });

    console.log(client.id + " is now known as " + client.username);
  });

  //Client disconnected
  client.on('disconnect', function(){
    console.log(client.username + ' (' + client.id + ') disconnected!');
  });

  /*
   * 
   * Game room creation / joining packets
   * 
   */
  
  client.on('new game', function() {
    var gameID = String(shortid.generate());

    games[gameID] = {
      players: {
        1: client.id,
        2: null
      },

      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    };

    io.to(client.id).emit('game created', {gameID: gameID, gameData: games[gameID]});
  });

});

