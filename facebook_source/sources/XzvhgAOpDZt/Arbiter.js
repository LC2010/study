__d("Arbiter", ["CallbackDependencyManager", "ErrorUtils", "EventEmitter", "EventEmitterWithHolding", "EventHolder", "asyncCallback", "copyProperties", "createArrayFrom", "invariant"]function(global, require, requireDynamic, requireLazy, module, exports, CallbackDependencyManager, ErrorUtils, EventEmitter, EventEmitterWithHolding, EventHolder, asyncCallback, copyProperties, createArrayFrom, invariant) {
    'use strict';

    function p() {
        var u = new EventEmitter();
        this.$Arbiter0 = new s();
        this.$Arbiter1 = new EventEmitterWithHolding(u, this.$Arbiter0);
        this.$Arbiter2 = new CallbackDependencyManager();
        this.$Arbiter3 = [];
    }
    p.prototype.subscribe = function(u, v, w) {
        u = createArrayFrom(u);
        u.forEach(function(y) {
            invariant(y && typeof y === 'string');
        });
        invariant(typeof v === 'function');
        w = w || p.SUBSCRIBE_ALL;
        invariant(w === p.SUBSCRIBE_NEW || w === p.SUBSCRIBE_ALL);
        var x = u.map(function(y) {
            var z = this.$Arbiter4.bind(this, v, y);
            if (w === p.SUBSCRIBE_NEW) return this.$Arbiter1.addListener(y, z);
            this.$Arbiter3.push({});
            var aa = this.$Arbiter1.addRetroactiveListener(y, z);
            this.$Arbiter3.pop();
            return aa;
        }, this);
        return new t(this, x);
    };
    p.prototype.$Arbiter4 = function(u, v, w) {
        var x = this.$Arbiter3[this.$Arbiter3.length - 1];
        if (x[v] === false) return;
        var y = ErrorUtils.applyWithGuard(u, null, [v, w]);
        if (y === false) this.$Arbiter1.releaseCurrentEvent();
        x[v] = y;
    };
    p.prototype.subscribeOnce = function(u, v, w) {
        var x = this.subscribe(u, function(y, z) {
            x && x.unsubscribe();
            return v(y, z);
        }, w);
        return x;
    };
    p.prototype.unsubscribe = function(u) {
        invariant(u.isForArbiterInstance(this));
        u.unsubscribe();
    };
    p.prototype.inform = function(u, v, w) {
        var x = Array.isArray(u);
        u = createArrayFrom(u);
        w = w || p.BEHAVIOR_EVENT;
        var y = (w === p.BEHAVIOR_STATE) || (w === p.BEHAVIOR_PERSISTENT);
        this.$Arbiter3.push({});
        for (var z = 0; z < u.length; z++) {
            var aa = u[z];
            invariant(aa);
            this.$Arbiter0.setHoldingBehavior(aa, w);
            this.$Arbiter1.emitAndHold(aa, v);
            this.$Arbiter5(aa, v, y);
        }
        var ba = this.$Arbiter3.pop();
        return x ? ba : ba[u[0]];
    };
    p.prototype.query = function(u) {
        var v = this.$Arbiter0.getHoldingBehavior(u);
        invariant(!v || v === p.BEHAVIOR_STATE);
        var w = null;
        this.$Arbiter0.emitToListener(u, function(x) {
            w = x;
        });
        return w;
    };
    p.prototype.registerCallback = function(u, v) {
        if (typeof u === 'function') {
            return this.$Arbiter2.registerCallback(asyncCallback(u, 'arbiter'), v);
        } else return this.$Arbiter2.addDependenciesToExistingCallback(u, v);
    };
    p.prototype.$Arbiter5 = function(u, v, w) {
        if (v === null) return;
        if (w) {
            this.$Arbiter2.satisfyPersistentDependency(u);
        } else this.$Arbiter2.satisfyNonPersistentDependency(u);
    };
    for (var q in EventHolder)
        if (EventHolder.hasOwnProperty(q)) s[q] = EventHolder[q];
    var r = EventHolder === null ? null : EventHolder.prototype;
    s.prototype = Object.create(r);
    s.prototype.constructor = s;
    s.__superConstructor__ = EventHolder;

    function s() {
        EventHolder.call(this);
        this.$ArbiterEventHolder0 = {};
    }
    s.prototype.setHoldingBehavior = function(u, v) {
        this.$ArbiterEventHolder0[u] = v;
    };
    s.prototype.getHoldingBehavior = function(u) {
        return this.$ArbiterEventHolder0[u];
    };
    s.prototype.holdEvent = function(u, v, w, x, y) {
        var z = this.$ArbiterEventHolder0[u];
        if (z !== p.BEHAVIOR_PERSISTENT) this.$ArbiterEventHolder2(u);
        if (z !== p.BEHAVIOR_EVENT) return r.holdEvent.call(this, u, v, w, x, y);
    };
    s.prototype.$ArbiterEventHolder2 = function(u) {
        this.emitToListener(u, this.releaseCurrentEvent, this);
    };
    s.prototype.releaseEvent = function(u) {
        if (u) r.releaseEvent.call(this, u);
    };
    copyProperties(p, {
        SUBSCRIBE_NEW: 'new',
        SUBSCRIBE_ALL: 'all',
        BEHAVIOR_EVENT: 'event',
        BEHAVIOR_STATE: 'state',
        BEHAVIOR_PERSISTENT: 'persistent'
    });

    function t(u, v) {
        this.$ArbiterToken0 = u;
        this.$ArbiterToken1 = v;
    }
    t.prototype.unsubscribe = function() {
        for (var u = 0; u < this.$ArbiterToken1.length; u++) this.$ArbiterToken1[u].remove();
        this.$ArbiterToken1.length = 0;
    };
    t.prototype.isForArbiterInstance = function(u) {
        invariant(this.$ArbiterToken0);
        return this.$ArbiterToken0 === u;
    };
    Object.keys(p.prototype).forEach(function(u) {
        p[u] = function() {
            var v = (this instanceof p) ? this : p;
            return p.prototype[u].apply(v, arguments);
        };
    });
    p.call(p);
    module.exports = p;
});
