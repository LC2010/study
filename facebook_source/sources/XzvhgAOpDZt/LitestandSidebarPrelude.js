__d("LitestandSidebarPrelude", ["CSS", "cx"]function(global, require, requireDynamic, requireLazy, module, exports, CSS, cx) {
    module.exports = {
        init: function(i, j, k) {
            var l = document.documentElement;
            l.className = l.className + ' sidebarMode';
            if (j || l.clientWidth <= k) l.className = l.className + ' ' + "_4kdq";
            CSS.show(i);
        }
    };
});
