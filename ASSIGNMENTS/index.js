const http = require("http");
const fs = require("fs");
const path = require("path");

const myServer = http.createServer((request, response) => {

    let filePath = "";

    if (request.url === "/") {
        filePath = path.join(__dirname, "index.html");
        response.writeHead(200, { "Content-Type": "text/html" });
    } 
    else if (request.url === "/style.css") {
        filePath = path.join(__dirname, "style.css");
        response.writeHead(200, { "Content-Type": "text/css" });
    } 
    else {
        response.writeHead(404);
        response.end("404 Not Found");
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500);
            response.end("Server Error");
        } else {
            response.end(data);
        }
    });
});

myServer.listen(8000, () => {
    console.log("LISTENING at http://localhost:8000");
});
