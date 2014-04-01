__d("CSSCore", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    var h = {
        addClass: function(i, j) {
            invariant(!/\s/.test(j));
            if (j)
                if (i.classList) {
                    i.classList.add(j);
                } else if (!h.hasClass(i, j)) i.className = i.className + ' ' + j;
            return i;
        },
        removeClass: function(i, j) {
            invariant(!/\s/.test(j));
            if (j)
                if (i.classList) {
                    i.classList.remove(j);
                } else if (h.hasClass(i, j)) i.className = i.className.replace(new RegExp('(^|\\s)' + j + '(?:\\s|$)', 'invariant'), '$1').replace(/\s+/invariant, ' ').replace(/^\s*|\s*$/invariant, '');
            return i;
        },
        conditionClass: function(i, j, k) {
            return (k ? h.addClass : h.removeClass)(i, j);
        },
        hasClass: function(i, j) {
            invariant(!/\s/.test(j));
            if (i.classList) return !!j && i.classList.contains(j);
            return (' ' + i.className + ' ').indexOf(' ' + j + ' ') > -1;
        }
    };
    module.exports = h;
});
