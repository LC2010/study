__d("SidebarPrelude",[],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/) {
    var g = {
        addSidebarMode: function(h) {
            var i = document.documentElement;
            if (i.clientWidth > h) i.className = i.className + ' sidebarMode';
        }
    };
    module/*e*/.exports = g;
});