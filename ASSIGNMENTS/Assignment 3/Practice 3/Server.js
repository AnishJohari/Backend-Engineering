const http = require("http");
const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname,"student.json");

const server = http.createServer((req,res)=>{

    const method = req.method;
    const url = new URL(req.url,`http://${req.headers.host}`);
    const pathsource = url.pathname;

    //HOME PAGE OF THE WEBSITE
    if (method === "GET" && pathsource ==="/"){
        res.writeHead(200,{"content-type":"text/plain"});
        res.end("WELCOME TO STUDENT MANAGEMENT SYSTEM.");
    }

    //SENDING ALL DATA TO USER
    //SENDING A SPECIFIC DATA TO USER WHEN ID IS PROVIDED IN URL

    else if (method === "GET" && pathsource === "/students"){
        // fetching id from the url
        const id = url.searchParams.get("id");

        //READING FILE
        fs.readFile(filepath,"utf-8",(err,data)=>{

            if (err){
                res.writeHead(500,{"content-type": "TEXT/PLAIN"});
                return res.end("SOMETHING WENT WRONG PLEASE TRY AGAIN LATER.");
            }

            const studentsData = JSON.parse(data);

            //IF NO ID IS GIVEN THEN DISPLAY THE WHOLE RECORDS
            if (!id){
                res.writeHead(200,{"content-type": "TEXT/PLAIN"});
                return res.end(JSON.stringify(studentsData));
            }

            const student = studentsData.find((single)=>{
                return single.id === Number(id);
            });

            //IF NO STUDENT RECORD IS FOUND WITH THE GIVEN ID 
            if (!student){
                res.writeHead(200,{"content-type": "TEXT/PLAIN"});
                return res.end("NO STUDENT RECORD FOUND WITH THIS ID");
            }
            //DISPLAY THE RECORD 
            res.writeHead(200,{"content-type": "application/json"});
            res.end(JSON.stringify(student));
        });


    }

    //WRITING RECORD INTO THE FILE

   else if(method === "POST" && pathsource === "/students") {
    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, {"Content-Type":"text/plain"});
            return res.end("SOMETHING WENT WRONG, TRY AGAIN LATER");
        }

        let body = [];
        try {
            body = JSON.parse(data);
        } catch (e) {
            body = [];
        }

        let inputData = "";
        req.on("data", (chunk) => {
            inputData += chunk;
        });

        req.on("end", () => {
            try {
                const newStudent = JSON.parse(inputData);
                body.push(newStudent);

                fs.writeFile(filepath, JSON.stringify(body, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        return res.end("FAILED TO SAVE DATA");
                    }
                    res.writeHead(201, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(newStudent));
                });
            } catch (e) {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("INVALID JSON DATA");
            }
        });
    });

}


    else if (method === "PUT" || method === "POST") {
    // Extract ID from URL
    const id = pathsource.split("/")[2];

    fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("SOMETHING WENT WRONG, TRY AGAIN LATER");
        }

        let students = [];
        try {
            students = JSON.parse(data);
        } catch (e) {
            students = [];
        }

        let inputData = "";
        req.on("data", (chunk) => {
            inputData += chunk;
        });

        req.on("end", () => {
            try {
                const updatedData = JSON.parse(inputData);

                // Find student index by id
                const index = students.findIndex(student => student.id == id);
                if (index === -1) {
                    res.writeHead(404, {"Content-Type": "text/plain"});
                    return res.end("STUDENT NOT FOUND");
                }

                // Update student data
                students[index] = { ...students[index], ...updatedData };

                // Write back to file
                fs.writeFile(filepath, JSON.stringify(students, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        return res.end("FAILED TO UPDATE DATA");
                    }
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify(students[index]));
                });

            } catch (e) {
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("INVALID JSON DATA");
            }
        });
    });
}

});

server.listen(8000,()=>{
    console.log("LISTENING AT http://localhost:8000");

});