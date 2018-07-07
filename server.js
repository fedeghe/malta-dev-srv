var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    ext;

let srv = null;

class server {
    constructor() {
        this.srv = null;
        this.dir = null;
        this.name = path.basename(path.dirname(__filename));
        this.started = false;
    }
    start(port, host, folder) {
        if (this.started) return;
        this.started = true;
        console.log(`> ${this.name.blue()} started on port # ${port} (http://${host}:${port})`);
        console.log(`> webroot is ${folder}`.blue());
        let self = this;
        this.dir = process.cwd();
        this.srv = http.createServer();

        this.srv.on('request', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Request-Method', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');

            // parse URL
            let parsedUrl = url.parse(req.url),
                // extract URL path
                pathname = path.resolve(folder + parsedUrl.pathname),
                // maps file extention to MIME types
                mimeType = {
                    ".ico": "image/x-icon",
                    ".html": "text/html",
                    ".js": "text/javascript",
                    ".json": "application/json",
                    ".css": "text/css",
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                    ".wav": "audio/wav",
                    ".mp3": "audio/mpeg",
                    ".svg": "image/svg+xml",
                    ".pdf": "application/pdf",
                    ".doc": "application/msword",
                    ".eot": "appliaction/vnd.ms-fontobject",
                    ".ttf": "aplication/font-sfnt"
                },
                do404 = () => {
                    res.statusCode = 404;
                    res.write('<!DOCTYPE html><body style="font-family:verdana">');
                    res.write('<h4>Synchazard: <span style="color:red">404</span></h4>');
                    res.write('<p>Document `' + path.basename(pathname) + '`  not found!</p>');
                    res.end('</body>');
                    return;
                };

            if (parsedUrl.pathname.match(/^\/(package.json|srv.js|ws_srv.js|actions|core)/)) {
                return do404();
            }

            fs.exists(pathname, function (exist) {
                if (!exist) {
                    return do404();
                }
                // if is a directory, then look for index.html
                if (fs.statSync(pathname).isDirectory()) {
                    pathname += "/index.html";
                }
                // read file from file system
                fs.readFile(pathname, function (err, data) {
                    if (err) {
                        res.statusCode = 500;
                        res.end("Error getting the file");
                    } else {
                        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                        ext = path.parse(pathname).ext;
                        res.statusCode = 200;
                        // if the file is found, set Content-type and send data
                        res.setHeader("Content-type", mimeType[ext] || "text/plain");
                        res.end(data);
                    }
                });
            });
        });
        this.srv.listen(parseInt(port));
    }
}
module.exports = {
    getServer: () => {
        if (!srv) {
            srv = new server();
        }
        return srv;
    }
};

