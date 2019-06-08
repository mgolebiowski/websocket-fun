const WebSocket = require('ws');
const Joi = require('@hapi/joi');

const { write } = require('../domain/repositories/messages');
const EventBroker = require('../events_broker');

const postRoute = new WebSocket.Server({ noServer: true });

postRoute.on('connection', function connection(ws) {
    ws.on('message', message => {
        const decodedMessage = JSON.parse(message);
        console.log("Received: %s", message);
        if (!decodedMessage.message) {
            return;
        }
        const result = Joi.validate(decodedMessage.message, require('../domain/schemas/message'));
        if (!result.error) {
            const record = {date: new Date(), ...decodedMessage.message};
            write(record);
            EventBroker.emit('new_post', JSON.stringify(record));
            ws.send('Message saved!');
        } else {
            ws.send(JSON.stringify(result.error));
        }
    });
});

module.exports = postRoute;