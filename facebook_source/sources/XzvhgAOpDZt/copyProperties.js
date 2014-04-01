/*属性继承，支持多重继承*/
__d("copyProperties", [], function (global, require, requireDynamic, requireLazy, module, exports) {
    //支持多重继承，这里感觉facebook代码不够优雅~
    function copyProperties(target, source0, source1, source2, source3, source4, source5) {
        target = target || {};
        var sourcess = [source0, source1, source2, source3, source4], //source5没有用到。。
            index = 0,
            source;
        while (sourcess[index]) {
            source = sourcess[index++];
            for (var key in source)
                target[key] = source[key];
            if (source.hasOwnProperty && source.hasOwnProperty('toString') && (typeof source.toString != 'undefined') && (target.toString !== source.toString))
                target.toString = source.toString;
        }
        return target;
    }
    module.exports = copyProperties;
});
