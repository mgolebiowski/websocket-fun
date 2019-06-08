const http = require('http');
const url = require('url');

const static = require('node-static');

const { post, list, events } = require('./router');

const server = http.createServer((req, res) => {
    req.addListener('end', function () {
        const file = new static.Server('./client');
        file.serve(req, res);
    }).resume();
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    if (pathname === '/post') {
        post.handleUpgrade(request, socket, head, function done(ws) {
            post.emit('connection', ws, request);
        });
    } else if (pathname === '/list') {
        list.handleUpgrade(request, socket, head, function done(ws) {
            list.emit('connection', ws, request);
        });
    } else if (pathname === '/events') {
        events.handleUpgrade(request, socket, head, function done(ws) {
            events.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

module.exports = server;