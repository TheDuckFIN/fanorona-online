var socket = io();

socket.on('set username', function() {
  $('#username_form').show();
});

$("#setUsername").submit(function( event ) {
  var name = $('#username').val();
  socket.emit('set username', name);

  $('#username_form').hide();
  
  event.preventDefault();
});
