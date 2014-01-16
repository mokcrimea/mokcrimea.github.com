var testString = "КОРАБЛИ, лавировали, лавировали. Да не вылавировали ёжик Ёжик";
var vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
var consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

function getLetters(inputText, Letters) {
  var outputLetters = '';
  for (var i = 0; i < inputText.length; i++) {
    for (var j = 0; j < Letters.length; j++) {
      if (inputText[i].toLowerCase() == Letters[j]) {
        outputLetters += inputText[i] + ', ';
      }
    }
  }

  return (outputLetters.substr(0, outputLetters.length - 2));
}

function WordLb(Text) {
  this.count = function() {
    var regexp = /[а-я]/i;
    var k = 0;
    for (var i = 0; i < Text.length; i++) {
      if (!regexp.test(Text[i])) {
        if (regexp.test(Text[i - 1])) {
          k++;
        }
      }
    }
    if (k !== 0) {
      return k + 1;
    } else {
      return k;
    }
  };

  this.vowels = function() {
    return (getLetters(Text, vowels));
  };

  this.consonants = function() {
    return (getLetters(Text, consonants));
  };

  // this.syllables = function() {
  //   var regexp = /[а-я]/i;
  //   var tempSyllable = '';
  //   var tempArray = [];
  //   for (var i = 0; i < Text.length; i++) {
  //     for (var j = 0; i < consonants.length; j++) {
  //       if (Text[i] == consonants[j]) {
  //         tempSyllable += Text[i];
  //       }
  //     }
  //   }
  // };
}

var Test = new WordLb(testString);
console.log(Test.count()); // количество слов
console.log(Test.vowels()); // вывод всех гласных
console.log(Test.consonants()); // вывод всех согласных