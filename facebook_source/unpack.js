#!/usr/bin/node

var fs = require("fs");

if (process.argv.length < 3) {
    console.log("Usage:", process.argv[0], process.argv[1], "[input_file]");
    return;
}

var inputFile = process.argv[2],
    input = fs.readFileSync(inputFile, "utf8"),
    start = input.indexOf("__d("),
    code = input.substr(start);

function __d(name, deps, factory) {
    var output = [];
    output.push("__d(");
    output.push(JSON.stringify(name));
    output.push(",");
    output.push(JSON.stringify(deps));
    output.push(",");
    output.push(factory.toString());
    output.push(");");
    fs.writeFileSync(name.replace(/[ :]/g, ".") + ".min", output.join(""));
}

(new Function("__d", code))(__d);
