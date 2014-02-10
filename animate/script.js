document.body.getElementsByTagName('input')[0].addEventListener('keyup', progressBar);

function progressBar() {
    var maxWidth = document.body.getElementsByClassName('progress_bar')[0].clientWidth;
    var currentWidth = document.body.getElementsByClassName('bar')[0].style;
    var percents = document.body.getElementsByClassName('percents')[0];
    var step = maxWidth / 100;
    var count = document.body.getElementsByClassName('percents')[0].textContent.replace(/\%/, '');
    var input = document.body.getElementsByTagName('input')[0].value;

    if (+input > 100) {
        document.body.getElementsByTagName('input')[0].value = 100;
        input = 100;
    } else if (+input < 0) {
        document.body.getElementsByTagName('input')[0].value = 0;
        input = 0;
    }

    if (+input > +count) {
        changeWidth(true);
    } else if (+input < +count) {
        changeWidth(false);
    }

    function changeWidth(bool) {
        if (+count != +input) {
            if (bool) {
                count++;
            } else {
                count--;
            }
            currentWidth.width = count * step + 'px';
            percents.textContent = count + '%';

            setTimeout(function() {
                changeWidth(bool);
            }, 50);
        }
    }
}
