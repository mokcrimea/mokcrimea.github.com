//функция описывающая геометрическую прогрессию
var geometric = function() {
  document.getElementById('geometric_result').value = '';
  var Bn, Sn = 0;
  var b1 = document.getElementById('b1').value; //первый член прогрессии
  var q = document.getElementById('q').value; // знаменатель прогрессии
  var n = document.getElementById('n').value; // n-й элемент который необходимо найти

  if ((q !== 0) && (n > 0)) {
    Bn = b1 * Math.pow(q, n - 1);
    for (var i = 1; i <= n; i++) {
      Sn = b1 * (1 - Math.pow(q, n)) / (1 - q);
    }
    document.getElementById('geometric_result').value += (n + "-й элемент:\r" + Bn);
    document.getElementById('geometric_result').value += ("\r" + "Сумма первых членов геометрической прогрессии:\r" + Sn);
  } else {
    document.getElementById('geometric_result').value = "Некорректные начальные данные.";
  }
};

//функция описывающая последовательно Фибоначчи
var fibonachi = function() {
  document.getElementById('fibon_result').value = ("");
  var n = document.getElementById('fibon').value;
  if (n > 0) {
    var a = 1;
    var b = 1; //первые члены последовательности
    var Bn = b;
    for (var i = 3; i <= n; i++) {
      Bn = a + b;
      a = b;
      b = Bn;
    }
    document.getElementById('fibon_result').value = (n + "-й элемент:\r" + Bn);
  } else {
    document.getElementById('fibon_result').value = (n + "-й элемент:\r" + "0");
  }
};

//функции для Пузырьковой сортировки
function getRandom() {
  return Math.floor(Math.random() * 100);
}

var randomArray = [];
var fillArray = function() {
  var i = 0;
  document.getElementById('quickSort').value = '';
  while (i < 10) {
    randomArray[i] = getRandom();
    document.getElementById('quickSort').value += (randomArray[i] + ' ');
    i++;
  }
  document.getElementById('bubbleSort').disabled = false;
};

var bubbleSort = function() {
  randomArray = document.getElementById('quickSort').value.split(' ');
  var n = randomArray.length;
  var t;
  for (var i = n - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (randomArray[j] > randomArray[j + 1]) {
        tmp = randomArray[j];
        randomArray[j] = randomArray[j + 1];
        randomArray[j + 1] = tmp;
      }
    }
  }
  document.getElementById('quickSort').value += "\r\r\b";
  for (i = 1; i < n; i++) {
    document.getElementById('quickSort').value += (randomArray[i] + ' ');
  }
  document.getElementById('bubbleSort').disabled = true;
};