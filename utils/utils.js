const tryFn = (fn, fallback = null) => {
  try {
    return fn();
  }
  catch (e) {
      return fallback;
  }
};

module.exports = {
  tryFn
}

