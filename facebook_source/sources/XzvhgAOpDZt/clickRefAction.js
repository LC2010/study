__d("clickRefAction", ["Arbiter"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter) {
    function h(l, m, n, o, p) {
        var q = l + '/' + m;
        this.ue = q;
        this._ue_ts = l;
        this._ue_count = m;
        this._context = n;
        this._ns = null;
        this._node = o;
        this._type = p;
    }
    h.prototype.set_namespace = function(l) {
        this._ns = l;
        return this;
    };
    h.prototype.coalesce_namespace = function(l) {
        if (this._ns === null) this._ns = l;
        return this;
    };
    h.prototype.add_event = function() {
        return this;
    };
    var i = 0,
        j = [];

    function k(l, m, event, n, o) {
        var p = Date.now(),
            q = event && event.type;
        o = o || {};
        if (!m && event) m = event.getTarget();
        var r = 50;
        if (m && n != "FORCE")
            for (var s = j.length - 1; s >= 0 && ((p - j[s]._ue_ts) < r); --s)
                if (j[s]._node == m && j[s]._type == q) return j[s];
        var t = new h(p, i, l, m, q);
        j.push(t);
        while (j.length > 10) j.shift();
        Arbiter.inform("ClickRefAction/new", {
            cfa: t,
            node: m,
            mode: n,
            event: event,
            extra_data: o
        }, Arbiter.BEHAVIOR_PERSISTENT);
        i++;
        return t;
    }
    module.exports = global.clickRefAction = k;
});
