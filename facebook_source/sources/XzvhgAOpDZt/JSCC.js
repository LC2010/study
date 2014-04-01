__d("JSCC", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = {};

    function h(j) {
        var k, l = false;
        return function() {
            if (!l) {
                k = j();
                l = true;
            }
            return k;
        };
    }
    var i = {
        get: function(j) {
            if (!g[j]) throw new Error('JSCC entry is missing');
            return g[j]();
        },
        init: function(j) {
            for (var k in j) g[k] = h(j[k]);
            return function l() {
                for (var m in j) delete g[m];
            };
        }
    };
    module.exports = i;
});
