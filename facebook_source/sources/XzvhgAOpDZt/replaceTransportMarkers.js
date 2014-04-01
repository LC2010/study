__d("replaceTransportMarkers", ["ge"]function(global, require, requireDynamic, requireLazy, module, exports, ge) {
    function h(i, j, k) {
        var l = (typeof k !== 'undefined') ? j[k] : j,
            m;
        if (Array.isArray(l)) {
            for (m = 0; m < l.length; m++) h(i, l, m);
        } else if (l && typeof l == 'object')
            if (l.__m) {
                j[k] = require.call(null, l.__m);
            } else if (l.__e) {
            j[k] = ge(l.__e);
        } else if (l.__rel) {
            j[k] = i;
        } else
            for (var n in l) h(i, l, n);
    }
    module.exports = h;
});
