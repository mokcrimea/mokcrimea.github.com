var Words = (function() {
    String.prototype.count = function() {
        return separateWords(this).length;
    };

    String.prototype.vowels = function() {
        return getLetters(this, /[аеёиоуыэюя]/i);
    };

    String.prototype.consonants = function() {
        return getLetters(this, /[мнлрбвгджзйкпстфхцьъчшщ]/i);
    };

    String.prototype.syllables = function() {
        OutputSyllables = '';
        separateWords(this).forEach(wordSyllable);
        return OutputSyllables.replace(/\,+/ig, '');
    };

    String.prototype.prefix = function() {
        OutputPrefix = '';
        separateWords(this).forEach(findPrefix);
        return OutputPrefix;
    };

    function separateWords(that) {
        return that.toString().replace(/\!*\?*\;*\:*\,*\.*\$*/ig, '').split(/[^а-яё]+/i);
    }

    function getLetters(that, Letters) {
        outputLetters = '';
        for (var i = 0; i < that.length; i++) {
            if (Letters.test(that[i])) {
                outputLetters += that[i] + ', ';
            }
        }
        return (outputLetters.substr(0, outputLetters.length - 2));
    }

    function isGlasnaya(letter) {
        if (/[аеёиоуыэюя]/i.test(letter)) {
            return true;
        }
    }

    function isGluhaya(letter) {
        if (/[бвгджзйкпстфхцьъчшщ]/i.test(letter)) {
            return true;
        }
    }

    function isZvonkaya(letter) {
        if (/[мнлр]/i.test(letter)) {
            return true;
        }
    }

    function countSyllables(word) {
        numOfSyllables = 0;
        for (var i = 0; i < word.length; i++) {
            if (/[аеёиоуыэюя]/i.test(word[i])) {
                numOfSyllables++;
            }
        }
        return numOfSyllables;
    }

    function wordSyllable(item, i, arr) {
        // SyllablesArray = массив в который помещаются слоги для одного item-а.
        // В конце функции все сбрасывается в переменную OutputSyllables и на следующем цикле
        // переменная SyllablesArray обнуляется.
        var SyllablesArray = [];
        var cur, nex1, nex2, nex3, nex4, tempString;
        //Записываем сколько всего слогов в слове. Это для того чтобы правильно обрабатывать первый и последний.
        var Slogov = countSyllables(item);
        //Если в слове 1 гласная, значит и один слог. Выводим это слово.
        if (Slogov === 1) {
            SyllablesArray.push(item);
        } else {
            for (i = 0; i < item.length; i++) {
                cur = item[i] || undefined;
                nex1 = item[i + 1] || undefined;
                nex2 = item[i + 2] || undefined;
                nex3 = item[i + 3] || undefined;
                nex4 = item[i + 4] || undefined;
                nex5 = item[i + 5] || undefined;

                //Набор правил который я пытался писать по учебнику русского языка, сначала. Потом все немного усложнилось :)
                if (isGlasnaya(cur) && isGlasnaya(nex1) && (Slogov !== 0)) {
                    SyllablesArray.push(cur + '-');
                    Slogov -= 1;

                } else if (Slogov > countSyllables(item) - 1 && (isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex2) && (isGluhaya(nex1) || isZvonkaya(nex1)) && (isGluhaya(nex3) || isZvonkaya(nex3))) {
                    SyllablesArray.push(cur + nex1 + nex2 + nex3 + '-');
                    Slogov -= 1;
                    i += 3;
                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && isGluhaya(nex2) && isGluhaya(nex3) && Slogov > 1) {
                    SyllablesArray.push(cur + nex1 + nex2 + '-');
                    Slogov -= 1;
                    i += 2;

                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && (isGluhaya(nex2) || isZvonkaya(nex2)) && (isGluhaya(nex3) || isZvonkaya(nex3)) && (isGluhaya(nex4) || isZvonkaya(nex4)) && (isGluhaya(nex5) || isZvonkaya(nex5)) && Slogov > 1) {
                    SyllablesArray.push(cur + nex1 + nex2 + nex3 + '-');
                    Slogov -= 1;
                    i += 3;
                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && (isGluhaya(nex2) || isZvonkaya(nex2)) && (isGluhaya(nex3) || isZvonkaya(nex3)) && Slogov == countSyllables(item)) {
                    SyllablesArray.push(cur + nex1 + nex2 + '-');
                    Slogov -= 1;
                    i += 2;
                } else if (isGlasnaya(cur) && (isGluhaya(nex1) || isZvonkaya(nex1)) && isGlasnaya(nex2) && (Slogov !== 1)) {
                    SyllablesArray.push(cur + '-');
                    Slogov -= 1;

                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && (isGluhaya(nex2) || isZvonkaya(nex2)) && (isGluhaya(nex3) || isZvonkaya(nex3)) && Slogov > 1) {
                    SyllablesArray.push(cur + nex1 + '-');
                    Slogov -= 1;
                    i++;
                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && (isGluhaya(nex2) || isZvonkaya(nex2)) && (isGluhaya(nex3) || isZvonkaya(nex3)) && (isGluhaya(nex4) || isZvonkaya(nex4)) && Slogov > 1) {
                    SyllablesArray.push(cur + nex1 + nex2 + nex3 + '-');
                    Slogov -= 1;
                    i += 3;
                } else if (isGlasnaya(cur) && isGluhaya(nex1) && (isGluhaya(nex2) || isZvonkaya(nex2)) && Slogov > 1) {
                    SyllablesArray.push(cur + nex1 + '-');
                    Slogov -= 1;
                    i++;

                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && (isGluhaya(nex2) || isZvonkaya(nex2)) && (isGluhaya(nex3) || isZvonkaya(nex3)) && Slogov > 1) {
                    SyllablesArray.push(cur + nex1 + nex2 + '-');
                    Slogov -= 1;
                    i += 2;
                } else if ((isGluhaya(cur) || isZvonkaya(cur)) && isGlasnaya(nex1) && (Slogov !== 1)) {
                    SyllablesArray.push(cur + nex1 + '-');
                    Slogov -= 1;
                    i++;

                } else if (Slogov == 1) {
                    SyllablesArray.push(item.substring(i, item.length));
                    Slogov -= 1;
                    i++;
                    break;
                } else if (Slogov > 1 && isGlasnaya(cur)) {
                    SyllablesArray.push(cur);
                    i++;
                } else if (Slogov > 1) {
                    tempString = SyllablesArray[SyllablesArray.length - 1];
                    if (typeof tempString == 'undefined') tempString = '';
                    tempString = tempString.substr(0, tempString.length - 1);
                    tempString += cur + '-';
                    SyllablesArray.pop();
                    SyllablesArray.push(tempString);
                }
            }
        }

        return OutputSyllables += SyllablesArray + ' ';
    }

    function findPrefix(item) {
        prefixArray = ['противо', 'внутри', 'предо', 'преди', 'сверх', 'среди', 'через', 'черес', 'испод', 'междо', 'между', 'ебез', 'небес', 'около', 'после', 'возо', 'надо', 'недо', 'низо', 'обез', 'обес', 'пере', 'подo', 'оза', 'пред', 'разо', 'чрез', 'без', 'бес', 'под', 'пра', 'пре', 'при', 'про', 'раз', 'рас', 'роз', 'ос', 'вне', 'воз', 'вос', 'все', 'взо', 'изо', 'кое', 'кой', 'меж', 'над', 'наи', 'низ', 'нис', 'обо', 'ото', 'сыз', 'тре', 'во', 'вз', 'вс', 'вы', 'до', 'за', 'из', 'ис', 'на', 'не', 'ни', 'об', 'от', 'па', 'по', 'со', 'су', 'у', 'в', 'к', 'о', 'с'];
        tempStringWithPrefix = [];
        for (k = 0; k < prefixArray.length; k++) {
            if (item.substr(0, prefixArray[k].length) == prefixArray[k]) {
                tempStringWithPrefix.push(prefixArray[k] + '-' + item.substring(prefixArray[k].length, item.length));
                break;
            }
        }
        return OutputPrefix += tempStringWithPrefix + ' ';
    }

})();
