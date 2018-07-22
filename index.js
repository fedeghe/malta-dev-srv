var srv = require('./server'),
    path = require('path'),
    fs = require('fs');

server = srv.getServer();

function malta_dev_srv(obj, options) {
    var self = this,
        start = new Date(),
        msg,
        port = null,
        folder = './',
        host = 'localhost';

    options = options || {};
    port = options.port || 3001;
    host = options.host || host;
    folder = path.resolve(process.cwd(), options.folder || folder);

    server.start(port, host, folder);

    return function (solve, reject) {
        solve(obj);
        self.notifyAndUnlock(start, msg);
    }
}

malta_dev_srv.ext = 'html';

module.exports = malta_dev_srv;