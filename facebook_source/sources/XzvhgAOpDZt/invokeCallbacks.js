__d("invokeCallbacks",["ErrorUtils"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, ErrorUtils/*g*/) {
    function h(i, j) {
        if (i)
            for (var k = 0; k < i.length; k++) ErrorUtils/*g*/.applyWithGuard(new Function(i[k]), j);
    }
    module/*e*/.exports = h;
});