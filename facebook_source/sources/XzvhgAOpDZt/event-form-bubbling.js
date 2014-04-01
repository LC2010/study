__d("event-form-bubbling", []function(global, require, requireDynamic, requireLazy, module, exports) {
    global.Event = global.Event || function() {};
    global.Event.__inlineSubmit = function(g, event) {
        var h = (global.Event.__getHandler && global.Event.__getHandler(g, 'submit'));
        return h ? null : global.Event.__bubbleSubmit(g, event);
    };
    global.Event.__bubbleSubmit = function(g, event) {
        if (document.documentElement.attachEvent) {
            var h;
            while (h !== false && (g = g.parentNode)) h = g.onsubmit ? g.onsubmit(event) : global.Event.__fire && global.Event.__fire(g, 'submit', event);
            return h;
        }
    };
});
