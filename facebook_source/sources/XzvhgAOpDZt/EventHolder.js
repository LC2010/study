__d("EventHolder", ["invariant"]function(global, require, requireDynamic, requireLazy, module, exports, invariant) {
    'use strict';

    function h() {
        this.$EventHolder0 = {};
        this.$EventHolder1 = null;
    }
    h.prototype.holdEvent = function(i, j, k, l, m, n, o) {
        this.$EventHolder0[i] = this.$EventHolder0[i] || [];
        var p = this.$EventHolder0[i],
            q = {
                eventType: i,
                index: p.length
            };
        p.push([j, k, l, m, n, o]);
        return q;
    };
    h.prototype.emitToListener = function(i, j, k) {
        var l = this.$EventHolder0[i];
        if (!l) return;
        var m = this.$EventHolder1;
        l.forEach(function(n, o) {
            if (!n) return;
            this.$EventHolder1 = {
                eventType: i,
                index: o
            };
            j.apply(k, n);
        }.bind(this));
        this.$EventHolder1 = m;
    };
    h.prototype.releaseCurrentEvent = function() {
        invariant(this.$EventHolder1 !== null);
        this.releaseEvent(this.$EventHolder1);
    };
    h.prototype.releaseEvent = function(i) {
        delete this.$EventHolder0[i.eventType][i.index];
    };
    h.prototype.releaseEventType = function(i) {
        this.$EventHolder0[i] = [];
    };
    module.exports = h;
});
