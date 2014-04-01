__d("ServerJSDefine", ["BitMap", "replaceTransportMarkers"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , BitMap /*g*/ , replaceTransportMarkers /*h*/ ) {
    var i = new BitMap /*g*/ (),
        j = {
            getLoadedModuleHash: function() {
                return i.toCompressedString();
            },
            handleDefine: function(k, l, m, n, o) {
                if (n >= 0) i.set(n);
                define(k, l, function() {
                    replaceTransportMarkers /*h*/ (o, m);
                    return m;
                });
            },
            handleDefines: function(k, l) {
                k.map(function(m) {
                    if (l) m.push(l);
                    j.handleDefine.apply(null, m);
                });
            }
        };
    module /*e*/ .exports = j;
});
