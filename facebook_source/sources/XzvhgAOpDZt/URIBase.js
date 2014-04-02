__d("URIBase",["URIRFC3986","URISchemes","copyProperties","ex","invariant"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, URIRFC3986/*g*/, URISchemes/*h*/, copyProperties/*i*/, ex/*j*/, invariant/*k*/) {
    var l = new RegExp('[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f' + '\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF' + '\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]'),
        m = new RegExp('^(?:[^/]*:|' + '[\\x00-\\x1f]*/[\\x00-\\x1f]*/)');

    function n(p, q, r, s) {
        if (!q) return true;
        if (q instanceof o) {
            p.setProtocol(q.getProtocol());
            p.setDomain(q.getDomain());
            p.setPort(q.getPort());
            p.setPath(q.getPath());
            p.setQueryData(s.deserialize(s.serialize(q.getQueryData())));
            p.setFragment(q.getFragment());
            return true;
        }
        q = q.toString();
        var t = URIRFC3986/*g*/.parse(q) || {};
        if (!r && !URISchemes/*h*/.isAllowed(t.scheme)) return false;
        p.setProtocol(t.scheme || '');
        if (!r && l.test(t.host)) return false;
        p.setDomain(t.host || '');
        p.setPort(t.port || '');
        p.setPath(t.path || '');
        if (r) {
            p.setQueryData(s.deserialize(t.query) || {});
        } else try {
            p.setQueryData(s.deserialize(t.query) || {});
        } catch (u) {
            return false;
        }
        p.setFragment(t.fragment || '');
        if (t.userinfo !== null)
            if (r) {
                throw new Error(ex/*j*/('URI.parse: invalid URI (userinfo is not allowed in global/*a*/ URI): %s', p.toString()));
            } else return false;
        if (!p.getDomain() && p.getPath().indexOf('\\') !== -1)
            if (r) {
                throw new Error(ex/*j*/('URI.parse: invalid URI (no domain but multiple back-slashes): %s', p.toString()));
            } else return false;
        if (!p.getProtocol() && m.test(q))
            if (r) {
                throw new Error(ex/*j*/('URI.parse: invalid URI (unsafe protocol-relative URLs): %s', p.toString()));
            } else return false;
        return true;
    }

    function o(p, q) {
        "use strict";
        invariant/*k*/(q);
        this.$URIBase0 = q;
        this.$URIBase1 = '';
        this.$URIBase2 = '';
        this.$URIBase3 = '';
        this.$URIBase4 = '';
        this.$URIBase5 = '';
        this.$URIBase6 = {};
        n(this, p, true, q);
    }
    o.prototype.setProtocol = function(p) {
        "use strict";
        invariant/*k*/(URISchemes/*h*/.isAllowed(p));
        this.$URIBase1 = p;
        return this;
    };
    o.prototype.getProtocol = function(p) {
        "use strict";
        return this.$URIBase1;
    };
    o.prototype.setSecure = function(p) {
        "use strict";
        return this.setProtocol(p ? 'https' : 'http');
    };
    o.prototype.isSecure = function() {
        "use strict";
        return this.getProtocol() === 'https';
    };
    o.prototype.setDomain = function(p) {
        "use strict";
        if (l.test(p)) throw new Error(ex/*j*/('URI.setDomain: unsafe domain specified: %s for url %s', p, this.toString()));
        this.$URIBase2 = p;
        return this;
    };
    o.prototype.getDomain = function() {
        "use strict";
        return this.$URIBase2;
    };
    o.prototype.setPort = function(p) {
        "use strict";
        this.$URIBase3 = p;
        return this;
    };
    o.prototype.getPort = function() {
        "use strict";
        return this.$URIBase3;
    };
    o.prototype.setPath = function(p) {
        "use strict";
        this.$URIBase4 = p;
        return this;
    };
    o.prototype.getPath = function() {
        "use strict";
        return this.$URIBase4;
    };
    o.prototype.addQueryData = function(p, q) {
        "use strict";
        if (p instanceof Object) {
            copyProperties/*i*/(this.$URIBase6, p);
        } else this.$URIBase6[p] = q;
        return this;
    };
    o.prototype.setQueryData = function(p) {
        "use strict";
        this.$URIBase6 = p;
        return this;
    };
    o.prototype.getQueryData = function() {
        "use strict";
        return this.$URIBase6;
    };
    o.prototype.removeQueryData = function(p) {
        "use strict";
        if (!Array.isArray(p)) p = [p];
        for (var q = 0, r = p.length; q < r; ++q) delete this.$URIBase6[p[q]];
        return this;
    };
    o.prototype.setFragment = function(p) {
        "use strict";
        this.$URIBase5 = p;
        return this;
    };
    o.prototype.getFragment = function() {
        "use strict";
        return this.$URIBase5;
    };
    o.prototype.isEmpty = function() {
        "use strict";
        return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment());
    };
    o.prototype.toString = function() {
        "use strict";
        var p = '';
        if (this.$URIBase1) p += this.$URIBase1 + '://';
        if (this.$URIBase2) p += this.$URIBase2;
        if (this.$URIBase3) p += ':' + this.$URIBase3;
        if (this.$URIBase4) {
            p += this.$URIBase4;
        } else if (p) p += '/';
        var q = this.$URIBase0.serialize(this.$URIBase6);
        if (q) p += '?' + q;
        if (this.$URIBase5) p += '#' + this.$URIBase5;
        return p;
    };
    o.prototype.getOrigin = function() {
        "use strict";
        return this.$URIBase1 + '://' + this.$URIBase2 + (this.$URIBase3 ? ':' + this.$URIBase3 : '');
    };
    o.isValidURI = function(p, q) {
        return n(new o(null, q), p, false, q);
    };
    module/*e*/.exports = o;
});