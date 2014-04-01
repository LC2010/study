__d("erx", ["ex"]function(global, require, requireDynamic, requireLazy, module, exports, ex) {
    var h = function(i) {
        if (typeof i !== 'string') return i;
        var j = i.indexOf(ex._prefix),
            k = i.lastIndexOf(ex._suffix);
        if (j < 0 || k < 0) return [i];
        var l = j + ex._prefix.length,
            m = k + ex._suffix.length;
        if (l >= k) return ['erx slice failure: %s', i];
        var n = i.substring(0, j),
            o = i.substring(m);
        i = i.substring(l, k);
        var p;
        try {
            p = JSON.parse(i);
            p[0] = n + p[0] + o;
        } catch (q) {
            return ['erx parse failure: %s', i];
        }
        return p;
    };
    module.exports = h;
});
