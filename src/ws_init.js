const WebSocket = require('ws');
const Joi = require('@hapi/joi');

const { write, read } = require('./domain/repositories/messages');

const writeModel = new WebSocket.Server({ noServer: true });
const readModel = new WebSocket.Server({ noServer: true });


writeModel.on('connection', function connection(ws) {
    ws.on('message', message => {
        const decodedMessage = JSON.parse(message);
        console.log("Received: %s", message);
        if (!decodedMessage.message) {
            return;
        }
        const result = Joi.validate(decodedMessage.message, require('./domain/schemas/message'));
        if (!result.error) {
            const record = {date: new Date(), ...decodedMessage.message};
            write(record);
            ws.send('Message saved!');
        } else {
            ws.send(JSON.stringify(result.error));
        }
    });
});

readModel.on('connection', function connection(ws) {
    ws.on('message', message => {
        const decodedMessage = JSON.parse(message);
        console.log("Query: %s", decodedMessage.query);
        ws.send(JSON.stringify(read()));
    });
});

module.exports = {
    writeModel,
    readModel,
};