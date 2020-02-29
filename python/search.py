#!/bin/env python
from subprocess import run, PIPE

def engine2mdlnk(engine):
  return '<a href="i:00' +engine+ '">' +engine+ "</a><br>\n";

html_head = '''<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>浏览器多搜索引擎一键直达</title></head><body>
<h3>浏览器多搜索引擎一键直达</h3>
<p>
<a href="/uweb">超微浏览器</a>下点击搜索引擎配置链接可自动添加到主屏。</p>

推荐引擎(将下面文本添加到/sdcard/uweb/home.search中)：<br>
''';

html_tail ="</body></html>";

md_tail = '''

[分类搜索](/searchurl/searchcat.html)

更多引擎可参看：  
[网盘搜索](https://adzhp.cn/wang-pan-sou-suo.html)  
[BT磁力](https://adzhp.cn/bt-sou-suo.html)  
[词典](https://github.com/Dictionaryphile/All_Dictionaries)  
[有哪些特殊的搜索引擎](https://www.zhihu.com/question/20251786)  
[google镜像](http://gugejx.com)  
''';

selist1 = map(engine2mdlnk,[
"影视cupfox:https://www.cupfox.com/?type=video&key=",
"京东:https://search.jd.com/Search?enc=utf-8&keyword=",
"淘宝:https://s.taobao.com/search?q=",
"淘宝优惠券:https://www.ishtq.com/?m=search&a=index&k=",
"苏宁:https://m.suning.com/search/%s/",
"拼多多:http://mobile.yangkeduo.com/search_result.html?search_key=",
"优惠券:http://mall.yhm11.com/index.php?r=l&kw=",
"汉字:http://www.guoxuedashi.com/zidian/so.php?kz=1&sokeyzi=",
"汉语词典:http://www.guoxuedashi.com/zidian/so.php?kz=11&sokeyci=",
"书法:http://shufa.guoxuedashi.com/?kz=70&sokeyshufa=",
"诗词:http://www.guoxuedashi.com/shici/so.php?kt=44&sokeysc=",
"百度图片:http://image.baidu.com/search/index?tn=baiduimage&word=",
"bing图片:http://bing.com/images/search?q=",
"搜狗表情:https://pic.sogou.com/pic/emo/searchList.jsp?keyword=",
"微信:https://weixin.sogou.com/weixin?type=2&s_from=input&query=",
"化学品:http://www.basechem.org/search?q=",
"大百科全书:http://h.bkzx.cn/search?sublibId=2&amp;query=",
"柯林斯双解:http://www.iciba.com/",
"柯林斯汉英大词典:https://www.hjdict.com/w/",
"剑桥双解:https://dictionary.cambridge.org/dictionary/english-chinese-simplified/",
"ludwig:https://ludwig.guru/s/",
"现代日汉双解:https://dict.hjenglish.com/jp/jc/",
"wolfram:https://www.wolframalpha.com/input/?i=",
"wiki:https://en.wikipedia.org/wiki/Special:Search/",
"git:https://github.com/search?type=Repositories&amp;q=",
"man:http://man.cx/",
"code:http://searchcode.com/?q=",
"牛津搭配:http://www.freecollocation.com/search?word=",
"chem:https://www.ncbi.nlm.nih.gov/pccompound?term=",
"googledict:http://googledictionary.freecollocation.com/meaning?word=",
"对联:http://www.guoxuedashi.com/duilian/?ciyu=",
"十三经:http://www.guoxuedashi.com/13jing/?ciyu=",
"殷周金文:http://www.guoxuedashi.com/yzjwjc/?bh=",
"答案答案:https://daandaan.com/search?q=",
"问答库:https://m.asklib.com/s/",
]);

selist2 = map(engine2mdlnk,[
"必应:http://cn.bing.com/search?q=",
"百度:https://m.baidu.com/s?wd=",
"秘迹:https://m.mijisou.com/search?q=",
"神马:http://m.sm.cn/s?q=",
"夸克AI:https://quark.sm.cn/s?q=",
"360:http://www.so.com/s?q=",
"搜狗:https://m.sogou.com/web?query=",
"多吉:https://www.dogedoge.com/results?q=",
"萌搜:https://mengso.com/search?q=",
"头条:https://www.toutiao.com/search/?keyword=",
"magi:https://magi.com/search?q=",
"微博:https://s.weibo.com/weibo/",
"疯狂音乐:http://music.ifkdy.com/?type=ximalaya&name=",
"墨灵音乐:https://music.mli.im/music.web?auto-action=true&action=search&wd=",
"豌豆荚:http://m.wandoujia.com/search?key=",
"360手机助手:http://m.app.so.com/search/index?q=",
"应用宝:http://app.qq.com/#id=search&key=",
"epubee:http://cn.epubee.com/books/?s=",
"google:https://google.com/search?q=",
"Feeling lucky:https://google.com/search?btnl=1&q=",
"pix:https://www.google.com/search?tbm=isch&q=",
"youtube:https://youtube.com/results?search_query=",
"news:https://news.search.yahoo.com/search/news?p=",
"stock:https://finance.yahoo.com/quote/",
"amazon:https://www.amazon.com/s/?field-keywords=",
"weather:https://www.wunderground.com/cgi-bin/findweather/getForecast?query=",
"webster:https://www.merriam-webster.com/dictionary/",
"IMDB:https://www.imdb.com/find?q=",
"film review:https://www.rottentomatoes.com/search/?search=",
"goodreads:https://www.goodreads.com/search?query=",
"audible:http://www.audible.com/search?sort=review-rank&advsearchKeywords=",
"audiobay:http://audiobookbay.me/?s=",
"book:https://booksc.org/s/?q=",
"book2:https://b-ok.cc/s/?q=",
"proofwiki:https://proofwiki.org/w/index.php?search=",
"physics:http://www.physics.org/explore-results-all.asp?q=",
"nist chem:https://webbook.nist.gov/cgi/cbook.cgi?Formula=",
"chemiday:https://chemiday.com/search/?lang=en&q=",
"chem.libretexts:https://chem.libretexts.org/Special:Search?q=",
"bio.libretexts:https://bio.libretexts.org/Special:Search?q=",
"phys.libretexts:https://phys.libretexts.org/Special:Search?q=",
"med.libretexts:https://med.libretexts.org/Special:Search?q=",
"math.libretexts:https://math.libretexts.org/Special:Search?q=",
"stats.libretexts:https://stats.libretexts.org/Special:Search?q=",
"geo.libretexts:https://geo.libretexts.org/Special:Search?q=",
"eng.libretexts:https://eng.libretexts.org/Special:Search?q=",
"biz.libretexts:https://biz.libretexts.org/Special:Search?q=",
"human.libretexts:https://human.libretexts.org/Special:Search?q=",
"socialsci.libretexts:https://socialsci.libretexts.org/Special:Search?q=",
"workforce.libretexts:https://workforce.libretexts.org/Special:Search?q=",
]);

selist_alien=map(engine2mdlnk,[
"teoma:https://www.teoma.com/web?q=",
"lycos:https://search.lycos.com/web/?q=",
"technorati:http://technorati.com/search/index.php?q=",
"qwant:https://lite.qwant.com/?q=",
"swisscows:https://swisscows.com/web?query=",
"duck:https://duckduckgo.com/?q=",
"mojeek:https://www.mojeek.com/search?q=",
"gigablast:https://www.gigablast.com/search?c=main&qlangcountry=en-us&q=",
"yandex:https://yandex.com/search/?text=",
"searx:https://searx.me/?q=",
"google镜像:https://baidu01.puataiwan.com/search?ei=k1_vXcagJ4HB-wSV-a2YDw&gs_l=psy-ab.3..0l10.53583.56586..57181...0.0..0.478.2721.2-4j1j3......0....1..gws-wiz.....0.XTnHpqynnSk&ved=0ahUKEwiGtorh3KrmAhWB4J4KHZV8C_MQ4dUDCAU&q=",
    ]);

selist_cloud = map(engine2mdlnk,[
"大力盘:https://www.dalipan.com/search?keyword=",
"盘搜搜:http://www.pansoso.com/zh/",
"盘多多:http://m.panduoduo.net/s/name/",
]);

selist_scholar = map(engine2mdlnk,[
"sweetsearch:https://sweetsearch.com/search?q=",
"refseek:https://www.refseek.com/search?q=",
"google scholar:https://scholar.google.com/scholar?q=",
"semanticscholar:https://www.semanticscholar.org/search?sort=relevance&q=",
    ]);

selist_dev = map(engine2mdlnk,[
"symbolhound:http://symbolhound.com/?q=",
"vector:https://vector.me/search/",
    ]);

selist_app = map(engine2mdlnk,[
"淘宝:taobao://s.m.taobao.com/h5?q=",
"百度地图:bdapp://map/place/search?query=",
"有道词典:yddict://dict/query?q=",
"知乎:zhihu://search?q=",
"应用商店:market://search?q=",
    ]);

selist_local = map(engine2mdlnk,[
"计算器:d:text/html:echo \\'%s\\'|bc -l -q:",
"函数作图:d:image/svg+xml:gnuplot -e \\'set term svg;set output; plot %s\\':",
"3d函数作图:d:image/svg+xml:gnuplot -e \\'set term svg;set output; splot %s\\':",
    ]);

intro_list2 = ["""
<p>其中中国大百科全书免费注册登录后才可免费查阅。</p>

<p>除了批量添加引擎外，超微可以将任意支持搜索的网址添加为搜索引擎。方法如下：
<ul>
  <li>访问网站并搜索。</li>
  <li>按菜单键，没有的话可长按底部工具条后退按钮弹出菜单。</li>
  <li> 选择"添加为搜索引擎"，对话框中将出现的地址适当编辑。不少网址后半部分为用"&"分割的等式，将包含搜索条目的等式移动到最后，删除搜索条目本身，其余等式可删可留。
若无等式，一般在网址中直接删除搜索条目本身即可。</li>
</ul></p>

<p>常用引擎，供用户查漏添加：<br>
"""];

intro_alien=['''</p><p>
直达官方文档的国外引擎：<br>
'''];

intro_cloud=['''</p><p>
网盘搜索:<br>
'''];

intro_scholar=['''</p><p>
学术搜索:<br>
'''];

intro_dev=['''</p><p>
开发者友好搜索：<br>
'''];

intro_app = ["""</p><p>
应用内搜索:<br>
"""];

intro_local = ['''</p><p>
本地引擎（需安装定制termux及相应工具如bc，gnuplot等）：<br>
'''];

llist = [selist1,intro_list2,selist2,
         intro_alien, selist_alien,
         intro_cloud, selist_cloud,
         intro_scholar,selist_scholar,
         intro_dev,selist_dev,
         intro_app,selist_app,
         intro_local,selist_local,
         "</p>"]
print(html_head)
print(''.join(string for slist in llist for string in slist))
p = run(['marked', '--pedantic'], stdout=PIPE,
        input=md_tail, encoding='utf-8')
print(p.stdout)
print(html_tail)
