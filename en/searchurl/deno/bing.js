import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
async function handler(req: Request): Promise<Response> {
  let url = req.url;
  let iSlash = url.indexOf('/',11);
  let nUrl = "https://www.bing.com/"+url.substring(iSlash+1);
  let fp = {
    method: req.method,
    headers: {}
  }
  let reqHeaders = new Headers(req.headers);
  let keepHeaders = ["cookie","user-agent","accept","accept-language"];
  let he = reqHeaders.entries();
  for (let h of he) {
    let key = h[0],
        value = h[1];
    if (keepHeaders.includes(key)) {
      fp.headers[key] = value;
    }
  }

  return await fetch(nUrl, fp);
}

serve(handler);
