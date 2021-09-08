var editor;
onload=function(){
  var d=document;
  var ext = location.href.split('.').pop();
  {
    var ta=d.getElementById("textarea");
    var text=ta.value;
    var e = d.getElementById("editor");
    
    switch(ext){
    case "js":
      ext = "javascript";
    }
    editor = ace.edit(e);
    editor.session.setValue(text);
  }
  editor.session.setMode("ace/mode/"+ext);
  editor.setTheme("ace/theme/clouds");
  editor.setShowPrintMargin(false);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
  });
}

function onSave(fn){
  let u8=new TextEncoder().encode(editor.session.getValue());let r='';for(let i=0;i<u8.byteLength;i++)r+=String.fromCharCode(u8[i]);location.href='i:0l'+fn+':'+btoa(r);
}

