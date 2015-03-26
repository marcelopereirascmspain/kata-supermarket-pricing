var expect = require("expect");
var Supermarket = require("../src/supermarket");

describe("supermarket pricing", function function_name (argument) {
  it("it should return the price 84 for the product A", function () {
    expect(Supermarket.getPriceFor("A")).toEqual(84);
  });

  it("it should return the price 13 for the product B", function () {
    expect(Supermarket.getPriceFor("B")).toEqual(13);
  });

  it("it should return the price 62 for the product C", function () {
    expect(Supermarket.getPriceFor("C")).toEqual(62);
  });

  it("it should return the price 64 for the product D", function () {
    expect(Supermarket.getPriceFor("D")).toEqual(64);
  });

  it("it should return the price 2 for the product E", function () {
    expect(Supermarket.getPriceFor("E")).toEqual(2);
  });

  it("it should return the price 59 for the product F", function () {
    expect(Supermarket.getPriceFor("F")).toEqual(59);
  });

  it("it should ignore an unknown product", function () {
    expect(Supermarket.getPriceFor("Z")).toEqual(0); 
  });

  it("it should return the sum of the product prices", function () {
    expect(Supermarket.getPriceFor("BB")).toEqual(26); 
  });
});