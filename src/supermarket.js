
var isValidProduct = function (name) {
  return ["A", "B", "C", "D", "E", "F"].some(function (n) {
    return n === name;
  });
};

var extractProduct = function (str) {
  return str.split("").filter(function (name) {
    return isValidProduct(name);
  });
};

var getPriceForProduct = function (product) {
  switch (product) {
    case "A": return 84;
    case "B": return 13;
    case "C": return 62;
    case "D": return 64;
    case "E": return 2;
    case "F": return 59;
    default: 0;
  }
}

var sum = function (a, b) {
  return a + b;
};

module.exports = {
  getPriceFor: function (products) {
    return extractProduct(products)
      .map(getPriceForProduct)
      .reduce(sum, 0);
  }
};