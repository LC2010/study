__d("toArray", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    function h(i) {
        var j = i.length;
        invariant(!Array.isArray(i) && (typeof i === 'object' || typeof i === 'function'));
        invariant(typeof j === 'number');
        invariant(j === 0 || (j - 1) in i);
        if (i.hasOwnProperty) try {
            return Array.prototype.slice.call(i);
        } catch (k) {}
        var l = Array(j);
        for (var m = 0; m < j; m++) l[m] = i[m];
        return l;
    }
    module.exports = h;
});
