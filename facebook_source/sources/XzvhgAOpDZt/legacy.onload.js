__d("legacy:onload", ["Run", "OnloadEvent"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , Run /*g*/ ) {
    global /*a*/ .OnloadEvent = require /*b*/ ('OnloadEvent');
    global /*a*/ .onloadRegister_DEPRECATED = Run /*g*/ .onLoad;
    global /*a*/ .onloadRegister = function() {
        return Run /*g*/ .onLoad.apply(this, OnloadEvent /*arguments*/ );
    };
    global /*a*/ .onafterloadRegister_DEPRECATED = Run /*g*/ .onAfterLoad;
    global /*a*/ .onafterloadRegister = function() {
        return Run /*g*/ .onAfterLoad.apply(this, OnloadEvent /*arguments*/ );
    };
    global /*a*/ .onleaveRegister = Run /*g*/ .onLeave;
    global /*a*/ .onbeforeunloadRegister = Run /*g*/ .onBeforeUnload;
    global /*a*/ .onunloadRegister = Run /*g*/ .onUnload;
});
