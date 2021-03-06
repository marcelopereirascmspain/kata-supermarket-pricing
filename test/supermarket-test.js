import expect from "expect";
import { productPrices } from "../src/data";
import Supermarket from "../src/supermarket";
import R from "ramda";

describe("supermarket pricing", () => {
  describe("prices", () => {
    const productTaxes = {};
    const productOffers = {};

    let getPriceFor =
      R.partialRight(
        Supermarket.getPriceFor,
        productPrices,
        productTaxes);

    let getSummaryFor =
      R.partialRight(
        Supermarket.getSummaryFor,
        productPrices,
        productTaxes,
        productOffers);

    it("should return the price 84 for the product A", () => {
      expect(getPriceFor("A")).toEqual(84);
    });

    it("should return the price 13 for the product B", () => {
      expect(getPriceFor("B")).toEqual(13);
    });

    it("should return the price 62 for the product C", () => {
      expect(getPriceFor("C")).toEqual(62);
    });

    it("should return the price 64 for the product D", () => {
      expect(getPriceFor("D")).toEqual(64);
    });

    it("should return the price 2 for the product E", () => {
      expect(getPriceFor("E")).toEqual(2);
    });

    it("should return the price 59 for the product F", () => {
      expect(getPriceFor("F")).toEqual(59);
    });

    it("should ignore an unknown product", () => {
      expect(getPriceFor("Z")).toEqual(0);
    });

    it("should return the sum of the product prices", () => {
      expect(getPriceFor("BB")).toEqual(26);
    });

    it("should return the sum of the product prices", () => {
      expect(getPriceFor("DE")).toEqual(66);
    });

    it("should return the sum of the product prices", () => {
      expect(getPriceFor("DE")).toEqual(66);
    });

    it("should return a list with information for each product", () => {
      expect(getSummaryFor("AAAB")).toEqual([
        {
          product: "A",
          unitPrice: 84,
          numberOfProducts: 3,
          total: 252
        },
        {
          product: "B",
          unitPrice: 13,
          numberOfProducts: 1,
          total: 13
        }
      ]);
    });

    it("should return a sorted summary for each product", () => {
      expect(getSummaryFor("AABCFA DF FFF")).toEqual([
        {
          product: "A",
          unitPrice: 84,
          numberOfProducts: 3,
          total: 252
        },
        {
          product: "B",
          unitPrice: 13,
          numberOfProducts: 1,
          total: 13
        },
        {
          product: "C",
          unitPrice: 62,
          numberOfProducts: 1,
          total: 62
        },
        {
          product: "D",
          unitPrice: 64,
          numberOfProducts: 1,
          total: 64
        },
        {
          product: "F",
          unitPrice: 59,
          numberOfProducts: 5,
          total: 295
        }
      ]);
    });
  });

  describe("offers", () => {
    const productTaxes = {};

    const productOffers = {
      "A": {take: 2, pay: 1},
      "B": {take: 3, pay: 2},
      "C": {take: 1, pay: 1},
      "D": {take: 2, pay: 1},
      "E": {take: 1, pay: 1},
      "F": {take: 3, pay: 1}
    };

    let getTaxedPriceFor =
      R.partialRight(
        Supermarket.getPriceFor,
        productPrices,
        productTaxes);

    let getSummaryFor =
      R.partialRight(
        Supermarket.getSummaryFor,
        productPrices,
        productTaxes,
        productOffers);

    it("should return a sorted summary for each product", () => {
      expect(getSummaryFor("AABCFBA DF FFF")).toEqual([
        {
          product: "A",
          unitPrice: 84,
          numberOfProducts: 3,
          total: 168
        },
        {
          product: "B",
          unitPrice: 13,
          numberOfProducts: 2,
          total: 26
        },
        {
          product: "C",
          unitPrice: 62,
          numberOfProducts: 1,
          total: 62
        },
        {
          product: "D",
          unitPrice: 64,
          numberOfProducts: 1,
          total: 64
        },
        {
          product: "F",
          unitPrice: 59,
          numberOfProducts: 5,
          total: 177
        }
      ]);
    });
  });

  describe("taxes", () => {
    const productTaxes = {
      "A": 4,
      "B": 12,
      "C": 21,
      "D": 21,
      "E": 4,
      "F": 17
    };

    const productOffers = {};

    let getTaxedPriceFor =
      R.partialRight(
        Supermarket.getPriceFor,
        productPrices,
        productTaxes);

    let getSummaryFor =
      R.partialRight(
        Supermarket.getSummaryFor,
        productPrices,
        productTaxes,
        productOffers);

    it("should return the price 87.36 for the product A", () => {
      expect(getTaxedPriceFor("A")).toEqual(87.36);
    });

    it("should return a sorted summary for each product where the total price includes taxes", () => {
      expect(getSummaryFor("AABCFA DF FFF")).toEqual([
        {
          product: "A",
          unitPrice: 84,
          numberOfProducts: 3,
          total: 262.08
        },
        {
          product: "B",
          unitPrice: 13,
          numberOfProducts: 1,
          total: 14.560000000000002
        },
        {
          product: "C",
          unitPrice: 62,
          numberOfProducts: 1,
          total: 75.02
        },
        {
          product: "D",
          unitPrice: 64,
          numberOfProducts: 1,
          total: 77.44
        },
        {
          product: "F",
          unitPrice: 59,
          numberOfProducts: 5,
          total: 345.15
        }
      ]);
    });
  });
});
