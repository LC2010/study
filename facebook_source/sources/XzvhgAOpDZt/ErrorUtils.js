__d("ErrorUtils", ["Env", "eprintf", "erx", "wrapFunction"], function (global /*a*/, require /*b*/, requireDynamic /*c*/, requireLazy /*d*/, module /*e*/, exports /*f*/, Env /*g*/, eprintf /*h*/, erx /*i*/, wrapFunction /*j*/) {
    var k = {},
        ANONYMOUS_GUARD_TAG = '<anonymous guard>',
        GENERATED_GUARD_TAG = '<generated guard>',
        GLOBAL_ERROR_HANDLER_TAG = '<window.onerror>',
        o = /^https?:\/\//i,
        p = /^Type Mismatch for/,
        q = ['Unknown script code', 'Function code', 'eval code'],
        r = new RegExp('(.*?)(\\s)(?:' + q.join('|') + ')$'),
        listeners = [],
        resolver, history = [],
        maxLen = 50,
        guardList = [],
        isInGuard = false,
        errReporting = false;

    function getStackFrames(stack) {
        if (!stack) return [];
        var stackFrames = stack.split(/\n\n/)[0].replace(/[\(\)]|\[.*?\]|^\w+:\s.*?\n/g, '').split('\n').map(function (na) {
            var oa, pa, qa;
            na = na.trim();
            if (/(:(\d+)(:(\d+))?)$/.test(na)) {
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
            if (resolver)
                resolver(ra);
            ra.text = '    at' + (ra.identifier ? ' ' + ra.identifier + ' (' : ' ') + ra.script + (ra.line ? ':' + ra.line : '') + (ra.column ? ':' + ra.column : '') + (ra.identifier ? ')' : '');
            return ra;
        });
        return stackFrames;
    }

    function normalizeError(errObj) {
        if (!errObj) {
            return {};
        } else if (errObj._originalError) return errObj;
        var stackFrames = getStackFrames(errObj.stackTrace || errObj.stack),
            needPop = false;
        if (errObj.framesToPop) {
            var popFrames = errObj.framesToPop,
                stack;
            while (popFrames > 0 && stackFrames.length > 0) {
                stack = stackFrames.shift();
                popFrames--;
                needPop = true;
            }
            if (msgReg.test(errObj.message) && errObj.framesToPop === 2 && stack)
                if (scriptReg.test(stack.script)) errObj.message += ' at ' + stack.script + (stack.line ? ':' + stack.line : '') + (stack.column ? ':' + stack.column : '');
            delete errObj.framesToPop;
        }
        var error = {
            line: errObj.lineNumber || errObj.line,
            column: errObj.columnNumber || errObj.column,
            name: errObj.name,
            message: errObj.message,
            type: errObj.type,
            script: errObj.fileName || errObj.sourceURL || errObj.script,
            stack: stackFrames.map(function (stack) {
                return stack.text;
            }).join('\n'),
            stackFrames: stackFrames,
            guard: errObj.guard,
            guardList: errObj.guardList,
            extra: errObj.extra,
            snapshot: errObj.snapshot
        };
        if (typeof error.message === 'string') {
            error.messageWithParams = erx(error.message);
            error.message = eprintf.apply(global, error.messageWithParams);
        } else {
            error.messageObject = error.message;
            error.message = String(error.message);
        }
        if (resolver)
            resolver(error);
        if (needPop) {
            delete error.script;
            delete error.line;
            delete error.column;
        }
        if (stackFrames[0]) {
            error.script = error.script || stackFrames[0].script;
            error.line = error.line || stackFrames[0].line;
            error.column = error.column || stackFrames[0].column;
        }
        error._originalError = errObj;
        for (var key in error) (error[key] == null && delete error[key]);
        return error;
    }

    function reportError(errObj) {
        if (errReporting) return false;
        if (guardList.length > 0) {
            errObj.guard = errObj.guard || guardList[0];
            errObj.guardList = guardList.slice();
        }
        errObj = normalizeError(errObj);
        !ma; //不明觉厉
        if (history.length > maxLen)
            history.splice(maxLen / 2, 1);
        history.push(errObj);
        errReporting = true;
        for (var i = 0; i < listeners.length; i++) try {
            listeners[i](errObj);
        } catch (e) { }
        errReporting = false;
        return true;
    }

    function inGuard() {
        return isInGuard;
    }

    function addGuard(tag) {
        guardList.unshift(tag);
        isInGuard = true;
    }

    function removeGuard() {
        guardList.shift();
        isInGuard = (guardList.length !== 0);
    }

    function applyWithGuard(fn, context, args, oa, tag) {
        addGuard(tag || ANONYMOUS_GUARD_TAG);
        var qa, ra = g.nocatch || (/nocatch/).test(location.search);
        if (!ra && Env.nocatch)
            ra = Env.nocatch;
        if (ra) {
            try {
                qa = fn.apply(context, args || []);
            } finally {
                removeGuard();
            }
            return qa;
        }
        try {
            qa = fn.apply(context, args || []);
            return qa;
        } catch (sa) {
            var ta = normalizeError(sa);
            if (oa)
                oa(ta);
            if (fn)
                ta.callee = fn.toString().substring(0, 100);
            if (na)
                ta.args = Array.prototype.slice.call(args).toString().substring(0, 100);
            ta.guard = guardList[0];
            ta.guardList = guardList.slice();
            reportError(ta);
        } finally {
            removeGuard();
        }
    }

    function guard(fn, args, context) {
        args = args || fn.name || GENERATED_GUARD_TAG;

        function guardFn() {
            return applyWithGuard(fn, context || this, arguments, null, args);
        }
        return guardFn;
    }
    wrapFunction.setWrapper(guard, 'entry');

    function onerror(errMsg, script, line, column, errObj) {
        errObj = errObj || {};
        errObj.message = errObj.message || errMsg;
        errObj.script = errObj.script || script;
        errObj.line = errObj.line || line;
        errObj.column = errObj.column || column;
        errObj.guard = GLOBAL_ERROR_HANDLER_TAG;
        errObj.guardList = [GLOBAL_ERROR_HANDLER_TAG];
        reportError(errObj, true);
    }
    window.onerror = onerror;

    function addListener(listener, nohistory) {
        listeners.push(listener);
        if (!nohistory) history.forEach(listener);
    }

    function setSourceResolver(callback) {
        resolver = callback;
    }
    var ErrorUtils = {
        ANONYMOUS_GUARD_TAG: ANONYMOUS_GUARD_TAG,
        GENERATED_GUARD_TAG: GENERATED_GUARD_TAG,
        GLOBAL_ERROR_HANDLER_TAG: GLOBAL_ERROR_HANDLER_TAG,
        addListener: addListener,
        setSourceResolver: setSourceResolver,
        applyWithGuard: applyWithGuard,
        guard: guard,
        history: history,
        inGuard: inGuard,
        normalizeError: normalizeError,
        onerror: onerror,
        reportError: reportError
    };
    module.exports = global.ErrorUtils = ErrorUtils;
    /*还不知道干嘛用的*/
    if (typeof __t === 'function' && __t.setHandler) __t.setHandler(reportError);
});
