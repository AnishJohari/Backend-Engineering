// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const myServer = http.createServer((request, response) => {

//     let filePath = "";

//     if (request.url === "/") {
//         filePath = path.join(__dirname, "index.html");
//         response.writeHead(200, { "Content-Type": "text/html" });
//     } 
//     else if (request.url === "/style.css") {
//         filePath = path.join(__dirname, "style.css");
//         response.writeHead(200, { "Content-Type": "text/css" });
//     } 
//     else {
//         response.writeHead(404);
//         response.end("404 Not Found");
//         return;
//     }

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             response.writeHead(500);
//             response.end("Server Error");
//         } else {
//             response.end(data);
//         }
//     });
// });

// myServer.listen(8000, () => {
//     console.log("LISTENING at http://localhost:8000");
// });


/*
  Create an HTTP server.
  This callback function runs EVERY time a client sends a request.
*/

const http = require("http");

const Server = http.createServer((req,res)=>{
  
  const method = req.method;

  //IT WILL RETURN THE URL AFTER THE PORT NUMBER
  const url = req.url;
  // Handle GET request to home route
  if (method === "GET" && url === "/"){

    //200 is a status type and it tells the server is okay
    res.writeHead(200,{"Content-Type": "text/html"});
    res.end("HELLO I AM BACK");
  }

  else if (method ==="GET" && url ==="/users"){

    const users = {user : ["Vansh","Ayush","Utkarsh"]};

    res.writeHead(200,{"Content-Type":"application/ json"});
    res.end(JSON.stringify(users));
  }


  else if (method === "POST" && url === "/users") {
    let body = "";
    // Collect incoming data chunks
    req.on("data", (chunk) => {
      body += chunk;
    });
    // When all data has arrived
    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "User created successfully",
        data: parsedBody,
      }));
    });
  }

  else{
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.end("ROUTE NOT FOUND.");
  }
  
});

Server.listen(8000,()=>{
  console.log("LISTENING..");
})