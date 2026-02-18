const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todo.json");

const server = http.createServer((req, res) => {

    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // HOME ROUTE
    if (method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("WELCOME TO TODOS API");
    }

    // GET ALL TODOS OR BY ID
    else if (method === "GET" && pathname === "/todos") {

        const id = url.searchParams.get("id");

        fs.readFile(filePath, "utf-8", (err, data) => {

            if (err) {
                res.writeHead(500);
                return res.end("ERROR READING FILE");
            }

            const todos = data ? JSON.parse(data) : [];

            if (id) {
                const todo = todos.find((t) => t.id == id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(todo || {}));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(todos));
            }
        });
    }

    // POST NEW TODO
    else if (method === "POST" && pathname === "/todos") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const newTodo = JSON.parse(body);

            fs.readFile(filePath, "utf-8", (err, data) => {

                let todos = [];

                if (!err && data) {
                    todos = JSON.parse(data);
                }

                newTodo.id = Date.now();

                todos.push(newTodo);

                fs.writeFile(filePath, JSON.stringify(todos, null, 2), (err) => {

                    if (err) {
                        res.writeHead(500);
                        return res.end("ERROR SAVING DATA");
                    }

                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(newTodo));
                });
            });
        });
    }

    else {
        res.writeHead(404);
        res.end("ROUTE NOT FOUND");
    }
});

server.listen(8000, () => {
    console.log("LISTENING AT http://localhost:8000");
});
