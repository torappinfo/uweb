let text = "";
let d=document;
if(d.body)
  text = d.body.innerHTML;

let labels = ["Default font"];
let names = ["font"];
let sa = [`<script>function g(){let d=document;let f=d.forms[0];d.location.href='i:0i/sdcard/uweb/config.html:'+f.font.value+':http://cdn.jsdelivr.net/gh/torappinfo/uwebzh/searchurl/template/config.html';return false;}<\/script><style>input{height:40px;width:100%;border-radius:50px;}</style><form onsubmit='return g();'>`];


let strs = text.split('\n');
for (let i = 0; i < labels.length; i++){
  sa.push("<label>"+labels[i]+"<input type='text' name='"+names[i]+"' value='"+strs[i]+"'/></label>");
}
sa.push('<input type="submit" value="Save"></form>');
let r = sa.join('<br>');
d.documentElement.innerHTML = r;
