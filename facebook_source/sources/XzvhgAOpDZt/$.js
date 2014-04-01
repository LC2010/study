__d("$", ["ex"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , ex /*g*/ ) {
    function h(j) {
        var k = typeof j === 'string' ? document.getElementById(j) : j;
        if (!k) throw new Error(ex /*g*/ ('Tried to get element with id of "%s" but it is not present on the page.', j));
        return k;
    }

    function i(j) {
        return h(j);
    }
    i.unsafe = h;
    module /*e*/ .exports = i;
});
