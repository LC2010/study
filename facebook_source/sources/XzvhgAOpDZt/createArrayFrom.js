__d("createArrayFrom",["toArray"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, toArray/*g*/) {
    function h(j) {
        return ( !! j && (typeof j == 'object' || typeof j == 'function') && ('length' in j) && !('setInterval' in j) && (typeof j.nodeType != 'number') && (Array.isArray(j) || ('callee' in j) || ('item' in j)));
    }

    function i(j) {
        if (!h(j)) {
            return [j];
        } else if (Array.isArray(j)) {
            return j.slice();
        } else return toArray/*g*/(j);
    }
    module/*e*/.exports = i;
});