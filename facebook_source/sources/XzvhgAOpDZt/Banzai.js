__d("Banzai", ["BanzaiAdapter", "CurrentUser", "ErrorUtils", "FBJSON", "WebStorage", "WebStorageMutex", "emptyFunction", "isInIframe", "pageID", "setTimeoutAcrossTransitions"]function(global, require, requireDynamic, requireLazy, module, exports, BanzaiAdapter, CurrentUser, ErrorUtils, FBJSON, WebStorage, WebStorageMutex, emptyFunction, isInIframe, pageID, setTimeoutAcrossTransitions) {
    var q = BanzaiAdapter.adapter,
        r = isInIframe(),
        s = 'bz:',
        t = 0,
        u = 1,
        v = 2,
        w, x, y = [],
        z = null;

    function aa(fa) {
        return fa[2] >= Date.now() - (q.config.EXPIRY || BanzaiAdapter.EXPIRY);
    }

    function ba(fa) {
        var ga = Date.now() + fa;
        if (!x || ga < x) {
            x = ga;
            clearTimeout(w);
            w = setTimeoutAcrossTransitions(ca, fa);
            return true;
        }
    }

    function ca() {
        x = null;
        ba(BanzaiAdapter.BASIC.delay);
        if (!q.readyToSend()) return;
        q.inform(BanzaiAdapter.SEND);
        var fa = [],
            ga = [],
            ha = {};
        y = y.filter(function(ia) {
            var ja = ia.__meta;
            if (ja.status >= v || !aa(ia)) return false;
            if (ja.status >= u) return true;
            var ka = ja.pageID + CurrentUser.getID(),
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
            q.inform(BanzaiAdapter.OK);
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
    var da, ea = WebStorage.getLocalStorage();
    if (ea && !r) {
        da = {
            store: function fa() {
                if (y.length <= 0) return;
                var ga = y.map(function(ha) {
                    return [ha[0], ha[1], ha[2], ha[3] || 0, ha.__meta];
                });
                y = [];
                ea.setItem(s + pageID + '.' + Date.now(), FBJSON.stringify(ga));
            },
            restore: function fa() {
                (new WebStorageMutex('banzai')).lock(function(ga) {
                    var ha = [];
                    for (var ia = 0; ia < ea.length; ia++) {
                        var ja = ea.key(ia);
                        if (ja.indexOf(s) === 0 && ja.indexOf('bz:__') !== 0) ha.push(ja);
                    }
                    ha.forEach(function(ka) {
                        var la = ea.getItem(ka);
                        ea.removeItem(ka);
                        if (!la) return;
                        var ma = FBJSON.parse(la, module.id);
                        ma.forEach(function(na) {
                            if (!na) return;
                            var oa = na.__meta = na.pop(),
                                pa = aa(na);
                            if (pa && oa.userID == CurrentUser.getID()) {
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
        store: emptyFunction,
        restore: emptyFunction
    };
    BanzaiAdapter.SEND = 'Banzai:SEND';
    BanzaiAdapter.OK = 'Banzai:OK';
    BanzaiAdapter.ERROR = 'Banzai:ERROR';
    BanzaiAdapter.SHUTDOWN = 'Banzai:SHUTDOWN';
    BanzaiAdapter.SEND_TIMEOUT = 15000;
    BanzaiAdapter.VITAL_WAIT = 1000;
    BanzaiAdapter.BASIC_WAIT = 60000;
    BanzaiAdapter.EXPIRY = 30 * 60000;
    BanzaiAdapter.VITAL = {
        delay: q.config.MIN_WAIT || BanzaiAdapter.VITAL_WAIT
    };
    BanzaiAdapter.BASIC = {
        delay: q.config.MAX_WAIT || BanzaiAdapter.BASIC_WAIT
    };
    BanzaiAdapter.FBTRACE = q.config.fbtrace, BanzaiAdapter.isEnabled = function(fa) {
        return q.config.gks && q.config.gks[fa];
    };
    BanzaiAdapter.post = function(fa, ga, ha) {
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
                la = global.top.require('Banzai');
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
            pageID: pageID,
            userID: CurrentUser.getID(),
            status: t
        };
        y.push(na);
        ja != null ? ja : BanzaiAdapter.BASIC_WAIT;
        if (ba(ja) || !z) z = fa;
    };
    BanzaiAdapter.subscribe = q.subscribe;
    BanzaiAdapter._schedule = ba;
    BanzaiAdapter._store = function(fa) {
        ErrorUtils.applyWithGuard(da.store, da);
    };
    BanzaiAdapter._restore = function(fa) {
        ErrorUtils.applyWithGuard(da.restore, da);
        ba(q.config.RESTORE_WAIT || BanzaiAdapter.VITAL_WAIT);
    };
    BanzaiAdapter._unload = function() {
        q.cleanup();
        q.inform(BanzaiAdapter.SHUTDOWN);
        ErrorUtils.applyWithGuard(da.store, da);
    };
    BanzaiAdapter._testState = function() {
        return {
            postBuffer: y,
            triggerRoute: z
        };
    };
    if (BanzaiAdapter.isEnabled('adapterhooks')) {
        q.setHooks(da);
    } else q.onUnload(BanzaiAdapter._unload);
    BanzaiAdapter._restore();
    module.exports = BanzaiAdapter;
});
