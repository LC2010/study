__d("EventSubscription",[],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/) {
    'use strict';

    function g(h) {
        this.subscriber = h;
    }
    g.prototype.remove = function() {
        this.subscriber.removeSubscription(this);
    };
    module/*e*/.exports = g;
});