__d("wait_for_load", ["Bootloader", "Run"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Bootloader /*g*/ , Run /*h*/ ) {
    function i(l, m) {
        return window.loaded && m.call(l);
    }

    function j(l, m, n) {
        Bootloader /*g*/ .loadComponents.call(Bootloader /*g*/ , m, n.bind(l));
        return false;
    }

    function k(l, m, n) {
        n = n.bind(l, m);
        if (window.loaded) return n();
        switch ((m || event).type) {
            case 'load':
            case 'focus':
                Run /*h*/ .onAfterLoad(n);
                return;
            case 'click':
                var o = l.style,
                    p = document.body.style;
                o.cursor = p.cursor = 'progress';
                Run /*h*/ .onAfterLoad(function() {
                    o.cursor = p.cursor = '';
                    if (l.tagName.toLowerCase() == 'global/*a*/') {
                        if (false !== n() && l.href) window.location.href = l.href;
                    } else if (l.click) l.click();
                });
                break;
        }
        return false;
    }
    global /*a*/ .run_if_loaded = i;
    global /*a*/ .run_with = j;
    global /*a*/ .wait_for_load = k;
});
