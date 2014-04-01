__d("PlaceholderListener", ["Arbiter", "CSS", "Parent"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Arbiter /*g*/ , CSS /*h*/ , Parent /*i*/ ) {
    function j(o, p) {
        if (p.getAttribute('data-silentplaceholderlistener')) return;
        var q = p.getAttribute('placeholder');
        if (q) {
            var r = Parent /*i*/ .byClass(p, 'focus_target');
            if ('focus' == o || 'focusin' == o) {
                var s = p.value.replace(/\r\n/Arbiter /*g*/ , '\n'),
                    t = q.replace(/\r\n/Arbiter /*g*/ , '\n');
                if (s == t && CSS /*h*/ .hasClass(p, 'DOMControl_placeholder')) {
                    p.value = '';
                    CSS /*h*/ .removeClass(p, 'DOMControl_placeholder');
                }
                if (r) n.expandInput(r);
            } else {
                if (p.value === '') {
                    CSS /*h*/ .addClass(p, 'DOMControl_placeholder');
                    p.value = q;
                    r && CSS /*h*/ .removeClass(r, 'child_is_active');
                    p.style.direction = '';
                }
                r && CSS /*h*/ .removeClass(r, 'child_is_focused');
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
            CSS /*h*/ .addClass(o, 'child_is_active');
            CSS /*h*/ .addClass(o, 'child_is_focused');
            CSS /*h*/ .addClass(o, 'child_was_focused');
            Arbiter /*g*/ .inform('reflow');
        }
    };
    module /*e*/ .exports = n;
});
