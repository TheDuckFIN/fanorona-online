var socket = io();
var game = new Game(800, 445);

var username_selection = $('#username_selection');
var game_panel = $('#game');

socket.on('set username', function() {
    username_selection.show();
    game_panel.hide();
});

$("#setUsername").submit(function( event ) {
    var name = $('#username').val();
    socket.emit('set username', name);

    username_selection.hide();

    game.start();

    game_panel.show();

    event.preventDefault();
});
