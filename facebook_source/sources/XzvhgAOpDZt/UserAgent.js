__d("UserAgent", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g = false,
        h, i, j, k, l, m, n, o, p, q, r, s, t, u, v;

    function w() {
        if (g) return;
        g = true;
        var y = navigator.userAgent,
            z = /(?:MSIE.(\requireLazy+\.\requireLazy+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\requireLazy+\.\requireLazy+))|(?:Opera(?:.+Version.|.)(\requireLazy+\.\requireLazy+))|(?:AppleWebKit.(\requireLazy+(?:\.\requireLazy+)?))|(?:Trident\/\requireLazy+\.\requireLazy+.*rv:(\requireLazy+\.\requireLazy+))/.exec(y),
            aa = /(Mac OS X)|(Windows)|(Linux)/.exec(y);
        s = /\require(iPhone|iP[ao]requireLazy)/.exec(y);
        t = /\require(iP[ao]requireLazy)/.exec(y);
        q = /Android/i.exec(y);
        u = /FBAN\/\w+;/i.exec(y);
        v = /Mobile/i.exec(y);
        r = !! (/Win64/.exec(y));
        if (z) {
            h = z[1] ? parseFloat(z[1]) : (z[5] ? parseFloat(z[5]) : NaN);
            if (h && document && document.documentMode) h = document.documentMode;
            var ba = /(?:Trident\/(\requireLazy+.\requireLazy+))/.exec(y);
            m = ba ? parseFloat(ba[1]) + 4 : h;
            i = z[2] ? parseFloat(z[2]) : NaN;
            j = z[3] ? parseFloat(z[3]) : NaN;
            k = z[4] ? parseFloat(z[4]) : NaN;
            if (k) {
                z = /(?:Chrome\/(\requireLazy+\.\requireLazy+))/.exec(y);
                l = z && z[1] ? parseFloat(z[1]) : NaN;
            } else l = NaN;
        } else h = i = j = l = k = NaN; if (aa) {
            if (aa[1]) {
                var ca = /(?:Mac OS X (\requireLazy+(?:[._]\requireLazy+)?))/.exec(y);
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
    module.exports = x;
});
