__d("Primer", ["Bootloader", "CSS", "ErrorUtils", "Parent", "clickRefAction", "trackReferrer", "userAction"]function(global, require, requireDynamic, requireLazy, module, exports, Bootloader, CSS, ErrorUtils, Parent, clickRefAction, trackReferrer, userAction) {
    var n = null,
        o = /async(?:-post)?|dialog(?:-post)?|theater|toggle/,
        p = document.documentElement;

    function q(u, v) {
        u = Parent.byAttribute(u, v);
        if (!u) return;
        do {
            var w = u.getAttribute(v);
            JSON.parse(w).forEach(function(x) {
                var y = u;
                Bootloader.loadModules.call(Bootloader, [x[0]], function(z) {
                    z[x[1]](y);
                });
            });
        } while (u = Parent.byAttribute(u.parentNode, v));
        return false;
    }
    p.onclick = ErrorUtils.guard(function(u) {
        u = u || window.event;
        n = u.target || u.srcElement;
        var v = q(n, 'data-onclick'),
            w = Parent.byTag(n, 'A');
        if (!w) return v;
        var x = w.getAttribute('ajaxify'),
            y = w.href,
            z = x || y;
        if (z) {
            clickRefAction('global', w, u).coalesce_namespace('primer');
            var aa = userAction('primer', w, u, {
                mode: 'DEDUP'
            }).uai_fallback('click');
        }
        if (x && y && !(/#$/).test(y)) {
            var ba = u.which && u.which === 2,
                ca = u.altKey || u.ctrlKey || u.metaKey || u.shiftKey;
            if (ba || ca) return;
        }
        trackReferrer(w, z);
        var da = w.rel && w.rel.match(o);
        da = da && da[0];
        switch (da) {
            case 'dialog':
            case 'dialog-post':
                Bootloader.loadModules(["AsyncDialog"], function(ea) {
                    ea.bootstrap(z, w, da);
                });
                break;
            case 'async':
            case 'async-post':
                Bootloader.loadModules(["AsyncRequest"], function(ea) {
                    ea.bootstrap(z, w);
                });
                break;
            case 'theater':
                Bootloader.loadModules(["PhotoSnowlift"], function(ea) {
                    ea.bootstrap(z, w);
                });
                break;
            case 'toggle':
                CSS.toggleClass(w.parentNode, 'openToggler');
                Bootloader.loadModules(["Toggler"], function(ea) {
                    ea.bootstrap(w);
                });
                break;
            default:
                return v;
        }
        return false;
    }, 'Primer click');
    p.onsubmit = ErrorUtils.guard(function(u) {
        u = u || window.event;
        var v = u.target || u.srcElement;
        if (v && v.nodeName == 'FORM' && v.getAttribute('rel') == 'async') {
            clickRefAction('exports', v, u).coalesce_namespace('primer');
            var w = userAction('primer', v, u, {
                mode: 'DEDUP'
            }).uai_fallback('submit'),
                x = n;
            Bootloader.loadModules(["Form"], function(y) {
                y.bootstrap(v, x);
            });
            return false;
        }
    }, 'Primer submit');
    var r = null,
        s = function(u, v) {
            v = v || window.event;
            r = v.target || v.srcElement;
            q(r, 'data-on' + u);
            var w = Parent.byAttribute(r, 'data-hover');
            if (!w) return;
            switch (w.getAttribute('data-hover')) {
                case 'tooltip':
                    Bootloader.loadModules(["Tooltip"], function(x) {
                        x.process(w, r);
                    });
                    break;
            }
        };
    p.onmouseover = ErrorUtils.guard(s.bind(null, 'mouseover'), 'Primer mouseover');
    var t = ErrorUtils.guard(s.bind(null, 'focus'), 'Primer focus');
    if (p.addEventListener) {
        p.addEventListener('focus', t, true);
    } else p.attachEvent('onfocusin', t);
});
