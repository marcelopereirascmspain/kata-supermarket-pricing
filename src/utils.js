var get = (key, obj) => obj[key];

var getOrDefault = (key, obj, defaultValue) => {
  try {
    return get(key, obj);
  } catch (ex) {
    return defaultValue;
  }
};

var sum = (a, b) => a + b;

export { getOrDefault };
export { sum };
