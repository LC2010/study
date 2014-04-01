__d("BanzaiAdapter", ["Arbiter", "CurrentUser", "Miny", "QueryString", "Run", "SiteData", "UserAgent", "getAsyncParams", "getSameOriginTransport", "setTimeoutAcrossTransitions", "BanzaiConfig"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Arbiter /*g*/ , CurrentUser /*h*/ , Miny /*i*/ , QueryString /*j*/ , Run /*k*/ , SiteData /*l*/ , UserAgent /*m*/ , getAsyncParams /*n*/ , getSameOriginTransport /*o*/ , setTimeoutAcrossTransitions /*p*/ , BanzaiConfig /*q*/ ) {
    var r = null,
        s = new Arbiter /*g*/ (),
        t = '/ajax/bz',
        u = {}, v = u.adapter = {
            config: BanzaiConfig /*q*/ ,
            getUserID: function() {
                return CurrentUser /*h*/ .getID();
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
                var w = UserAgent /*m*/ .ie() <= 8 ? true : navigator.onLine;
                return !r && w;
            },
            send: function(w, x, y) {
                var z = 'POST';
                r = getSameOriginTransport /*o*/ ();
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
                setTimeoutAcrossTransitions /*p*/ (v.cleanup, u.SEND_TIMEOUT);
                var aa = getAsyncParams /*n*/ (z);
                aa.BanzaiConfig /*q*/ = JSON.stringify(w);
                aa.ts = Date.now();
                aa.ph = SiteData /*l*/ .push_phase;
                if (u.FBTRACE) aa.fbtrace = u.FBTRACE;
                if (u.isEnabled('miny_compression')) {
                    var ba = Date.now(),
                        ca = Miny /*i*/ .encode(aa.BanzaiConfig /*q*/ );
                    if (ca.length < aa.BanzaiConfig /*q*/ .length) {
                        aa.BanzaiConfig /*q*/ = ca;
                        aa.miny_encode_ms = Date.now() - ba;
                    }
                }
                r.send(QueryString /*j*/ .encode(aa));
            },
            setHooks: function(w) {
                Run /*k*/ .onAfterUnload(u._unload);
            },
            onUnload: function(w) {
                Run /*k*/ .onAfterUnload(w);
            }
        };
    module /*e*/ .exports = u;
});
