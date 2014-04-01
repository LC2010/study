__d("createObjectFrom", []function(global, require, requireDynamic, requireLazy, module, exports) {
    function g(h, i) {
        var j = {}, k = Array.isArray(i);
        if (typeof i == 'undefined') i = true;
        for (var l = h.length; l--;) j[h[l]] = k ? i[l] : i;
        return j;
    }
    module.exports = g;
});
