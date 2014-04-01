__d("CSSCore", ["invariant"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , invariant /*g*/ ) {
    var h = {
        addClass: function(i, j) {
            invariant /*g*/ (!/\s/.test(j));
            if (j)
                if (i.classList) {
                    i.classList.add(j);
                } else if (!h.hasClass(i, j)) i.className = i.className + ' ' + j;
            return i;
        },
        removeClass: function(i, j) {
            invariant /*g*/ (!/\s/.test(j));
            if (j)
                if (i.classList) {
                    i.classList.remove(j);
                } else if (h.hasClass(i, j)) i.className = i.className.replace(new RegExp('(^|\\s)' + j + '(?:\\s|$)', 'invariant/*g*/'), '$1').replace(/\s+/invariant /*g*/ , ' ').replace(/^\s*|\s*$/invariant /*g*/ , '');
            return i;
        },
        conditionClass: function(i, j, k) {
            return (k ? h.addClass : h.removeClass)(i, j);
        },
        hasClass: function(i, j) {
            invariant /*g*/ (!/\s/.test(j));
            if (i.classList) return !!j && i.classList.contains(j);
            return (' ' + i.className + ' ').indexOf(' ' + j + ' ') > -1;
        }
    };
    module /*e*/ .exports = h;
});
