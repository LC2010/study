__d("URLFragmentPrelude", ["ScriptPath", "URLFragmentPreludeConfig"]function(global, require, requireDynamic, requireLazy, module, exports, ScriptPath, URLFragmentPreludeConfig) {
    var i = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
        j = '',
        k = /^[^\/\\#!\.\?\*\&\^=]+$/;
    window.location.href.replace(i, function(l, m, n, o) {
        var p, q, r, s;
        p = q = m + (n ? '?' + n : '');
        if (o) {
            if (URLFragmentPreludeConfig.incorporateQuicklingFragment) {
                var t = o.replace(/^(!|%21)/, '');
                r = t.charAt(0);
                if (r == '/' || r == '\\') p = t.replace(/^[\\\/]+/, '/');
            }
            if (URLFragmentPreludeConfig.hashtagRedirect)
                if (q == p) {
                    var u = o.match(k);
                    if (u && !n && m == '/') p = '/hashtag/' + o;
                }
        }
        if (p != q) {
            s = ScriptPath.getScriptPath();
            if (s) document.cookie = "rdir=" + s + "; path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
            window.location.replace(j + p);
        }
    });
});
