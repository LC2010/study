__d("getSameOriginTransport", ["ex"]function(global, require, requireDynamic, requireLazy, module, exports, ex) {
    function h() {
        try {
            return global.XMLHttpRequest ? new global.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (i) {
            throw new Error(ex('getSameOriginTransport: %s', i.message));
        }
    }
    module.exports = h;
});
