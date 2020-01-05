#!/bin/env python
from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<a href="i:01' +engine+ '">' +engine+ "</a><br>\n";

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>配置浏览器特色服务</title></head><body>
<h3>配置浏览器特色服务</h3>
<p>
<a href="/uweb">超微浏览器</a>下点击配置链接可自动添加特色服务，强制清空后台重启后可用。</p>
<p>配置文件"/sdcard/uweb/default.urls"如下：<br>
''';

html_tail ="</body></html>";

md_tail = '''

其中"重定向"由[文件default.redirect配置](/uweb/redirect)，对"file://"重定向将调用合适编辑器编辑文件。

更多视频服务见：
<https://51.ruyo.net/3127.html>
<https://www.cnblogs.com/devcjq/articles/6939961.html>
''';

selist = map(engine2mdlnk,[
"重定向:e:",
"历史价格:http://tool.manmanbuy.com/historyLowest.aspx?url=  ",
"历史价格2:http://www.tool168.cn/?m=history&a=view&k=",
"历史价格3:http://www.xitie.com/s.php?no=",
"网页快照:https://his.sh/",
"微软翻译:http://www.microsofttranslator.com/bv.aspx?to=zh&a=  ",
"百度翻译:http://fanyi.baidu.com/transpage?source=url&ie=utf8&from=auto&to=zh&render=1&query=  ",
"网址工具:https://wn.run/",
"查看源码:view-source:",
"Add to Feedly:https://feedly.com/i/subscription/feed/",
"Save as pdf:https://v2.convertapi.com/web/to/pdf?download=attachment&secret=5LIWRmsz4uKJCITZ&url=",
"Save as jpg:https://v2.convertapi.com/url/to/jpg?download=attachment&secret=5LIWRmsz4uKJCITZ&url=",
"Video download:https://tbvd.herokuapp.com/redirect?url=",
"Audio download:https://tbvd.herokuapp.com/video?audio=on&url=",
"Site analyzer:https://www.similarweb.com/website/",
"Site buildwith:https://builtwith.com/?",
"outline:https://www.outline.com/",
"instapaper:https://www.instapaper.com/text?u=",
"google docs:http://docs.google.com/gview?embedded=true&url=",
]);

llist = [selist,"</p>"];

print(html_head)
print(''.join(string for slist in llist for string in slist))
p = run(['cmark', '--hardbreaks'], stdout=PIPE,
        input=md_tail, encoding='utf-8')
print(p.stdout)
print(html_tail)
