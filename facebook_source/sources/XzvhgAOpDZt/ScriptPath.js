__d("ScriptPath", ["ErrorUtils"]function(global, require, requireDynamic, requireLazy, module, exports, ErrorUtils) {
    var h = null,
        i = null,
        j = {}, k = 0,
        l = null;

    function m(q) {
        var r = ++k;
        j[r] = q;
        return r;
    }

    function n(q) {
        if (j[q]) delete j[q];
    }

    function o() {
        Object.keys(j).forEach(function(q) {
            ErrorUtils.applyWithGuard(j[q], null, [{
                source: h,
                dest: i
            }]);
        });
    }
    var p = {
        set: function(q, r) {
            h = i;
            i = {
                scriptPath: q,
                categoryToken: r
            };
            window._script_path = q;
            o();
        },
        setNavigation: function(q) {
            l = q;
        },
        getNavigation: function() {
            return l;
        },
        getScriptPath: function() {
            return i ? i.scriptPath : undefined;
        },
        getCategoryToken: function() {
            return i ? i.categoryToken : undefined;
        },
        getPageInfo: function() {
            return i;
        },
        getSourcePageInfo: function() {
            return h;
        },
        subscribe: function(q) {
            return m(q);
        },
        unsubscribe: function(q) {
            n(q);
        }
    };
    module.exports = p;
});
