document.body.getElementsByTagName('button')[0].addEventListener('click', progressBar);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function progressBar() {
    var input = getRandomInt(1, 100),
        count = document.body.getElementsByClassName('percents')[0].textContent.replace(/\%/, ''),
        time = 2000 / Math.abs(input - count);
    document.body.getElementsByClassName('bar')[0].style.width = 210 / 100 * input + 'px';

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
            document.body.getElementsByClassName('percents')[0].textContent = count + '%';

            setTimeout(function() {
                changeWidth(bool);
            }, time);
        }
    }
}
