var bar = function animateProgress(percent, timeout) {
    timeout = typeof timeout !== 'undefined' ? timeout : 150;
    window.setInterval(function() {
        var p = document.getElementsByClassName('percents')[0].innerHTML.replace(/\%/, '');

        if (p < percent) {
            p++;
            document.getElementsByClassName('percents')[0].innerHTML = p + '%';
            document.getElementsByClassName('bar')[0].style.width = p + '%';
        }
    }, timeout);
    return true;
};

bar(20);
