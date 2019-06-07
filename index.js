const WebSocket = require('ws');

const http = require('http');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    ws.send('ho!');
  });
});

const handleRequest = function(request, response) {
    response.end('Server working properly. Requested URL : ' + request.url);
};

var myFirstServer = http.createServer(handleRequest);

myFirstServer.listen(8000, function(){
    console.log("Server listening on: http://localhost:%s", 8000);
});