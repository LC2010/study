__d("URLFragmentPrelude", ["ScriptPath", "URLFragmentPreludeConfig"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , ScriptPath /*g*/ , URLFragmentPreludeConfig /*h*/ ) {
    var i = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
        j = '',
        k = /^[^\/\\#!\.\?\*\&\^=]+$/;
    window.location.href.replace(i, function(l, m, n, o) {
        var p, q, r, s;
        p = q = m + (n ? '?' + n : '');
        if (o) {
            if (URLFragmentPreludeConfig /*h*/ .incorporateQuicklingFragment) {
                var t = o.replace(/^(!|%21)/, '');
                r = t.charAt(0);
                if (r == '/' || r == '\\') p = t.replace(/^[\\\/]+/, '/');
            }
            if (URLFragmentPreludeConfig /*h*/ .hashtagRedirect)
                if (q == p) {
                    var u = o.match(k);
                    if (u && !n && m == '/') p = '/hashtag/' + o;
                }
        }
        if (p != q) {
            s = ScriptPath /*g*/ .getScriptPath();
            if (s) document.cookie = "rdir=" + s + "; path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
            window.location.replace(j + p);
        }
    });
});
