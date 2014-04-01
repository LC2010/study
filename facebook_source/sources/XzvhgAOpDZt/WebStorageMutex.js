__d("WebStorageMutex", ["WebStorage", "setTimeoutAcrossTransitions", "pageID"]function(global, require, requireDynamic, requireLazy, module, exports, WebStorage, setTimeoutAcrossTransitions, pageID) {
    var j = WebStorage.getLocalStorage();

    function k(l) {
        "use strict";
        this.name = l;
    }
    k.testSetPageID = function(l) {
        "use strict";
        pageID = l;
    };
    k.prototype.$WebStorageMutex0 = function() {
        "use strict";
        if (!j) return pageID;
        var l = j.getItem('mutex_' + this.name);
        l = l ? l.split(':') : null;
        return l && l[1] >= Date.now() ? l[0] : null;
    };
    k.prototype.$WebStorageMutex1 = function(l) {
        "use strict";
        if (!j) return;
        var m = Date.now() + (l || 10000);
        j.setItem('mutex_' + this.name, pageID + ':' + m);
    };
    k.prototype.hasLock = function() {
        "use strict";
        return this.$WebStorageMutex0() == pageID;
    };
    k.prototype.lock = function(l, m, n) {
        "use strict";
        if (this.$WebStorageMutex2) clearTimeout(this.$WebStorageMutex2);
        if (pageID == (this.$WebStorageMutex0() || pageID)) this.$WebStorageMutex1(n);
        this.$WebStorageMutex2 = setTimeoutAcrossTransitions(function() {
            this.$WebStorageMutex2 = null;
            var o = this.hasLock() ? l : m;
            if (o) o(this);
        }.bind(this), 0);
    };
    k.prototype.unlock = function() {
        "use strict";
        if (this.$WebStorageMutex2) clearTimeout(this.$WebStorageMutex2);
        if (j && this.hasLock()) j.removeItem('mutex_' + this.name);
    };
    module.exports = k;
});
