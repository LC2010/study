__d("emptyFunction", ["copyProperties"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , copyProperties /*g*/ ) {
    function h(j) {
        return function() {
            return j;
        };
    }

    function i() {}
    copyProperties /*g*/ (i, {
        thatReturns: h,
        thatReturnsFalse: h(false),
        thatReturnsTrue: h(true),
        thatReturnsNull: h(null),
        thatReturnsThis: function() {
            return this;
        },
        thatReturnsArgument: function(j) {
            return j;
        }
    });
    module /*e*/ .exports = i;
});
