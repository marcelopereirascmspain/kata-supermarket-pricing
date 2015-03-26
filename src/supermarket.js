import { getOrDefault, sum } from "./utils";
import { productPrices, productTaxes } from "./data";

let isValidProduct = (name, validNames) => {
  return validNames.some((validName) => name === validName);
};

let getValidProducts = (scannedValue, validNames) => {
  return scannedValue.split("").filter(function (name) {
    return isValidProduct(name, validNames);
  });
};

let getPriceForProduct = (id, prices) => getOrDefault(id, prices, 0);
let getTaxForProduct = (id, taxes) => getOrDefault(id, taxes, 0);

let getTaxedPriceForProduct = (id, prices, taxes) => {
  return (
    getPriceForProduct(id, prices) *
    (getTaxForProduct(id, taxes) / 100 + 1));
};

module.exports = {
  getPriceFor: (scanned) => {
    let productNames = Object.keys(productPrices);

    return (
      getValidProducts(scanned, productNames)
      .map((product) => getPriceForProduct(product, productPrices))
      .reduce(sum, 0));
  },

  getTaxedPriceFor: (scanned) => {
    let productNames = Object.keys(productPrices);

    return (
      getValidProducts(scanned, productNames)
      .map((product) => getTaxedPriceForProduct(product, productPrices, productTaxes))
      .reduce(sum, 0));
  }
};