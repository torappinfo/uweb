from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<a href="i:03' +engine+ '">' +engine+ "</a><br>\n";

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>配置浏览器常用命令</title></head><body>
<h3>配置浏览器常用命令</h3>
<p>
<a href="/uweb">超微浏览器</a>下点击配置链接可自动添加常用命令，强制清空后台重启后长按历史按钮可用。需要安装有定制termux应用。</p>
<p>配置文件"/sdcard/uweb/default.cmds"如下：<br>
''';

html_tail ="</body></html>";

selist = map(engine2mdlnk,[
]);

selist_root = map(engine2mdlnk,[
"解冻微信::su -c 'pm enable com.tencent.mm'",
"冻结微信::su -c 'pm disable com.tencent.mm'",
"解冻拼多多::su -c 'pm enable com.xunmeng.pinduoduo'",
"冻结拼多多::su -c 'pm disable com.xunmeng.pinduoduo'",
]);

intro_root=['''</p><p>下面配置需要root权限：<br>'''];

llist = [selist,intro_root,selist_root,"</p>"];

print(html_head)
print(''.join(string for slist in llist for string in slist))
print(html_tail)
