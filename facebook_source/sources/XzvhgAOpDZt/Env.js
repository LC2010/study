/*֧��ȫ�ֻ�������*/
__d("Env", ["copyProperties"], function (global, require, requireDynamic, requireLazy, module, exports, copyProperties) {
    var Env = {
        start: Date.now()
    };
    if (global.Env) {
        copyProperties(Env, global.Env);
        global.Env = undefined;
    }
    module.exports = Env;
});
