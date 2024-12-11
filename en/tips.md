---
title: Resource redirection
date: 2023-04-11
tags: [redirection]
---
⚠️<span style="color:red">Redirection forwards cookies</span> with the setting option "Redirect cookies" enabled, so use the options with care.

#### Setting options: "Url redirection" vs. "Resource redirection"
"Url redirection" redirects the main/page url only while "Resource redirection" is for all urls in the page.

#### Global redirection
<a href="i:60/data/data/info.torapp.uweb/files/config.html:https://jamesfengcao.codeberg.page/en/searchurl/config.html">Global redirection</a> is enabled with the setting option "Resource redirection" or both "Url redirection" and "Redirect cookies".

When a valid global redirection url is set, the "default.redirect" has no effect, and any url resource is fetched with the new url by appending the original url to the global redirection url.

- If the global redirection url ends with '/', '?', or '=', then the resource is fetched with by the url "[global redirection url] + [url]". For example, "https://domain.com/pathXXX/https://cnn.com".

- (to provide more options to users) If the global redirection url does not end with '/', '?' or '=', it means the global redirection url is naked. then the resource is fetched with by the url "[global redirection url] + '/'+ [scheme]+ '/' + [url without scheme]". For example, when the global redirection url is "https://domain.com/pathXXX", the real url to visit "https://cnn.com" is "https://domain.com/pathXXX/https/cnn.com".

#### "default.redirect" (valid only without global redirection url)
Click the following links to append mirrors to the file "default.redirect":
<a target="_self" href="i:0gdefault.redirect:../../zh/searchurl/txt/redirect.cfg">google recaptcha mirror</a>

Each line of the file "default.redirect" has the following format:
[domain name]:[regular expression]:[replacement expression]

in which "[regular expression]" is as defined by java language, and cannot have ":" inside; if empty, it defaults to be same as "[domain name]".

##### Ways to enable domain redirection:
- [Long pressing the image button](../urls/index.html#)。
- Long pressing the setting button, enable the option "url redirection".
- Long pressing the setting button, enable the option "Resource redirection".

