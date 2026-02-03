const fs = require("fs");
const path = require("path");
const path_set = path.join(__dirname,"./todo.json");

function writeFileSync(data){
    fs.writeFileSync("./todo.json", JSON.stringify(data,null,2) );
}

function readFileSync(){
    const data = fs.readFileSync("./todo.json","utf-8");
    return JSON.parse(data);
}

function appendData(data){
    const value = readFileSync();

    const newTodo = {
        id:     Date.now(),
        task:   data,
        done:   false
    }

    value.push(newTodo);
    writeFileSync(value);

    console.log("WORK DONE..");
}

function markDone(id){

    const data = readFileSync();
    const todo = data.find(t => t.id === id);

    if (!todo){
        console.log("DATA NOT FOUND..");
        return;
    }

    todo.done = true;
    writeFileSync(data)
}

function deleteTodo(id){
    const data = readFileSync();

    let found = false;
    let newData = [];

    for (let i = 0; i < data.length; i++){
        if (data[i].id !== id){
            newData.push(data[i]);
        } else {
            found = true;
        }
    }

    if (!found){
        console.log("DATA NOT FOUND..");
        return;
    }

    writeFileSync(newData);
    console.log("TODO DELETED..");
}


console.log(readFileSync())
markDone(1770125380381)
console.log(readFileSync())

