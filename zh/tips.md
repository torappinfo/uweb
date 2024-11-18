---
title: 重定向网址
---
⚠️<span style="color:red">重定向转发cookie</span>设置选项可允许登录情况下操作全局重定向下的网站，请确认全局重定向网址安全可靠，谨慎使用。

#### 全局重定向
长按设置，选中"自定义资源重定向"。此时如果<a href="i:60/data/data/info.torapp.uweb/files/config.html:https://jamesfengcao.codeberg.page/zh/searchurl/config.html">全局重定向url</a>为有效网址，
- 且最后一个字符为'/'、'?'或'='，则所有网络访问被内部重定向至url:  
"[全局重定向url]+[原始url]"。
- 如果没有以上述字符结尾，则意味着“光秃秃”。所有网络访问被内部重定向至url:  
"[全局重定向url]+'/'+[scheme]+'/'+[原始域名和路径]"

Example: "https://loud-moth-21.deno.dev/"

使用仓库 "https://github.com/torappinfo/fetch" 入口"deno.js" [部署Deno](https://deno.com/deploy)

[创建免费重定向，说明类似但代码不同](https://gitee.com/jja8/NewBingGoGo.wikis/blob/master/创建魔法链接/使用免费的的云服务提供商创建魔法链接.md)
[cloudflare workers 全局重定向代码](../../en/searchurl/cloudflare/redirect.js)
[创建免费重定向说明，代码可用但复杂](https://github.com/gaboolic/cloudflare-reverse-proxy)

[vercel 全局重定向](https://github.com/torappinfo/vercel)

使用仓库 "https://github.com/torappinfo/redirect.genez" [部署genez.io](https://genez.io)

允许从cloudflare访问的AI引擎有：
[devv.ai](https://devv.ai]
[duck AI](https://duckduckgo.com?t=h_&ia=chat&q=hi)

#### 重定向文件 "default.redirect" (仅在无有效全局重定向url时生效)
<a target="_self" href="i:0gdefault.redirect:../searchurl/txt/redirect.cfg">点击添加google recaptcha国内镜像</a>

使用服务器在国外的搜索引擎体验往往不如国内的引擎。由于网站屏蔽的原因，两者之间索引权重差别很大。国外受欢迎的技术类网站因此难以在百度上搜到;国外引擎能搜到但由于其中不少结果无法访问而体验糟糕。

其实，很多技术类网站在国内早有镜像，但由于镜像并非众所周知，其索引权重在百度上微不足道，非专门搜索不可得。

本文介绍一种技术，可重定向国外网址至国内镜像，极大的提高国外引擎的体验，让更多用户更客观的理解全球技术。

配置default.redirect:
文件每一行格式为：
域名:正则表达式:替换表达式

其中正则表达式以java语言规定为准，表达式中不能包含':'。正则表达式为空时系统默认为与域名相同。正则表达式,替换表达式同时为空时无重定向作用，但域名会允许CORS跨域访问 (目前仅对"GET" request生效)。

例子文件内容如下：
developer.android.com::developer.android.google.cn

四种使用重定向的方法：
- 长按链接
  添加文件"国内镜像.js"至"longclick"目录下。
  文件内容如下：
  <pre>//e:%u</pre>

  其中"e:"为uweb特殊url协议，意为"edit"，即"编辑"。当后面紧跟url网址的情况下会重定向网址。

  重启uweb后长按链接弹出菜单选"国内镜像"，浏览器将访问网址的国内镜像。若网址为本地文件，则浏览器会自动调用此类文件编辑器。

- [长按工具条图像按钮](../urls/index.html#)。
- 长按设置，选中"自定义重定向"。
- 长按设置，选中"自定义资源重定向"。此选项除访问url重定向之外，还可重定向网页中一切资源。

更多重定向网址：  
www.bilibili.com::www.ibilibili.com  
pan.baidu.com::pan.baiduwp.com  
www.docin.com::www.docin365.com  
wenku.baidu.com::wenku.baiduvvv.com  
detail.tmall.com::detail.tmallvvv.com  
detail.m.tmall.com::detail.m.tmallvvv.com  
item.taobao.com::item.taobaovvv.com  
h5.m.taobao.com::h5.m.taobaovvv.com  
jd.com::jdvvv.com  
item.yhd.com::item.yhdvvv.com  
goods.kaola.com::goods.kaolavvv.com  
product.dangdang.com::product.dangdangvvv.com  
item.gome.com.cn::item.gomevvv.com.cn


