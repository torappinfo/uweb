let labels = ["<a href='https://gitee.com/jamesfengcao/uweb/raw/master/zh/redirect/index.html#'>全局重定向网址</a>","下载目录(选项'下载至可卸存储'下生效)","网页默认字体族","cursive字体族","Fantasy字体族","Fixed字体族","Sans-Serif字体族","Serif字体族"];
let names = ["redirecturl","downloadpath","font","cursive","fantasy","fixed","sansserif","serif"];

let d=document;

let sa = [`<head><meta charset="utf-8"><meta name="viewport" content="width=device-width" /></head><style>input{height:40px;width:100%;border-radius:50px;}</style>
<datalist id="family">
<option value="sans-serif">
<option value="sans-serif-condensed">
<option value="sans-serif-smallcaps">
<option value="serif">
<option value="serif-monospace">
<option value="monospace">
<option value="cursive">
</datalist>
<script>
function save(){
  let d=document;let f=d.forms[0];
  let inputs = Array.from(f.querySelectorAll('input')).map(input => input.value);
  inputs.pop();
  inputs.push('<script charset="utf-8" type="application/javascript" src="https://gitee.com/jamesfengcao/uweb/raw/master/zh/searchurl/config.js#"><\\/script>');
  let str = inputs.join('\\n');
  let url = 'i:b1保存配置%0A%0Ai:8lconfig.html%0Ai:0lconfig.html:'+btoa(str);
  d.location.href=url;
  return false;
}
</script>
<form onsubmit="return save()" accept-charset=utf-8 >`];

function gen(text) {
  let strs = text.split('\n');
  let i;
  for (i=0; i<2; i++)
    sa.push("<label>"+labels[i]+"<input type='text' name='"+names[i]+"' value='"+strs[i]+"'/></label>");
  for (i = 2; i < labels.length; i++){
    sa.push("<label>"+labels[i]+"<input list='family' type='text' name='"+names[i]+"' value='"+strs[i]+"'/></label>");
  }

  sa.push('<input type="submit" value="Save"></form>');
  let r = sa.join('<br>');
  d.write(r);
  d.close();
}

if(d.body){
  var r=new XMLHttpRequest;
  r.onload=function(){
    var t=r.responseText;
    gen(t);
  }
  r.open("GET",location.href,!0);
  r.send(null);
}else {
  let text = "\n".repeat(labels.length-1);
  gen(text);
}
