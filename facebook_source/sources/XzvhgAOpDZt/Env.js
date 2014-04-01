__d("Env", ["copyProperties"]function(global, require, requireDynamic, requireLazy, module, exports, copyProperties) {
    var h = {
        start: Date.now()
    };
    if (global.Env) {
        copyProperties(h, global.Env);
        global.Env = undefined;
    }
    module.exports = h;
});
