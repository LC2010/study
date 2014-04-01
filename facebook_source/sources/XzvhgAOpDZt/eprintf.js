__d("eprintf", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = function(h) {
        var i = Array.prototype.slice.call(arguments).map(function(l) {
            return String(l);
        }),
            j = h.split('%s').length - 1;
        if (j !== i.length - 1) return g('eprintf args number mismatch: %s', JSON.stringify(i));
        var k = 1;
        return h.replace(/%s/g, function(l) {
            return String(i[k++]);
        });
    };
    module.exports = g;
});
