__d("Env", ["copyProperties"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , copyProperties /*g*/ ) {
    var h = {
        start: Date.now()
    };
    if (global /*a*/ .Env) {
        copyProperties /*g*/ (h, global /*a*/ .Env);
        global /*a*/ .Env = undefined;
    }
    module /*e*/ .exports = h;
});
