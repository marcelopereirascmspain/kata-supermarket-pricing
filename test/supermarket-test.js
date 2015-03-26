var expect = require("expect");
var Supermarket = require("../src/supermarket");

describe("supermarket pricing", function function_name (argument) {
  it("it should return the price 84 for the product A", function () {
    expect(Supermarket.getPriceFor("A")).toEqual(84);
  });
});