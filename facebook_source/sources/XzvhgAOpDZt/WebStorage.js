__d("WebStorage", []function(global, require, requireDynamic, requireLazy, module, exports) {
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
    module.exports = h;
});
