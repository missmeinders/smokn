document.addEventListener("DOMContentLoaded", function() {

var socket = io();
console.log(socket);

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
  });

  // socket.on('chat message', function(msg){
  // $('#messages').append($('<li>').text(msg));
  // });




})
