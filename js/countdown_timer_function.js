CountDownTimer('12/31/2024 11:59 PM', 'countdown');


function CountDownTimer(dt, id){
    var end = new Date(dt);
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById(id).innerHTML = '0';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds";
    }

    timer = setInterval(showRemaining, 1000);
}

export{CountDownTimer}