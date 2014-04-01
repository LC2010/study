__d("ge", []function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ ) {
    function g(j, k, l) {
        return typeof j != 'string' ? j : !k ? document.getElementById(j) : h(j, k, l);
    }

    function h(j, k, l) {
        var m, n, o;
        if (i(k) == j) {
            return k;
        } else if (k.getElementsByTagName) {
            n = k.getElementsByTagName(l || '*');
            for (o = 0; o < n.length; o++)
                if (i(n[o]) == j) return n[o];
        } else {
            n = k.childNodes;
            for (o = 0; o < n.length; o++) {
                m = h(j, n[o]);
                if (m) return m;
            }
        }
        return null;
    }

    function i(j) {
        return j.getAttribute ? j.getAttribute('id') : null;
    }
    module /*e*/ .exports = g;
});
