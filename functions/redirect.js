export async function onRequest(context) {
  const { req, env } = context;
  let url = req.url;
  let iSlash = url.indexOf('?',11);
  let nUrl = url.substring(iSlash+1);
  return await goUrl(req, nUrl);
}

async function goUrl(request, url) {
  const Url = new URL(url);
  const newReq = new Request(Url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })
  return await fetch(newReq);
}
