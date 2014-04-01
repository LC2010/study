__d("getSameOriginTransport",["ex"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, ex/*g*/) {
    function h() {
        try {
            return global/*a*/.XMLHttpRequest ? new global/*a*/.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
        } catch (i) {
            throw new Error(ex/*g*/('getSameOriginTransport: %s', i.message));
        }
    }
    module/*e*/.exports = h;
});