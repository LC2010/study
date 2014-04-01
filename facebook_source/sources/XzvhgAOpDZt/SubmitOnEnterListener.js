__d("SubmitOnEnterListener", ["Bootloader", "CSS"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Bootloader /*g*/ , CSS /*h*/ ) {
    document.documentElement.onkeydown = function(i) {
        i = i || window.event;
        var j = i.target || i.srcElement,
            k = i.keyCode == 13 && !i.altKey && !i.ctrlKey && !i.metaKey && !i.shiftKey && CSS /*h*/ .hasClass(j, 'enter_submit');
        if (k) {
            Bootloader /*g*/ .loadModules(["DOM", "Input", "trackReferrer", "Form"], function(l, m, n, o) {
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
