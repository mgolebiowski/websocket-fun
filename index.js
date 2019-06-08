const WebSocket = require('ws');
const http = require('http');
const url = require('url');

const log = [];

const server = http.createServer((req, res) => {
    res.end("Hello world!");
});
const writeModel = new WebSocket.Server({ noServer: true });
const readModel = new WebSocket.Server({ noServer: true });


writeModel.on('connection', function connection(ws) {
    ws.on('message', message => {
        const decodedMessage = JSON.parse(message);
        console.log("Received: %s", decodedMessage.message);
        ws.send('Message received!');
        log.push(decodedMessage.message);
    });
});

readModel.on('connection', function connection(ws) {
    ws.on('message', message => {
        const decodedMessage = JSON.parse(message);
        console.log("Query: %s", decodedMessage.query);
        ws.send(JSON.stringify(log));
    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    console.log(pathname);
    if (pathname === '/post') {
        writeModel.handleUpgrade(request, socket, head, function done(ws) {
            console.log('request emited to ws...');
            writeModel.emit('connection', ws, request);
        });
    } else if (pathname === '/list') {
        readModel.handleUpgrade(request, socket, head, function done(ws) {
            readModel.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(8080);