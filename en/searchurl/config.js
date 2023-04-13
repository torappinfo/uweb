let labels = ["<a href='https://jamesfengcao.codeberg.page/en/redirect/index.html'>Global redirect url</a>","Default font","Cursive","Fantasy","Fixed","Sans-Serif","Serif"];
let names = ["redirecturl","font","cursive","fantasy","fixed","sansserif","serif"];

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
<form onsubmit="let d=document;let f=d.forms[0];d.location.href='i:0i/data/data/info.torapp.uweb/files/config.html:'
+f.redirecturl.value+
'&'+ f.font.value+
'&'+ f.cursive.value +
'&'+ f.fantasy.value +
'&'+ f.fixed.value +
'&'+ f.sansserif.value +
'&'+ f.serif.value +
':https://fastly.jsdelivr.net/gh/torappinfo/uweb/zh/searchurl/template/config.html';return false;" accept-charset=utf-8 >`];

function gen(text) {
  let strs = text.split('\n');
  let i=0;
  sa.push("<label>"+labels[i]+"<input type='text' name='"+names[i]+"' value='"+strs[i]+"'/></label>");
  for (i = 1; i < labels.length; i++){
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
