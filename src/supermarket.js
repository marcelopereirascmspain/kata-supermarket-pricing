import { sum, frequencies } from "./utils";
import R from "ramda";
import { applyOffer } from "./offer";
import { applyTax } from "./tax";

let isProductIdValid = (id, validIds) => R.contains(id, validIds);

let getProductList = (scanned) => R.split("", scanned);

let getValidProductIds = (productList, validIds) => {
  return productList.filter((id) => {
    return isProductIdValid(id, validIds);
  });
};

let getPriceForProduct = (id, prices) => R.propOr(0, id)(prices);
let getTaxForProduct = (id, taxes) => R.propOr(0, id)(taxes);

let getTaxedPriceForProduct = (id, prices, taxes) => {
  return applyTax(
    getPriceForProduct(id, prices),
    getTaxForProduct(id, taxes));
};

let getNumberOfScannedProducts = (id, productList) => {
  return R.prop(id, frequencies(productList));
};

let getNumberOfProductsToPay = (id, products, offers) => {
  let numberOfScannedProducts = getNumberOfScannedProducts(id, products);
  let offer = R.prop(id, offers);

  return applyOffer(numberOfScannedProducts, offer);
};

let getTotalPriceForProduct = (id, prices, taxes, numberOfProducts) => {
  return getTaxedPriceForProduct(id, prices, taxes) * numberOfProducts;
};

let sortByProductId = R.sortBy(R.prop("product"));

export default {
  getPriceFor: (scanned, prices, taxes) => {
    let productList = getProductList(scanned);
    let productIds = Object.keys(prices);

    return (
      getValidProductIds(productList, productIds)
      .map((ids) => getTaxedPriceForProduct(ids, prices, taxes))
      .reduce(sum, 0));
  },

  getSummaryFor: (scanned, prices, taxes, offers) => {
    let products = getProductList(scanned);
    let productIds =
      R.uniq(getValidProductIds(products, Object.keys(prices)));

    return sortByProductId(productIds.map((id) => {
      let numberOfProducts = getNumberOfScannedProducts(id, products);
      let numberOfProductsToPay = getNumberOfProductsToPay(id, products, offers);

      return {
        product: id,
        unitPrice: getPriceForProduct(id, prices),
        numberOfProducts: numberOfProducts,
        total: getTotalPriceForProduct(id, prices, taxes, numberOfProductsToPay)
      };
    }));
  }
};
