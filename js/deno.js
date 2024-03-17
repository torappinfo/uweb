import { serveFile } from "https://deno.land/std/http/file_server.ts";
async function handler(req){
  let url = req.url;
  let iSlash = url.indexOf('/',11);
  let path = url.substring(iSlash+1);
  if(path.endsWith('/'))
    path = path + 'index.html';
  return await serveFile(req, `${Deno.cwd()}/`+path);
};

Deno.serve(handler);
