__d("wrapFunction",[],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/) {
    var g = {};

    function h(i, j, k) {
        j = j || 'default';
        return function() {
            var l = j in g ? g[j](i, k) : i;
            return l.apply(this, arguments);
        };
    }
    h.setWrapper = function(i, j) {
        j = j || 'default';
        g[j] = i;
    };
    module/*e*/.exports = h;
});