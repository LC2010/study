__d("Run",["Arbiter","OnloadEvent"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, Arbiter/*g*/, OnloadEvent/*h*/) {
    var i = 'onunloadhooks',
        j = 'onafterunloadhooks',
        k = Arbiter/*g*/.BEHAVIOR_STATE;

    function l(ba) {
        var ca = global/*a*/.CavalryLogger;
        ca && ca.getInstance().setTimeStamp(ba);
    }

    function m() {
        return !window.loading_page_chrome;
    }

    function n(ba) {
        var ca = global/*a*/.OnloadHooks;
        if (window.loaded && ca) {
            ca.runHook(ba, 'onlateloadhooks');
        } else u('onloadhooks', ba);
    }

    function o(ba) {
        var ca = global/*a*/.OnloadHooks;
        if (window.afterloaded && ca) {
            setTimeout(function() {
                ca.runHook(ba, 'onlateafterloadhooks');
            }, 0);
        } else u('onafterloadhooks', ba);
    }

    function p(ba, ca) {
        if (ca === undefined) ca = m();
        ca ? u('onbeforeleavehooks', ba) : u('onbeforeunloadhooks', ba);
    }

    function q(ba, ca) {
        if (!window.onunload) window.onunload = function() {
            Arbiter/*g*/.inform(OnloadEvent/*h*/.ONUNLOAD, true, k);
        };
        u(ba, ca);
    }

    function r(ba) {
        q(i, ba);
    }

    function s(ba) {
        q(j, ba);
    }

    function t(ba) {
        u('onleavehooks', ba);
    }

    function u(ba, ca) {
        window[ba] = (window[ba] || []).concat(ca);
    }

    function v(ba) {
        window[ba] = [];
    }

    function w() {
        Arbiter/*g*/.inform(OnloadEvent/*h*/.ONLOAD_DOMCONTENT, true, k);
    }
    global/*a*/._domcontentready = w;

    function x() {
        var ba = document,
            ca = window;
        if (ba.addEventListener) {
            var da = /AppleWebKit.(\requireLazy/*d*/+)/.exec(navigator.userAgent);
            if (da && da[1] < 525) {
                var ea = setInterval(function() {
                    if (/loaded|complete/.test(ba.readyState)) {
                        w();
                        clearInterval(ea);
                    }
                }, 10);
            } else ba.addEventListener("DOMContentLoaded", w, true);
        } else {
            var fa = 'javascript:void(0)';
            if (ca.location.protocol == 'https:') fa = '//:';
            ba.write('<script onreadystatechange="if (this.readyState==\'complete\') {' + 'this.parentNode.removeChild(this);_domcontentready();}" ' + 'defer="defer" src="' + fa + '"><\/script\>');
        }
        var ga = ca.onload;
        ca.onload = function() {
            l('t_layout');
            ga && ga();
            Arbiter/*g*/.inform(OnloadEvent/*h*/.ONLOAD, true, k);
        };
        ca.onbeforeunload = function() {
            var ha = {};
            Arbiter/*g*/.inform(OnloadEvent/*h*/.ONBEFOREUNLOAD, ha, k);
            if (!ha.warn) Arbiter/*g*/.inform('onload/exit', true);
            return ha.warn;
        };
    }
    var y = Arbiter/*g*/.registerCallback(function() {
        l('t_onload');
        Arbiter/*g*/.inform(OnloadEvent/*h*/.ONLOAD_CALLBACK, true, k);
    }, [OnloadEvent/*h*/.ONLOAD]),
        z = Arbiter/*g*/.registerCallback(function() {
            l('t_domcontent');
            var ba = {
                timeTriggered: Date.now()
            };
            Arbiter/*g*/.inform(OnloadEvent/*h*/.ONLOAD_DOMCONTENT_CALLBACK, ba, k);
        }, [OnloadEvent/*h*/.ONLOAD_DOMCONTENT]);
    x();
    var aa = {
        onLoad: n,
        onAfterLoad: o,
        onLeave: t,
        onBeforeUnload: p,
        onUnload: r,
        onAfterUnload: s,
        __domContentCallback: z,
        __onloadCallback: y,
        __removeHook: v
    };
    module/*e*/.exports = aa;
});