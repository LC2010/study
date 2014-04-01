__d("ServerJS", ["ErrorUtils", "EventEmitter", "ServerJSDefine", "copyProperties", "ex", "ge", "replaceTransportMarkers"]function(global, require, requireDynamic, requireLazy, module, exports, ErrorUtils, EventEmitter, ServerJSDefine, copyProperties, ex, ge, replaceTransportMarkers) {
    var n = 0,
        o = new EventEmitter(),
        p = 0;

    function q() {
        this._moduleMap = {};
        this._relativeTo = null;
        this._moduleIDsToCleanup = {};
    }
    q.PRE_JS_CALL = 'pre-js-call';
    q.POST_JS_CALL = 'post-js-call';
    q.addListener = o.addListener.bind(o);
    copyProperties(q.prototype, {
        handle: function(u) {
            if (u.__guard) throw new Error('ServerJS.handle called on data that has already been handled');
            u.__guard = true;
            r(u.define || [], this._handleDefine, this);
            r(u.markup || [], this._handleMarkup, this);
            r(u.elements || [], this._handleElement, this);
            r(u.instances || [], this._handleInstance, this);
            var v = r(u.require || [], this._handleRequire, this);
            return {
                cancel: function() {
                    for (var w = 0; w < v.length; w++)
                        if (v[w]) v[w].cancel();
                }
            };
        },
        handlePartial: function(u) {
            (u.instances || []).forEach(s.bind(null, this._moduleMap, 3));
            (u.markup || []).forEach(s.bind(null, this._moduleMap, 2));
            (u.elements || []).forEach(s.bind(null, this._moduleMap, 2));
            return this.handle(u);
        },
        setRelativeTo: function(u) {
            this._relativeTo = u;
            return this;
        },
        cleanup: function() {
            var u = [];
            for (var v in this._moduleMap) u.push(v);
            requireLazy.call(null, u, t);
            this._moduleMap = {};

            function w(y) {
                var z = this._moduleIDsToCleanup[y],
                    aa = z[0],
                    ba = z[1];
                delete this._moduleIDsToCleanup[y];
                var ca = ba ? 'JS::call("' + aa + '", "' + ba + '", ...)' : 'JS::requireModule("' + aa + '")',
                    da = ca + ' did not fire because it has missing dependencies.';
                throw new Error(da);
            }
            for (var x in this._moduleIDsToCleanup) ErrorUtils.applyWithGuard(w, this, [x], null, 'ServerJS:cleanup' + ' id: ' + x);
        },
        _handleDefine: ErrorUtils.guard(function(u, v, w, x) {
            ServerJSDefine.handleDefine(u, v, w, x, this._relativeTo);
        }, 'JS::define'),
        _handleRequire: function(u, v, w, x) {
            return ErrorUtils.applyWithGuard(function() {
                var y = [u].concat(w || []),
                    z = (v ? '__call__' : '__requireModule__') + n++;
                this._moduleIDsToCleanup[z] = [u, v];
                return define(z, y, ErrorUtils.guard(function(aa) {
                    delete this._moduleIDsToCleanup[z];
                    x && replaceTransportMarkers(this._relativeTo, x);
                    if (v) {
                        if (!aa[v]) throw new TypeError(ex('Module %s has no method "%s"', u, v));
                        var ba = {
                            moduleName: u,
                            method: v,
                            sourceMeta: aa[v].__SMmeta
                        };
                        o.emit(q.PRE_JS_CALL, p, ba);
                        aa[v].apply(aa, x || []);
                        o.emit(q.POST_JS_CALL, p, ba);
                        p++;
                    }
                }.bind(this), v ? "JS::call('" + u + "', '" + v + "', ...)" : "JS::requireModule('" + u + "')"), 1, this, 1);
            }, this, null, null, v ? 'JS::call' : 'JS::requireModule');
        },
        _handleInstance: ErrorUtils.guard(function(u, v, w, x) {
            var y = null;
            if (v) y = function(z) {
                replaceTransportMarkers(this._relativeTo, w);
                var aa = Object.create(z.prototype);
                z.apply(aa, w);
                return aa;
            }.bind(this);
            define(u, v, y, 0, null, x);
        }, 'JS::instance'),
        _handleMarkup: ErrorUtils.guard(function(u, v, w) {
            define(u, ['HTML'], function(x) {
                return x.replaceJSONWrapper(v).getRootNode();
            }, 0, null, w);
        }, 'JS::markup'),
        _handleElement: ErrorUtils.guard(function(u, v, w, x) {
            if (v === null && w) {
                define(u, null, null, 0, null, w);
                return;
            }
            var y = [],
                z = 0;
            if (x) {
                y.push(x);
                z = 1;
                w++;
            }
            define(u, y, function(aa) {
                var ba = ge(v, aa);
                if (!ba) {
                    var ca = 'Could not find element "%s"';
                    throw new Error(ex(ca, v));
                }
                return ba;
            }, z, null, w);
        }, 'JS::element')
    });

    function r(u, v, w) {
        return u.map(function(x) {
            v.apply(w, x);
        });
    }

    function s(u, v, w) {
        var x = w[0];
        if (!(x in u)) w[v] = (w[v] || 0) + 1;
        u[x] = true;
    }

    function t() {
        return {};
    }
    module.exports = q;
});
