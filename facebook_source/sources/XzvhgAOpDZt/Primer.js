__d("Primer", ["Bootloader", "CSS", "ErrorUtils", "Parent", "clickRefAction", "trackReferrer", "userAction"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Bootloader /*g*/ , CSS /*h*/ , ErrorUtils /*i*/ , Parent /*j*/ , clickRefAction /*k*/ , trackReferrer /*l*/ , userAction /*m*/ ) {
    var n = null,
        o = /async(?:-post)?|dialog(?:-post)?|theater|toggle/,
        p = document.documentElement;

    function q(u, v) {
        u = Parent /*j*/ .byAttribute(u, v);
        if (!u) return;
        do {
            var w = u.getAttribute(v);
            JSON.parse(w).forEach(function(x) {
                var y = u;
                Bootloader /*g*/ .loadModules.call(Bootloader /*g*/ , [x[0]], function(z) {
                    z[x[1]](y);
                });
            });
        } while (u = Parent /*j*/ .byAttribute(u.parentNode, v));
        return false;
    }
    p.onclick = ErrorUtils /*i*/ .guard(function(u) {
        u = u || window.event;
        n = u.target || u.srcElement;
        var v = q(n, 'data-onclick'),
            w = Parent /*j*/ .byTag(n, 'A');
        if (!w) return v;
        var x = w.getAttribute('ajaxify'),
            y = w.href,
            z = x || y;
        if (z) {
            clickRefAction /*k*/ ('global/*a*/', w, u).coalesce_namespace('primer');
            var aa = userAction /*m*/ ('primer', w, u, {
                mode: 'DEDUP'
            }).uai_fallback('click');
        }
        if (x && y && !(/#$/).test(y)) {
            var ba = u.which && u.which === 2,
                ca = u.altKey || u.ctrlKey || u.metaKey || u.shiftKey;
            if (ba || ca) return;
        }
        trackReferrer /*l*/ (w, z);
        var da = w.rel && w.rel.match(o);
        da = da && da[0];
        switch (da) {
            case 'dialog':
            case 'dialog-post':
                Bootloader /*g*/ .loadModules(["AsyncDialog"], function(ea) {
                    ea.bootstrap(z, w, da);
                });
                break;
            case 'async':
            case 'async-post':
                Bootloader /*g*/ .loadModules(["AsyncRequest"], function(ea) {
                    ea.bootstrap(z, w);
                });
                break;
            case 'theater':
                Bootloader /*g*/ .loadModules(["PhotoSnowlift"], function(ea) {
                    ea.bootstrap(z, w);
                });
                break;
            case 'toggle':
                CSS /*h*/ .toggleClass(w.parentNode, 'openToggler');
                Bootloader /*g*/ .loadModules(["Toggler"], function(ea) {
                    ea.bootstrap(w);
                });
                break;
            default:
                return v;
        }
        return false;
    }, 'Primer click');
    p.onsubmit = ErrorUtils /*i*/ .guard(function(u) {
        u = u || window.event;
        var v = u.target || u.srcElement;
        if (v && v.nodeName == 'FORM' && v.getAttribute('rel') == 'async') {
            clickRefAction /*k*/ ('exports/*f*/', v, u).coalesce_namespace('primer');
            var w = userAction /*m*/ ('primer', v, u, {
                mode: 'DEDUP'
            }).uai_fallback('submit'),
                x = n;
            Bootloader /*g*/ .loadModules(["Form"], function(y) {
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
            var w = Parent /*j*/ .byAttribute(r, 'data-hover');
            if (!w) return;
            switch (w.getAttribute('data-hover')) {
                case 'tooltip':
                    Bootloader /*g*/ .loadModules(["Tooltip"], function(x) {
                        x.process(w, r);
                    });
                    break;
            }
        };
    p.onmouseover = ErrorUtils /*i*/ .guard(s.bind(null, 'mouseover'), 'Primer mouseover');
    var t = ErrorUtils /*i*/ .guard(s.bind(null, 'focus'), 'Primer focus');
    if (p.addEventListener) {
        p.addEventListener('focus', t, true);
    } else p.attachEvent('onfocusin', t);
});
