(function () {
  class removeDom {
    constructor(classList = []) {
      this.adClassList = classList;
    };

    remove() {
      this.adClassList.forEach((c) => {
        $(`${c}`).length > 0 && $(`${c}`).remove();
      });
    };
  };

  let adClassList = ['.ec_wise_ad', '.ec_wise_pp', '.na-like-container'];
  let ad = new removeDom(adClassList);
  ad.remove();
})();
