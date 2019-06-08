const WebSocket = require('ws');

const eventsModel = new WebSocket.Server({ noServer: true});

eventsModel.on('connection', function connection(ws) {

});

module.exports = eventsModel;