__d("isEmpty", [], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ ) {
    function g(h) {
        if (Array.isArray(h)) {
            return h.length === 0;
        } else if (typeof h === 'object') {
            for (var i in h) return false;
            return true;
        } else return !h;
    }
    module /*e*/ .exports = g;
});
