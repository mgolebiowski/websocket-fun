const http = require('http');
const url = require('url');

const { writeModel, readModel } = require('./ws_init');

const server = http.createServer((req, res) => {
    res.end("Hello world!");
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    if (pathname === '/post') {
        writeModel.handleUpgrade(request, socket, head, function done(ws) {
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

module.exports = server;