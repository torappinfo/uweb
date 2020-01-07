#!/bin/env python
from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<p>' +engine+ '<a class="plus" href="i:03' +engine+ '"> + </a></p>\n';

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>主屏快捷访问</title>
<style>
a{text-decoration: none;}
a.icon>img{width:24px;}
a.icon>span{font-size:24px;}
.plus{font-size:32px;float:right;right:13px;}
</style>
</head><body>
<p>
<a href="/uweb">超微浏览器</a>下点击"+"可自动添加至主屏快捷访问。</p>
''';

html_tail ="</body></html>";

selist = map(engine2mdlnk,[
"<a class=icon href='http://i.ifeng.com'><img src='https://m.hao123.com/static/img/fenghuang20171024-56.png'><span>凤凰</span></a>",
"<a class=icon href='http://xw.qq.com'><img src='https://m.hao123.com/static/img/tengxun20171024-56.png'><span>腾讯</span></a>",
"<a class=icon href='http://m.sohu.com'><img src='https://m.hao123.com/static/img/souhu20171024-56.png'><span>搜狐</span></a>",
"<a class=icon href='http://3g.163.com'><img src='https://m.hao123.com/static/img/wangyi20171024-56.png'><span>网易</span></a>",
#"<a class=icon href='http://m.1905.com'><img src='http://uujian.cn/browser/recommend/video/m.1905.com.png'><span>1905电影</span></a>",
"<a class=icon href='https://m.ctrip.com'><img src='https://m.hao123.com/static/img/xiecheng20171121wx.png'><span>携程</span></a>",
"<a class=icon href='http://union-click.jd.com'><img src='https://m.hao123.com/static/img/jingdong20171024-56.png'><span>京东</span></a>",
"<a class=icon href='http://m.suning.com'><img src='https://m.hao123.com/static/img/suning_20170907.png'><span>苏宁</span></a>",
"<a class=icon href='http://m.taobao.com'><img src='https://m.hao123.com/static/img/cxb_taobao.PNG'><span>淘宝</span></a>",
"<a class=icon href='http://m.tmall.com'><img src='https://m.hao123.com/static/img/tm.PNG'><span>天猫</span></a>",
#"<a class=icon href='http://jhs.m.taobao.com'><img src='https://m.hao123.com/static/img/juhuasuan1222icon.png'><span>聚划算</span></a>",

    
    
#"<a class=icon href=''><img src=''><span></span></a>",
]);

llist = [selist];

print(html_head)
print(''.join(string for slist in llist for string in slist))
print(html_tail)
