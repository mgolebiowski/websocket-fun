const WebSocket = require('ws');

const { read } = require('../domain/repositories/messages');

const listRoute = new WebSocket.Server({ noServer: true });

listRoute.on('connection', function connection(ws) {
    ws.on('message', message => {
        const decodedMessage = JSON.parse(message);
        console.log("Query: %s", decodedMessage.query);
        ws.send(JSON.stringify(read()));
    });
});

module.exports = listRoute;