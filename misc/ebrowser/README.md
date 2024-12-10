### [Ebrowser](https://github.com/torappinfo/ebrowser): keyboard-friendly minimal suckless web browser
Ebrowser is designed with the philosophy of [Android uweb browser](https://github.com/torappinfo/uweb) ([gitlab](https://gitlab.com/jamesfengcao/uweb)).

- lightweight (less than 20k bytes) without bundled electron.
- much less memory footprint than edge/chrome browser and highly performant.
- keyboard friendly with vim-style keymaps and command line support in address bar.
- <a href="https://uweb.surge.sh/en/redirect/index.html#" onclick="if(notRepo()){location='../redirect/index.html#';return false;}">global redirection</a> to bypass censorship.
- user CSS/JS at will. Ex. pressing "md" in no-focus mode to preview markdown file.
- global CSS/JS for all sites at will.
- CSS/JS for domains, similar to [uweb](https://jamesfengcao.gitlab.io/uweb/en/sitejs/index.html), but use sitejs/[domain].js or sitecss/[domain].css, not [domain root].js/css.
- customizable.

Note: Usually electron apps are heavyweight as they use browsers for simple things. Ebrowser uses core chromium effectively and very lightweight. Recommend to install electron separately.

#### Installing (for Windows, MacOS and Linux)
##### Install with prebuilt binaries
You can find prebuilt binaries [here](https://github.com/torappinfo/ebrowser/releases).

##### Install ebrowser and electron separatedly
###### Install ebrowser
Either download and unzip ebrowser package directly from any of npm mirror sites like [npmmirror](https://npmmirror.com/package/ebrowser) or with nodejs by

    npm install ebrowser

OR

    git clone https://github.com/torappinfo/ebrowser

OR "git clone"/download files directly from any of [mirror repositories](https://gitlab.com/jamesfengcao/uweb/-/blob/master/en/mirrors.md) and ebrowser is under the folder "misc/ebrowser".

###### Install electron
Before you can run ebrowser, you need to install electron either with nodejs by

    npm install electron

OR download and unzip electron binary directly from [github](https://github.com/electron/electron/releases) or mirrors like [npmmirror](https://registry.npmmirror.com/binary.html?path=electron).

###### Run ebrowser

    electron ~/node_modules/ebrowser

OR

    electron [the-path-of-folder-with-downloaded-ebrowser-files]

##### Update app quickly without updating chromium
Pressing "Alt" to show the menu bar and choose "Check for updates" under "Help". OR

Type ":update" in the address bar and press "enter" key to update.

#### Key shortcuts
- Alt: show menu
- ALT+<-: go backward
- ALT+->: go forward
- CTRL+C: stop loading
- CTRL+G: address bar to show page url
- CTRL+L: focus to address bar
- CTRL+T: new Tab
- CTRL+SHIFT+T: restore closed Tab
- CTRL+TAB: switch to next tab
- CTRL+SHIFT+TAB: switch to previous tab
- CTRL+W: close Tab
- CTRL+SHIFT+R: enable global redirection ("gredirect.json")
- CTRL+R: disable global redirection
- ESC: remove focus. similar to vi normal mode.
- F1: Help
- F5: page refresh/reload
- F12: devtools

#### Address bar commands
Like any popular browser, the very first word in address bar if defined in "search.json" identifies a search engine. Moreover, the address bar serves as command line interface:
- "/" for find-in-page
- ":" for address bar commands
  - ac [bookmark/history path w/o ext] : load ".rec" file for autocomplete.
  - b [bookmarkfilename w/o ext] : bookmark current page in file.
  - bjs : Browser-level JavaScript execution.
  - bml [filename w/o extension] [arguments...]: load/execute the javascript file.
  - cert : allow invalid certificates w/o arguments, otherwise restore to default.
  - clear : the arguments could be
    - cache : clear cache
    - dns : clear dns cache
    - storage: clear site storage data.
    - {[options](https://www.electronjs.org/docs/latest/api/session#sescleardataoptions)}
  - exit : exit browser
  - ext [extension path]: load unpacked Chrome extension.
  - gr [gredirect index]: global redirection with corresponding index. Use the first global redirection url if no argument. Disable global redirection with any index out of the range.
  - js [js code] : execute JS code at OS level. Note: "javascript:..." is special url and thus works in the current web page, while ":js ..." commands can do any OS operations. 
  - nc/uc : No Cookie forwarding/Use Cookie forwarding with global redirection.
  - nr/ur for No/Use "redirect.json" for domain redirection.
  - np : no proxy.
  - up [proxyName] : use proxy. privous proxy or the first proxy in proxy.json w/o [proxyName]. ":up" command also disables global and domain redirections, which are not restored by ":np".
  - sys [command line] : execute system commands with url as one of arguments, and replace "%cookie" with corresponding one. Ex. "curl" commands for uploading.
  - ua [useragentName] : set user agent for future tabs. default user agent w/o arguments.
  - update [filename] : update the app w/o argument, otherwise retrive the [filename] from remote. The filename could be any file on [mirror sites](https://jamesfengcao.gitlab.io/uweb/en/readme/index.html) (this repository is part of it).
  - pdf [filename w/o extension] {[options](https://www.electronjs.org/docs/latest/api/web-contents#contentsprinttopdfoptions)} : print to PDF file. All arguments are optional; empty option "{}" to capture long screenshot as vector graphics.
- "!" address bar commands  
  - "!xx ..." evaluates "xx.js" with the whole text as arguments[0] at OS level.
  - "!!xx ..." evaluates "xx.js" with the whole text as arguments[0] at browser level, which could manipulate address bar etc.
- i: internal urls, which will be consistent with [uweb](https://jamesfengcao.gitlab.io/uweb/en/links/index.html).
  - "i:0/js/xxx.js:[url]" loads the "[url]" with bookmarklet "js/xxx.js".
  - "i:8d[url]" fo force downloading

#### Commands in no-focus mode (this mode is similar to vi Normal mode)
Pressing "ESC" to enter no-focus mode if not sure.
- ":" for address bar commands
- "/" for find-in-page with address bar
- "!" for "!" address bar commands

The other commands are defined in "mapkeys.json", which will map keys to address bar commands.

#### Configuration files
- "config": lines of address bar commands.
- "search.json": <a href="https://jamesfengcao.gitlab.io/uweb/en/search/index.html" onclick="if(notRepo()){location='../search/index.html#';return false;}">search engines</a> as shortcut-queryUrl pairs, where "%s" would be replaced by search query.
- "default.autoc": predefined strings for address bar auto completion.
- "gredirect.json": global redirection urls as array of urls
- "redirect.json": domain-replacementDomain pairs, default to be applied.
- "mapkeys.json": keys-addressbarCommands pairs. The addressbar commands are multiple lines of address bar command separated by "\n".
- "proxy.json": name-[ProxyConfig](https://www.electronjs.org/docs/latest/api/structures/proxy-config) pairs
- "uas.json" : name-<a href="https://jamesfengcao.gitlab.io/uweb/en/useragents/index.html" onclick="if(notRepo()){location='../useragents/index.html#';return false;}">useragent</a> pairs.
- Customized menus: json files as array of strings with menuitem name and address bar commands alternately.
  - "menu.json": array of strings for <a href="https://jamesfengcao.gitlab.io/uweb/en/urls/index.html" onclick="if(notRepo()){location='../urls/index.html#';return false;}">user-defined menus</a>. The array has submenu name and address bar commands alternately. The odd-indexed strings are address bar commands with "%u" as the downloaded url.
  - "select.json": to define menus for text selections. The odd-indexed strings are address bar commands with "%s" as the text selection.
  - "download.json" : array of strings to define context menu and buttons for downloading dialog. The even-indexed strings are texts to show on the button. The odd-indexed strings are address bar commands with "%u" as the downloaded url.

#### Javascript at three levels
- Web page: url like "javascript:" or bookmarklet command ":bml" runs in web page.
- Browser (or renderer process) :
  - ":bjs" to execute the following js code at browser level.
- OS level (or main process) : ":js" to execute the following js code with all OS APIs available.
  - "!xx" evaluates "xx.js" with arguments.

##### examples for ":js"/":bjs" commands

    :js bJS=true //allow external Javascript files for web pages
    :js bJS=false //disallow external Javascript files for web pages
    :bjs bHistory=true //to record url history
    :bjs bQueryHistory=true //to record query/command history

#### New usages
- Vector designing with web tech to replace Adobe Illustrator/Inkscape.
  - Design with web tech.
  
  - Printing to pdf with customized paper size.
  - Magnify the pdf paper size to the required size.

  OR
  
  - Adjust window width and use addressbar command line ":Pdf {}" to export vector graphics.
  - Use imageMagick to convert to any other vector graphics format.

#### License
You can copy or modify the code/program under the terms of the GPL3.0 or later versions.