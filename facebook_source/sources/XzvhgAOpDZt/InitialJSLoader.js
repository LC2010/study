__d("InitialJSLoader", ["Arbiter", "Bootloader", "OnloadEvent", "Run", "ServerJS"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Arbiter /*g*/ , Bootloader /*h*/ , OnloadEvent /*i*/ , Run /*j*/ , ServerJS /*k*/ ) {
    var l = {
        INITIAL_JS_READY: 'BOOTLOAD/JSREADY',
        loadOnDOMContentReady: function(m, n) {
            Arbiter /*g*/ .subscribe(OnloadEvent /*i*/ .ONLOAD_DOMCONTENT_CALLBACK, function() {
                function o() {
                    Bootloader /*h*/ .loadResources(m, function() {
                        Arbiter /*g*/ .inform(l.INITIAL_JS_READY, true, Arbiter /*g*/ .BEHAVIOR_STATE);
                    });
                }
                if (n) {
                    setTimeout(o, n);
                } else o();
            });
        },
        handleServerJS: function(m) {
            var n = new ServerJS /*k*/ ();
            n.handle(m);
            Run /*j*/ .onAfterLoad(n.cleanup.bind(n));
        }
    };
    module /*e*/ .exports = l;
});
