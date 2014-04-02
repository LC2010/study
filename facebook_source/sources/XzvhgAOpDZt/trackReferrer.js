__d("trackReferrer",["Parent"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, Parent/*g*/) {
    function h(i, j) {
        i = Parent/*g*/.byAttribute(i, 'data-referrer');
        if (i) {
            var k = /^(?:(?:[^:\/?#]+):)?(?:\/\/(?:[^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/.exec(j)[1] || '';
            if (!k) return;
            var l = k + '|' + i.getAttribute('data-referrer'),
                m = new Date();
            m.setTime(Date.now() + 1000);
            document.cookie = "x-src=" + encodeURIComponent(l) + "; " + "expires=" + m.toGMTString() + ";path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, '$1');
        }
        return i;
    }
    module/*e*/.exports = h;
});