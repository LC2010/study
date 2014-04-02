/*字符串格式化函数*/
__d("eprintf", [], function (global, require, requireDynamic, requireLazy, module, exports) {

    /*
    * 一种字符串格式化函数，支持%s替换字符，如epritf("hello %s","world") 返回hello world;
    * @param str {String} 需要格式化的字符串
    * retrun {String} 格式化后的字符串
    */
    var eprintf = function (str) {
        var strArgs = Array.prototype.slice.call(arguments).map(function (arg) {
            return String(arg);
        }),
            sCount = str.split('%s').length - 1;
        if (sCount !== strArgs.length - 1) 
            return eprintf('eprintf args number mismatch: %s', JSON.stringify(strArgs));
        var index = 1;
        return str.replace(/%s/g, function (s) {
            return String(strArgs[index++]);
        });
    };
    module.exports = eprintf;
});