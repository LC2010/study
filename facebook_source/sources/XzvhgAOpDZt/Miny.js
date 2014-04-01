__d("Miny", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = 'Miny1',
        h = {
            encode: [],
            decode: {}
        }, i = 'wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'.split('');

    function j(n) {
        for (var o = h.encode.length; o < n; o++) {
            var p = o.toString(32).split('');
            p[p.length - 1] = i[parseInt(p[p.length - 1], 32)];
            p = p.join('');
            h.encode[o] = p;
            h.decode[p] = o;
        }
        return h;
    }

    function k(n) {
        var o = n.match(/\w+|\W+/g),
            p = {};
        for (var q = 0; q < o.length; q++) p[o[q]] = (p[o[q]] || 0) + 1;
        var r = Object.keys(p);
        r.sort(function(u, v) {
            return p[u] < p[v] ? 1 : (p[v] < p[u] ? -1 : 0);
        });
        var s = j(r.length).encode;
        for (q = 0; q < r.length; q++) p[r[q]] = s[q];
        var t = [];
        for (q = 0; q < o.length; q++) t[q] = p[o[q]];
        for (q = 0; q < r.length; q++) r[q] = r[q].replace(/'~'/g, '\\~');
        return [g, r.length].concat(r).concat(t.join('')).join('~');
    }

    function l(n) {
        var o = n.split('~');
        if (o.shift() != g) throw new Error('Not global Miny stream');
        var p = parseInt(o.shift(), 10),
            q = o.pop();
        q = q.match(/[0-9a-v]*[\-w-zA-Z_]/g);
        var r = o,
            s = j(p).decode,
            t = [];
        for (var u = 0; u < q.length; u++) t[u] = r[s[q[u]]];
        return t.join('');
    }
    var m = {
        encode: k,
        decode: l
    };
    module.exports = m;
});
