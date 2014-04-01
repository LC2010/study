__d("$", ["ex"]function(global, require, requireDynamic, requireLazy, module, exports, ex) {
    function h(j) {
        var k = typeof j === 'string' ? document.getElementById(j) : j;
        if (!k) throw new Error(ex('Tried to get element with id of "%s" but it is not present on the page.', j));
        return k;
    }

    function i(j) {
        return h(j);
    }
    i.unsafe = h;
    module.exports = i;
});
