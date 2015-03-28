import R from "ramda";

var sum = (a, b) => a + b;

var frequencies = (coll) => {
  return coll.reduce((acc, next) => {
    return R.merge(acc, {[next]: R.inc(R.propOr(0, next, acc))});
  }, {});
};

export default { sum, frequencies };
