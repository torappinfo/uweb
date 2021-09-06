var editor;
onload=function(){
  var e = document.getElementById("editor");
  var ext = location.href.split('.').pop();
  outer:{
    switch(ext){
    case "html":
      {
        var text = e.innerHTML;
        editor = ace.edit(e);
        editor.session.setValue(text);
      }
      break outer;
    case "js":
      ext = "javascript";
    }
    editor = ace.edit(e);
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

