__d("BlueBarController", ["Bootloader", "CSS"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Bootloader /*g*/ , CSS /*h*/ ) {
    exports /*f*/ .init = function(i) {
        if ('getBoundingClientRect' in i) {
            var j = function() {
                var k = i.getBoundingClientRect(),
                    l = Math.round(k.top) - document.documentElement.clientTop;
                CSS /*h*/ .conditionClass(i.firstChild, 'fixed_elem', l <= 0);
            };
            j();
            Bootloader /*g*/ .loadModules(["Event"], function(k) {
                k.listen(window, 'scroll', j);
            });
        }
    };
});
