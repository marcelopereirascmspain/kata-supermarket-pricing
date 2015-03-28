let applyOffer = (numberOfProducts, offer) => {
  if (offer === undefined) {
    return numberOfProducts;
  }

  let {take, pay} = offer;

  return Math.ceil(numberOfProducts * (pay / take) + Math.max(0, take - pay - 1));
};

export default { applyOffer };
