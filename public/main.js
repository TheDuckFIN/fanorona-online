var socket = io();

var main = {
    //references to different panels
    usernameSelectionPanel: $('#usernameSelection'),
    gamePanel: $('#game'),
    lobbyPanel: $('#lobby'),

    //text fields that we might want to update
    usernameField: $('#lobby span'),
    player1Field: $('#game h1:nth-of-type(1)'),
    player2Field: $('#game h1:nth-of-type(2)'),

    username: undefined,
    playerID: undefined,

    hideAll: function() {
        this.usernameSelectionPanel.hide();
        this.gamePanel.hide();
        this.lobbyPanel.hide();
    },

    setUsername: function() {
        this.hideAll();
        this.usernameSelectionPanel.show();
    },

    joinLobby: function() {
        this.hideAll();
        this.usernameField.html(this.username);
        this.lobbyPanel.show();
    },

    joinGame: function() {
        this.hideAll();
        
        game.init();

        this.gamePanel.show();
    }
}


$('#setUsername').submit(function(event) {
    var name = $('#username').val();
    socket.emit('set username', name);

    event.preventDefault();
});

$('#joinGame').submit(function(event) {
    var gameID = $('#gameid').val();
    console.log("Joining game: " + gameID);

    event.preventDefault();
});

$('#newGame').click(function() {
    socket.emit('new game');
});


/*
 *
 * Socket.io handlers
 * 
 */

socket.on('set username', function() {
    main.setUsername();
});

socket.on('username confirmation', function(data) {
    main.username = data.username;
    main.playerID = data.id;
    main.joinLobby();
});

socket.on('game created', function(data) {
    //set the piece data from server to the game object
    game.pieces = data.gameData.board;

    //game creator is always the black(1) player
    game.localPlayer = 1;

    //update player texts
    main.player1Field.text(main.username);
    main.player2Field.text('Waiting for player...');

    main.joinGame();

    console.log(data);
});
