{
  const oFetch = window.fetch;
  window.fetch = function(url,options){
    if("https://www.bing.com/turing/conversation/create"==url){
      url = "https://mybing2.xn--xyza.top/Create";
      options = {
        headers:{},
      };
    }
    return oFetch(url,options)
      .then((res)=>{return res;})
      .catch((err)=>{return err;});
  }
}
