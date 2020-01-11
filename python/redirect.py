from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<a href="i:0c' +engine+ '">' +engine+ "</a><br>\n";

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>配置重定向网址</title></head><body>
<h3>配置重定向网址</h3>
<p>
<a href="/uweb">超微浏览器</a>下点击配置链接可自动添加重定向网址，强制清空后台重启
后可用。</p>
<p>配置文件"/sdcard/uweb/default.redirect"如下：<br>
''';

html_tail ="</body></html>";

md_tail = '''
''';

selist = map(engine2mdlnk,[
"www.bilibili.com::www.ibilibili.com",
"www.docin.com::www.docin365.com",
"wenku.baidu.com::wenku.baiduvvv.com",
"detail.tmall.com::detail.tmallvvv.com",
"detail.m.tmall.com::detail.m.tmallvvv.com",
"item.taobao.com::item.taobaovvv.com",
"h5.m.taobao.com::h5.m.taobaovvv.com",
"item.jd.com::item.jdvvv.com",
"item.yhd.com::item.yhdvvv.com",
"goods.kaola.com::goods.kaolavvv.com",
"product.dangdang.com::product.dangdangvvv.com",
"item.gome.com.cn::item.gomevvv.com.cn",
"developer.android.com::developer.android.google.cn",
]);

llist = [selist,"</p>"];

print(html_head)
print(''.join(string for slist in llist for string in slist))
p = run(['marked', '--pedantic'], stdout=PIPE,
        input=md_tail, encoding='utf-8')
print(p.stdout)
print(html_tail)
