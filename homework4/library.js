var testString = "КОРАБЛИ лавировали лавировали да не вылавировали, да, чтото; совсем не - вылавировали. странно, монолог. проверка";
var vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
var consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

function getLetters(Text, Letters) {
  var outputLetters = '';
  for (var i = 0; i < Text.length; i++) {
    for (var j = 0; j < Letters.length; j++) {
      if (Text[i].toLowerCase() == Letters[j]) {
        outputLetters += Text[i] + ', ';
      }
    }
  }

  return (outputLetters.substr(0, outputLetters.length - 2));
}

function WordLb(Text) {
  this.count = function() {
    var regexp = /^[а-яёЁ]+$/i;
    var k = 0;
    for (var i = 0; i < Text.length; i++) {
      if (!regexp.test(Text[i])) {
        if (regexp.test(Text[i-1])){
          k++;
        }
      }
    }
    return k+1;
  };

  this.vowels = function() {
    return(getLetters(Text, vowels));
  };

  this.consonants = function() {
    return(getLetters(Text, consonants));
  };
}

var Test = new WordLb(testString);
console.log(Test.count()); // количество слов
console.log(Test.vowels()); // вывод всех гласных
console.log(Test.consonants()); // вывод всех согласных

// console.log(getLetters(testString, consonants));