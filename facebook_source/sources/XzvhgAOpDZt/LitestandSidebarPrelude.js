__d("LitestandSidebarPrelude", ["CSS", "cx"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , CSS /*g*/ , cx /*h*/ ) {
    module /*e*/ .exports = {
        init: function(i, j, k) {
            var l = document.documentElement;
            l.className = l.className + ' sidebarMode';
            if (j || l.clientWidth <= k) l.className = l.className + ' ' + "_4kdq";
            CSS /*g*/ .show(i);
        }
    };
});
