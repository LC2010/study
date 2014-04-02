/*字符串增加前后缀*/
__d("ex",["eprintf"],function (global, require, requireDynamic, requireLazy, module, exports, eprintf) {
    /*
      为字符串增加前后缀<![EX[str]]>
      return {String}
    */
    var ex = function() {
        var strArgs = Array.prototype.slice.call(arguments, 0);
        strArgs = strArgs.map(function(arg) {
            return String(arg);
        });
        if (strArgs[0].split('%s').length !== strArgs.length) 
            return ex('ex args number mismatch: %s', JSON.stringify(strArgs));
        return ex._prefix + JSON.stringify(strArgs) + ex._suffix;
    };
    ex._prefix = '<![EX[';
    ex._suffix = ']]>';
    module.exports = ex;
});