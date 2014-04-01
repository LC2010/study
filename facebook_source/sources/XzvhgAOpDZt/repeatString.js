__d("repeatString", ["invariant"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , invariant /*g*/ ) {
    function h(i, j) {
        if (j === 1) return i;
        invariant /*g*/ (j >= 0);
        var k = '';
        while (j) {
            if (j & 1) k += i;
            if ((j >>= 1)) i += i;
        }
        return k;
    }
    module /*e*/ .exports = h;
});
