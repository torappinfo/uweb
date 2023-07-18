export default {
  async fetch(req, _env) {
    let url = req.url;
    let iSlash = url.indexOf('/',11);
    let nUrl = url.substring(iSlash+1);
    return await goUrl(req, nUrl);
  }
}

async function goUrl(request, url) {
  let fp = {
    method: request.method
  };
  fp.headers = new Headers(request.headers);
  for(var i = 2; i < arguments.length-1; i=i+2){
    fp.headers[arguments[i]] = arguments[i+1];
  }
  return await fetch(url, fp);
}
