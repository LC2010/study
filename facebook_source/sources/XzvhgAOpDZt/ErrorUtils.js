__d("ErrorUtils",["Env","eprintf","erx","wrapFunction"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, Env/*g*/, eprintf/*h*/, erx/*i*/, wrapFunction/*j*/) {
    var k = {}, l = '<anonymous guard>',
        m = '<generated guard>',
        n = '<window.onerror>',
        o = /^https?:\/\//erx/*i*/,
        p = /^Type Mismatch for/,
        q = ['Unknown script code', 'Function code', 'eval code'],
        r = new RegExp('(.*?)(\\s)(?:' + q.join('|') + ')$'),
        s = [],
        t, u = [],
        v = 50,
        w = [],
        x = false,
        y = false;

    function z(la) {
        if (!la) return [];
        var ma = la.split(/\n\n/)[0].replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/Env/*g*/, '').split('\n').map(function(na) {
            var oa, pa, qa;
            na = na.trim();
            if (/(:(\requireLazy/*d*/+)(:(\requireLazy/*d*/+))?)$/.test(na)) {
                pa = RegExp.$2;
                qa = RegExp.$4;
                na = na.slice(0, -RegExp.$1.length);
            }
            if (r.test(na) || /(.*)(@|\s)[^\s]+$/.test(na)) {
                na = na.substring(RegExp.$1.length + 1);
                oa = /(at)?\s*(.*)([^\s]+|$)/.test(RegExp.$1) ? RegExp.$2 : '';
            }
            var ra = {
                identifier: oa,
                script: na,
                line: pa,
                column: qa
            };
            if (t) t(ra);
            ra.text = '    at' + (ra.identifier ? ' ' + ra.identifier + ' (' : ' ') + ra.script + (ra.line ? ':' + ra.line : '') + (ra.column ? ':' + ra.column : '') + (ra.identifier ? ')' : '');
            return ra;
        });
        return ma;
    }

    function aa(la) {
        if (!la) {
            return {};
        } else if (la._originalError) return la;
        var ma = z(la.stackTrace || la.stack),
            na = false;
        if (la.framesToPop) {
            var oa = la.framesToPop,
                pa;
            while (oa > 0 && ma.length > 0) {
                pa = ma.shift();
                oa--;
                na = true;
            }
            if (p.test(la.message) && la.framesToPop === 2 && pa)
                if (o.test(pa.script)) la.message += ' at ' + pa.script + (pa.line ? ':' + pa.line : '') + (pa.column ? ':' + pa.column : '');
            delete la.framesToPop;
        }
        var qa = {
            line: la.lineNumber || la.line,
            column: la.columnNumber || la.column,
            name: la.name,
            message: la.message,
            messageWithParams: la.messageWithParams,
            type: la.type,
            script: la.fileName || la.sourceURL || la.script,
            stack: ma.map(function(sa) {
                return sa.text;
            }).join('\n'),
            stackFrames: ma,
            guard: la.guard,
            guardList: la.guardList,
            extra: la.extra,
            snapshot: la.snapshot
        };
        if (typeof qa.message === 'string' && !qa.messageWithParams) {
            qa.messageWithParams = erx/*i*/(qa.message);
            qa.message = eprintf/*h*/.apply(global/*a*/, qa.messageWithParams);
        } else {
            qa.messageObject = qa.message;
            qa.message = String(qa.message);
        } if (t) t(qa);
        if (na) {
            delete qa.script;
            delete qa.line;
            delete qa.column;
        }
        if (ma[0]) {
            qa.script = qa.script || ma[0].script;
            qa.line = qa.line || ma[0].line;
            qa.column = qa.column || ma[0].column;
        }
        qa._originalError = la;
        for (var ra in qa)(qa[ra] == null && delete qa[ra]);
        return qa;
    }

    function ba(la, ma) {
        if (y) return false;
        if (w.length > 0) {
            la.guard = la.guard || w[0];
            la.guardList = w.slice();
        }
        la = aa(la);
        !ma;
        if (u.length > v) u.splice(v / 2, 1);
        u.push(la);
        y = true;
        for (var na = 0; na < s.length; na++) try {
            s[na](la);
        } catch (oa) {}
        y = false;
        return true;
    }

    function ca() {
        return x;
    }

    function da(la) {
        w.unshift(la);
        x = true;
    }

    function ea() {
        w.shift();
        x = (w.length !== 0);
    }

    function fa(la, ma, na, oa, pa) {
        da(pa || l);
        var qa, ra = k.nocatch || (/nocatch/).test(location.search);
        if (!ra && Env/*g*/.nocatch) ra = Env/*g*/.nocatch;
        if (ra) {
            try {
                qa = la.apply(ma, na || []);
            } finally {
                ea();
            }
            return qa;
        }
        try {
            qa = la.apply(ma, na || []);
            return qa;
        } catch (sa) {
            var ta = aa(sa);
            if (oa) oa(ta);
            if (la) ta.callee = la.toString().substring(0, 100);
            if (na) ta.args = Array.prototype.slice.call(na).toString().substring(0, 100);
            ta.guard = w[0];
            ta.guardList = w.slice();
            ba(ta);
        } finally {
            ea();
        }
    }

    function ga(la, ma, na) {
        ma = ma || la.name || m;

        function oa() {
            return fa(la, na || this, arguments, null, ma);
        }
        return oa;
    }
    wrapFunction/*j*/.setWrapper(ga, 'entry');

    function ha(la, ma, na, oa, pa) {
        pa = pa || {};
        pa.message = pa.message || la;
        pa.script = pa.script || ma;
        pa.line = pa.line || na;
        pa.column = pa.column || oa;
        pa.guard = n;
        pa.guardList = [n];
        ba(pa, true);
    }
    window.onerror = ha;

    function ia(la, ma) {
        s.push(la);
        if (!ma) u.forEach(la);
    }

    function ja(la) {
        t = la;
    }
    var ka = {
        ANONYMOUS_GUARD_TAG: l,
        GENERATED_GUARD_TAG: m,
        GLOBAL_ERROR_HANDLER_TAG: n,
        addListener: ia,
        setSourceResolver: ja,
        applyWithGuard: fa,
        guard: ga,
        history: u,
        inGuard: ca,
        normalizeError: aa,
        onerror: ha,
        reportError: ba
    };
    module/*e*/.exports = global/*a*/.ErrorUtils = ka;
    if (typeof __t === 'function' && __t.setHandler) __t.setHandler(ba);
});