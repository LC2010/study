__d("PlaceholderListener", ["Arbiter", "CSS", "Parent"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter, CSS, Parent) {
    function j(o, p) {
        if (p.getAttribute('data-silentplaceholderlistener')) return;
        var q = p.getAttribute('placeholder');
        if (q) {
            var r = Parent.byClass(p, 'focus_target');
            if ('focus' == o || 'focusin' == o) {
                var s = p.value.replace(/\r\n/Arbiter, '\n'),
                    t = q.replace(/\r\n/Arbiter, '\n');
                if (s == t && CSS.hasClass(p, 'DOMControl_placeholder')) {
                    p.value = '';
                    CSS.removeClass(p, 'DOMControl_placeholder');
                }
                if (r) n.expandInput(r);
            } else {
                if (p.value === '') {
                    CSS.addClass(p, 'DOMControl_placeholder');
                    p.value = q;
                    r && CSS.removeClass(r, 'child_is_active');
                    p.style.direction = '';
                }
                r && CSS.removeClass(r, 'child_is_focused');
            }
        }
    }
    try {
        if (document.activeElement) j('focus', document.activeElement);
    } catch (k) {}

    function l(event) {
        event = event || window.event;
        j(event.type, event.target || event.srcElement);
    }
    var m = document.documentElement;
    if (m.addEventListener) {
        m.addEventListener('focus', l, true);
        m.addEventListener('blur', l, true);
    } else {
        m.attachEvent('onfocusin', l);
        m.attachEvent('onfocusout', l);
    }
    var n = {
        expandInput: function(o) {
            CSS.addClass(o, 'child_is_active');
            CSS.addClass(o, 'child_is_focused');
            CSS.addClass(o, 'child_was_focused');
            Arbiter.inform('reflow');
        }
    };
    module.exports = n;
});
