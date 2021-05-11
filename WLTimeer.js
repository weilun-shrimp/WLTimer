var WLTimeer = {
    hour : {{ $auth_hour }},
    minute : {{ $auth_minute+11 }},
    second : {{ $second }},
    add_second : function (second) {
        add_hour = Math.floor(second/3600);
        this.hour = this.hour + add_hour;
        second = second - (add_hour * 3600); //left second
        add_minute = Math.floor(second/60);
        this.add_minute(add_minute);
        second = second - (add_minute * 60); //left second
        if (this.second + second >= 60){  // handle left second, it only plus one to minute and hour 
            this.second = this.second + second - 60;
            this.add_minute(1);
        } else {
            this.second = this.second + second;
        }
    },
    auto_add_second : function (add, interval) {
        setInterval(function() {
            this.add_second(add);
        }, interval);
    },
    add_minute : function (minute) {
        add_hour = Math.floor(minute/60);
        this.hour = this.hour + add_hour;
        minute = minute - (add_hour * 60); //left minute
        if (this.minute + minute >= 60){ // handle left minute, it only plus one to hour 
            this.minute = this.minute + minute - 60;
            this.hour++;
        } else {
            this.minute = this.minute + minute;
        }
    },
    auto_set : function (interval, type, target) {
        switch(type) {
            case 'hour':
                $(target).html(this.hour);
                break;
            case 'minute':
                $(target).html(String(this.minute).padStart(2, 0));
                break;
            default: //second
                $(target).html(String(this.second).padStart(2, 0));
        }
        setInterval(function () {
            this.auto_set(interval, type, target)
        }, interval);
    }
};