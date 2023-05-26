export default {
  async fetch(req, _env) {
    let url = req.url;
    let iSlash = url.indexOf('/',11);
    let nUrl = url.substring(iSlash+1);
    if(nUrl.startsWith("ws"))
      return await websocketHandler(req, nUrl);
    return await goUrl(req, nUrl);
  }
}

async function goUrl(request, url) {
  let fp = {
    method: request.method,
  };
  fp.headers = new Headers(request.headers);
  for(var i = 2; i < arguments.length-1; i=i+2){
    fp.headers[arguments[i]] = arguments[i+1];
  }
  return await fetch(url, fp);
}

async function handleSession(req, serverWebSocket, url) {
  let isAccept = false;
  //let ws = new WebSocket(url);
  let resp = await goUrl(req, url);
  let ws = resp.webSocket;
  if (!ws) {
    throw new Error("server didn't accept WebSocket");
  }
  ws.accept();
  
  serverWebSocket.addEventListener("message", event => {
    ws.send(event.data);
  });
  ws.addEventListener("message", event => {
    serverWebSocket.send(event.data)
  });
  ws.addEventListener("open", event => {
    isAccept = true;
    serverWebSocket.accept();
  })
  ws.addEventListener("close", event => {
    serverWebSocket.close(event.code, event.reason);
  })
  ws.addEventListener("error", event => {
    if(!isAccept){
      serverWebSocket.accept();
    }
    serverWebSocket.close();
  });
  serverWebSocket.addEventListener("error", event => {
    serverWebSocket.close();
  })
  serverWebSocket.addEventListener("close",event => {
    ws.close(event.code, event.reason);
  });
}

async function websocketHandler(req, url){
  const [client, server] = Object.values(new WebSocketPair())
  await handleSession(req, server, url);
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}
