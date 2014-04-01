__d("replaceTransportMarkers", ["ge"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , ge /*g*/ ) {
    function h(i, j, k) {
        var l = (typeof k !== 'undefined') ? j[k] : j,
            m;
        if (Array.isArray(l)) {
            for (m = 0; m < l.length; m++) h(i, l, m);
        } else if (l && typeof l == 'object')
            if (l.__m) {
                j[k] = require /*b*/ .call(null, l.__m);
            } else if (l.__e) {
            j[k] = ge /*g*/ (l.__e);
        } else if (l.__rel) {
            j[k] = i;
        } else
            for (var n in l) h(i, l, n);
    }
    module /*e*/ .exports = h;
});
