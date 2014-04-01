__d("CSS", ["CSSCore", "$"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , CSSCore /*g*/ ) {
    var h = require /*b*/ ('$').unsafe,
        $ /*i*/ = 'hidden_elem',
        j = {
            setClass: function(k, l) {
                h(k).className = l || '';
                return k;
            },
            hasClass: function(k, l) {
                return CSSCore /*g*/ .hasClass(h(k), l);
            },
            addClass: function(k, l) {
                return CSSCore /*g*/ .addClass(h(k), l);
            },
            removeClass: function(k, l) {
                return CSSCore /*g*/ .removeClass(h(k), l);
            },
            conditionClass: function(k, l, m) {
                return CSSCore /*g*/ .conditionClass(h(k), l, m);
            },
            toggleClass: function(k, l) {
                return j.conditionClass(k, l, !j.hasClass(k, l));
            },
            shown: function(k) {
                return !j.hasClass(k, $ /*i*/ );
            },
            hide: function(k) {
                return j.addClass(k, $ /*i*/ );
            },
            show: function(k) {
                return j.removeClass(k, $ /*i*/ );
            },
            toggle: function(k) {
                return j.toggleClass(k, $ /*i*/ );
            },
            conditionShow: function(k, l) {
                return j.conditionClass(k, $ /*i*/ , !l);
            }
        };
    module /*e*/ .exports = j;
});
