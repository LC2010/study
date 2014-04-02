#!/usr/bin/node
var fs = require("fs");

if (process.argv.length < 3) {
    console.log("Usage:", process.argv[0], process.argv[1], "[input_file]");
    return;
}

var inputFile = process.argv[2],
    code = fs.readFileSync(inputFile, "utf8");

var varExpStr = "[\\w\\-\\$\\.]+",
    argExpStr = "\\s*,\\s*(" + varExpStr + ")",
    funcExpStr = "^function\\s*\\(\\s*(" + varExpStr + ")",
    argExp = new RegExp(argExpStr, "g"),
    funcExp = new RegExp(funcExpStr, "g");

function getArg(str) {
    var result = argExp.exec(str);
    if (result) {
        return result[1];
    }
    return false;
}

function getFirstArg(str) {
    funcExp.lastIndex = 0;
    argExp.lastIndex = 0;

    var result = funcExp.exec(str);
    if (result) {
        argExp.lastIndex = funcExp.lastIndex;
        return result[1];
    }
    return false;
}

function replaceVar(str, from, to) {
    from = from.replace(/([\[\]\(\)\.\?\*\{\}\+\$\^\:])/g, "\\$1");
    return str.replace(new RegExp("\\b" + from + "\\b", "g"), to);
}

var defaultDeps = ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'];
var output = [];

function __d(name, deps, factory) {
    var arg, factoryOutput, i, count;

    factoryOutput = factory = factory.toString();

    var allDeps = defaultDeps.concat(deps);
    for (i = 0, count = allDeps.length; i < count; i++) {
        if (i == 0) {
            arg = getFirstArg(factory);
        } else {
            arg = getArg(factory);
        }
        if (arg) {
            factoryOutput = replaceVar(factoryOutput, arg, allDeps[i] + "/*" + arg + "*/");
        } else {
            break;
        }
    }

    output.push("__d(");
    output.push(JSON.stringify(name));
    output.push(",");
    output.push(JSON.stringify(deps));
    output.push(",");
    output.push(factoryOutput);
    output.push(");");
}

(new Function("__d", code))(__d);
fs.writeFileSync(inputFile, output.join(""));
