__d("getAsyncParams", ["CurrentUser", "DTSG", "ISB", "LSD", "ServerJSDefine", "SiteData", "URIBase", "PHPQuerySerializer"]function(global, require, requireDynamic, requireLazy, module, exports, CurrentUser, DTSG, ISB, LSD, ServerJSDefine, SiteData, URIBase, PHPQuerySerializer) {
    var o = 1;

    function p(q) {
        var r = {
            __user: CurrentUser.getID(),
            __a: 1,
            __dyn: ServerJSDefine.getLoadedModuleHash(),
            __req: (o++).toString(36)
        }, s = new URIBase(window.location.href, PHPQuerySerializer).getQueryData();
        for (var t in s)
            if (s.hasOwnProperty(t))
                if (t.substr(0, 3) === 'mh_') r[t] = s[t];
        if (q == 'POST' && DTSG.getToken()) {
            r.fb_dtsg = DTSG.getToken();
            var u = '';
            for (var v = 0; v < r.fb_dtsg.length; v++) u += r.fb_dtsg.charCodeAt(v);
            r.ttstamp = '2' + u;
        }
        if (q == 'POST' && LSD.token) r.lsd = LSD.token;
        if (ISB.token) r.fb_isb = ISB.token;
        if (SiteData.revision) r.__rev = SiteData.revision;
        return r;
    }
    module.exports = p;
});
