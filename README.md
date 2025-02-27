### Uweb browser: minimal suckless web browser with unlimited power
<a href="README.zh-Hans.md" onclick="if(notRepo()){location='../../zh/readme/index.html#';return false;}">中文</a>

[Amazon appstore](https://www.amazon.com/TorApp-Info-uweb-browser-for-geeks/dp/B098QPR6N5)
[Galaxy.Store](https://galaxystore.samsung.com/detail/info.torapp.uweb)
<a href="en/download.md" onclick="if(notRepo()){location='../../en/changelog/index.html#';return false;}">Downloads</a>

[Uweb browser: downloads, plugins and tips](https://torappinfo.github.io/uweb/en/)  
(Mirrors: [gitlab](https://jamesfengcao.gitlab.io/uweb/en/) [frama](https://torappinfo.frama.io/uweb/en/) [codeberg](https://jamesfengcao.codeberg.page/en/) [repo](https://repo.or.cz/uweb.git/blob_plain/HEAD:/en/index.html) [fleek](https://uweb.on-fleek.app/en/) [netlify](https://uwebzh.netlify.app/en/) [surge](https://uweb.surge.sh/en/) [kinsta](https://uwebbrowser-t27o4.kinsta.page) [zeabur](https://uweb.zeabur.app/en/) [deno](https://posh-crab-23.deno.dev/en/) [bitbucket](https://torappinfo.bitbucket.io/en/) [pages](https://muweb.pages.dev/en/) [vercel](https://uweb.vercel.app/en/) [render](https://uweb.onrender.com/en/) [glitch](https://uweb.glitch.me/en/) <a href="en/mirrors.md" onclick="if(notRepo()){location='../../en/mirrors/index.html#';return false;}">More...</a>)

 - <a href="en/search.md" onclick="if(notRepo()){location='../search/index.html#';return false;}">AI chat as search engine</a>; optimized UI for both AI and traditional search; [File as keyboard input](https://uwebzh.netlify.app/en/links/index.html#) for complex query.
- <a href="en/tips.md" onclick="if(notRepo()){location='../redirect/index.html#';return false;}">Global redirection</a> to bypass censorship. 
- Convenient: Any AI chatbot/book/dictionary/txt/command line/app/webapp (web extensions) as search engine.
- Tiny: less than 250k.
- Fast: run fast, even with thousands of user provided css/scripts/htmls.
- Efficient: less touches, one click to reach any number of search engines without repeated input; automate online services.
- Powerful: any native functionality with html5 enhancement and still secure; any urls to host website; javascript and shell scripting for general processing.
- Customizable: user-defined menus, (new) buttons and gestures for user agents, bookmarklets, url services, shell commands, internal functionality links and text processing etc.
- URL bar command line support ("!" and .js file as command).
- Site-specific JS/CSS/HTML/preprocessing.
- Online play/preview/preprocess for downloadable resources.
- Multiple type profiles: switch any data including website logins, user configurations orthogonally.
- Supports enhanced user "hosts" file. Empty IP address to lift all server-imposed limitations.
- Website test automation scripting. crontab support (alarm clock and more). 

#### Main features
Custom paper size PDF export and long vector screenshot, TTS, text reflow, resource sniffer, translation, reader's mode, user-defined url redirection, webdav/http backup & restore, auto next page, sending/receiving msg/file(s), site config (UA, no JS, no image, no 3rd party script/resource,active script, global scripts), http(s)/socks proxy, enabling html5 apps for local files (pdf/djvu/epub viewer, mdict dictionary lookup etc.).

- Bookmarklets (works for CSP sites and with option to auto apply to similar sites)
- AD blocking (block whole root domain trees etc.)
- Serverless local sites: PWA-kind web extension (chrome .crx & firefox .xpi) support.
- Resizable floating video support.

#### Screenshots
![](https://i.postimg.cc/rsL9G5N1/home1.png)
![](https://i.postimg.cc/9QxJ3Rc2/globalcss.png)
![](https://i.postimg.cc/VksDHBQ4/globaljs.png)
![](https://i.postimg.cc/HLV3TYLy/longclick.png)
![](https://i.postimg.cc/XJ58ysdN/option1.png)
![](https://i.postimg.cc/0NFnQT6H/option2.png)

#### <a href="misc/ebrowser/README.md"  onclick="if(notRepo()){location='../../en/ebrowserreadme/index.html#';return false;}">Ebrowser</a> for Windows, MacOS and Linux
Ebrowser is a simple version of uweb browser on the desktop.
- Fully open source.
- Capture long screenshot as vector graphics. 
- Enabling web tech for vector designing to replace Adobe Illustrator/Inkscape.

#### Help with localization
We encourage everyone to help with localization. The following is how to do.

- Fork this repository
- Copy res/values/strings.xml to path like res/values-%(lang)/, replace %(lang) with [the ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php).
- Translate res/values-%(lang)/strings.xml
- Translate assets/help_%(lang).html from assets/help_en.html
- Make a Pull Request
