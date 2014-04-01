__d("EventSubscription", []function(global, require, requireDynamic, requireLazy, module, exports) {
    'use strict';

    function g(h) {
        this.subscriber = h;
    }
    g.prototype.remove = function() {
        this.subscriber.removeSubscription(this);
    };
    module.exports = g;
});
