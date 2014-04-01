__d("legacy:onload", ["Run", "OnloadEvent"]function(global, require, requireDynamic, requireLazy, module, exports, Run) {
    global.OnloadEvent = require('OnloadEvent');
    global.onloadRegister_DEPRECATED = Run.onLoad;
    global.onloadRegister = function() {
        return Run.onLoad.apply(this, OnloadEvent);
    };
    global.onafterloadRegister_DEPRECATED = Run.onAfterLoad;
    global.onafterloadRegister = function() {
        return Run.onAfterLoad.apply(this, OnloadEvent);
    };
    global.onleaveRegister = Run.onLeave;
    global.onbeforeunloadRegister = Run.onBeforeUnload;
    global.onunloadRegister = Run.onUnload;
});
