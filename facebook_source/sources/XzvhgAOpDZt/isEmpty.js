__d("isEmpty", []function(global, require, requireDynamic, requireLazy, module, exports) {
    function g(h) {
        if (Array.isArray(h)) {
            return h.length === 0;
        } else if (typeof h === 'object') {
            for (var i in h) return false;
            return true;
        } else return !h;
    }
    module.exports = g;
});
