__d("SubmitOnEnterListener", ["Bootloader", "CSS"]function(global, require, requireDynamic, requireLazy, module, exports, Bootloader, CSS) {
    document.documentElement.onkeydown = function(i) {
        i = i || window.event;
        var j = i.target || i.srcElement,
            k = i.keyCode == 13 && !i.altKey && !i.ctrlKey && !i.metaKey && !i.shiftKey && CSS.hasClass(j, 'enter_submit');
        if (k) {
            Bootloader.loadModules(["DOM", "Input", "trackReferrer", "Form"], function(l, m, n, o) {
                if (!m.isEmpty(j)) {
                    var p = j.form,
                        q = l.scry(p, '.enter_submit_target')[0] || l.scry(p, '[type="submit"]')[0];
                    if (q) {
                        var r = o.getAttribute(p, 'ajaxify') || o.getAttribute(p, 'action');
                        if (r) n(p, r);
                        q.click();
                    }
                }
            });
            return false;
        }
    };
});
