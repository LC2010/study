__d("URIRFC3986", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = new RegExp('^' + '([^:/?#]+:)?' + '(//' + '([^\\\\/?#@]*@)?' + '(' + '\\[[A-Fa-f0-9:.]+\\]|' + '[^\\/?#:]*' + ')' + '(:[0-9]*)?' + ')?' + '([^?#]*)' + '(\\?[^#]*)?' + '(#.*)?'),
        h = {
            parse: function(i) {
                if (i.trim() === '') return null;
                var j = i.match(g),
                    k = {};
                k.uri = j[0] ? j[0] : null;
                k.scheme = j[1] ? j[1].substr(0, j[1].length - 1) : null;
                k.authority = j[2] ? j[2].substr(2) : null;
                k.userinfo = j[3] ? j[3].substr(0, j[3].length - 1) : null;
                k.host = j[2] ? j[4] : null;
                k.port = j[5] ? (j[5].substr(1) ? parseInt(j[5].substr(1), 10) : null) : null;
                k.path = j[6] ? j[6] : null;
                k.query = j[7] ? j[7].substr(1) : null;
                k.fragment = j[8] ? j[8].substr(1) : null;
                k.isGenericURI = k.authority === null && !! k.scheme;
                return k;
            }
        };
    module.exports = h;
});
