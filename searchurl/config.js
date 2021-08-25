let text = "";
let d=document;
if(d.body)
  text = d.body.innerHTML;

let labels = ["网页默认字体族","cursive字体族","Fantasy字体族","Fixed字体族","Sans-Serif字体族","Serif字体族"];
let names = ["font","cursive","fantasy","fixed","sansserif","serif"];
let sa = [`<style>input{height:40px;width:100%;border-radius:50px;}</style><form onsubmit="let d=document;let f=d.forms[0];d.location.href='i:0i/sdcard/uweb/config.html:'+f.font.value+
'&'+ f.cursive.value +
'&'+ f.fantasy.value +
'&'+ f.fixed.value +
'&'+ f.sansserif.value +
'&'+ f.serif.value +
':https://cdn.jsdelivr.net/gh/torappinfo/uwebzh/searchurl/template/config.html';return false;" accept-charset=utf-8 >`];


let strs = text.split('\n');
for (let i = 0; i < labels.length; i++){
  sa.push("<label>"+labels[i]+"<input type='text' name='"+names[i]+"' value='"+strs[i]+"'/></label>");
}
sa.push('<input type="submit" value="Save"></form>');
let r = sa.join('<br>');
d.documentElement.innerHTML = r;
