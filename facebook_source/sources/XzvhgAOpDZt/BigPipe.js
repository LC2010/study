__d("BigPipe", ["Arbiter", "Bootloader", "Env", "ErrorUtils", "JSCC", "OnloadEvent", "PageletSet", "Run", "ServerJS", "$", "copyProperties", "ge", "invokeCallbacks", "ix"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Arbiter /*g*/ , Bootloader /*h*/ , Env /*i*/ , ErrorUtils /*j*/ , JSCC /*k*/ , OnloadEvent /*l*/ , PageletSet /*m*/ , Run /*n*/ , ServerJS /*o*/ , $ /*p*/ , copyProperties /*q*/ , ge /*r*/ , invokeCallbacks /*s*/ , ix /*t*/ ) {
    var u = document.documentMode || +(/MSIE.(\requireLazy/ * d * /+)/.exec(navigator.userAgent) || [])[1],
        v = Arbiter /*g*/ .BEHAVIOR_STATE,
        w = Arbiter /*g*/ .BEHAVIOR_PERSISTENT;

    function x(ba) {
        "use strict";
        copyProperties /*q*/ (this, {
            arbiter: Arbiter /*g*/ ,
            rootNodeID: 'content',
            lid: 0,
            isAjax: false,
            domContentCallback: Run /*n*/ .__domContentCallback,
            onloadCallback: Run /*n*/ .__onloadCallback,
            domContentEvt: OnloadEvent /*l*/ .ONLOAD_DOMCONTENT_CALLBACK,
            onloadEvt: OnloadEvent /*l*/ .ONLOAD_CALLBACK,
            forceFinish: false,
            _phaseDoneCallbacks: [],
            _currentPhase: 0,
            _lastPhase: -1,
            _livePagelets: {}
        });
        copyProperties /*q*/ (this, ba);
        if (this.automatic) {
            this._relevant_instance = x._current_instance;
        } else x._current_instance = this;
        this._serverJS = new ServerJS /*o*/ ();
        Arbiter /*g*/ .inform('BigPipe/init', {
            lid: this.lid,
            arbiter: this.arbiter
        }, w);
        this.arbiter.registerCallback(this.domContentCallback, ['pagelet_displayed_all']);
        this._informEventExternal('phase_begin', {
            phase: 0
        });
        this.arbiter.inform('phase_begin_0', true, v);
        this.onloadCallback = this.arbiter.registerCallback(this.onloadCallback, ['pagelet_displayed_all']);
        this.arbiter.registerCallback(this._serverJS.cleanup.bind(this._serverJS), [this.onloadEvt]);
    }
    x.prototype._beginPhase = function(ba) {
        "use strict";
        this._informEventExternal('phase_begin', {
            phase: ba
        });
        this.arbiter.inform('phase_begin_' + ba, true, v);
    };
    x.prototype._endPhase = function(ba) {
        "use strict";
        this.arbiter.inform('phase_complete_' + ba, true, v);
    };
    x.prototype._displayPageletHandler = function(ba) {
        "use strict";
        if (this.displayCallback) {
            this.displayCallback(this._displayPagelet.bind(this, ba));
        } else this._displayPagelet(ba);
    };
    x.prototype._displayPagelet = function(ba) {
        "use strict";
        this._informPageletEvent('display_start', ba.id);
        var ca = this._getPagelet(ba);
        for (var da in ba.content) {
            var ea = ba.content[da];
            if (ba.append) da = this._getPageletRootID(ba);
            var fa = ge /*r*/ (da);
            if (!fa) continue;
            if (da === ca.id) ca.setRoot(fa);
            ea = y(ea);
            if (ea)
                if (ba.append || u < 8) {
                    if (!ba.append)
                        while (fa.firstChild) fa.removeChild(fa.firstChild);
                    aa(fa, ea);
                } else fa.innerHTML = ea;
            var ga = fa.getAttribute('data-referrer');
            if (!ga) fa.setAttribute('data-referrer', da);
            if (ba.cache_hit && Env /*i*/ .pc_debug) fa.style.border = '1px red solid';
        }
        if (ba.jsmods) {
            var ha = JSON.parse(JSON.stringify(ba.jsmods)),
                ia = this._serverJS.handlePartial(ha);
            ca.addDestructor(ia.cancel.bind(ia));
        }
        this._informPageletEvent('display', ba.id);
        this.arbiter.inform(ba.id + '_displayed', true, v);
    };
    x.prototype._onPhaseDone = function() {
        "use strict";
        if (this._currentPhase === this._ttiPhase) this._informEventExternal('tti_bigpipe', {
            phase: this._ttiPhase
        });
        if (this._currentPhase === this._lastPhase && this._isRelevant()) this.arbiter.inform('pagelet_displayed_all', true, v);
        this._currentPhase++;
        if (u <= 8) {
            setTimeout(this._beginPhase.bind(this, this._currentPhase), 20);
        } else this._beginPhase(this._currentPhase);
    };
    x.prototype._downloadJsForPagelet = function(ba) {
        "use strict";
        this._informPageletEvent('jsstart', ba.id);
        Bootloader /*h*/ .loadResources(ba.js || [], function() {
            this._informPageletEvent('jsdone', ba.id);
            ba.requires = ba.requires || [];
            if (!this.isAjax || ba.phase >= 1) ba.requires.push('uipage_onload');
            var ca = function() {
                this._informPageletEvent('preonload', ba.id);
                if (this._isRelevantPagelet(ba)) invokeCallbacks /*s*/ (ba.onload);
                this._informPageletEvent('onload', ba.id);
                this.arbiter.inform('pagelet_onload', true, Arbiter /*g*/ .BEHAVIOR_EVENT);
                ba.provides && this.arbiter.inform(ba.provides, true, v);
            }.bind(this),
                da = function() {
                    this._isRelevantPagelet(ba) && invokeCallbacks /*s*/ (ba.onafterload);
                }.bind(this);
            this.arbiter.registerCallback(ca, ba.requires);
            this.arbiter.registerCallback(da, [this.onloadEvt]);
        }.bind(this), false, ba.id);
    };
    x.prototype._getPagelet = function(ba) {
        "use strict";
        var ca = this._getPageletRootID(ba);
        return PageletSet /*m*/ .getPagelet(ca);
    };
    x.prototype._getPageletRootID = function(ba) {
        "use strict";
        var ca = ba.append;
        if (ca) return (ca === 'bigpipe_root') ? this.rootNodeID : ca;
        return Object.keys(ba.content)[0] || null;
    };
    x.prototype._isRelevant = function() {
        "use strict";
        return this == x._current_instance || (this.automatic && this._relevant_instance == x._current_instance) || this.jsNonBlock || this.forceFinish || (x._current_instance && x._current_instance.allowIrrelevantRequests);
    };
    x.prototype._isRelevantPagelet = function(ba) {
        "use strict";
        if (!this._isRelevant()) return false;
        var ca = this._getPageletRootID(ba);
        return !!this._livePagelets[ca];
    };
    x.prototype._informEventExternal = function(ba, ca) {
        "use strict";
        ca = ca || {};
        ca.ts = Date.now();
        ca.lid = this.lid;
        this.arbiter.inform(ba, ca, w);
    };
    x.prototype._informPageletEvent = function(ba, ca, da) {
        "use strict";
        var ea = {
            event: ba,
            id: ca
        };
        if (da) ea.phase = da;
        this._informEventExternal('pagelet_event', ea);
    };
    x.getCurrentInstance = function() {
        "use strict";
        return x._current_instance;
    };
    copyProperties /*q*/ (x.prototype, {
        onPageletArrive: ErrorUtils /*j*/ .guard(function(ba) {
            this._informPageletEvent('arrive', ba.id, ba.phase);
            ba.content = ba.content || {};
            var ca = ba.phase;
            if (!this._phaseDoneCallbacks[ca]) this._phaseDoneCallbacks[ca] = this.arbiter.registerCallback(this._onPhaseDone.bind(this), ['phase_complete_' + ca]);
            this.arbiter.registerCallback(this._phaseDoneCallbacks[ca], [ba.id + '_displayed']);
            var da = this._getPageletRootID(ba),
                ea = PageletSet /*m*/ .getOrCreatePagelet(da);
            if (ba.the_end) this._lastPhase = ca;
            if (ba.tti_phase !== undefined) this._ttiPhase = ba.tti_phase;
            if (ba.is_second_to_last_phase) this._secondToLastPhase = ca;
            this._livePagelets[ea.id] = true;
            ea.addDestructor(function() {
                delete this._livePagelets[ea.id];
            }.bind(this));
            if (ba.jscc_map) {
                var fa = (eval)(ba.jscc_map),
                    ga = JSCC /*k*/ .init(fa);
                ea.addDestructor(ga);
            }
            if (ba.resource_map) Bootloader /*h*/ .setResourceMap(ba.resource_map);
            if (ba.bootloadable) Bootloader /*h*/ .enableBootload(ba.bootloadable);
            ix /*t*/ .add(ba.ixData);
            this._informPageletEvent('setup', ba.id);
            var ha = new Arbiter /*g*/ ();
            ha.registerCallback(this._displayPageletHandler.bind(this, ba), ['preceding_pagelets_displayed', 'display_resources_downloaded']);
            var ia = ba.display_dependency || [],
                ja = ia.map(function(la) {
                    return la + '_displayed';
                });
            this.arbiter.registerCallback(function() {
                ha.inform('preceding_pagelets_displayed');
            }, ja);
            this.arbiter.registerCallback(function() {
                this._informPageletEvent('css', ba.id);
                var la = (ba.css || []).concat(ba.displayJS || []);
                Bootloader /*h*/ .loadResources(la, function() {
                    this._informPageletEvent('css_load', ba.id);
                    ha.inform('display_resources_downloaded');
                }.bind(this), false, ba.id);
            }.bind(this), ['phase_begin_' + ca]);
            this.arbiter.registerCallback(this.onloadCallback, ['pagelet_onload']);
            var ka = [ba.id + '_displayed'];
            if (!this.jsNonBlock) ka.push(this.domContentEvt);
            this.arbiter.registerCallback(this._downloadJsForPagelet.bind(this, ba), ka);
            if (ba.is_last) this._endPhase(ca);
        }, 'BigPipe#onPageletArrive')
    });

    function y(ba) {
        if (!ba || typeof ba === 'string') return ba;
        if (ba.container_id) {
            var ca = $ /*p*/ (ba.container_id);
            ba = z(ca) || '';
            ca.parentNode.removeChild(ca);
            return ba;
        }
        return null;
    }

    function z(ba) {
        if (!ba.firstChild) {
            Bootloader /*h*/ .loadModules(["ErrorSignal"], function(da) {
                da.sendErrorSignal('bigpipe', 'Pagelet markup container is empty.');
            });
            return null;
        }
        if (ba.firstChild.nodeType !== 8) return null;
        var ca = ba.firstChild.nodeValue;
        ca = ca.substring(1, ca.length - 1);
        return ca.replace(/\\([\invokeCallbacks/*s*/\S]|$)/Arbiter /*g*/ , '$1');
    }

    function aa(ba, ca) {
        var da = document.createElement('div'),
            ea = u < 7;
        if (ea) ba.appendChild(da);
        da.innerHTML = ca;
        var fa = document.createDocumentFragment();
        while (da.firstChild) fa.appendChild(da.firstChild);
        ba.appendChild(fa);
        if (ea) ba.removeChild(da);
    }
    module /*e*/ .exports = x;
});
