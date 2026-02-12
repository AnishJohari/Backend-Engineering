const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {

  const method = req.method;
  const url = req.url;

  // Serve HTML
  if (method === "GET" && url === "/") {
    fs.readFile("login.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading HTML");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // Serve script.js (VERY IMPORTANT)
  else if (method === "GET" && url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading JS");
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  }

  // API route
  else if (method === "GET" && url === "/users") {
    const data = {
      users: ["Vansh", "Ayush", "Raunak"]
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }

  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("SERVER NOT RESPONDING...");
  }
});

myServer.listen(8000, () => {
  console.log("LISTENING on http://localhost:8000");
});
