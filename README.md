### Uweb browser for geeks: unlimited power with html5 & termux
[中文](README.zh-Hans.md)

[Amazon appstore](https://www.amazon.com/TorApp-Info-uweb-browser-for-geeks/dp/B098QPR6N5)
[Downloads](en/download.md)

[Uweb browser: downloads, plugins and tips](https://torappinfo.github.io/uweb/en/)  
(Mirrors: 
[netlify](https://uwebzh.netlify.app/en/)
[gitlab](https://jamesfengcao.gitlab.io/uweb/en/)
[stormkit](https://uweb.stormkit.dev/en/)
[surge](https://uweb.surge.sh/en/)
[codeberg](https://jamesfengcao.codeberg.page/en/)
[repo](https://repo.or.cz/uweb.git/blob_plain/HEAD:/en/index.html)
[pages](https://uwebzh.pages.dev/en/)
[vercel](https://uweb-zh.vercel.app/en/)
[bitbucket](https://torappinfo.bitbucket.io/en/)
[render](https://uwebzh.onrender.com/en/)
)

- Powerful: any native functionality with html5 enhancement and still secure; any urls to host website; javascript and shell scripting for general processing; piping between console and GUI and more with Termux.
- Customizable: user-defined menus, (new) buttons and gestures for user agents, bookmarklets, url services, shell commands, internal functionality links and text processing etc.
- Convenient: Any book (pdf/djvu)/dictionary (mdict)/txt/command line/app/webapp (web extensions) can be search engine.
- Tiny: less than 200k.
- Fast: run fast, even with thousands of user provided css/scripts/htmls.
- Efficient: less touches, one click to reach any number of search engines without repeated input.
- URL bar command line support (better with hardware keyboard).
- user-defined JS/CSS/HTML/preprocessing for specified domains.

#### Main features
Custom paper size PDF export and long vector screenshot, TTS, text reflow, resource sniffer, translation, reader's mode, user-defined url redirection, webdav/http backup & restore, auto next page, sending/receiving msg/file(s), site config (UA, no JS, no image, no 3rd party script/resource,active script, global scripts), http(s)/socks proxy, enabling html5 apps for local files (pdf/djvu/epub viewer, mdict dictionary lookup etc.).

- User-defined global and site-specific CSS and javascript.
- Bookmarklets (works for CSP sites and with option to auto apply to similar sites)
- AD blocking (block whole root domain trees etc.)
- Customization (define extra menus/buttons/gestures with user-defined functionalities)
- Support shell scripts, javascript for general processing, other languages (python etc.) are also supported by installing uweb compatible Termux versions.
- Serverless local sites: PWA-kind web extension (chrome .crx & firefox .xpi) support.
- Piping between console and uweb tabs.
- Resizable floating video support.

#### Screenshots
![](https://i.postimg.cc/rsL9G5N1/home1.png)
![](https://i.postimg.cc/9QxJ3Rc2/globalcss.png)
![](https://i.postimg.cc/VksDHBQ4/globaljs.png)
![](https://i.postimg.cc/HLV3TYLy/longclick.png)
![](https://i.postimg.cc/XJ58ysdN/option1.png)
![](https://i.postimg.cc/0NFnQT6H/option2.png)

#### Help with localization
We encourage everyone to help with localization. The following is how to do.

- Fork this repository
- Copy res/values/strings.xml to path like res/values-%(lang)/, replace %(lang) with [the ISO 639-1 language code](http://www.loc.gov/standards/iso639-2/php/code_list.php).
- Translate res/values-%(lang)/strings.xml
- Translate assets/help_%(lang).html from assets/help_en.html
- Make a Pull Request
