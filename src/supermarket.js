import { sum, frequencies } from "./utils";
import { productPrices, productTaxes } from "./data";
import R from "ramda";

let isProductNameValid = (name, validNames) => R.contains(name, validNames);

let getValidProductNames = (scannedValue, validNames) => {
  return scannedValue.split("").filter((name) => {
    return isProductNameValid(name, validNames);
  });
};

let getPriceForProduct = (id, prices) => R.propOr(0, id)(prices);
let getTaxForProduct = (id, taxes) => R.propOr(0, id)(taxes);

let getTaxedPriceForProduct = (id, prices, taxes) => {
  return (
    getPriceForProduct(id, prices) *
    (getTaxForProduct(id, taxes) / 100 + 1));
};

let getNumberOfScannedProducts = (id, scanned) => {
  return R.prop(id, frequencies(R.split("", scanned)));
};

let getTotalPriceForProduct = (id, prices, numberOfProducts) => {
  return getPriceForProduct(id, prices) * numberOfProducts;
};

let sortByProductName = R.sortBy(R.prop("product"));

module.exports = {
  getPriceFor: (scanned) => {
    let productNames = Object.keys(productPrices);

    return (
      getValidProductNames(scanned, productNames)
      .map((productNames) => getPriceForProduct(productNames, productPrices))
      .reduce(sum, 0));
  },

  getTaxedPriceFor: (scanned) => {
    let productNames = Object.keys(productPrices);

    return (
      getValidProductNames(scanned, productNames)
      .map((productName) => getTaxedPriceForProduct(productName, productPrices, productTaxes))
      .reduce(sum, 0));
  },

  getSummaryFor: (scanned) => {
    let productNames = R.uniq(
      getValidProductNames(scanned, Object.keys(productPrices)));

    return sortByProductName(productNames.map((name) => {
      let numberOfProducts = getNumberOfScannedProducts(name, scanned); 
      return {
        product: name,
        unitPrice: getPriceForProduct(name, productPrices),
        numberOfProducts: numberOfProducts,
        total: getTotalPriceForProduct(name, productPrices, numberOfProducts)
      };
    }));
  }
};