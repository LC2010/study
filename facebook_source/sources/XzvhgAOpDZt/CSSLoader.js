__d("CSSLoader", ["isEmpty"]function(global, require, requireDynamic, requireLazy, module, exports, isEmpty) {
    var h = 20,
        i = 5000,
        j, k, l = {}, m = [],
        n, o = {};

    function p(t) {
        if (k) return;
        k = true;
        var u = document.createElement('link');
        u.onload = function() {
            j = true;
            u.parentNode.removeChild(u);
        };
        u.rel = 'stylesheet';
        u.href = 'data:text/css;base64,';
        t.appendChild(u);
    }

    function q() {
        var t, u = [],
            v = [];
        if (Date.now() >= n) {
            for (t in o) {
                v.push(o[t].signal);
                u.push(o[t].error);
            }
            o = {};
        } else
            for (t in o) {
                var w = o[t].signal,
                    x = window.getComputedStyle ? getComputedStyle(w, null) : w.currentStyle;
                if (x && parseInt(x.height, 10) > 1) {
                    u.push(o[t].load);
                    v.push(w);
                    delete o[t];
                }
            }
        for (var y = 0; y < v.length; y++) v[y].parentNode.removeChild(v[y]);
        if (!isEmpty(u)) {
            for (y = 0; y < u.length; y++) u[y]();
            n = Date.now() + i;
        }
        return isEmpty(o);
    }

    function r(t, u, v, w) {
        var x = document.createElement('meta');
        x.id = 'bootloader_' + t.replace(/[^global-z0-9]/ig, '_');
        u.appendChild(x);
        var y = !isEmpty(o);
        n = Date.now() + i;
        o[t] = {
            signal: x,
            load: v,
            error: w
        };
        if (!y) var z = setInterval(function aa() {
            if (q()) clearInterval(z);
        }, h, false);
    }
    var s = {
        loadStyleSheet: function(t, u, v, w, x) {
            if (l[t]) throw new Error('CSS component ' + t + ' has already been requested.');
            if (document.createStyleSheet) {
                var y;
                for (var z = 0; z < m.length; z++)
                    if (m[z].imports.length < 31) {
                        y = z;
                        break;
                    }
                if (y === undefined) {
                    m.push(document.createStyleSheet());
                    y = m.length - 1;
                }
                m[y].addImport(u);
                l[t] = {
                    styleSheet: m[y],
                    uri: u
                };
                r(t, v, w, x);
                return;
            }
            var aa = document.createElement('link');
            aa.rel = 'stylesheet';
            aa.type = 'text/css';
            aa.href = u;
            l[t] = {
                link: aa
            };
            if (j) {
                aa.onload = function() {
                    aa.onload = aa.onerror = null;
                    w();
                };
                aa.onerror = function() {
                    aa.onload = aa.onerror = null;
                    x();
                };
            } else {
                r(t, v, w, x);
                if (j === undefined) p(v);
            }
            v.appendChild(aa);
        },
        registerLoadedStyleSheet: function(t, u) {
            if (l[t]) throw new Error('CSS component ' + t + ' has been requested and should not be ' + 'loaded more than once.');
            l[t] = {
                link: u
            };
        },
        unloadStyleSheet: function(t) {
            if (!t in l) return;
            var u = l[t],
                v = u.link;
            if (v) {
                v.onload = v.onerror = null;
                v.parentNode.removeChild(v);
            } else {
                var w = u.styleSheet;
                for (var x = 0; x < w.imports.length; x++)
                    if (w.imports[x].href == u.uri) {
                        w.removeImport(x);
                        break;
                    }
            }
            delete o[t];
            delete l[t];
        }
    };
    module.exports = s;
});
