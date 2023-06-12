let pageH=`<!DOCTYPE html><html><head><style>pre{counter-reset: line;white-space:pre-wrap}
pre>code{counter-increment: line;}
pre>code:before {
  content: counter(line);
  width: 2em;
  margin-right: 0.5em;
  color: gray;
}
</style></head><body><pre>`;
let pageT="</pre></body></html>";

function gen(text) {
  let d=window.open('').document;
  d.write(pageH);
  let t=text.replaceAll('<','&lt;');
  t = t.replace(/^(.*)$/gm, '<code> $1 </code>');
  d.write(t);
  d.write(pageT);
  d.close();
}

if(document.body){
  var r=new XMLHttpRequest;
  r.onload=function(){
    var t=r.responseText;
    gen(t);
  }
  r.open("GET",location.href,!0);
  r.send(null);
}
