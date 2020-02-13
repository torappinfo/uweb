#!/bin/env python
from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<a href="i:0b' +engine+ '">' +engine+ "</a><br>\n";

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>分类多引擎搜索</title></head><body>
<h3>分类多引擎搜索</h3>
<p>
使用<a href="/uweb">超微浏览器</a>点击可自动<a href=''>下载本文所有分类引擎</a>至"/sdcard/uweb/bookmark"，至<a href='/searchurl/func.html'>界面网页刷新动态快捷方式</a>后可用，长按应用图标可显示此目录下4／5个动态快捷方式（需启动器支持）。</p>
<p>长按下面链接可下载视频及小说分类多引擎搜索配置文件：<br>
''';

html_tail ="</body></html>";

md_tail = '''
[超微浏览器](..)中通过“设置”->“总目录”->“↑”->“Download”，点击后缀为.search的下载
文件，超微浏览器将自动显示分类多引擎搜索。此时可按菜单键（或长按底部工具条后退按
钮）选择“添加到桌面”方便以后访问。

.search文件每行格式为如下几种：
[搜索引擎名]:[不含%s的url]
[搜索引擎名]:[含%s的url]
[搜索引擎名]:POST:[含%s的post参数]:[url]

.search文件首行必须为第一种类型的搜索引擎。由于其它两种类型的引擎数量稀少，为性能
考虑，超微限制了首个引擎的种类。

#### 本地引擎
搜索引擎已经支持命令行url，现在可添加离线字典查询至主页。命令行url格式为
c:[含%s的命令行]
d:mimetype:[含%s的命令行]:[外部资源url]
查询时关键词会自动替换命令行中的%s。

笔者用来查询各式词典，发现效果非常好。百兆以内的文本文件压缩以后可以直接快速检索
，定位至特定位置以后可上下滚动阅读全部文本。
''';

selist = map(engine2mdlnk,[
"http://jamesfengcao.gitee.io/searchurl/searchcat.tar.gz",
]);

llist = [selist,"</p>"];

print(html_head)
print(''.join(string for slist in llist for string in slist))
p = run(['marked', '--pedantic'], stdout=PIPE,
        input=md_tail, encoding='utf-8')
print(p.stdout)
print(html_tail)
