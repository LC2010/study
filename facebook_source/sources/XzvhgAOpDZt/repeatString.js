__d("repeatString", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    function h(i, j) {
        if (j === 1) return i;
        invariant(j >= 0);
        var k = '';
        while (j) {
            if (j & 1) k += i;
            if ((j >>= 1)) i += i;
        }
        return k;
    }
    module.exports = h;
});
