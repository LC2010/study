__d("invokeCallbacks", ["ErrorUtils"]function(global, require, requireDynamic, requireLazy, module, exports, ErrorUtils) {
    function h(i, j) {
        if (i)
            for (var k = 0; k < i.length; k++) ErrorUtils.applyWithGuard(new Function(i[k]), j);
    }
    module.exports = h;
});
