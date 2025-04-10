export default {
  async fetch(req, _env) {
    let url = req.url;
    const Url = new URL(url);
    let iSlash = url.indexOf('/',11);
    let nUrl = url.substring(iSlash+1);
    return await goUrl(req, nUrl);
  }
}

async function goUrl(request, url) {
  const Url = new URL(url);
  let headers = new Headers(request.headers);
  headers.set("X-forwarded-for","104.28.5.161");
  const newReq = new Request(Url, {
    method: request.method,
    headers: headers,
    body: request.body
  })
  return await fetch(newReq);
}
