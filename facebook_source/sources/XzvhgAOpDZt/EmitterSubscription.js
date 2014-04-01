__d("EmitterSubscription", ["EventSubscription"]function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , EventSubscription /*g*/ ) {
    'use strict';
    for (var h in EventSubscription /*g*/ )
        if (EventSubscription /*g*/ .hasOwnProperty(h)) j[h] = EventSubscription /*g*/ [h];
    var i = EventSubscription /*g*/ === null ? null : EventSubscription /*g*/ .prototype;
    j.prototype = Object.create(i);
    j.prototype.constructor = j;
    j.__superConstructor__ = EventSubscription /*g*/ ;

    function j(k, l, m) {
        EventSubscription /*g*/ .call(this, k);
        this.listener = l;
        this.context = m;
    }
    module /*e*/ .exports = j;
});
