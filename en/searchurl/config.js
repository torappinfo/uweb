let labels = ["<a href='https://jamesfengcao.codeberg.page/en/redirect/index.html'>Global redirect url</a>","Download path (with option 'Download to sdcard')","Default font","Cursive","Fantasy","Fixed","Sans-Serif","Serif"];
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
<form onsubmit="let d=document;let f=d.forms[0];d.location.href='i:b1Save config.html%0A%0Ai:8lconfig.html%0Ai:0i/data/data/info.torapp.uweb/files/config.html:'
+f.redirecturl.value+
'&'+ f.downloadpath.value+
'&'+ f.font.value+
'&'+ f.cursive.value +
'&'+ f.fantasy.value +
'&'+ f.fixed.value +
'&'+ f.sansserif.value +
'&'+ f.serif.value +
':https://jamesfengcao.codeberg.page/en/searchurl/template/config.html';return false;" accept-charset=utf-8 >`];

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
