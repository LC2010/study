__d("URISchemes", ["createObjectFrom"]function(global, require, requireDynamic, requireLazy, module, exports, createObjectFrom) {
    var h = createObjectFrom(['fb', 'fbcf', 'fbconnect', 'fb-messenger', 'fbrpc', 'file', 'ftp', 'http', 'https', 'mailto', 'ms-app', 'itms', 'itms-apps', 'itms-services', 'market', 'svn+ssh', 'fbstaging', 'tel', 'sms']),
        i = {
            isAllowed: function(j) {
                if (!j) return true;
                return h.hasOwnProperty(j.toLowerCase());
            }
        };
    module.exports = i;
});
