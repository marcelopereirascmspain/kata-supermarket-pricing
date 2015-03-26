
module.exports = {
  getPriceFor: function (product) {
    switch (product) {
      case "A": return 84;
      case "B": return 13;
      case "C": return 62;
      case "D": return 64;
      case "E": return 2;
      case "F": return 59;
      default: throw new Error("Non Existent Product");
    }
  }
}