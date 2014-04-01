__d("ServerJSDefine", ["BitMap", "replaceTransportMarkers"]function(global, require, requireDynamic, requireLazy, module, exports, BitMap, replaceTransportMarkers) {
    var i = new BitMap(),
        j = {
            getLoadedModuleHash: function() {
                return i.toCompressedString();
            },
            handleDefine: function(k, l, m, n, o) {
                if (n >= 0) i.set(n);
                define(k, l, function() {
                    replaceTransportMarkers(o, m);
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
    module.exports = j;
});
