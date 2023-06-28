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
    method: request.method,
    headers: request.headers
  };
  return await fetch(url, fp);
}
