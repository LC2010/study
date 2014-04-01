__d("BanzaiAdapter", ["Arbiter", "CurrentUser", "Miny", "QueryString", "Run", "SiteData", "UserAgent", "getAsyncParams", "getSameOriginTransport", "setTimeoutAcrossTransitions", "BanzaiConfig"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter, CurrentUser, Miny, QueryString, Run, SiteData, UserAgent, getAsyncParams, getSameOriginTransport, setTimeoutAcrossTransitions, BanzaiConfig) {
    var r = null,
        s = new Arbiter(),
        t = '/ajax/bz',
        u = {}, v = u.adapter = {
            config: BanzaiConfig,
            getUserID: function() {
                return CurrentUser.getID();
            },
            inform: function(w) {
                s.inform(w);
            },
            subscribe: function(w, x) {
                s.subscribe(w, x);
            },
            cleanup: function() {
                if (r && r.readyState < 4) r.abort();
                if (r) {
                    delete r.onreadystatechange;
                    r = null;
                }
            },
            readyToSend: function() {
                var w = UserAgent.ie() <= 8 ? true : navigator.onLine;
                return !r && w;
            },
            send: function(w, x, y) {
                var z = 'POST';
                r = getSameOriginTransport();
                r.open(z, t, true);
                r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                r.onreadystatechange = function() {
                    if (r.readyState >= 4) {
                        var da;
                        try {
                            da = r.status;
                        } catch (ea) {
                            da = 0;
                        }
                        v.cleanup();
                        if (da == 200) {
                            if (x) x();
                            v.inform(u.OK);
                        } else {
                            if (y) y(da);
                            v.inform(u.ERROR);
                        }
                    }
                };
                setTimeoutAcrossTransitions(v.cleanup, u.SEND_TIMEOUT);
                var aa = getAsyncParams(z);
                aa.BanzaiConfig = JSON.stringify(w);
                aa.ts = Date.now();
                aa.ph = SiteData.push_phase;
                if (u.FBTRACE) aa.fbtrace = u.FBTRACE;
                if (u.isEnabled('miny_compression')) {
                    var ba = Date.now(),
                        ca = Miny.encode(aa.BanzaiConfig);
                    if (ca.length < aa.BanzaiConfig.length) {
                        aa.BanzaiConfig = ca;
                        aa.miny_encode_ms = Date.now() - ba;
                    }
                }
                r.send(QueryString.encode(aa));
            },
            setHooks: function(w) {
                Run.onAfterUnload(u._unload);
            },
            onUnload: function(w) {
                Run.onAfterUnload(w);
            }
        };
    module.exports = u;
});
