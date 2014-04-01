__d("EventSubscriptionVendor", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    'use strict';

    function h() {
        this.$EventSubscriptionVendor0 = {};
        this.$EventSubscriptionVendor1 = null;
    }
    h.prototype.addSubscription = function(i, j) {
        invariant(j.subscriber === this);
        if (!this.$EventSubscriptionVendor0[i]) this.$EventSubscriptionVendor0[i] = [];
        var k = this.$EventSubscriptionVendor0[i].length;
        this.$EventSubscriptionVendor0[i].push(j);
        j.eventType = i;
        j.key = k;
        return j;
    };
    h.prototype.removeAllSubscriptions = function(i) {
        if (i === undefined) {
            this.$EventSubscriptionVendor0 = {};
        } else delete this.$EventSubscriptionVendor0[i];
    };
    h.prototype.removeSubscription = function(i) {
        var j = i.eventType,
            k = i.key,
            l = this.$EventSubscriptionVendor0[j];
        if (l) delete l[k];
    };
    h.prototype.getSubscriptionsForType = function(i) {
        return this.$EventSubscriptionVendor0[i];
    };
    module.exports = h;
});
