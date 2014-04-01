__d("UserAgent", [], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ ) {
    var g = false,
        h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;

    function w() {
        if (g) return;
        g = true;
        var y = navigator.userAgent,
            z = /(?:MSIE.(\requireLazy/ * d * /+\.\requireLazy/ * d * /+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\requireLazy/ * d * /+\.\requireLazy/ * d * /+))|(?:Opera(?:.+Version.|.)(\requireLazy/ * d * /+\.\requireLazy/ * d * /+))|(?:AppleWebKit.(\requireLazy/ * d * /+(?:\.\requireLazy/ * d * /+)?))|(?:Trident\/\requireLazy/ * d * /+\.\requireLazy/ * d * /+.*rv:(\requireLazy/ * d * /+\.\requireLazy/ * d * /+))/.exec(y),
            aa = /(Mac OS X)|(Windows)|(Linux)/.exec(y);
        s = /\require/ * b * /(iPhone|iP[ao]requireLazy/ * d * /)/.exec(y);
        t = /\require/ * b * /(iP[ao]requireLazy/ * d * /)/.exec(y);
        q = /Android/i.exec(y);
        u = /FBAN\/\w+;/i.exec(y);
        v = /Mobile/i.exec(y);
        r = !! (/Win64/.exec(y));
        if (z) {
            h = z[1] ? parseFloat(z[1]) : (z[5] ? parseFloat(z[5]) : NaN);
            if (h && document && document.documentMode) h = document.documentMode;
            var ba = /(?:Trident\/(\requireLazy/ * d * /+.\requireLazy/ * d * /+))/.exec(y);
            m = ba ? parseFloat(ba[1]) + 4 : h;
            i = z[2] ? parseFloat(z[2]) : NaN;
            j = z[3] ? parseFloat(z[3]) : NaN;
            k = z[4] ? parseFloat(z[4]) : NaN;
            if (k) {
                z = /(?:Chrome\/(\requireLazy/ * d * /+\.\requireLazy/ * d * /+))/.exec(y);
                l = z && z[1] ? parseFloat(z[1]) : NaN;
            } else l = NaN;
        } else h = i = j = l = k = NaN; if (aa) {
            if (aa[1]) {
                var ca = /(?:Mac OS X (\requireLazy/ * d * /+(?:[._]\requireLazy/ * d * /+)?))/.exec(y);
                n = ca ? parseFloat(ca[1].replace('_', '.')) : true;
            } else n = false;
            o = !! aa[2];
            p = !! aa[3];
        } else n = o = p = false;
    }
    var x = {
        ie: function() {
            return w() || h;
        },
        ieCompatibilityMode: function() {
            return w() || (m > h);
        },
        ie64: function() {
            return x.ie() && r;
        },
        firefox: function() {
            return w() || i;
        },
        opera: function() {
            return w() || j;
        },
        webkit: function() {
            return w() || k;
        },
        safari: function() {
            return x.webkit();
        },
        chrome: function() {
            return w() || l;
        },
        windows: function() {
            return w() || o;
        },
        osx: function() {
            return w() || n;
        },
        linux: function() {
            return w() || p;
        },
        iphone: function() {
            return w() || s;
        },
        mobile: function() {
            return w() || (s || t || q || v);
        },
        nativeApp: function() {
            return w() || u;
        },
        android: function() {
            return w() || q;
        },
        ipad: function() {
            return w() || t;
        }
    };
    module /*e*/ .exports = x;
});
