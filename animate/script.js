function animateProgress(percent) {
    var p = document.getElementsByClassName('percents')[0].innerHTML.replace(/\%/, '');

    if (p < percent) {
        p++;
        document.getElementsByClassName('percents')[0].innerHTML = p + '%';
        document.getElementsByClassName('bar')[0].style.width = p + '%';
    }
}

bar = function startProgress(percent, timeout) {
    timeout = typeof timeout !== 'undefined' ? timeout : 150;
    window.setInterval('animateProgress(' + percent + ')', timeout);
    return true;
};

bar(20);
