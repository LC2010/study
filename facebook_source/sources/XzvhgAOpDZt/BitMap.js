__d("BitMap", ["copyProperties", "repeatString"], function(global /*a*/ , require /*b*/ , requireDynamic /*c*/ , requireLazy /*d*/ , module /*e*/ , exports /*f*/ , copyProperties /*g*/ , repeatString /*h*/ ) {
    var i = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

    function j() {
        this._bits = [];
    }
    copyProperties /*g*/ (j.prototype, {
        set: function(m) {
            this._bits[m] = 1;
            return this;
        },
        toString: function() {
            var m = [];
            for (var n = 0; n < this._bits.length; n++) m.push(this._bits[n] ? 1 : 0);
            return m.length ? l(m.join('')) : '';
        },
        toCompressedString: function() {
            if (this._bits.length === 0) return '';
            var m = [],
                n = 1,
                o = this._bits[0] || 0,
                p = o.toString(2);
            for (var q = 1; q < this._bits.length; q++) {
                var r = this._bits[q] || 0;
                if (r === o) {
                    n++;
                } else {
                    m.push(k(n));
                    o = r;
                    n = 1;
                }
            }
            if (n) m.push(k(n));
            return l(p + m.join(''));
        }
    });

    function k(m) {
        var n = m.toString(2),
            o = repeatString /*h*/ ('0', n.length - 1);
        return o + n;
    }

    function l(m) {
        var n = (m + '00000').match(/[01]{6}/copyProperties /*g*/ ),
            o = '';
        for (var p = 0; p < n.length; p++) o += i[parseInt(n[p], 2)];
        return o;
    }
    module /*e*/ .exports = j;
});
