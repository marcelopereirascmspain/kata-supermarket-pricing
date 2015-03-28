var expect = require("expect");
var Supermarket = require("../src/supermarket");

describe("supermarket pricing", () => {
  describe("#getPriceFor", () => {
    it("should return the price 84 for the product A", () => {
      expect(Supermarket.getPriceFor("A")).toEqual(84);
    });

    it("should return the price 13 for the product B", () => {
      expect(Supermarket.getPriceFor("B")).toEqual(13);
    });

    it("should return the price 62 for the product C", () => {
      expect(Supermarket.getPriceFor("C")).toEqual(62);
    });

    it("should return the price 64 for the product D", () => {
      expect(Supermarket.getPriceFor("D")).toEqual(64);
    });

    it("should return the price 2 for the product E", () => {
      expect(Supermarket.getPriceFor("E")).toEqual(2);
    });

    it("should return the price 59 for the product F", () => {
      expect(Supermarket.getPriceFor("F")).toEqual(59);
    });

    it("should ignore an unknown product", () => {
      expect(Supermarket.getPriceFor("Z")).toEqual(0); 
    });

    it("should return the sum of the product prices", () => {
      expect(Supermarket.getPriceFor("BB")).toEqual(26); 
    });

    it("should return the sum of the product prices", () => {
      expect(Supermarket.getPriceFor("DE")).toEqual(66); 
    });

    it("should return the sum of the product prices", () => {
      expect(Supermarket.getPriceFor("DE")).toEqual(66); 
    });

    it("should return a list with information for each product", () => {
      expect(Supermarket.getSummaryFor("AAAB")).toEqual([
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
      expect(Supermarket.getSummaryFor("AABCFA DF FFF")).toEqual([
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

  describe("#getTaxedPriceFor", () => {
    it("should return the price 87.36 for the product A", () => {
      expect(Supermarket.getTaxedPriceFor("A")).toEqual(87.36);
    });
  });
});