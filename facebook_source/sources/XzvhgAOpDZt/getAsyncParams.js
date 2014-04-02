__d("getAsyncParams",["CurrentUser","DTSG","ISB","LSD","ServerJSDefine","SiteData","URIBase","PHPQuerySerializer"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, CurrentUser/*g*/, DTSG/*h*/, ISB/*i*/, LSD/*j*/, ServerJSDefine/*k*/, SiteData/*l*/, URIBase/*m*/, PHPQuerySerializer/*n*/) {
    var o = 1;

    function p(q) {
        var r = {
            __user: CurrentUser/*g*/.getID(),
            __a: 1,
            __dyn: ServerJSDefine/*k*/.getLoadedModuleHash(),
            __req: (o++).toString(36)
        }, s = new URIBase/*m*/(window.location.href, PHPQuerySerializer/*n*/).getQueryData();
        for (var t in s)
            if (s.hasOwnProperty(t))
                if (t.substr(0, 3) === 'mh_') r[t] = s[t];
        if (q == 'POST' && DTSG/*h*/.getToken()) {
            r.fb_dtsg = DTSG/*h*/.getToken();
            var u = '';
            for (var v = 0; v < r.fb_dtsg.length; v++) u += r.fb_dtsg.charCodeAt(v);
            r.ttstamp = '2' + u;
        }
        if (q == 'POST' && LSD/*j*/.token) r.lsd = LSD/*j*/.token;
        if (ISB/*i*/.token) r.fb_isb = ISB/*i*/.token;
        if (SiteData/*l*/.revision) r.__rev = SiteData/*l*/.revision;
        return r;
    }
    module/*e*/.exports = p;
});