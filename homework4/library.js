  var testString = "КОРАБЛИ, лавировали, лавировали. Да не вылавировали ёжик Ёжик";

  var WordsLibrary = (function() {
    var vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    var consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];
    var outputLetters = ''; // для функции getLetter
    var regexp = /[а-я]/i;
    var k = 0;
    var input = '';

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


    return {
      count: function() {
        k = 0; // обнуляем объявленую ранее переменную
        for (var i = 0; i < Text.length; i++) {
          if (regexp.test(Text[i])) {
            if (!regexp.test(Text[i - 1])) {
              k++;
            }
          }
        }
        return k;
      },

      vowels: function() {
        return (getLetters(Text, vowels));
      },

      consonants: function() {
        return (getLetters(Text, consonants));
      }
    };

  })();

  console.log(WordsLibrary.count(testString));