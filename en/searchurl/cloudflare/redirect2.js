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
  let headers = new Headers();
  for (var pair of request.headers.entries()){
    let key = pair[0].toLowerCase();
    if(key.startsWith("cf-")) continue;
    if("host"===key) continue;
    headers.set(pair[0], pair[1]);
  }
  const newReq = new Request(Url, {
    method: request.method,
    headers: headers,
    body: request.body,
    redirect: 'follow'
  })
  return await fetch(newReq);
}
