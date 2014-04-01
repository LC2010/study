__d("EmitterSubscription", ["EventSubscription"]function(global, require, requireDynamic, requireLazy, module, exports, EventSubscription) {
    'use strict';
    for (var h in EventSubscription)
        if (EventSubscription.hasOwnProperty(h)) j[h] = EventSubscription[h];
    var i = EventSubscription === null ? null : EventSubscription.prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = EventSubscription;

    function j(k, l, m) {
        EventSubscription.call(this, k);
        this.listener = l;
        this.context = m;
    }
    module.exports = j;
});
