__d("Parent", ["CSSCore"]function(global, require, requireDynamic, requireLazy, module, exports, CSSCore) {
    var h = {
        byTag: function(i, j) {
            j = j.toUpperCase();
            while (i && i.nodeName !== j) i = i.parentNode;
            return i;
        },
        byClass: function(i, j) {
            while (i && !CSSCore.hasClass(i, j)) i = i.parentNode;
            return i;
        },
        byAttribute: function(i, j) {
            while (i && (!i.getAttribute || !i.getAttribute(j))) i = i.parentNode;
            return i;
        }
    };
    module.exports = h;
});
