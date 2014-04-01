__d("Bootloader",["BootloaderConfig","CSSLoader","CallbackDependencyManager","setTimeoutAcrossTransitions","createArrayFrom","ErrorUtils","ex"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, BootloaderConfig/*g*/, CSSLoader/*h*/, CallbackDependencyManager/*i*/, setTimeoutAcrossTransitions/*j*/, createArrayFrom/*k*/, ErrorUtils/*l*/, ex/*m*/) {
    var n = {}, o = {}, p = {}, q = {}, r = null,
        s = {}, t = {}, u = {}, v = {}, w = {}, x = {}, y = false,
        z = [],
        aa = new CallbackDependencyManager/*i*/(),
        ba = Date.now();
    ErrorUtils/*l*/.addListener(function(ma) {
        ma.loadingUrls = Object.keys(t);
    }, true);

    function ca(ma) {
        var na = new Error(ma);
        na.guard = 'Bootloader';
        ErrorUtils/*l*/.reportError(na);
    }

    function da() {
        return document.documentMode || +(/MSIE.(\requireLazy/*d*/+)/.exec(navigator.userAgent) || [])[1];
    }

    function ea() {
        if (!BootloaderConfig/*g*/.retry_on_timeout || !BootloaderConfig/*g*/.is_not_mobile || da() || !BootloaderConfig/*g*/.timeout || BootloaderConfig/*g*/.timeout < 0) return false;
        return true;
    }

    function fa(ma, na, oa, pa) {
        var qa = document.createElement('script');
        qa.src = ma;
        qa.async = true;
        var ra = s[na];
        if (ra && ra.crossOrigin) qa.crossOrigin = 'anonymous';
        qa.onload = oa;
        qa.onerror = function() {
            v[ma] = true;
            oa();
        };
        qa.onreadystatechange = function() {
            if (this.readyState in {
                loaded: 1,
                complete: 1
            }) oa();
        };
        pa.appendChild(qa);
        return qa;
    }

    function ga(ma, na, oa, pa) {
        var qa = la.done.bind(null, [oa], na);
        t[na] = Date.now();
        if (ma == 'js') {
            var ra = fa(na, oa, qa, pa);
            if (ea()) q[na] = setTimeoutAcrossTransitions/*j*/(function() {
                delete q[na];
                if (r) {
                    if (ra.parentNode && ra.parentNode === r) r.removeChild(ra);
                    w[na] = Date.now();
                    fa(na, oa, qa, r);
                }
            }, BootloaderConfig/*g*/.timeout);
        } else if (ma == 'css') CSSLoader/*h*/.loadStyleSheet(oa, na, pa, qa, function() {
            ca(ex/*m*/('CSS timeout [%s] at %s', oa, na));
            v[na] = true;
            qa();
        });
    }

    function ha(ma) {
        if (!s[ma]) {
            ca(ex/*m*/('Missing unloading resource %s', ma));
            return;
        }
        if (s[ma].type == 'css') {
            CSSLoader/*h*/.unloadStyleSheet(ma);
            delete n[ma];
            aa.unsatisfyPersistentDependency(ma);
        }
    }

    function ia(ma, na) {
        if (!y) {
            z.push([ma, na]);
            return;
        }
        ma = createArrayFrom/*k*/(ma);
        var oa = [];
        for (var pa = 0; pa < ma.length; ++pa) {
            if (!ma[pa]) {
                ca(ex/*m*/('Empty component!'));
                continue;
            }
            var qa = p[ma[pa]];
            if (qa) {
                var ra = qa.resources;
                for (var sa = 0; sa < ra.length; ++sa) oa.push(ra[sa]);
            }
        }
        la.loadResources(oa, na);
    }

    function ja(ma) {
        if (ma) {
            n[ma] = true;
        } else ca(ex/*m*/('Making an empty resource (%s) as requested', typeof ma));
    }

    function ka(ma) {
        if (!ma) return [];
        var na = [];
        for (var oa = 0; oa < ma.length; ++oa)
            if (typeof ma[oa] == 'string') {
                if (ma[oa] in s) {
                    na.push(s[ma[oa]]);
                } else ca(ex/*m*/('Unable to resolve resource %s.', ma[oa]));
            } else na.push(ma[oa]);
        return na;
    }
    var la = {
        configurePage: function(ma) {
            var na = {}, oa = ka(ma),
                pa;
            for (pa = 0; pa < oa.length; pa++) {
                na[oa[pa].src] = oa[pa];
                ja(oa[pa].name);
            }
            var qa = document.getElementsByTagName('link'),
                ra = 0;
            for (pa = 0; pa < qa.length; ++pa) {
                if (qa[pa].rel != 'stylesheet') continue;
                for (var sa in na)
                    if (qa[pa].href.indexOf(sa) !== -1) {
                        var ta = na[sa].name;
                        if (na[sa].permanent) o[ta] = true;
                        delete na[sa];
                        CSSLoader/*h*/.registerLoadedStyleSheet(ta, qa[pa]);
                        la.done([ta]);
                        ra++;
                        break;
                    }
            }
            if (ra != oa.length) ca(ex/*m*/('configurePage: Found %requireLazy/*d*/ out of %requireLazy/*d*/ items', ra, oa.length));
        },
        loadComponents: function(ma, na) {
            ma = createArrayFrom/*k*/(ma);
            var oa = [];
            for (var pa = 0; pa < ma.length; pa++) {
                var qa = p[ma[pa]],
                    ra = 'legacy:' + ma[pa];
                if (p[ra]) {
                    if (qa) ca(ex/*m*/('%s has global/*a*/ conflicting legacy component. That cannot happen ' + 'and legacy won btw.', ma[pa]));
                    ma[pa] = ra;
                    oa.push(ra);
                    continue;
                }
                if (!qa) {
                    ca(ex/*m*/('loadComponents: %s is not in the component map.', ma[pa]));
                } else if (qa.module) {
                    oa.push(ma[pa]);
                    ca(ex/*m*/('loadComponents: Loading module %s!', ma[pa]));
                }
            }
            ia(ma, oa.length ? requireLazy/*d*/.bind(null, oa, na) : na);
        },
        loadModules: function(ma, na) {
            var oa = [];
            for (var pa = 0; pa < ma.length; pa++) {
                var qa = p[ma[pa]];
                if (!qa) {
                    ca(ex/*m*/('loadModules: %s is not in the component map.', ma[pa]));
                    oa.push(ma[pa]);
                } else if (qa.module) {
                    oa.push(ma[pa]);
                } else {
                    var ra = qa.resources,
                        sa = true;
                    for (var ta = 0; ta < ra.length; ta++) {
                        var ua = s[ra[ta]];
                        if (!ua || ua.type != 'css') sa = false;
                    }
                    if (!sa) ca(ex/*m*/('loadModules: %s is not global/*a*/ module!', ma[pa]));
                }
            }
            ia(ma, requireLazy/*d*/.bind(null, oa, na));
        },
        loadResources: function(ma, na, oa, pa) {
            var qa;
            ma = ka(createArrayFrom/*k*/(ma));
            if (oa) {
                var ra = {};
                for (qa = 0; qa < ma.length; ++qa) ra[ma[qa].name] = true;
                for (var sa in n)
                    if (!(sa in o) && !(sa in ra) && !(sa in x)) ha(sa);
                x = {};
            }
            var ta = [],
                ua = [];
            for (qa = 0; qa < ma.length; ++qa) {
                var va = ma[qa];
                if (va.permanent) o[va.name] = true;
                if (aa.isPersistentDependencySatisfied(va.name)) continue;
                if (!va.nonblocking) ua.push(va.name);
                if (!n[va.name]) {
                    ja(va.name);
                    ta.push(va);
                    window.CavalryLogger && window.CavalryLogger.getInstance().measureResources(va, pa);
                }
            }
            var wa;
            if (na)
                if (typeof na === 'function') {
                    wa = aa.registerCallback(na, ua);
                } else wa = aa.addDependenciesToExistingCallback(na, ua);
            var xa = la.getHardpoint(),
                ya = da() ? xa : document.createDocumentFragment();
            for (qa = 0; qa < ta.length; ++qa) ga(ta[qa].type, ta[qa].src, ta[qa].name, ya);
            if (xa !== ya) xa.appendChild(ya);
            return wa;
        },
        requestJSResource: function(ma) {
            var na = la.getHardpoint();
            ga('js', ma, null, na);
        },
        done: function(ma, na) {
            if (na) {
                u[na] = Date.now() - t[na];
                delete t[na];
                if (q[na]) {
                    clearTimeout(q[na]);
                    delete q[na];
                }
            }
            for (var oa = 0; oa < ma.length; ++oa) {
                var pa = ma[oa];
                if (pa) {
                    ja(pa);
                    aa.satisfyPersistentDependency(pa);
                }
            }
        },
        enableBootload: function(ma) {
            for (var na in ma)
                if (!p[na]) p[na] = ma[na];
            if (!y) {
                y = true;
                for (var oa = 0; oa < z.length; oa++) ia.apply(null, z[oa]);
                z = [];
            }
        },
        getHardpoint: function() {
            if (!r) {
                var ma = document.getElementsByTagName('head');
                r = ma.length && ma[0] || document.body;
            }
            return r;
        },
        setResourceMap: function(ma) {
            for (var na in ma)
                if (!s[na]) {
                    ma[na].name = na;
                    s[na] = ma[na];
                }
        },
        getResourceURLs: function() {
            var ma = {};
            for (var na in s) {
                var oa = s[na].src;
                ma[oa] = (na in n) && !(oa in v) && !(oa in t);
            }
            return ma;
        },
        loadEarlyResources: function(ma) {
            la.setResourceMap(ma);
            var na = [];
            for (var oa in ma) {
                var pa = s[oa];
                na.push(pa);
                if (!pa.permanent) x[pa.name] = pa;
            }
            la.loadResources(na);
        },
        getLoadingUrls: function() {
            var ma = {}, na = Date.now();
            for (var oa in t) ma[oa] = na - t[oa];
            return ma;
        },
        getLoadedUrlTimes: function() {
            return u;
        },
        getErrorUrls: function() {
            return Object.keys(v);
        },
        getStartTime: function() {
            return ba;
        },
        getRetriedUrls: function() {
            return Object.keys(w);
        }
    };
    module/*e*/.exports = la;
});