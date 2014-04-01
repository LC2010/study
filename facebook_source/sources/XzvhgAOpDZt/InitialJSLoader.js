__d("InitialJSLoader", ["Arbiter", "Bootloader", "OnloadEvent", "Run", "ServerJS"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter, Bootloader, OnloadEvent, Run, ServerJS) {
    var l = {
        INITIAL_JS_READY: 'BOOTLOAD/JSREADY',
        loadOnDOMContentReady: function(m, n) {
            Arbiter.subscribe(OnloadEvent.ONLOAD_DOMCONTENT_CALLBACK, function() {
                function o() {
                    Bootloader.loadResources(m, function() {
                        Arbiter.inform(l.INITIAL_JS_READY, true, Arbiter.BEHAVIOR_STATE);
                    });
                }
                if (n) {
                    setTimeout(o, n);
                } else o();
            });
        },
        handleServerJS: function(m) {
            var n = new ServerJS();
            n.handle(m);
            Run.onAfterLoad(n.cleanup.bind(n));
        }
    };
    module.exports = l;
});
