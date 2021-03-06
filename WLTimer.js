function WLTimer(d = 0, h = 0, i = 0, s = 0) {
    this.d = d;
    this.h = h;
    this.i = i;
    this.s = s;
    this.auto_id = {
        add: {
            d: null,
            h: null,
            i: null,
            s: null
        },
        reduce: {
            d: null,
            h: null,
            i: null,
            s: null
        }
    };
    this.time_reset = function () {
        this.d = this.h = this.i = this.s = 0;
    };
    this.add_s = function (second) {
        if (second >= 86400) {
            add_day = Math.floor(second / 86400);
            this.d += add_day;
            second = second - (add_day * 86400); //left second
        }
        if (second >= 3600) {
            add_hour = Math.floor(second / 3600);
            this.h += add_hour;
            second = second - (add_hour * 3600); //left second
        }
        if (second >= 60) {
            add_minute = Math.floor(second / 60);
            this.add_i(add_minute);
            second = second - (add_minute * 60); //left second
        }
        if (this.s + second >= 60) {  // handle left second, it only posible plus one to minute and hour 
            this.s = this.s + second - 60;
            this.add_i(1);
        } else {
            this.s += second;
        }
    };
    this.auto_add_s = function (add, interval) {
        var self = this;
        self.auto_id.add.s = setInterval(function () {
            self.add_s(add);
        }, interval);
    };
    this.add_i = function (minute) {
        if (minute >= 1440) {
            add_day = Math.floor(minute / 1440);
            this.d = this.d + add_day;
            minute = minute - (add_day * 1440); //left minute
        }
        if (minute >= 60) {
            add_hour = Math.floor(minute / 60);
            this.h = this.h + add_hour;
            minute = minute - (add_hour * 60); //left minute
        }
        if (this.i + minute >= 60) { // handle left minute, it only plus one to hour 
            this.i = this.i + minute - 60;
            this.h++;
        } else {
            this.i += minute;
        }
    };
    this.auto_add_i = function (add, interval) {
        var self = this;
        self.auto_id.add.i = setInterval(function () {
            self.add_i(add);
        }, interval);
    };
    this.add_h = function (hour) {
        if (hour >= 24) {
            add_day = Math.floor(hour / 24);
            this.d = this.d + add_day;
            hour = hour - (add_day * 24); //left hour
        }
        if (this.h + hour >= 24) { // handle left hour, it only plus one to day 
            this.h = this.h + hour - 24;
            this.d++;
        } else {
            this.h += hour;
        }
    };
    this.auto_add_h = function (add, interval) {
        var self = this;
        self.auto_id.add.h = setInterval(function () {
            self.add_h(add);
        }, interval);
    };

    this.auto_add_d = function (add, interval) {
        var self = this;
        self.auto_id.add.d = setInterval(function () {
            self.d += add;
        }, interval);
    };


    this.reduce_d = function (d) {
        if (this.d < d) {
            this.time_reset();
            return;
        }
        this.d -= d;
    }
    this.auto_reduce_d = function (reduce, interval) {
        var self = this;
        self.auto_id.reduce.d = setInterval(function () {
            self.reduce_d(reduce);
        }, interval);
    };

    this.reduce_h = function (reduce) {
        if (reduce >= 24) {
            reduce_d = Math.floor(reduce / 24);
            this.reduce_d(reduce_d);
            reduce = reduce - (reduce_d * 24); //left reduce
        }
        if (reduce > this.h) {
            this.h = this.h - reduce + 24;
            this.reduce_d(1);
        } else {
            this.h -= reduce;
        }
    }
    this.auto_reduce_h = function (reduce, interval) {
        var self = this;
        self.auto_id.reduce.h = setInterval(function () {
            self.reduce_h(reduce);
        }, interval);
    };

    this.reduce_i = function (reduce) {
        if (reduce >= 1440) {
            reduce_d = Math.floor(reduce / 1440);
            this.reduce_d(reduce_d);
            reduce = reduce - (reduce_d * 1440); //left reduce
        }
        if (reduce >= 60) {
            reduce_h = Math.floor(reduce / 60);
            this.reduce_d(reduce_h);
            reduce = reduce - (reduce_h * 60); //left reduce
        }
        if (reduce > this.i) {
            this.i = this.i - reduce + 60;
            this.reduce_h(1);
        } else {
            this.i -= reduce;
        }
    }
    this.auto_reduce_i = function (reduce, interval) {
        var self = this;
        self.auto_id.reduce.i = setInterval(function () {
            self.reduce_i(reduce);
        }, interval);
    };

    this.reduce_s = function (reduce) {
        if (reduce >= 86400) {
            reduce_d = Math.floor(reduce / 86400);
            this.reduce_d(reduce_d);
            reduce = reduce - (reduce_d * 86400); //left reduce
        }
        if (reduce >= 3600) {
            reduce_h = Math.floor(reduce / 3600);
            this.reduce_h(reduce_h);
            reduce = reduce - (reduce_h * 3600); //left reduce
        }
        if (reduce >= 60) {
            reduce_i = Math.floor(reduce / 60);
            this.reduce_i(reduce_i);
            reduce = reduce - (reduce_i * 60); //left reduce
        }
        if (reduce > this.s) {
            this.s = this.s - reduce + 60;
            this.reduce_i(1);
        } else {
            this.s -= reduce;
        }
    }
    this.auto_reduce_s = function (reduce, interval) {
        var self = this;
        self.auto_id.reduce.s = setInterval(function () {
            self.reduce_s(reduce);
        }, interval);
    };

    this.stop_auto = function (type = 'add', target = 's') {
        clearInterval(this.get_auto_id(type, target));
    };

    this.get_auto_id = function (type, target) {
        var desingnate = this.auto_id;
        switch (type) {
            case 'reduce':
                desingnate = desingnate.reduce;
                break;
            default:  // add
                desingnate = desingnate.add;
        }
        switch (target) {
            case 'd':
                desingnate = desingnate.d;
                break;
            case 'h':
                desingnate = desingnate.h;
                break;
            case 'i':
                desingnate = desingnate.i;
                break;
            default:  // s
                desingnate = desingnate.s;
        }
        return desingnate;
    };
};