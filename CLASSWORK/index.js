const http = require("http");
const fs = require("fs");
const path = require("path");

const myServer = http.createServer((request, response) => {
    const obj = {
        id: Date.now(),
        task: "task created"
    };

    // Correct way to get method and url
    const method = request.method;
    const url = request.url;
    console.log("hello world")

    

    if (method === 'GET' && url === '/') {
        console.log("hello world");
        response.end("hi")
    }






    
});

myServer.listen(8000, () => {
    console.log("SERVER STARTED...");
});
