__d("EventEmitter", ["EmitterSubscription", "ErrorUtils", "EventSubscriptionVendor", "emptyFunction", "invariant"]function(global, require, requireDynamic, requireLazy, module, exports, EmitterSubscription, ErrorUtils, EventSubscriptionVendor, emptyFunction, invariant) {
    function l() {
        "use strict";
        this.$EventEmitter0 = new EventSubscriptionVendor();
    }
    l.prototype.addListener = function(m, n, o) {
        "use strict";
        return this.$EventEmitter0.addSubscription(m, new EmitterSubscription(this.$EventEmitter0, n, o));
    };
    l.prototype.once = function(m, n, o) {
        "use strict";
        var p = this;
        return this.addListener(m, function() {
            p.removeCurrentListener();
            n.apply(o, arguments);
        });
    };
    l.prototype.removeAllListeners = function(m) {
        "use strict";
        this.$EventEmitter0.removeAllSubscriptions(m);
    };
    l.prototype.removeCurrentListener = function() {
        "use strict";
        invariant( !! this.$EventEmitter1);
        this.$EventEmitter0.removeSubscription(this.$EventEmitter1);
    };
    l.prototype.listeners = function(m) {
        "use strict";
        var n = this.$EventEmitter0.getSubscriptionsForType(m);
        return n ? n.filter(emptyFunction.thatReturnsTrue).map(function(o) {
            return o.listener;
        }) : [];
    };
    l.prototype.emit = function(m) {
        "use strict";
        var n = this.$EventEmitter0.getSubscriptionsForType(m);
        if (n) {
            var o = Object.keys(n);
            for (var p = 0; p < o.length; p++) {
                var q = o[p],
                    r = n[q];
                if (r) {
                    this.$EventEmitter1 = r;
                    ErrorUtils.applyWithGuard(r.listener, r.context, Array.prototype.slice.call(arguments, 1), null, 'EventEmitter:' + m);
                }
            }
            this.$EventEmitter1 = null;
        }
    };
    module.exports = l;
});
