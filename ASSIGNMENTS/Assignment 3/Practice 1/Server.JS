const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.json");

const server = http.createServer((req, res) => {
    try {
        const method = req.method;
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        // HOME ROUTE
        if (method === "GET" && pathname === "/") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("WELCOME TO NOTES API..");
        }

        // GET ALL NOTES or SINGLE NOTE
        else if (method === "GET" && pathname === "/notes") {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("ERROR IN READING DATA");
                }

                const notes = JSON.parse(data || "[]");
                const id = url.searchParams.get("id");

                if (id) {
                    const note = notes.find(n => n.id == id);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(note || {}));
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(notes));
                }
            });
        }

        // ADD NEW NOTE
        else if (method === "POST" && pathname === "/notes") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", () => {
                const newNote = JSON.parse(body);

                fs.readFile(filePath, "utf8", (err, data) => {
                    const notes = data ? JSON.parse(data) : [];
                    notes.push(newNote);

                    fs.writeFile(filePath, JSON.stringify(notes, null, 2), () => {
                        res.writeHead(201, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "Note added" }));
                    });
                });
            });
        }

        else {
            res.writeHead(404);
            res.end("Route Not Found");
        }

    } catch (err) {
        console.error("ERROR OCCURRED:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("INTERNAL SERVER ERROR...");
    }
});

server.listen(8000, () => {
    console.log("LISTENING ON PORT 8000...");
});
