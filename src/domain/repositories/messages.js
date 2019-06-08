const log = [];

function write(record) {
    log.push(record);
    return true;
}

function read() {
    return log;
}

module.exports = { write, read };