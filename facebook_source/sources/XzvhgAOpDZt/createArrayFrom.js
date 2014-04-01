__d("createArrayFrom", ["toArray"]function(global, require, requireDynamic, requireLazy, module, exports, toArray) {
    function h(j) {
        return ( !! j && (typeof j == 'object' || typeof j == 'function') && ('length' in j) && !('setInterval' in j) && (typeof j.nodeType != 'number') && (Array.isArray(j) || ('callee' in j) || ('item' in j)));
    }

    function i(j) {
        if (!h(j)) {
            return [j];
        } else if (Array.isArray(j)) {
            return j.slice();
        } else return toArray(j);
    }
    module.exports = i;
});
