__d("Parent",["CSSCore"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, CSSCore/*g*/) {
    var h = {
        byTag: function(i, j) {
            j = j.toUpperCase();
            while (i && i.nodeName !== j) i = i.parentNode;
            return i;
        },
        byClass: function(i, j) {
            while (i && !CSSCore/*g*/.hasClass(i, j)) i = i.parentNode;
            return i;
        },
        byAttribute: function(i, j) {
            while (i && (!i.getAttribute || !i.getAttribute(j))) i = i.parentNode;
            return i;
        }
    };
    module/*e*/.exports = h;
});