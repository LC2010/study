__d("createObjectFrom",[],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/) {
    function g(h, i) {
        var j = {}, k = Array.isArray(i);
        if (typeof i == 'undefined') i = true;
        for (var l = h.length; l--;) j[h[l]] = k ? i[l] : i;
        return j;
    }
    module/*e*/.exports = g;
});