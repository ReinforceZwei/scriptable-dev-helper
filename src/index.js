import http from 'http';
import crypto from 'crypto'
import fs from 'fs'

const server = http.createServer((req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url)
    switch (url.pathname) {
        case '/hash': {
            res.writeHead(200)
            res.write(fileHash('dev-helper.js'))
            break;
        }
        case '/content': {
            res.writeHead(200)
            res.write(fs.readFileSync('dev-helper.js'))
            break;
        }
        default: {
            res.writeHead(404)
        }
    }
    res.end()
})

function fileHash(file) {
    const fileBuffer = fs.readFileSync(file);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    console.log(hex);
    return hex;
}

server.listen(3000)