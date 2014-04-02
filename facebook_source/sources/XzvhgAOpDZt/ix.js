__d("ix",["invariant"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, invariant/*g*/) {
    var h = {};

    function i(j) {
        var k = h[j];
        invariant/*g*/( !! k);
        return k;
    }
    i.add = function(j) {
        var k = false;
        for (var l in j)
            if (!(l in h)) h[l] = j[l];
    };
    module/*e*/.exports = i;
});