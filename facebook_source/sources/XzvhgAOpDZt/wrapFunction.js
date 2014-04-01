__d("wrapFunction", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = {};

    function h(i, j, k) {
        j = j || 'default';
        return function() {
            var l = j in g ? g[j](i, k) : i;
            return l.apply(this, arguments);
        };
    }
    h.setWrapper = function(i, j) {
        j = j || 'default';
        g[j] = i;
    };
    module.exports = h;
});
