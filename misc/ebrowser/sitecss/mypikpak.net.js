(function() {
  const originFetch = fetch;
  window.fetch = (...arg) => {
    if (arg[0].indexOf('area_accessible') > -1) {
      return new Promise(() => {
        throw new Error();
      });
    } else {
      return originFetch(...arg);
    }
  }
})();
