__d("erx",["ex"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, ex/*g*/) {
    var h = function(i) {
        if (typeof i !== 'string') return i;
        var j = i.indexOf(ex/*g*/._prefix),
            k = i.lastIndexOf(ex/*g*/._suffix);
        if (j < 0 || k < 0) return [i];
        var l = j + ex/*g*/._prefix.length,
            m = k + ex/*g*/._suffix.length;
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
    module/*e*/.exports = h;
});