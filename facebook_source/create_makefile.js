#!/usr/bin/node

var fs = require("fs");

if (process.argv.length < 3) {
    console.log("Usage:", process.argv[0], process.argv[1], "[input_file]");
    return;
}

var inputFile = process.argv[2],
    input = fs.readFileSync(inputFile, "utf8"),
    start = input.indexOf("__d("),
    code = input.substr(start),
    modules = [];

(new Function("__d", code))(__d);


function __d(name, deps, factory) {
    modules.push(name.replace(/[ :]/g, "."));
}

console.log("NODE:=node");
console.log("MODULES:=" + modules.join(" "));
console.log("output:=$(addsuffix .js, $(MODULES))");
console.log("");
console.log("all:$(output)");
console.log("\t@for i in *.js;do \\");
console.log("\t     js-beautify --type \"javascript\" -r -f \"$$i\";\\");
console.log("\tdone;");
console.log("");
console.log("$(output):../../" + inputFile);
console.log("\t$(NODE) \"../../unrar.js\" \"$<\"");
console.log("");
console.log(".PHONY:all");
