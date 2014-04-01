__d("CommentPrelude", ["Arbiter", "CSS", "Parent", "clickRefAction", "userAction"]function(global, require, requireDynamic, requireLazy, module, exports, Arbiter, CSS, Parent, clickRefAction, userAction) {
    function l(p, q) {
        userAction('ufi', p).uai('click');
        clickRefAction('ufi', p, null, 'FORCE');
        return m(p, q);
    }

    function m(p, q) {
        var r = Parent.byTag(p, 'form');
        n(r);
        var s = CSS.removeClass.bind(null, r, 'hidden_add_comment');
        if (window.ScrollAwareDOM) {
            window.ScrollAwareDOM.monitor(r, s);
        } else s(); if (q !== false) {
            var t = r.add_comment_text_text || r.add_comment_text,
                u = t.length;
            if (u)
                if (!Parent.byClass(t[u - 1], 'UFIReplyList')) {
                    t = t[u - 1];
                } else if (!Parent.byClass(t[0], 'UFIReplyList')) {
                t = t[0];
            } else t = null; if (t) {
                t.focus();
                Arbiter.inform('comment/focus', {
                    element: t
                });
            }
        }
        return false;
    }

    function n(p) {
        var q = CSS.removeClass.bind(null, p, 'collapsed_comments');
        if (window.ScrollAwareDOM) {
            window.ScrollAwareDOM.monitor(p, q);
        } else q();
    }
    var o = {
        click: l,
        expand: m,
        uncollapse: n
    };
    module.exports = o;
});
