let applyTax = (price, tax) => {
  if (tax === undefined) {
    return price;
  }

  return price * (tax / 100 + 1);
};

export default { applyTax };
