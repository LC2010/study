__d("lowerDomain", []function(global, require, requireDynamic, requireLazy, module, exports) {
    if (document.domain.toLowerCase().match(/(^|\.)facebook\..*/)) document.domain = "facebook.com";
});
