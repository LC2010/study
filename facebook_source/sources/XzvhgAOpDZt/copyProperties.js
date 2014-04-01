__d("copyProperties", []function(global, require, requireDynamic, requireLazy, module, exports) {
    function g(h, i, j, k, l, m, n) {
        h = h || {};
        var o = [i, j, k, l, m],
            p = 0,
            q;
        while (o[p]) {
            q = o[p++];
            for (var r in q) h[r] = q[r];
            if (q.hasOwnProperty && q.hasOwnProperty('toString') && (typeof q.toString != 'undefined') && (h.toString !== q.toString)) h.toString = q.toString;
        }
        return h;
    }
    module.exports = g;
});
