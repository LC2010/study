__d("CSS", ["CSSCore", "$"]function(global, require, requireDynamic, requireLazy, module, exports, CSSCore) {
    var h = require('$').unsafe,
        $ = 'hidden_elem',
        j = {
            setClass: function(k, l) {
                h(k).className = l || '';
                return k;
            },
            hasClass: function(k, l) {
                return CSSCore.hasClass(h(k), l);
            },
            addClass: function(k, l) {
                return CSSCore.addClass(h(k), l);
            },
            removeClass: function(k, l) {
                return CSSCore.removeClass(h(k), l);
            },
            conditionClass: function(k, l, m) {
                return CSSCore.conditionClass(h(k), l, m);
            },
            toggleClass: function(k, l) {
                return j.conditionClass(k, l, !j.hasClass(k, l));
            },
            shown: function(k) {
                return !j.hasClass(k, $);
            },
            hide: function(k) {
                return j.addClass(k, $);
            },
            show: function(k) {
                return j.removeClass(k, $);
            },
            toggle: function(k) {
                return j.toggleClass(k, $);
            },
            conditionShow: function(k, l) {
                return j.conditionClass(k, $, !l);
            }
        };
    module.exports = j;
});
