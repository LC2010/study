__d("WebStorage", [], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ ) {
    var g = {}, h = {
            getLocalStorage: function() {
                return i('localStorage');
            },
            getSessionStorage: function() {
                return i('sessionStorage');
            }
        };

    function i(k) {
        if (!g.hasOwnProperty(k)) g[k] = j(k);
        return g[k];
    }

    function j(k) {
        try {
            var m = window[k];
            if (m) {
                var n = '__test__' + Date.now();
                m.setItem(n, '');
                m.removeItem(n);
            }
            return m;
        } catch (l) {}
    }
    module /*e*/ .exports = h;
});
