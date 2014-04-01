__d("CurrentUser", ["CurrentUserInitialData"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , CurrentUserInitialData /*g*/ ) {
    var h = {
        getID: function() {
            return CurrentUserInitialData /*g*/ .id;
        },
        isLoggedIn: function() {
            var i = h.getID();
            return i && i !== "0";
        }
    };
    module /*e*/ .exports = h;
});
