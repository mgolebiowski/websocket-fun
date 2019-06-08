const WebSocket = require('ws');

const EventsBroker = require('../events_broker');

const eventsRoute = new WebSocket.Server({ noServer: true});

eventsRoute.on('connection', function connection(ws) {
    EventsBroker.on('new_post', (record) => {
        ws.send(record);
    });
});

module.exports = eventsRoute;