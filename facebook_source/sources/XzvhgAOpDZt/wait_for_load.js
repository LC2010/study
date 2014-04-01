__d("wait_for_load", ["Bootloader", "Run"]function(global, require, requireDynamic, requireLazy, module, exports, Bootloader, Run) {
    function i(l, m) {
        return window.loaded && m.call(l);
    }

    function j(l, m, n) {
        Bootloader.loadComponents.call(Bootloader, m, n.bind(l));
        return false;
    }

    function k(l, m, n) {
        n = n.bind(l, m);
        if (window.loaded) return n();
        switch ((m || event).type) {
            case 'load':
            case 'focus':
                Run.onAfterLoad(n);
                return;
            case 'click':
                var o = l.style,
                    p = document.body.style;
                o.cursor = p.cursor = 'progress';
                Run.onAfterLoad(function() {
                    o.cursor = p.cursor = '';
                    if (l.tagName.toLowerCase() == 'global') {
                        if (false !== n() && l.href) window.location.href = l.href;
                    } else if (l.click) l.click();
                });
                break;
        }
        return false;
    }
    global.run_if_loaded = i;
    global.run_with = j;
    global.wait_for_load = k;
});
