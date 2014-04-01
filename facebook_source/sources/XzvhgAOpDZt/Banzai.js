__d("Banzai", ["BanzaiAdapter", "CurrentUser", "ErrorUtils", "FBJSON", "WebStorage", "WebStorageMutex", "emptyFunction", "isInIframe", "pageID", "setTimeoutAcrossTransitions"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , BanzaiAdapter /*g*/ , CurrentUser /*h*/ , ErrorUtils /*i*/ , FBJSON /*j*/ , WebStorage /*k*/ , WebStorageMutex /*l*/ , emptyFunction /*m*/ , isInIframe /*n*/ , pageID /*o*/ , setTimeoutAcrossTransitions /*p*/ ) {
    var q = BanzaiAdapter /*g*/ .adapter,
        r = isInIframe /*n*/ (),
        s = 'bz:',
        t = 0,
        u = 1,
        v = 2,
        w, x, y = [],
        z = null;

    function aa(fa) {
        return fa[2] >= Date.now() - (q.config.EXPIRY || BanzaiAdapter /*g*/ .EXPIRY);
    }

    function ba(fa) {
        var ga = Date.now() + fa;
        if (!x || ga < x) {
            x = ga;
            clearTimeout(w);
            w = setTimeoutAcrossTransitions /*p*/ (ca, fa);
            return true;
        }
    }

    function ca() {
        x = null;
        ba(BanzaiAdapter /*g*/ .BASIC.delay);
        if (!q.readyToSend()) return;
        q.inform(BanzaiAdapter /*g*/ .SEND);
        var fa = [],
            ga = [],
            ha = {};
        y = y.filter(function(ia) {
            var ja = ia.__meta;
            if (ja.status >= v || !aa(ia)) return false;
            if (ja.status >= u) return true;
            var ka = ja.pageID + CurrentUser /*h*/ .getID(),
                la = ha[ka];
            if (!la) {
                la = {
                    user: ja.userID,
                    page_id: ja.pageID,
                    posts: []
                };
                ha[ka] = la;
                fa.push(la);
            }
            ja.status = u;
            la.posts.push(ia);
            ga.push(ia);
            return ja.retry;
        });
        if (fa.length <= 0) {
            q.inform(BanzaiAdapter /*g*/ .OK);
            return;
        }
        fa[0].trigger = z;
        z = null;
        q.send(fa, function() {
            ga.forEach(function(ia) {
                ia.__meta.status = v;
            });
        }, function(ia) {
            var ja = ia >= 400 && ia < 600;
            ga.forEach(function(ka) {
                var la = ka.__meta;
                ka[3] = (ka[3] || 0) + 1;
                la.status = t;
                if (ja && !la.retry) y.push(ka);
            });
        });
    }
    var da, ea = WebStorage /*k*/ .getLocalStorage();
    if (ea && !r) {
        da = {
            store: function fa() {
                if (y.length <= 0) return;
                var ga = y.map(function(ha) {
                    return [ha[0], ha[1], ha[2], ha[3] || 0, ha.__meta];
                });
                y = [];
                ea.setItem(s + pageID /*o*/ + '.' + Date.now(), FBJSON /*j*/ .stringify(ga));
            },
            restore: function fa() {
                (new WebStorageMutex /*l*/ ('banzai')).lock(function(ga) {
                    var ha = [];
                    for (var ia = 0; ia < ea.length; ia++) {
                        var ja = ea.key(ia);
                        if (ja.indexOf(s) === 0 && ja.indexOf('bz:__') !== 0) ha.push(ja);
                    }
                    ha.forEach(function(ka) {
                        var la = ea.getItem(ka);
                        ea.removeItem(ka);
                        if (!la) return;
                        var ma = FBJSON /*j*/ .parse(la, module /*e*/ .id);
                        ma.forEach(function(na) {
                            if (!na) return;
                            var oa = na.__meta = na.pop(),
                                pa = aa(na);
                            if (pa && oa.userID == CurrentUser /*h*/ .getID()) {
                                oa.status = t;
                                y.push(na);
                            }
                        });
                    });
                    ga.unlock();
                });
            }
        };
    } else da = {
        store: emptyFunction /*m*/ ,
        restore: emptyFunction /*m*/
    };
    BanzaiAdapter /*g*/ .SEND = 'Banzai:SEND';
    BanzaiAdapter /*g*/ .OK = 'Banzai:OK';
    BanzaiAdapter /*g*/ .ERROR = 'Banzai:ERROR';
    BanzaiAdapter /*g*/ .SHUTDOWN = 'Banzai:SHUTDOWN';
    BanzaiAdapter /*g*/ .SEND_TIMEOUT = 15000;
    BanzaiAdapter /*g*/ .VITAL_WAIT = 1000;
    BanzaiAdapter /*g*/ .BASIC_WAIT = 60000;
    BanzaiAdapter /*g*/ .EXPIRY = 30 * 60000;
    BanzaiAdapter /*g*/ .VITAL = {
        delay: q.config.MIN_WAIT || BanzaiAdapter /*g*/ .VITAL_WAIT
    };
    BanzaiAdapter /*g*/ .BASIC = {
        delay: q.config.MAX_WAIT || BanzaiAdapter /*g*/ .BASIC_WAIT
    };
    BanzaiAdapter /*g*/ .FBTRACE = q.config.fbtrace, BanzaiAdapter /*g*/ .isEnabled = function(fa) {
        return q.config.gks && q.config.gks[fa];
    };
    BanzaiAdapter /*g*/ .post = function(fa, ga, ha) {
        var ia = ha && ha.retry === true,
            ja = ha && ha.delay;
        if (q.config.disabled) return;
        var ka = q.config.blacklist;
        if (ka)
            if (ka.indexOf)
                if (typeof ka.indexOf == 'function')
                    if (ka.indexOf(fa) != -1) return;
        if (r && document.domain == 'facebook.com') {
            var la;
            try {
                la = global /*a*/ .top.require('Banzai');
            } catch (ma) {
                la = null;
            }
            if (la) {
                la.post.apply(la, arguments);
                return;
            }
        }
        var na = [fa, ga, Date.now(), 0];
        na.__meta = {
            retry: ia,
            pageID: pageID /*o*/ ,
            userID: CurrentUser /*h*/ .getID(),
            status: t
        };
        y.push(na);
        ja != null ? ja : BanzaiAdapter /*g*/ .BASIC_WAIT;
        if (ba(ja) || !z) z = fa;
    };
    BanzaiAdapter /*g*/ .subscribe = q.subscribe;
    BanzaiAdapter /*g*/ ._schedule = ba;
    BanzaiAdapter /*g*/ ._store = function(fa) {
        ErrorUtils /*i*/ .applyWithGuard(da.store, da);
    };
    BanzaiAdapter /*g*/ ._restore = function(fa) {
        ErrorUtils /*i*/ .applyWithGuard(da.restore, da);
        ba(q.config.RESTORE_WAIT || BanzaiAdapter /*g*/ .VITAL_WAIT);
    };
    BanzaiAdapter /*g*/ ._unload = function() {
        q.cleanup();
        q.inform(BanzaiAdapter /*g*/ .SHUTDOWN);
        ErrorUtils /*i*/ .applyWithGuard(da.store, da);
    };
    BanzaiAdapter /*g*/ ._testState = function() {
        return {
            postBuffer: y,
            triggerRoute: z
        };
    };
    if (BanzaiAdapter /*g*/ .isEnabled('adapterhooks')) {
        q.setHooks(da);
    } else q.onUnload(BanzaiAdapter /*g*/ ._unload);
    BanzaiAdapter /*g*/ ._restore();
    module /*e*/ .exports = BanzaiAdapter /*g*/ ;
});
