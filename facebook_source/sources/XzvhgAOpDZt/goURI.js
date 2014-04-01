__d("goURI", ["URISchemes"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , URISchemes /*g*/ ) {
    function h(i, j, k) {
        i = i.toString();
        if (/^([^.:/?#]+):/.test(i) && !URISchemes /*g*/ .isAllowed(RegExp.$1)) throw new Error('goURI: URI scheme rejected, URI: ' + i);
        if (!j && global /*a*/ .PageTransitions && global /*a*/ .PageTransitions.isInitialized()) {
            global /*a*/ .PageTransitions.go(i, k);
        } else if (window.location.href == i) {
            window.location.reload();
        } else window.location.href = i;
    }
    module /*e*/ .exports = h;
});
