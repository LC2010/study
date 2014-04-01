__d("QueryString", []function(global, require, requireDynamic, requireLazy, module, exports) {
    function g(k) {
        var l = [];
        Object.keys(k).sort().forEach(function(m) {
            var n = k[m];
            if (typeof n === 'undefined') return;
            if (n === null) {
                l.push(m);
                return;
            }
            l.push(encodeURIComponent(m) + '=' + encodeURIComponent(n));
        });
        return l.join('&');
    }

    function h(k, l) {
        var m = {};
        if (k === '') return m;
        var n = k.split('&');
        for (var o = 0; o < n.length; o++) {
            var p = n[o].split('=', 2),
                q = decodeURIComponent(p[0]);
            if (l && m.hasOwnProperty(q)) throw new URIError('Duplicate key: ' + q);
            m[q] = p.length === 2 ? decodeURIComponent(p[1]) : null;
        }
        return m;
    }

    function i(k, l) {
        return k + (~k.indexOf('?') ? '&' : '?') + (typeof l === 'string' ? l : j.encode(l));
    }
    var j = {
        encode: g,
        decode: h,
        appendToUrl: i
    };
    module.exports = j;
});
