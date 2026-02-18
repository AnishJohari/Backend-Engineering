const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "logs.txt");

const server = http.createServer((req, res) => {

    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlPath = url.pathname;


        const time = new Date().toString();
        const line = `${time} - ${method} - ${urlPath}\n`;

        fs.appendFile(filePath, line, (err) => {
            if (err) {
                console.log(err);
            } else {
            res.writeHead(200, "done");
            res.end()
            }
        });
});

server.listen(8000, () => {
    console.log("LISTENING AT http://localhost:8000");
});
