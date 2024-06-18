### [Ebrowser](https://github.com/torappinfo/ebrowser): keyboard-friendly minimal suckless web browser
Ebrowser is designed with the philosophy of [Android uweb browser](https://github.com/torappinfo/uweb) ([gitlab](https://gitlab.com/jamesfengcao/uweb)).

- lightweight (less than 20k bytes) without bundled electron.
- much less memory footprint than edge/chrome browser and highly performant.
- keyboard friendly with vim-style keymaps and command line support in address bar.
- [global redirection](https://uweb.surge.sh/en/redirect/index.html#) to bypass censorship.
- user scripts at will. Ex. pressing "tr" to translate the page (need mapkeys.json config).
- customizable.

Note: Usually electron apps are heavyweight as they use browsers for simple things. Ebrowser uses core chromium effectively and very lightweight. Recommend to install electron separately.

#### Installing (for Windows, MacOS and Linux)
##### Install with prebuilt binaries
You can find prebuilt binaries [here](https://github.com/torappinfo/ebrowser/releases).

##### Install with nodejs installed

    npm install electron
    npm install ebrowser

Run ebrowser

    electron ~/node_modules/ebrowser

Later on, you can run "npm install electron" to update electron/chromium or "npm install ebrowser" to update ebrowser independently.

#### Key shortcuts
- F1: Help
- CTRL+C: stop loading
- CTRL+G: address bar to show page url
- CTRL+L: focus to address bar
- CTRL+T: new Tab
- CTRL+SHIFT+T: restore closed Tab
- CTRL+TAB: switch to next tab
- CTRL+SHIFT+TAB: switch to previous tab
- CTRL+W: close Tab
- CTRL+<-: go backward
- CTRL+->: go forward
- CTRL+SHIFT+R: enable global redirection ("gredirect.json")
- CTRL+R: disable global redirection
- ESC: remove focus. similar to vi normal mode.
- F5: page refresh/reload
- F12: devtools

#### Address bar commands
- "/" for find-in-page
- ":" for address bar commands
  - ac [bookmark/history path w/o ext] : load ".rec" file for autocomplete.
  - b [bookmarkfilename w/o ext] : bookmark current page in file.
  - bml [filename w/o extension]: load/execute the javascript file.
  - cert : allow invalid certificates w/o arguments, otherwise restore to default.
  - clear : the arguments could be
    - cache : clear cache
    - dns : clear dns cache
    - storage: clear site storage data.
    - {[options](https://www.electronjs.org/docs/latest/api/session#sescleardataoptions)}
  - ext [extension path]: load unpacked Chrome extension.
  - nc/uc : No Cookie forwarding/Use Cookie forwarding with global redirection.
  - nh/uh for No/Use url history.
  - nj/uj for No/Use external Javascript files.
  - nr/ur for No/Use "redirect.json" for domain redirection.
  - np : no proxy.
  - up [proxyName] : use proxy. privous proxy or the first proxy in proxy.json w/o [proxyName]. ":up" command also disables global and domain redirections, which are not restored by ":np".
  - ua [useragentName] : set user agent for future tabs. default user agent w/o arguments.
  - pdf [filename w/o extension] {[options](https://www.electronjs.org/docs/latest/api/web-contents#contentsprinttopdfoptions)} : print to PDF file. All arguments are optional; empty option "{}" to capture long screenshot as vector graphics.
- "!" address bar commands
  "!xx ..." evaluates "xx.js" with the whole address bar text as arguments[0].
  
#### Commands in no-focus mode (this mode is similar to vi Normal mode)
Pressing "ESC" to enter no-focus mode if not sure.
- ":" for address bar commands
- "/" for find-in-page with address bar
- "!" for ":!" address bar commands

The other commands are defined in "mapkeys.json", which will map keys to address bar commands.

#### Configuration files
- "config": lines of address bar commands.
- "search.json": search engines as shortcut-queryUrl pairs.
- "default.autoc": predefined strings for address bar auto completion.
- "gredirect.json": global redirection urls as array of urls
- "redirect.json": domain-replacementDomain pairs, default to be applied.
- "mapkeys.json": keys-addressbarCommands pairs. The addressbar commands are multiple lines of address bar command separated by "\n".
- "proxy.json": name-[ProxyConfig](https://www.electronjs.org/docs/latest/api/structures/proxy-config) pairs
- "uas.json" : name-useragent pairs

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