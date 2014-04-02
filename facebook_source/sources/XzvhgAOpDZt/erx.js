/*格式化字符串*/
__d("erx", ["ex"], function (global, require, requireDynamic, requireLazy, module, exports, ex) {
    /*
       格式化字符串，例如aa<![EX[xxxx]]>bb 转换成 [aaxxxxbb]返回
       @param {String} 需要格式的字符串
       return {Array} 格式化后的字符串
    */
    
    var erx = function (str) {
        if (typeof str !== 'string') 
            return str;
        var prefixStart = str.indexOf(ex._prefix),
            suffixStart = str.lastIndexOf(ex._suffix);
        if (prefixStart < 0 || suffixStart < 0)
            return [str];
        var prefixEnd = prefixStart + ex._prefix.length,
            suffixEnd = suffixStart + ex._suffix.length;
        if (prefixEnd >= suffixStart)
            return ['erx slice failure: %s', str];
        var beforePrefix = str.substring(0, prefixStart),
            afterSuffix = str.substring(suffixEnd);
        str = str.substring(prefixEnd, suffixStart);
        var ret;
        try {
            ret = JSON.parse(str);
            ret[0] = beforePrefix + ret[0] + afterSuffix;
        } catch (e) {
            return ['erx parse failure: %s', str];
        }
        return ret;
    };
    module.exports = erx;
});