/* Copyright (C) 2024 Richard Hao Cao
Ebrowser is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Ebrowser is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
const {
  app, BrowserWindow, Menu, shell, clipboard,
  session, protocol, dialog, ipcMain
} = require('electron')
let win;
const fs = require('fs');
const process = require('process')
const noStdin = fs.fstatSync(0).isCharacterDevice();

if(noStdin && !app.requestSingleInstanceLock())
  app.quit()
else {
  app.on('ready', createWindow);
  app.on('second-instance', (event, args, cwd) => {
    if (win) {
      if (win.isMinimized()) {
        win.restore()
      }
      win.show()
      win.focus()
      cmdlineProcess(args,cwd,1);
    }else
      createWindow();
  })
}
Menu.setApplicationMenu(null);
const path = require('path')
const https = require('https');
const url = require('url');
var downloadMillis = 0;
var translateRes;
{
  let langs = app.getPreferredSystemLanguages();
  if(langs.length==0 || langs[0].startsWith('en'))
    topMenu();
  else
    initTranslateRes(langs[0]);
}

var repositoryurl = "https://gitlab.com/jamesfengcao/uweb/-/raw/master/misc/ebrowser/";
const readline = require('readline');
var gredirects = [];
var gredirect;
var redirects;
var bRedirect = true;
var bJS = true;
var bForwardCookie = true;
var proxies = {};
var proxy;
var useragents = {};
var downloadMenus = [];
var selectMenus = [];
var defaultUA;
{
  let sys = "X11; Linux x86_64";
  if (process.platform === "win32") 
    sys = "Window NT 10.0; Win64; x64";
  else if (process.platform === "darwin")
    sys = "Macintosh; Intel Mac OS X 10_15_7";
  defaultUA =
    `Mozilla/5.0 (${sys}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/` +
    process.versions.chrome +" Safari/537.36";
}
app.userAgentFallback = defaultUA;

fs.readFile(path.join(__dirname,'redirect.json'), 'utf8', (err, jsonString) => {
  if (err) return;
  try {
    redirects = JSON.parse(jsonString);
  } catch (e){console.log(e)}
});

async function createWindow () {
  try {
    let json = await fs.promises.readFile(path.join(__dirname,'uas.json'), 'utf8');
    useragents = JSON.parse(json);
  } catch (e){console.log(e)}

  protocol.handle("i",(req)=>{return null;});
  await (async ()=>{
    try{
      const readInterface = readline.createInterface ({
        input: fs.createReadStream (path.join(__dirname,'config'), 'utf8'),
      });

      for await (const line of readInterface) {
        addrCommand(line);
      }
    }catch(e){console.log(e);}
  })();

  win = new BrowserWindow(
    {show: false, autoHideMenuBar: true,
     webPreferences: {
       nodeIntegration: true,
       contextIsolation: false,
       webviewTag: true,
     }});
  win.setMenuBarVisibility(false);
  win.once('ready-to-show', () => {
    win.maximize();
    win.show();
  });
  win.on('closed', function () {
    win = null
  })

  win.loadFile('index.html');
  fs.readFile(path.join(__dirname,'gredirect.json'), 'utf8', (err, jsonString) => {
    if (err) return;
    try {
      gredirects = JSON.parse(jsonString);
    } catch (e){console.log(e)}
  });

  fs.readFile(path.join(__dirname,'proxy.json'), 'utf8', (err, jsonString) => {
    if (err) return;
    try {
      proxies = JSON.parse(jsonString);
      let match = jsonString.match(/"([^"]+)"/);
      if(match)
        proxy = proxies[match[1]];
    } catch (e){console.log(e)}
  });

  cmdlineProcess(process.argv, process.cwd(), 0);
  //app.commandLine.appendSwitch ('trace-warnings');

  fs.readFile(path.join(__dirname,'download.json'), 'utf8', (err, jsonStr) => {
    if (err) return;
    try {
      downloadMenus = JSON.parse(jsonStr);
    }catch (e){console.log(e)}
  });

  fs.readFile(path.join(__dirname,'select.json'), 'utf8', (err, jsonStr) => {
    if (err) return;
    try {
      selectMenus = JSON.parse(jsonStr);
    }catch (e){console.log(e)}
  });

  win.webContents.on('page-title-updated',(event,cmd)=>{
    addrCommand(cmd);
  });

  session.defaultSession.on("will-download", async (e, item) => {
    //item.setSavePath(save)
    let curMillis = Date.now();
    if(curMillis-downloadMillis<9000){
      item.on('updated', (event, state) => {
        const progress = item.getReceivedBytes() / item.getTotalBytes();
        win.setProgressBar(progress);
      });
      item.on('done', () => win.setProgressBar(-1));
      return;
    }
    e.preventDefault();
    let url = item.getURL();
    let menuT = downloadContextMenuTemp(url);
    const menu = Menu.buildFromTemplate(menuT);
    menu.popup();
  });

  win.webContents.on('console-message',cbConsoleMsg);
}

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (win === null) {
    createWindow()
  }
})

app.on('will-quit', () => {
})

app.on ('web-contents-created', (event, contents) => {
  if (contents.getType () === 'webview') {
    contents.setWindowOpenHandler(cbWindowOpenHandler);
    contents.on('context-menu',onContextMenu);
    contents.on('page-title-updated',cbTitleUpdate);
    contents.session.webRequest.onBeforeRequest(interceptRequest);
  }
});

ipcMain.on('command', (event, cmd) => {
  addrCommand(cmd);
});

async function addrCommand(cmd){
  if(cmd.length<3) return;
  let c0 = cmd.charCodeAt(0);
  switch(c0){
  case 33://"!"
    bangcommand(q,1);
    return;
  case 58: //':'
    let iS = cmd.indexOf(' ',1);
    if(iS<0) iS = cmd.length;
    let arg0 = cmd.substring(1,iS);
    switch(arg0){
    case "cert":
      if(cmd.length==iS)
        session.defaultSession.setCertificateVerifyProc((request, callback) => {
          callback(0);
        });
      else
        session.defaultSession.setCertificateVerifyProc(null);
      return;
    case "clear":
      if(cmd.length<=iS+1){
        session.defaultSession.clearData();
        return;
      }
      if(123===cmd.charCodeAt(iS+1)){//json
        try {
          let opts = JSON.parse(cmd.substring(iS+1));
          session.defaultSession.clearData(opts);
        }catch(e){console.log(e)}
        return;
      }
      let args = cmd.substring(iS+1).split(/\s+/);
      switch(args[0]){
      case "cache":
        session.defaultSession.clearCache();
        return;
      case "cookie":
        if(args.length==1){
          session.defaultSession.clearStorageData({ storages: ['cookies'] });
          return;
        }
        {
          let url = args[1];
          if(url.charCodeAt(0)!==104) url = "https://"+url;
          session.defaultSession.cookies.get({ url: url }).then((cookies) => {
            cookies.forEach((cookie) => {
              session.defaultSession.cookies.remove(targetUrl, cookie.name)})});
        }
        return;
      case "dns":
        session.defaultSession.clearHostResolverCache();
        return;
      case "storage":
        session.defaultSession.clearStorageData();
        return;
      default:
      }
      return;
    case "exit":
      win.close();
      return;
    case "ext":
      session.defaultSession.loadExtension(cmd.substring(iS+1));
      return;
    case "gr":
      if(cmd.length==iS) {
        gredirect_enable(0);
        return;
      }
      let i = parseInt(cmd.substring(iS+1));
      if(i>=0 && i<gredirects.length)
        gredirect_enable(i);
      else
        gredirect_disable();
      return;
    case "js"://execute js
      eval(cmd.slice(4));
      return;
    case "nc":
      bForwardCookie = false;
      msgbox_info("Cookie forwarding disabled");
      return;
    case "uc":
      if(bForwardCookie) {
        msgbox_info("Cookie forwarding enabled for global redirection");
        return;
      }
      forwardCookie();
      return;
    case "np":
      session.defaultSession.setProxy ({mode:"direct"});
      bRedirect = true;
      return;
    case "up":
      if(cmd.length>iS)
        proxy = proxies[cmd.substring(iS+1)]; //retrieve proxy
      if(proxy){
        session.defaultSession.setProxy(proxy)
          .then(() => {gredirect_disable()})
          .catch((error) => {
            console.error('Failed to set proxy:', error);
          });
      }
      return;
    case "nr":
      bRedirect = false; return;
    case "ur":
      bRedirect = true; return;
    case "sys":
      {
        let iHTTP = cmd.search(/https?:\/\//);
        if(iHTTP<0) return;
        let iEnd = cmd.indexOf(' ',iHTTP+10);
        if(iEnd<0) iEnd = cmd.length;
        let url = cmd.substring(iHTTP,iEnd);
        let cookies = await session.defaultSession.cookies.get({url: url});
        let cookieS = cookies.map (cookie => cookie.name  + '='
                                   + cookie.value ).join(';');
        let args = cmd.substring(5).split(/\s+/);
        for(let i=1;i<args.length;i++){
          let iC = args[i].indexOf('%cookie');
          if(iC<0) continue;
          args[i] = args[i].substring(0,i)+cookieS+args[i].substring(i+7);
          break;
        }
        const { spawn } = require('child_process');
        const process = spawn(args[0],args.slice(1));
        process.stdout.on('data', (data) => {
          let str = data.toString();
          console.log(str);
          let js = "showHtml(`"+str+"`)";
          win.webContents.executeJavaScript(js,false);
        });
      }
      return;
    case "ua":
      if(cmd.length>iS){
        let ua = useragents[cmd.substring(iS+1)];
        if(ua)
          session.defaultSession.setUserAgent(ua);
      }else
        session.defaultSession.setUserAgent(defaultUA);
      return;
    case "update":
      let updateurl;
      if(cmd.length==iS)
        updateApp(repositoryurl);
      else {
        filename = cmd.substring(iS+1);
        let iSlash = filename.lastIndexOf('/');
        if(iSlash>0){
          let folder = path.join(__dirname,filename.substring(0,iSlash));
          fs.mkdirSync(folder,{ recursive: true });
        }
        fetch2file(repositoryurl,filename);
      }
      return;
    }
  }
}

function gredirect_disable(){
  if(gredirect){
    gredirect=null;
    unregisterHandler();
  }
  bRedirect = true;
}
function gredirect_enable(i){
  if(i>=gredirects.length) return;
  if(!gredirect) registerHandler();
  gredirect=gredirects[i];
}

function cbConsoleMsg(e, level, msg, line, sourceid){
  console.log(line);
  console.log(sourceid);
  console.log(msg);
}

function interceptRequest(details, callback){
  let url = details.url;
  if(58===url.charCodeAt(1) || (!bJS && url.endsWith(".js"))){
    callback({ cancel: true });
    return;
  }
  do {
    if(gredirect || !bRedirect ||(details.resourceType !== 'mainFrame' &&
                     details.resourceType !== 'subFrame')) break;
    let oURL = new URL(url);
    let domain = oURL.hostname;
    let newUrl;
    try{
      let newDomain = redirects[domain];
      if(!newDomain) break;
      newUrl = "https://"+newDomain+oURL.pathname+oURL.search+oURL.hash;
    }catch(e){break;}
    callback({ cancel: false, redirectURL: newUrl });
    return;
  }while(false);
  callback({ cancel: false });
}

function cbWindowOpenHandler(details){
  let url = details.url;
  let js = "newTab();tabs.children[tabs.children.length-1].src='"+
      url+"';";
  switch(details.disposition){
  case "foreground-tab":
  case "new-window":
    js = js + "switchTab(tabs.children.length-1)";
  }
  win.webContents.executeJavaScript(js,false);
  return { action: "deny" };
}
function cbTitleUpdate(event,title){
  win.setTitle(title);
}
function menuSelection(menuTemplate, text){
  for(let i=0; i<selectMenus.length-1;i++){
    menuTemplate.push({
      label: selectMenus[i],
      click: () => {
        let cmd = selectMenus[i+1].replace('%s',text);
        let js = `handleQueries(\`${cmd}\`)`;
        win.webContents.executeJavaScript(js,false);
      }
    });
  }
}
function menuDownload(menuTemplate, labelprefix, linkUrl){
  for(let i=0; i<downloadMenus.length-1;i++){
    menuTemplate.push({
      label: labelprefix+downloadMenus[i],
      click: () => {
        let cmd = downloadMenus[i+1].replace('%u',linkUrl);
        let js = `handleQueries(\`${cmd}\`)`;
        win.webContents.executeJavaScript(js,false);
      }
    });
  }
}
function menuArray(labelprefix, linkUrl){
  let menuTemplate = [
    {
      label: labelprefix+translate('Open'),
      click: () => {
        shell.openExternal(linkUrl);
      }
    },
    {
      label: labelprefix+translate('Copy'),
      click: () => {
        clipboard.writeText(linkUrl);
      }
    },
    {
      label: labelprefix+translate('Download'),
      click: () => {
        downloadMillis = Date.now();
        win.webContents.downloadURL(linkUrl);
      }
    },
  ];
  if(downloadMenus)
    menuDownload(menuTemplate, labelprefix, linkUrl);
  return menuTemplate;
}

function onContextMenu(event, params){
  let url = params.linkURL;
  let mTemplate = [];
  if (url) {
    mTemplate.push({label:url,enabled:false});
    mTemplate.push.apply(mTemplate,menuArray("",url));
    if((url=params.srcURL))
      mTemplate.push.apply(mTemplate,menuArray("src: ",url));
  }else if((url=params.srcURL)){
    mTemplate.push({label:url,enabled:false});
    mTemplate.push.apply(mTemplate,menuArray("src: ",url));
  }else if((url=params.selectionText)){
    menuSelection(mTemplate,url);
  }else
    return;

  const contextMenu = Menu.buildFromTemplate(mTemplate);
  contextMenu.popup();
}

async function topMenu(){
  const menuTemplate = [];
  try {
    let json = await fs.promises.readFile(path.join(__dirname,'menu.json'), 'utf8');
    let menus = JSON.parse(json);
    if(menus.length>1){
      let submenu = [];
      for(let i=0;i<menus.length-1; i=i+2){
        let cmd = menus[i+1];
        let js = `handleQueries("${cmd}")`;
        submenu.push({
          label: menus[i], click: ()=>{
            win.webContents.executeJavaScript(js,false);
          }});
      }
      menuTemplate.push({
        label: translate('Tools'),
        submenu: submenu,
      });
    }
  }catch(e){console.log(e)}
  menuTemplate.push(
    {
      label: translate('Edit'),
      submenu: [
        { label: translate('Config folder'), click: ()=>{
          shell.openPath(__dirname);
        }},
      ]
    },
    {
      label: translate('Help'),
      submenu: [
        { label: translate('Check for updates'), click: ()=>{
          addrCommand(":update");
        }},
        { label: translate('Help'), accelerator: 'F1', click: ()=>{
          help();
        }},
        { label: translate('Stop'), accelerator: 'Ctrl+C', click: ()=>{
          let js="tabs.children[iTab].stop()"
          win.webContents.executeJavaScript(js,false)
        }},
        { label: translate('getURL'), accelerator: 'Ctrl+G', click: ()=>{
          let js="{let q=document.forms[0].q;q.focus();q.value=tabs.children[iTab].getURL();getWinTitle()}"
          win.webContents.executeJavaScript(js,false).then((r)=>{
            win.setTitle(r);
          });
        }},
        { label: translate('Select'), accelerator: 'Ctrl+L', click:()=>{
          win.webContents.executeJavaScript("document.forms[0].q.select()",false);
        }},
        { label: translate('New Tab'), accelerator: 'Ctrl+T', click:()=>{
          let js = "newTab();document.forms[0].q.select();switchTab(tabs.children.length-1)";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('Restore Tab'), accelerator: 'Ctrl+Shift+T', click:()=>{
          let js = "{let u=closedUrls.pop();if(u){newTab();switchTab(tabs.children.length-1);tabs.children[iTab].src=u}}";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('No redirect'), accelerator: 'Ctrl+R', click: ()=>{
          gredirect_disable();
        }},
        { label: translate('Redirect'), accelerator: 'Ctrl+Shift+R', click: ()=>{
          gredirect_enable(0);
        }},
        { label: translate('Close tab'), accelerator: 'Ctrl+W', click: ()=>{
          win.webContents.executeJavaScript("tabClose()",false).then((r)=>{
            if(""===r) win.close();
            else win.setTitle(r);
          });
        }},
        { label: translate('Next Tab'), accelerator: 'Ctrl+Tab', click: ()=>{
          let js="tabInc(1);getWinTitle()";
          win.webContents.executeJavaScript(js,false).then((r)=>{
            win.setTitle(r);
          });
        }},
        { label: translate('Previous Tab'), accelerator: 'Ctrl+Shift+Tab', click: ()=>{
          let js="tabDec(-1);getWinTitle()";
          win.webContents.executeJavaScript(js,false).then((r)=>{
            win.setTitle(r);
          });
        }},
        { label: translate('Go backward'), accelerator: 'Alt+Left', click: ()=>{
          let js="tabs.children[iTab].goBack()";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('Go forward'), accelerator: 'Alt+Right', click: ()=>{
          let js="tabs.children[iTab].goForward()";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('Zoom in'), accelerator: 'Ctrl+Shift+=', click: ()=>{
          let js="{let t=tabs.children[iTab];let s=t.getZoomFactor()*1.2;t.setZoomFactor(s)}";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('Zoom out'), accelerator: 'Ctrl+-', click: ()=>{
          let js="{let t=tabs.children[iTab];let s=t.getZoomFactor()/1.2;t.setZoomFactor(s)}";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('Default zoom'), accelerator: 'Ctrl+0', click: ()=>{
          let js="tabs.children[iTab].setZoomFactor(1)";
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('No focus'), accelerator: 'Esc', click: ()=>{
          let js = `{let e=document.activeElement;
if(e)e.blur();try{tabs.children[iTab].stopFindInPage('clearSelection')}catch(er){}}`;
          win.webContents.executeJavaScript(js,false);
        }},
        { label: translate('Reload'), accelerator: 'F5', click: ()=>{
          win.webContents.executeJavaScript("tabs.children[iTab].reload()",false);
        }},
        { label: translate('Devtools'), accelerator: 'F12', click: ()=>{
          let js = "try{tabs.children[iTab].openDevTools()}catch(e){console.log(e)}";
          win.webContents.executeJavaScript(js,false);
        }},

      ],
    },
  );
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function cmdlineProcess(argv,cwd,extra){
  let i1st = 2+extra; //index for the first query item
  if(argv.length>i1st){
    if(i1st+1==argv.length){//local file
      let fname =  path.join(cwd, argv[i1st]);
      if(fs.existsSync(fname)){
        let js = "tabs.children[iTab].src='file://"+fname+"'";
        win.webContents.executeJavaScript(js,false);
        win.setTitle(argv[i1st]);
        return;
      }
    }
    let url=argv.slice(i1st).join(" ");
    win.webContents.executeJavaScript("{let v=`"+url+"`;document.forms[0].q.value=v;handleQuery(v)}",false);
    win.setTitle(url);
  }else if(!noStdin)
    handle_stdin(5000);
}

async function cbScheme_redir(req){
  if(!gredirect) return null;
  let oUrl = req.url;
  let newurl = gredirect+oUrl;
  const parsedUrl = url.parse(newurl);
  let headers = new Headers();
  for (var pair of req.headers.entries())
    headers.set(pair[0],pair[1]);
  if(bForwardCookie){
    let cookies = await session.defaultSession.cookies.get({url: oUrl});
    let cookieS = cookies.map (cookie => cookie.name  + '=' + cookie.value ).join(';');
    headers.set('cookie',cookieS);
  }
  //missing referer header
  //headers.set('referer',);
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: req.method,
    headers: headers
  };
  return new Promise(async (resolve, reject) => {
    const nreq = https.request(options, (res) => {
      let body = [];
      res.on('data', (chunk) => {
        body.push(chunk);
      });

      res.on('end', () => {
        try {
          body = Buffer.concat(body);
          const response = new Response(body, res);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      });
    });
    nreq.on('error', (err) => {
      reject(err);
    });
    if (req.body){
     try {
      const reader = req.body.getReader();
      do {
        const { done, value } = await reader.read();
        if (done) {
          nreq.end();
          break;
        }
        nreq.write(value);
        console.log(headers);
        console.log(new TextDecoder("iso-8859-1").decode(value));
      }while (true);
     }catch(e){reject(e)}
    }else
      nreq.end();
  });
}

function registerHandler(){
  protocol.handle("http",cbScheme_redir);
  protocol.handle("https",cbScheme_redir);
  protocol.handle("ws",cbScheme_redir);
  protocol.handle("wss",cbScheme_redir);
}
function unregisterHandler(){
  protocol.unhandle("http",cbScheme_redir);
  protocol.unhandle("https",cbScheme_redir);
  protocol.unhandle("ws",cbScheme_redir);
  protocol.unhandle("wss",cbScheme_redir);
}

function forwardCookie(){
  const choice = dialog.showMessageBoxSync(null,  {
    type: 'warning',
    title: 'Confirm cookie forwarding with global redirection',
    message: 'Cookies are used to access your account. Forwarding cookies is vulnerable to global redirection server, proceed to enable cookie forwarding with global redirection?',
    buttons: ['No','Yes']
  })
  if(1===choice) bForwardCookie=true;
}
function msgbox_info(msg){
  dialog.showMessageBoxSync(null,  {
    type: 'info',
    title: msg,
    message: msg,
    buttons: ['OK']
  })
}

async function updateApp(url){//url must ending with "/"
  let msg;
  do {
    try {
      let res = await fetch(url+"package.json");
      let packageS = await res.text();
      {//the last part of version string is the version number, must keep increasing
        let head = packageS.slice(2,40);
        let iV = head.indexOf("version");
        if(iV<0) {
          msg = "remote package.json corrupted"
          break;
        }
        iV = iV + 10;
        let iE = head.indexOf('"',iV+4);
        let iS = head.lastIndexOf('.',iE-1);
        let nLatestVer = parseInt(head.substring(iS+1,iE));

        let ver = app.getVersion();
        iS = ver.lastIndexOf('.');
        let nVer = parseInt(ver.substring(iS+1));
        if(nVer>=nLatestVer){
          msg = `Current version ${ver} is already up to date`;
          break;
        }
        const choice = dialog.showMessageBoxSync(null,  {
          type: 'warning',
          title: `Update from ${url}`,
          message: `Proceed to update from ${ver} to ${head.substring(iV,iE)}?`,
          buttons: ['YES','NO']
        });
        if(1===choice) return;
      }

      writeFile("package.json", packageS);

      fetch2file(url,"webview.js");
      fetch2file(url,"index.html");
      msg = "Update completed";
    }catch(e){
      msg = "Fail to update"
    }
  }while(false);
  dialog.showMessageBoxSync(null,  {
    type: 'info',
    title: `Update from ${url}`,
    message: msg,
    buttons: ['OK']
  })
}

async function fetch2file(urlFolder, filename, bOverwritten=true){
  let pathname=path.join(__dirname,filename);
  if(!bOverwritten && fs.existsSync(pathname)) return;
  let res = await fetch(urlFolder+filename);
  let str =  await res.text();
  writeFile(pathname, str);
}

async function writeFile(filename, str){
  let pathname=filename+".new";
  fs.writeFile(pathname, str, (err) => {
    if(err) throw "Fail to write";
    fs.rename(pathname,filename,(e1)=>{
      if(e1) throw "Fail to rename";
    });
  });
}

function help(){
  const readme = "README.md";
  const htmlFN = path.join(__dirname,readme);
  let js=`{let t=tabs.children[iTab];t.dataset.jsonce=BML_md;t.src="file://${htmlFN}"}`;
  win.webContents.executeJavaScript(js,false)
}

function downloadContextMenuTemp(url){
  let mTemplate =
      [{label:url,enabled:false},
       {label: translate('Download'),
        click: () => {
          downloadMillis = Date.now();
          win.webContents.downloadURL(url);
        }
       },
       {
         label: translate('Copy'),
         click: () => {
           clipboard.writeText(url);
         }
       },
      ];
  menuDownload(mTemplate, "", url);
  return mTemplate;
}
async function initTranslateRes(lang){
  let basename=path.join(__dirname,"translate.");
  let fname = basename+lang;
  if(!fs.existsSync(fname))
    fname = basename+lang.slice(0,2);
  try {
    let json = await fs.promises.readFile(fname,'utf8');
    translateRes = JSON.parse(json);
  } catch (e){}
  topMenu();
}

function translate(str){
  let result;
  if(translateRes && (result=translateRes[str])) return result;
  return str;
}

function httpReq(url, method, filePath){
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    let opts = {
      method: method,
      headers: {
        "Content-Type":'application/octet-stream',
      },
      body: fileData,
    };
    fetch(url,opts);
  });
}

function bangcommand(q,offset){
  let iS = q.indexOf(' ',offset);
  if(iS<0) iS=q.length;
  let fname = q.substring(offset,iS);
  let fpath = path.join(__dirname,fname+'.js');
  if (fs.existsSync(fpath)) {
    fs.readFile(fpath, 'utf8',(err, js)=>{
      if (err) {
        console.log(err);
        return;
      }
      const prefix = "(function(){";
      const postfix = "})(`";
      const end ="`)";
      const fjs = `${prefix}${js}${postfix}${q}${end}`;
      eval(fjs);
    });
  }
}

function handle_stdin(timeoutMs){
  let timeoutId;
  let isComplete = false;
  let url = '';
  const handler = ()=>{
    if(url.length<6 || (58!==url.charCodeAt(4) && 58!==url.charCodeAt(5)))
      url = 'data:text/html;charset=utf-8,'+url;
    win.webContents.executeJavaScript("{let v=`"+url+"`;handleQuery(v)}",false);
  };
  timeoutId = setTimeout(() => {
    if (!isComplete) {
      isComplete = true;
      handler();
    }
  }, timeoutMs);
  
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    url += chunk;
  });
  process.stdin.on('end', () => {
    if (!isComplete) {
      isComplete = true;
      clearTimeout(timeoutId);
      handler();
    }
  });
  // Important: Resume stdin to start reading
  process.stdin.resume();
}
