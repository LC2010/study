__d("event-form-bubbling", []function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ ) {
    global /*a*/ .Event = global /*a*/ .Event || function() {};
    global /*a*/ .Event.__inlineSubmit = function(g, event) {
        var h = (global /*a*/ .Event.__getHandler && global /*a*/ .Event.__getHandler(g, 'submit'));
        return h ? null : global /*a*/ .Event.__bubbleSubmit(g, event);
    };
    global /*a*/ .Event.__bubbleSubmit = function(g, event) {
        if (document.documentElement.attachEvent) {
            var h;
            while (h !== false && (g = g.parentNode)) h = g.onsubmit ? g.onsubmit(event) : global /*a*/ .Event.__fire && global /*a*/ .Event.__fire(g, 'submit', event);
            return h;
        }
    };
});
