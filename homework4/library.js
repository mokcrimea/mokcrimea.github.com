/* Модуль WordsLibrary
  Изменить тестовую строку можно обращением к window.inputLine или inputLine в консоли.

  .words() - выводит массив из введенных руских слов(массив не содержит знаки препинания)
  .count() - выводит общее количество русских слов
  .vowels() - выводит строкой  через запятую список всех гласных
  .consonants() - выводит строкой через запятую список всех согласных
  .syllables() - выводит строкой слова, разделенные пробелом и разбитые на слоги через '-' в 
  .prefix() - выделяет приставки у слов если таковые находит и выводит строкой


  */

var WordsLibrary = (function() {
  this.inputLine = 'корабли лавировали сверхвылавировали надоевший исподтишка'; // Строка с которой мы работаем
  var k, numOfSyllables, Soglasnih,
    outputLetters = '', // для функции getLetter
    re = /[^а-яё]+/i, // для разделения массива на слова.
    reGlasnie = /[аеёиоуыэюя]/i, // для проверки на гласные
    reSoglasnie = /[мнлрбвгджзйкпстфхцьъчшщ]/i, // для проверки на согласные
    // для разбиения на слоги
    reGluhie = /[бвгджзйкпстфхцьъчшщ]/i,
    reZvonkie = /[мнлр]/i,
    prefixArray = ['противо', 'внутри', 'предо', 'преди', 'сверх', 'среди', 'через', 'черес', 'испод', 'междо', 'между', 'ебез', 'небес', 'около', 'после', 'возо', 'надо', 'недо', 'низо', 'обез', 'обес', 'пере', 'подo', 'оза', 'пред', 'разо', 'чрез', 'без', 'бес', 'под', 'пра', 'пре', 'при', 'про', 'раз', 'рас', 'роз', 'ос', 'вне', 'воз', 'вос', 'все', 'взо', 'изо', 'кое', 'кой', 'меж', 'над', 'наи', 'низ', 'нис', 'обо', 'ото', 'сыз', 'тре', 'во', 'вз', 'вс', 'вы', 'до', 'за', 'из', 'ис', 'на', 'не', 'ни', 'об', 'от', 'па', 'по', 'со', 'су', 'у', 'в', 'к', 'о', 'с'],
    OutputSyllables = '',
    OutputPrefix = '';



  //Функция возвращающая строку c буквами. На вход подается строка и регулярное выражение.
  function getLetters(inputLine, Letters) {
    outputLetters = ''; //Обнуляем строку.
    for (var i = 0; i < inputLine.length; i++) {
      if (Letters.test(inputLine[i])) {
        outputLetters += inputLine[i] + ', ';
      }
    }
    return (outputLetters.substr(0, outputLetters.length - 2));
  }
  // Разделяем inputLine с помощью регулярного выражения на массив с раздельными словами.
  function separateWords() {
    //Почему-то, если на краях входящей строки будут символы типа !,? то комманда split не убирает их.
    //Дописал replace тем самым удаляя эти знаки.
    return inputLine.replace(/\!*\?*\;*\:*\,*\.*\$*/ig, '').split(re);
  }
  //Набор функций проверяющий тип буквы - гласная\глухая\звонкая
  function isGlasnaya(letter) {
    if (reGlasnie.test(letter)) {
      return true;
    }
  }

  function isGluhaya(letter) {
    if (reGluhie.test(letter)) {
      return true;
    }
  }

  function isZvonkaya(letter) {
    if (reZvonkie.test(letter)) {
      return true;
    }
  }
  //Функция подсчета количества слогов. Так как количество слогов напрямую зависит от количества гласных в слове.
  //Считаем кол-во гласных и возвращаем ответ
  function countSyllables(word) {
    numOfSyllables = 0;
    for (i = 0; i < word.length; i++) {
      if (reGlasnie.test(word[i])) {
        numOfSyllables++;
      }
    }
    return numOfSyllables;
  }
  //Функция которая применяется к каждому слову в массиве функции separateWords()
  //Разбивает слова на слоги. Правила разбиения написаны "влоб" и иногда перекрываются. 
  //Данная функция не покроет правильно разбиение на слоги любого русского слова.
  //Но с большинством вроде бы справляется.
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
          tempString = tempString.substr(0, tempString.length - 1);
          tempString += cur + '-';
          SyllablesArray.pop();
          SyllablesArray.push(tempString);
        }
      }
    }

    return OutputSyllables += SyllablesArray + ' ';
  }
  //При выполнении функции WordsLibrary.prefix() вызывается функция которая выдается массив из всех слов.
  //Далее каждый элемент этого массива перебирается функцией forEach которая в свою очередь для каждого элемента 
  //задействует функцию findPrefix.
  //
  //На вход поступает слово item. Создаем цикл по всем приставкам в массиве prefixArray
  //И для каждоый приставки проверяем есть ли в слове item такая часть(с начала слова) которая бы соотвествовала
  //приставке. Если такая приставка находится временный массив tempStringWithPrefix заполняется значением приставки и
  //через знак "-" остатком слова. А далее break, выполнение прекращается. Следующее слово item.
  function findPrefix(item, i, arr) {
    tempStringWithPrefix = [];
    for (k = 0; k < prefixArray.length; k++) {
      if (item.substr(0, prefixArray[k].length) == prefixArray[k]) {
        tempStringWithPrefix.push(prefixArray[k] + '-' + item.substring(prefixArray[k].length, item.length));
        break;
      }
    }
    return OutputPrefix += tempStringWithPrefix + ' ';
  }

  return {
    words: function() {
      return separateWords(); //выводим массив отдельных слов (для отлавдки)
    },
    // Функция подсчета количества слов
    count: function() {
      return separateWords().length;
    },
    // Вывод по порядку всех гласных букв
    vowels: function() {
      return getLetters(inputLine, reGlasnie);
    },
    // Вывод по порядку всех согласных букв
    consonants: function() {
      return (getLetters(inputLine, reSoglasnie));
    },
    //Разбивает слова на слоги и выводит строкой.
    syllables: function() {
      temp = '';
      separateWords().forEach(wordSyllable);
      temp = OutputSyllables;
      OutputSyllables = '';
      return temp.replace(/\,+/ig, ''); //
    },
    //ищет приставки в словах, если находит выводит строкой.
    prefix: function() {
      temp = '';
      separateWords().forEach(findPrefix);
      temp = OutputPrefix;
      OutputPrefix = '';
      return temp;
    }
  };

})();

//Тестовая зона.
console.log('Массив из всех русских слов');
console.log(WordsLibrary.words());
console.log('Количество русских слов');
console.log(WordsLibrary.count());
console.log('Список гласных');
console.log(WordsLibrary.vowels());
console.log('Список согласных');
console.log(WordsLibrary.consonants());
console.log('Слова разбитые на слоги');
console.log(WordsLibrary.syllables());
console.log('Слова с выделенными приставками');
console.log(WordsLibrary.prefix());