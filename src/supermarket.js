var productPrices = {
  "A": 84,
  "B": 13,
  "C": 62,
  "D": 64,
  "E": 2,
  "F": 59
};

var productTaxes = {
  "A": 4,
  "B": 12,
  "C": 21,
  "D": 21,
  "E": 4,
  "F": 17
};

var get = function (key, obj) {
  return obj[key];
};

var getOrDefault = function (key, obj, defaultValue) {
  try {
    return get(key, obj);
  } catch (ex) {
    return defaultValue;
  }
};

var productNames = Object.keys(productPrices);

var isValidProduct = function (name, productNames) {
  return productNames.some(function (n) {
    return n === name;
  });
};

var extractProduct = function (str, productNames) {
  return str.split("").filter(function (name) {
    return isValidProduct(name, productNames);
  });
};

var getPriceForProduct = function (productName, productPrices) {
  return getOrDefault(productName, productPrices, 0);
};

var getTaxForProduct = function (productName, productTaxes) {
  return getOrDefault(productName, productTaxes, 0) / 100 + 1;
};

var sum = function (a, b) {
  return a + b;
};

module.exports = {
  getPriceFor: function (products) {
    return extractProduct(products, productNames)
      .map(function (product) {
        return getPriceForProduct(product, productPrices);
      })
      .reduce(sum, 0);
  },

  getTaxedPriceFor: function (products) {
    return extractProduct(products, productNames)
      .map(function (product) {
        return getPriceForProduct(product, productPrices) * getTaxForProduct(product, productTaxes);
      })
      .reduce(sum, 0);
  }
};