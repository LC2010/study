__d("BlueBarController", ["Bootloader", "CSS"]function(global, require, requireDynamic, requireLazy, module, exports, Bootloader, CSS) {
    exports.init = function(i) {
        if ('getBoundingClientRect' in i) {
            var j = function() {
                var k = i.getBoundingClientRect(),
                    l = Math.round(k.top) - document.documentElement.clientTop;
                CSS.conditionClass(i.firstChild, 'fixed_elem', l <= 0);
            };
            j();
            Bootloader.loadModules(["Event"], function(k) {
                k.listen(window, 'scroll', j);
            });
        }
    };
});
