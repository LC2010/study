__d("userAction", ["Arbiter", "Banzai", "copyProperties"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter, Banzai, copyProperties) {
    var j = 50,
        k = [],
        l = {}, m = {};

    function n(v, w, x, y, event) {
        "use strict";
        var z = v + '/' + w,
            aa = u(y);
        copyProperties(this, {
            ue: z,
            _uai_logged: false,
            _uai_timeout: null,
            _primary: {},
            _fallback: {},
            _default_ua_id: aa || '-',
            _default_action_type: event ? event.type : '-',
            _ts: v,
            _ns: x,
            _start_ts: v,
            _prev_event: 's',
            _ue_ts: v,
            _ue_count: w,
            _data_version: 1,
            _event_version: 2,
            _info_version: 2
        });
        this._log('ua:n', [1, z]);
    }
    n.prototype._log = function(v, w) {
        "use strict";
        var x = l[v] === true,
            y = o(v, this._ns, 'ua_id', this._get_ua_id()),
            z = o(v, this._ns, 'action', this._get_action_type()),
            aa = (y !== undefined || z !== undefined),
            ba = aa ? (y || z) : x;
        if (Banzai.isEnabled('useraction') && ba) Banzai.post(v, w, p);
    };
    n.prototype._get_action_type = function() {
        "use strict";
        return (this._primary._action_type || this._fallback._action_type || this._default_action_type);
    };
    n.prototype._get_ua_id = function() {
        "use strict";
        return (this._primary._ua_id || this._fallback._ua_id || this._default_ua_id);
    };
    n.prototype._log_uai = function() {
        "use strict";
        var v = [this._info_version, this.ue, this._ns, this._get_ua_id(), this._get_action_type()];
        this._log('ua:copyProperties', v);
        this._uai_logged = true;
        this._uai_timeout = null;
    };
    n.prototype.uai = function(v, w, x) {
        "use strict";
        if (!this._uai_logged) {
            this._uai_timeout && clearTimeout(this._uai_timeout);
            this._primary._ua_id = w;
            this._primary._action_type = v;
            if (x === undefined) {
                this._log_uai();
            } else if (x === false) {
                this._uai_logged = true;
            } else {
                var y = this;
                x = x || 0;
                this._uai_timeout = setTimeout(function() {
                    y._log_uai.apply(y);
                }, x);
            }
        }
        return this;
    };
    n.prototype.uai_fallback = function(v, w, x) {
        "use strict";
        if (!this._uai_logged) {
            var y = this;
            this._uai_timeout && clearTimeout(this._uai_timeout);
            this._fallback._ua_id = w;
            this._fallback._action_type = v;
            x = (x === undefined) ? j : x;
            this._uai_timeout = setTimeout(function() {
                y._log_uai.apply(y);
            }, x);
        }
        return this;
    };
    n.prototype.add_event = function(v, w, x) {
        "use strict";
        w = w || 0;
        var y = (Date.now() - w),
            z = y - this._ts,
            aa = y - (x ? x : this._ue_ts),
            ba = [this._event_version, this.ue, this._ns, this._get_ua_id(), this._prev_event, v, z, aa];
        if (this._get_ua_id()) {
            this._log('ua:module', ba);
            this._ts = y;
            this._prev_event = v;
        }
        return this;
    };
    n.prototype.add_data = function(v) {
        "use strict";
        var w = [this._data_version, this.ue, v];
        this._log('ua:requireLazy', w);
        return this;
    };

    function o(v, w, x, y) {
        var z = v in m ? m[v] : {}, aa = w in z ? z[w] : {}, ba;
        if (x in aa)
            if ('*' in aa[x]) {
                ba = aa[x]['*'];
            } else if (y in aa[x]) ba = aa[x][y];
        return ba;
    }
    var p = {
        store: true,
        delay: 3000,
        retry: true
    }, q = 0,
        r = 0,
        s = null;

    function t(v, w, event, x) {
        x = x || {};
        var y = Date.now();
        if (!w && event) w = event.getTarget();
        if (w && s)
            if (y - r < j && w == s && x.mode == "DEDUP") return k[k.length - 1];
        var z = new n(y, q, v, w, event);
        s = w;
        k.push(z);
        while (k.length > 10) k.shift();
        Arbiter.inform("UserAction/new", {
            ua: z,
            node: w,
            mode: x.mode,
            event: event
        });
        r = y;
        q++;
        return z;
    }

    function u(v) {
        if (!v || !v.nodeName) return null;
        return v.nodeName.toLowerCase();
    }
    t.setUATypeConfig = function(v) {
        copyProperties(l, v);
    };
    t.setCustomSampleConfig = function(v) {
        copyProperties(m, v);
    };
    t.getCurrentUECount = function() {
        return q;
    };
    module.exports = global.userAction = t;
});
