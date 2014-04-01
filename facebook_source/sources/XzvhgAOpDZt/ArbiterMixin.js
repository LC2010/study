__d("ArbiterMixin", ["Arbiter"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter) {
    var h = {
        _getArbiterInstance: function() {
            return this._arbiter || (this._arbiter = new Arbiter());
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
    module.exports = h;
});
