const srv = require('./server'),
    path = require('path');

function malta_dev_srv(obj, options = {}) {
    const server = srv.getServer(),
        self = this,
        start = new Date(),
        folder = path.resolve(process.cwd(), options.folder || './'),
        host = options.host || '127.0.0.1',
        port = options.port || 3001;

    let browser = true,
        msg = '';
        
    if ('browser' in options) browser = !!options.browser;

    if (options.staticEp) {
        server.staticStart({
            port, host, folder,
            options: {
                staticEp: options.staticEp,
                staticFree: options.staticFree
            }
        });
    } else {
        server.start({
            port, host, folder, options: { browser }
        });
    }

    return (solve, reject) => {
        solve(obj);
        self.notifyAndUnlock(start, msg);
    }
}

malta_dev_srv.ext = 'html';

module.exports = malta_dev_srv;