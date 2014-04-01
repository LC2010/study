__d("ix", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    var h = {};

    function i(j) {
        var k = h[j];
        invariant( !! k);
        return k;
    }
    i.add = function(j) {
        var k = false;
        for (var l in j)
            if (!(l in h)) h[l] = j[l];
    };
    module.exports = i;
});
