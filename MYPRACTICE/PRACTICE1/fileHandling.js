const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.txt");

// Write (overwrite)
function writeFile(data) {
    fs.writeFileSync(filePath, data);
}

// Read
function readFile() {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
}


function appendText(text) {
    const oldData = readFile();
    const newData = oldData + text + "\n";
    writeFile(newData);
}

// Test
writeFile("HII I AM BACK");
appendText("HII I AM BACK");
console.log(readFile());