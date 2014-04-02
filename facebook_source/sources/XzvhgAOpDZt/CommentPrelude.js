__d("CommentPrelude",["Arbiter","CSS","Parent","clickRefAction","userAction"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, Arbiter/*g*/, CSS/*h*/, Parent/*i*/, clickRefAction/*j*/, userAction/*k*/) {
    function l(p, q) {
        userAction/*k*/('ufi', p).uai('click');
        clickRefAction/*j*/('ufi', p, null, 'FORCE');
        return m(p, q);
    }

    function m(p, q) {
        var r = Parent/*i*/.byTag(p, 'form');
        n(r);
        var s = CSS/*h*/.removeClass.bind(null, r, 'hidden_add_comment');
        if (window.ScrollAwareDOM) {
            window.ScrollAwareDOM.monitor(r, s);
        } else s(); if (q !== false) {
            var t = r.add_comment_text_text || r.add_comment_text,
                u = t.length;
            if (u)
                if (!Parent/*i*/.byClass(t[u - 1], 'UFIReplyList')) {
                    t = t[u - 1];
                } else if (!Parent/*i*/.byClass(t[0], 'UFIReplyList')) {
                t = t[0];
            } else t = null; if (t) {
                t.focus();
                Arbiter/*g*/.inform('comment/focus', {
                    element: t
                });
            }
        }
        return false;
    }

    function n(p) {
        var q = CSS/*h*/.removeClass.bind(null, p, 'collapsed_comments');
        if (window.ScrollAwareDOM) {
            window.ScrollAwareDOM.monitor(p, q);
        } else q();
    }
    var o = {
        click: l,
        expand: m,
        uncollapse: n
    };
    module/*e*/.exports = o;
});