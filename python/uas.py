#!/bin/env python
from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<a href="i:02' +engine+ '">' +engine+ "</a><br>\n";

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>浏览器标识使用技巧</title></head><body>
<h3>浏览器标识使用技巧</h3>
<p>
<a href="/uweb">超微浏览器</a>下点击配置链接可自动添加浏览器标识，强制清空后台重启后可用。</p>
<p>配置文件"/sdcard/uweb/default.uas"如下：<br>
''';

html_tail ="</body></html>";

md_tail = '''

大多数安卓应用都有一个应用标识，通过这个标识服务器可以控制提供给用户资源的多寡和质量。一般来说，应用可以得到最多最好的资源; 其次是PC版的浏览器; 而手机浏览器一般会被逼去下载专门的应用。

Android手机使用最广，应用最多。所以Android浏览器最有可能被逼/诱导下载各式各样的应用。浏览器如果伪装成苹果手机，如果苹果上没有相关应用，网站就不可能逼你去下载android应用。

对手机浏览器用户而言，最佳的是伪装成应用。其次伪装成Linux台式机，因为如果伪装成Windows PC会逼你下程序，而linux程序？对不起，还没开发呢。如果嫌PC排版不好，则可以伪装成一款没有应用的手机。Nokia的塞班已经没有应用了（有也不会逼你下了），用户基数还不少，所以伪装成塞班就是一个不错的选择。

以百度网盘为例，下载时安卓手机要逼你下安卓应用; 苹果手机要下ios应用; Windows上要下百度管家。只有塞班和Linux PC百度没开发应用，所以可通过伪装成塞班来直接下载文件。

uweb浏览器提供了多功能标识，可同时伪装成百度应用、苏宁易购、阿里搜索、百度简单搜索、火狐、iPhone等。访问很多网站会方便很多，不妨设置为缺省的浏览器标识。
''';

selist = map(engine2mdlnk,[
"百度网盘:LogStatistic",
"多功能:Mozilla/5.0 Dalvik/2 (Linux; U;) Gecko/63.0 Firefox/63.0 iPhone/7.1 Android/8.0 SNEBUY-APP/10.1 SearchCraft/2.8.2 baiduboxapp/3.2.5.10 UCBrowser U2/1.0.0 ALiSearchApp/2.4",
"Symbian:Mozilla/5.0 (SymbianOS/9.4; Series60/5.0 NokiaN97-1/20.0.019; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebKit/525 (KHTML, like Gecko) BrowserNG/7.1.18124",
"iPhone:Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X) AppleWebKit/602.4.6 (KHTML, like Gecko) Version/10.0 Mobile/14D27 Safari/602.1",
"win:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.73 Safari/537.36",
"QQ:Mozilla/5.0 (Linux; U; Android 10; zh-cn; Pixel 3 XL Build/QPP5.190530.014) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/9.6 TBS/043906 Mobile Safari/537.36 MicroMessenger/7.6",
"quark:Mozilla/5.0 (Linux; U; Android 6.0.1; zh-CN; HW Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 Quark/3.7.0.123 Mobile Safari/537.36",
]);

llist = [selist,"</p>"];

print(html_head)
print(''.join(string for slist in llist for string in slist))
p = run(['marked', '--pedantic'], stdout=PIPE,
        input=md_tail, encoding='utf-8')
print(p.stdout)
print(html_tail)
