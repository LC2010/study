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
console.log("#BEAUTIFY:=cat");
console.log("BEAUTIFY:=js-beautify --type \"javascript\" -f");
console.log("MODULES:=" + modules.join(" ").replace("$", "$$$$"));
console.log("output:=$(addsuffix .js, $(MODULES))");
//console.log("min_files:=$(addsuffix .min, $(MODULES))");
console.log("");
console.log("all:$(output)");
console.log("");
console.log("%.js:%.min");
console.log("\t@$(BEAUTIFY) \'$<\' -o \'$@\'");
console.log("\t@echo \"replace var name\" \"$@\"");
console.log("\t@$(NODE) \"../../var.js\" \'$@\'");
console.log("");
//console.log("$(min_files):../../" + inputFile);
//console.log("%.min:../../" + inputFile + " ../../unpack.js");
console.log("%.min:");
console.log("\t$(NODE) \"../../unpack.js\" \"../../" + inputFile + "\"");
console.log("");
console.log(".PHONY:all");
//console.log(".INTERMEDIATE:$(min_files)");
