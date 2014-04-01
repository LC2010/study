__d("SidebarPrelude", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = {
        addSidebarMode: function(h) {
            var i = document.documentElement;
            if (i.clientWidth > h) i.className = i.className + ' sidebarMode';
        }
    };
    module.exports = g;
});
