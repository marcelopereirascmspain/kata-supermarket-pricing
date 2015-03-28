import R from "ramda";

let calculateProductsToPay = (numberOfProducts, offer) => {
  let {take, pay} = offer;

  return Math.ceil(numberOfProducts * (pay / take) + Math.max(0, take - pay - 1));
};

export { calculateProductsToPay };