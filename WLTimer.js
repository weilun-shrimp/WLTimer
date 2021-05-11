function WLTimer (d = 0, h = 0, i = 0, s = 0) {
    this.d = d;
    this.h = h;
    this.i = i;
    this.s = s;
    this.auto_id = {
        add : {
            d : null,
            h : null,
            i : null,
            s : null
        },
        reduce : {
            d : null,
            h : null,
            i : null,
            s : null
        }
    };
    this.time_reset = function () {
        this.d = this.h = this.i = this.s = 0;
    };
    this.add_s = function (second) {
        if(second >= 86400){
            add_day = Math.floor(second/86400);
            this.d += add_day;
            second = second - (add_day * 86400); //left second
        }
        if(second >= 3600){
            add_hour = Math.floor(second/3600);
            this.h += add_hour;
            second = second - (add_hour * 3600); //left second
        }
        if(second >= 60){
            add_minute = Math.floor(second/60);
            this.add_i(add_minute);
            second = second - (add_minute * 60); //left second
        }
        if (this.s + second >= 60){  // handle left second, it only posible plus one to minute and hour 
            this.s = this.s + second - 60;
            this.add_i(1);
        } else {
            this.s += second;
        }
    };
    this.auto_add_s = function (add, interval) {
        var self = this;
        self.auto_id.add.s = setInterval(function() {
            self.add_s(add);
        }, interval);
    };
    this.add_i = function (minute) {
        if(minute >= 1440){
            add_day = Math.floor(minute/1440);
            this.d = this.d + add_day;
            minute = minute - (add_day * 1440); //left minute
        }
        if(minute >= 60){
            add_hour = Math.floor(minute/60);
            this.h = this.h + add_hour;
            minute = minute - (add_hour * 60); //left minute
        }
        if (this.i + minute >= 60){ // handle left minute, it only plus one to hour 
            this.i = this.i + minute - 60;
            this.h++;
        } else {
            this.i += minute;
        }
    };
    this.auto_add_i = function (add, interval) {
        var self = this;
        self.auto_id.add.i = setInterval(function() {
            self.add_i(add);
        }, interval);
    };
    this.add_h = function (hour) {
        if(hour >= 24){
            add_day = Math.floor(hour/24);
            this.d = this.d + add_day;
            hour = hour - (add_day * 24); //left hour
        }
        if (this.h + hour >= 24){ // handle left hour, it only plus one to day 
            this.h = this.h + hour - 24;
            this.d++;
        } else {
            this.h += hour;
        }
    };
    this.auto_add_h = function (add, interval) {
        var self = this;
        self.auto_id.add.h = setInterval(function() {
            self.add_h(add);
        }, interval);
    };

    this.auto_add_d = function (add, interval) {
        var self = this;
        self.auto_id.add.d = setInterval(function() {
            self.d += add;
        }, interval);
    };

    this.stop_auto = function (type = 'add', target = 's') {
        clearInterval(this.get_auto_id(type, target));
    };

    this.get_auto_id = function (type, target) {
        var desingnate = this.auto_id;
        switch (type) {
            case 'reduce' :
                desingnate = desingnate.reduce;
                break;
            default :  // add
                desingnate = desingnate.add;
        }
        switch (target) {   
            case 'd' : 
                desingnate = desingnate.d;
                break;
            case 'h' : 
                desingnate = desingnate.h;
                break;
            case 'i' : 
                desingnate = desingnate.i;
                break;
            default :  // s
                desingnate = desingnate.s;
        }
        return desingnate;
    };
};