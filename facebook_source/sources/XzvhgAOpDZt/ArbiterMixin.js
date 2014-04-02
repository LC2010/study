__d("ArbiterMixin",["Arbiter"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, Arbiter/*g*/) {
    var h = {
        _getArbiterInstance: function() {
            return this._arbiter || (this._arbiter = new Arbiter/*g*/());
        },
        inform: function(i, j, k) {
            return this._getArbiterInstance().inform(i, j, k);
        },
        subscribe: function(i, j, k) {
            return this._getArbiterInstance().subscribe(i, j, k);
        },
        subscribeOnce: function(i, j, k) {
            return this._getArbiterInstance().subscribeOnce(i, j, k);
        },
        unsubscribe: function(i) {
            this._getArbiterInstance().unsubscribe(i);
        },
        registerCallback: function(i, j) {
            return this._getArbiterInstance().registerCallback(i, j);
        },
        query: function(i) {
            return this._getArbiterInstance().query(i);
        }
    };
    module/*e*/.exports = h;
});