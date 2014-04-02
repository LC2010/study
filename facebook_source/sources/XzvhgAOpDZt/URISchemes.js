__d("URISchemes",["createObjectFrom"],function (global/*a*/, require/*b*/, requireDynamic/*c*/, requireLazy/*d*/, module/*e*/, exports/*f*/, createObjectFrom/*g*/) {
    var h = createObjectFrom/*g*/(['fb', 'fbcf', 'fbconnect', 'fb-messenger', 'fbrpc', 'file', 'ftp', 'http', 'https', 'mailto', 'ms-app', 'itms', 'itms-apps', 'itms-services', 'market', 'svn+ssh', 'fbstaging', 'tel', 'sms']),
        i = {
            isAllowed: function(j) {
                if (!j) return true;
                return h.hasOwnProperty(j.toLowerCase());
            }
        };
    module/*e*/.exports = i;
});