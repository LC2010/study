__d("EventEmitterWithHolding", []function(global, require, requireDynamic, requireLazy, module, exports) {
    'use strict';

    function g(h, i) {
        this.$EventEmitterWithHolding0 = h;
        this.$EventEmitterWithHolding1 = i;
        this.$EventEmitterWithHolding2 = null;
        this.$EventEmitterWithHolding3 = false;
    }
    g.prototype.addListener = function(h, i, j) {
        return this.$EventEmitterWithHolding0.addListener(h, i, j);
    };
    g.prototype.once = function(h, i, j) {
        return this.$EventEmitterWithHolding0.once(h, i, j);
    };
    g.prototype.addRetroactiveListener = function(h, i, j) {
        var k = this.$EventEmitterWithHolding0.addListener(h, i, j);
        this.$EventEmitterWithHolding3 = true;
        this.$EventEmitterWithHolding1.emitToListener(h, i, j);
        this.$EventEmitterWithHolding3 = false;
        return k;
    };
    g.prototype.removeAllListeners = function(h) {
        this.$EventEmitterWithHolding0.removeAllListeners(h);
    };
    g.prototype.removeCurrentListener = function() {
        this.$EventEmitterWithHolding0.removeCurrentListener();
    };
    g.prototype.listeners = function(h) {
        return this.$EventEmitterWithHolding0.listeners(h);
    };
    g.prototype.emit = function(h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
    };
    g.prototype.emitAndHold = function(h, i, j, k, l, m, n) {
        this.$EventEmitterWithHolding2 = this.$EventEmitterWithHolding1.holdEvent(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding0.emit(h, i, j, k, l, m, n);
        this.$EventEmitterWithHolding2 = null;
    };
    g.prototype.releaseCurrentEvent = function() {
        if (this.$EventEmitterWithHolding2 !== null) {
            this.$EventEmitterWithHolding1.releaseEvent(this.$EventEmitterWithHolding2);
        } else if (this.$EventEmitterWithHolding3) this.$EventEmitterWithHolding1.releaseCurrentEvent();
    };
    g.prototype.releaseHeldEventType = function(h) {
        this.$EventEmitterWithHolding1.releaseEventType(h);
    };
    module.exports = g;
});
