function getText() {
    return document.body.getElementsByTagName('textarea')[0].value;
}

function textareaResult(result) {
    return document.body.getElementsByTagName('div')[1].textContent = result;
}

document.body.getElementsByTagName('button')[0].addEventListener('click', function() {
    return textareaResult(getText().count());
});

document.body.getElementsByTagName('button')[1].addEventListener('click', function() {
    return textareaResult(getText().vowels());
});

document.body.getElementsByTagName('button')[2].addEventListener('click', function() {
    return textareaResult(getText().consonants());
});

document.body.getElementsByTagName('button')[3].addEventListener('click', function() {
    return textareaResult(getText().syllables());
});

document.body.getElementsByTagName('button')[4].addEventListener('click', function() {
    return textareaResult(getText().prefix());
});
