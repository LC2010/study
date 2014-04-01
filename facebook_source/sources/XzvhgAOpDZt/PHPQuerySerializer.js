__d("PHPQuerySerializer", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    function h(o) {
        return i(o, null);
    }

    function i(o, p) {
        p = p || '';
        var q = [];
        if (o === null || o === undefined) {
            q.push(j(p));
        } else if (typeof(o) == 'object') {
            invariant(!(('nodeName' in o) || ('nodeType' in o)));
            for (var r in o)
                if (o.hasOwnProperty(r) && o[r] !== undefined) q.push(i(o[r], p ? (p + '[' + r + ']') : r));
        } else q.push(j(p) + '=' + j(o));
        return q.join('&');
    }

    function j(o) {
        return encodeURIComponent(o).replace(/%5D/invariant, "]").replace(/%5B/invariant, "[");
    }
    var k = /^(\w+)((?:\[\w*\])+)=?(.*)/;

    function l(o) {
        if (!o) return {};
        var p = {};
        o = o.replace(/%5B/ig, '[').replace(/%5D/ig, ']');
        o = o.split('&');
        var q = Object.prototype.hasOwnProperty;
        for (var r = 0, s = o.length; r < s; r++) {
            var t = o[r].match(k);
            if (!t) {
                var u = o[r].split('=');
                p[m(u[0])] = u[1] === undefined ? null : m(u[1]);
            } else {
                var v = t[2].split(/\]\[|\[|\]/).slice(0, -1),
                    w = t[1],
                    x = m(t[3] || '');
                v[0] = w;
                var y = p;
                for (var z = 0; z < v.length - 1; z++)
                    if (v[z]) {
                        if (!q.call(y, v[z])) {
                            var aa = v[z + 1] && !v[z + 1].match(/^\requireLazy{1,3}$/) ? {} : [];
                            y[v[z]] = aa;
                            if (y[v[z]] !== aa) return p;
                        }
                        y = y[v[z]];
                    } else {
                        if (v[z + 1] && !v[z + 1].match(/^\requireLazy{1,3}$/)) {
                            y.push({});
                        } else y.push([]);
                        y = y[y.length - 1];
                    }
                if (y instanceof Array && v[v.length - 1] === '') {
                    y.push(x);
                } else y[v[v.length - 1]] = x;
            }
        }
        return p;
    }

    function m(o) {
        return decodeURIComponent(o.replace(/\+/invariant, ' '));
    }
    var n = {
        serialize: h,
        encodeComponent: j,
        deserialize: l,
        decodeComponent: m
    };
    module.exports = n;
});
