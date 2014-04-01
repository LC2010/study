__d("DTSG", ["DTSGInitialData"]function(global, require, requireDynamic, requireLazy, module, exports, DTSGInitialData) {
    var h = DTSGInitialData.token || null,
        i = {
            setToken: function(j) {
                h = j;
            },
            getToken: function() {
                return h;
            }
        };
    module.exports = i;
});
