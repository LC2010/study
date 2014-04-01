__d("ex", ["eprintf"]function(global, require, requireDynamic, requireLazy, module, exports, eprintf) {
    var h = function() {
        var i = Array.prototype.slice.call(arguments, 0);
        i = i.map(function(j) {
            return String(j);
        });
        if (i[0].split('%s').length !== i.length) return h('ex args number mismatch: %s', JSON.stringify(i));
        return h._prefix + JSON.stringify(i) + h._suffix;
    };
    h._prefix = '<![EX[';
    h._suffix = ']]>';
    module.exports = h;
});
