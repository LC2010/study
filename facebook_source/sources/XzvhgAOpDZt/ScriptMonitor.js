__d("ScriptMonitor", []function(global, require, requireDynamic, requireLazy, module, exports) {
    var g, h = [],
        i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    module.exports = {
        activate: function() {
            if (!i) return;
            g = new i(function(j) {
                for (var k = 0; k < j.length; k++) {
                    var l = j[k];
                    if (l.type == 'childList') {
                        for (var m = 0; m < l.addedNodes.length; m++) {
                            var n = l.addedNodes[m];
                            if ((n.tagName == 'SCRIPT' || n.tagName == 'IFRAME') && n.src) h.push(n.src);
                        }
                    } else if (l.type == 'attributes' && l.attributeName == 'src') h.push(l.target.src);
                }
            });
            g.observe(document, {
                attributes: true,
                childList: true,
                subtree: true
            });
        },
        stop: function() {
            g && g.disconnect();
            return h;
        }
    };
});
