// We'll be using the https://github.com/theturtle32/WebSocket-Node
// WebSocket implementation
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer();
server.listen(8080, next => {
  console.warn(`Escutando`, next);
});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', request => {
  var connection = request.accept(null, request.origin);
  let litros = 300;
  setInterval(() => {
    connection.send(JSON.stringify({
      "litros": litros,
      "estado": true
    }));
    litros -= 30;
  }, 6000); //manda uma mensagem para o cliente de 6 em 6 segundos.

  //Listener de mensagem do lado do cliente.
  connection.on('message', mensagem => {
    // Process WebSocket message
    console.log("Message from client");
    console.log(mensagem);
  });

  //Fecha a conexão.
  connection.on('close', socket => {
    // Connection closes
    console.log(`Conexao com ${socket} encerrada`);
    // con/ connection.close();
  });
});
