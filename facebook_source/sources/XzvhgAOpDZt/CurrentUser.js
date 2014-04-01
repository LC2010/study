__d("CurrentUser", ["CurrentUserInitialData"]function(global, require, requireDynamic, requireLazy, module, exports, CurrentUserInitialData) {
    var h = {
        getID: function() {
            return CurrentUserInitialData.id;
        },
        isLoggedIn: function() {
            var i = h.getID();
            return i && i !== "0";
        }
    };
    module.exports = h;
});
