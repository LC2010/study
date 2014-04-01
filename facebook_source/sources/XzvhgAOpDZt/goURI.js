__d("goURI", ["URISchemes"]function(global, require, requireDynamic, requireLazy, module, exports, URISchemes) {
    function h(i, j, k) {
        i = i.toString();
        if (/^([^.:/?#]+):/.test(i) && !URISchemes.isAllowed(RegExp.$1)) throw new Error('goURI: URI scheme rejected, URI: ' + i);
        if (!j && global.PageTransitions && global.PageTransitions.isInitialized()) {
            global.PageTransitions.go(i, k);
        } else if (window.location.href == i) {
            window.location.reload();
        } else window.location.href = i;
    }
    module.exports = h;
});
