let labels = ["网页默认字体族","cursive字体族","Fantasy字体族","Fixed字体族","Sans-Serif字体族","Serif字体族"];
let names = ["font","cursive","fantasy","fixed","sansserif","serif"];

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
<form onsubmit="let d=document;let f=d.forms[0];d.location.href='i:0i/data/data/info.torapp.uweb/files/config.html:'+f.font.value+
'&'+ f.cursive.value +
'&'+ f.fantasy.value +
'&'+ f.fixed.value +
'&'+ f.sansserif.value +
'&'+ f.serif.value +
':https://fastly.jsdelivr.net/gh/torappinfo/uweb/searchurl/template/config.html';return false;" accept-charset=utf-8 >`];

function gen(text) {
  let strs = text.split('\n');
  let i=0;
  for (i = 0; i < labels.length; i++){
    sa.push("<label>"+labels[i]+"<input list='family' type='text' name='"+names[i]+"' value='"+strs[i]+"'/></label>");
  }

  sa.push('<input type="submit" value="Save"></form>');
  let r = sa.join('<br>');
  d.documentElement.innerHTML = r;
}

if(d.body){
  fetch(location.href)
    .then(res => res.text())
    .then(text => {
      gen(text);
    });
}else {
  let text = "\n".repeat(labels.length-1);
  gen(text);
}
