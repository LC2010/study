(function(global) {
    if (global.require) return;
    var toString = Object.prototype.toString,
        modules = {}, dependencies = {}, e = {}, f = 0,
        g = 1,
        h = 2,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    function ModuleError(msg) {
        this.name = 'ModuleError';
        this.message = msg;
    }
    ModuleError.prototype = new Error();
    ModuleError.prototype.constructor = ModuleError;

    function require(name) {
        if (global.ErrorUtils && !global.ErrorUtils.inGuard()) return ErrorUtils.applyWithGuard(require, this, arguments);
        var module = modules[name],
            dep, i, msg;
        if (!modules[name]) {
            msg = 'Requiring unknown module "' + name + '"';
            throw new ModuleError(msg);
        }
        if (module.hasError) throw new ModuleError('Requiring module "' + name + '" which threw an exception');
        if (module.waiting) {
            msg = 'Requiring module "' + name + '" with unresolved dependencies';
            throw new ModuleError(msg);
        }
        if (!module.exports) {
            var exports = module.exports = {}, factory = module.factory;
            if (toString.call(factory) === '[object Function]') {
                var deps = [],
                    depNames = module.dependencies,
                    depCount = depNames.length,
                    ret;
                if (module.special & h) depCount = Math.min(depCount, factory.length);
                try {
                    for (i = 0; i < depCount; i++) {
                        dep = depNames[i];
                        deps.push(dep === 'module' ? module : (dep === 'exports' ? exports : require.call(null, dep)));
                    }
                    try {
                        ret = factory.apply(module.context || global, deps);
                    } catch (e) {
                        if (modules.ex && modules.erx) {
                            var ex = require.call(null, 'ex'),
                                erx = require.call(null, 'erx'),
                                ha = erx(e.message);
                            if (ha[0].indexOf(' from module "%s"') < 0) {
                                ha[0] += ' from module "%s"';
                                ha[ha.length] = name;
                            }
                            e.message = ex.apply(null, ha);
                        }
                        throw e;
                    }
                } catch (e) {
                    module.hasError = true;
                    throw e;
                }
                if (ret) module.exports = ret;
            } else module.exports = factory;
        }
        if (module.refcount-- === 1) delete modules[name];
        return module.exports;
    }

    function define(t, u, v, w, x, y) {
        if (u === undefined) {
            u = [];
            v = t;
            t = o();
        } else if (v === undefined) {
            v = u;
            if (toString.call(t) === '[object Array]') {
                u = t;
                t = o();
            } else u = [];
        }
        var z = {
            cancel: m.bind(this, t)
        }, aa = modules[t];
        if (aa) {
            if (y) aa.refcount += y;
            return z;
        } else if (!u && !v && y) {
            e[t] = (e[t] || 0) + y;
            return z;
        } else {
            aa = {
                id: t
            };
            aa.refcount = (e[t] || 0) + (y || 0);
            delete e[t];
        }
        aa.factory = v;
        aa.dependencies = u;
        aa.context = x;
        aa.special = w;
        aa.waitingMap = {};
        aa.waiting = 0;
        aa.hasError = false;
        modules[t] = aa;
        q(t);
        return z;
    }

    function m(t) {
        if (!modules[t]) return;
        var u = modules[t];
        delete modules[t];
        for (var v in u.waitingMap)
            if (u.waitingMap[v]) delete dependencies[v][t];
        for (var w = 0; w < u.dependencies.length; w++) {
            v = u.dependencies[w];
            if (modules[v]) {
                if (modules[v].refcount-- === 1) m(v);
            } else if (e[v]) e[v]--;
        }
    }

    function requireLazy(t, u, v) {
        return define(t, u, undefined, g, v, 1);
    }

    function o() {
        return '__mod__' + f++;
    }

    function p(t, u) {
        if (!t.waitingMap[u] && t.id !== u) {
            t.waiting++;
            t.waitingMap[u] = 1;
            dependencies[u] || (dependencies[u] = {});
            dependencies[u][t.id] = 1;
        }
    }

    function q(t) {
        var u = [],
            v = modules[t],
            w, x, y;
        for (x = 0; x < v.dependencies.length; x++) {
            w = v.dependencies[x];
            if (!modules[w]) {
                p(v, w);
            } else if (modules[w].waiting)
                for (y in modules[w].waitingMap)
                    if (modules[w].waitingMap[y]) p(v, y);
        }
        if (v.waiting === 0 && v.special & g) u.push(t);
        if (dependencies[t]) {
            var z = dependencies[t],
                aa;
            dependencies[t] = undefined;
            for (w in z) {
                aa = modules[w];
                for (y in v.waitingMap)
                    if (v.waitingMap[y]) p(aa, y);
                if (aa.waitingMap[t]) {
                    aa.waitingMap[t] = undefined;
                    aa.waiting--;
                }
                if (aa.waiting === 0 && aa.special & g) u.push(w);
            }
        }
        for (x = 0; x < u.length; x++) require.call(null, u[x]);
    }

    function r(t, u) {
        modules[t] = {
            id: t
        };
        modules[t].exports = u;
    }
    r('module', 0);
    r('exports', 0);
    r('define', define);
    r('global', global);
    r('require', require);
    r('requireDynamic', require);
    r('requireLazy', requireLazy);
    define.amd = {};
    global.define = define;
    global.require = require;
    global.requireDynamic = require;
    global.requireLazy = requireLazy;
    require.__debug = {
        modules: modules,
        deps: dependencies
    };
    var s = function(t, u, v, w) {
        define(t, u, v, w || h);
    };
    global.__d = function(t, u, v, w) {
        u = ['global', 'require', 'requireDynamic', 'requireLazy', 'module', 'exports'].concat(u);
        s(t, u, v, w);
    };
})(this);
