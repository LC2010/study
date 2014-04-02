__d("CallbackDependencyManager",["ErrorUtils"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, ErrorUtils/*g*/) {
    function h() {
        "use strict";
        this.$CallbackDependencyManager0 = {};
        this.$CallbackDependencyManager1 = {};
        this.$CallbackDependencyManager2 = 1;
        this.$CallbackDependencyManager3 = {};
    }
    h.prototype.$CallbackDependencyManager4 = function(i, j) {
        "use strict";
        var k = 0,
            l = {};
        for (var m = 0, n = j.length; m < n; m++) l[j[m]] = 1;
        for (var o in l) {
            if (this.$CallbackDependencyManager3[o]) continue;
            k++;
            if (this.$CallbackDependencyManager0[o] === undefined) this.$CallbackDependencyManager0[o] = {};
            this.$CallbackDependencyManager0[o][i] = (this.$CallbackDependencyManager0[o][i] || 0) + 1;
        }
        return k;
    };
    h.prototype.$CallbackDependencyManager5 = function(i) {
        "use strict";
        if (!this.$CallbackDependencyManager0[i]) return;
        for (var j in this.$CallbackDependencyManager0[i]) {
            this.$CallbackDependencyManager0[i][j]--;
            if (this.$CallbackDependencyManager0[i][j] <= 0) delete this.$CallbackDependencyManager0[i][j];
            this.$CallbackDependencyManager1[j].$CallbackDependencyManager6--;
            if (this.$CallbackDependencyManager1[j].$CallbackDependencyManager6 <= 0) {
                var k = this.$CallbackDependencyManager1[j].$CallbackDependencyManager7;
                delete this.$CallbackDependencyManager1[j];
                ErrorUtils/*g*/.applyWithGuard(k);
            }
        }
    };
    h.prototype.addDependenciesToExistingCallback = function(i, j) {
        "use strict";
        if (!this.$CallbackDependencyManager1[i]) return null;
        var k = this.$CallbackDependencyManager4(i, j);
        this.$CallbackDependencyManager1[i].$CallbackDependencyManager6 += k;
        return i;
    };
    h.prototype.isPersistentDependencySatisfied = function(i) {
        "use strict";
        return !!this.$CallbackDependencyManager3[i];
    };
    h.prototype.satisfyPersistentDependency = function(i) {
        "use strict";
        this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
    };
    h.prototype.satisfyNonPersistentDependency = function(i) {
        "use strict";
        var j = this.$CallbackDependencyManager3[i] === 1;
        if (!j) this.$CallbackDependencyManager3[i] = 1;
        this.$CallbackDependencyManager5(i);
        if (!j) delete this.$CallbackDependencyManager3[i];
    };
    h.prototype.registerCallback = function(i, j) {
        "use strict";
        var k = this.$CallbackDependencyManager2;
        this.$CallbackDependencyManager2++;
        var l = this.$CallbackDependencyManager4(k, j);
        if (l === 0) {
            ErrorUtils/*g*/.applyWithGuard(i);
            return null;
        }
        this.$CallbackDependencyManager1[k] = {
            $CallbackDependencyManager7: i,
            $CallbackDependencyManager6: l
        };
        return k;
    };
    h.prototype.unsatisfyPersistentDependency = function(i) {
        "use strict";
        delete this.$CallbackDependencyManager3[i];
    };
    module/*e*/.exports = h;
});