__d("emptyFunction", ["copyProperties"]function(global, require, requireDynamic, requireLazy, module, exports, copyProperties) {
    function h(j) {
        return function() {
            return j;
        };
    }

    function i() {}
    copyProperties(i, {
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
    module.exports = i;
});
