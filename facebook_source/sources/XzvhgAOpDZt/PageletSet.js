__d("PageletSet",["Arbiter"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, Arbiter/*g*/) {
    var h = {}, i = {
            hasPagelet: function(l) {
                return h.hasOwnProperty(l);
            },
            getPagelet: function(l) {
                return h[l];
            },
            getOrCreatePagelet: function(l) {
                if (!i.hasPagelet(l)) {
                    var m = new k(l);
                    h[l] = m;
                }
                return i.getPagelet(l);
            },
            getPageletIDs: function() {
                return Object.keys(h);
            },
            removePagelet: function(l) {
                if (i.hasPagelet(l)) {
                    h[l].destroy();
                    delete h[l];
                }
            }
        };

    function j(l, m) {
        return l.contains ? l.contains(m) : l.compareDocumentPosition(m) & 16;
    }

    function k(l) {
        "use strict";
        this.id = l;
        this._root = null;
        this._destructors = [];
        this.addDestructor(function m() {
            Arbiter/*g*/.inform('pagelet/destroy', {
                id: this.id,
                root: this._root
            });
        }.bind(this));
    }
    k.prototype.setRoot = function(l) {
        "use strict";
        this._root = l;
    };
    k.prototype._getDescendantPagelets = function() {
        "use strict";
        var l = [];
        if (!this._root) return l;
        var m = i.getPageletIDs();
        for (var n = 0; n < m.length; n++) {
            var o = m[n];
            if (o === this.id) continue;
            var p = h[o];
            if (p._root && j(this._root, p._root)) l.push(p);
        }
        return l;
    };
    k.prototype.addDestructor = function(l) {
        "use strict";
        this._destructors.push(l);
    };
    k.prototype.destroy = function() {
        "use strict";
        var l = this._getDescendantPagelets();
        for (var m = 0; m < l.length; m++) {
            var n = l[m];
            if (i.hasPagelet(n.id)) i.removePagelet(n.id);
        }
        for (m = 0; m < this._destructors.length; m++) this._destructors[m]();
        if (this._root)
            while (this._root.firstChild) this._root.removeChild(this._root.firstChild);
    };
    module/*e*/.exports = i;
});