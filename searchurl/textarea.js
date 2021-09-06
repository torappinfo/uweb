var textarea;
onload=function(){
  textarea=document.getElementsByTagName('textarea')[0];
}

function getNewlinePos_back(text,pos){
  while(pos>=0 && text.charAt(pos)!='\n') pos--;
  return pos;
}

function getNewlinePos_forth(text,pos){
  let len = text.length;
  while(pos<len && text.charAt(pos)!='\n') pos++;
  return pos;
}

function deleteLine(ta){
  let text = ta.value;
  let lStart = getNewlinePos_back(text,ta.selectionStart-1);
  let lEnd = getNewlinePos_forth(text,ta.selectionEnd);
  ta.value = text.substring(0,lStart+1) + text.substring(lEnd+1);
  ta.selectionStart = ta.selectionEnd = lStart +1;
  ta.focus();
}

function moveUp(ta){
  let text = ta.value;
  let start = ta.selectionStart;
  let end = ta.selectionEnd;
  let lStart = getNewlinePos_back(text,start-1);
  let lEnd = getNewlinePos_forth(text,end);
  let prevS = getNewlinePos_back(text,lStart-1);
  ta.value = text.substring(0,prevS+1)+text.substring(lStart+1,lEnd+1)+
    text.substring(prevS+1,lStart+1) + text.substring(lEnd+1);
  ta.selectionStart = start - (lStart - prevS);
  ta.selectionEnd = end - (lStart - prevS);
  ta.focus();
}

function move2Top(ta){
  let text = ta.value;
  let start = ta.selectionStart;
  let end = ta.selectionEnd;
  let lStart = getNewlinePos_back(text,start-1);
  let lEnd = getNewlinePos_forth(text,end);
  ta.value = text.substring(lStart+1,lEnd+1)+text.substring(0,lStart+1)+
    text.substring(lEnd+1);
  ta.selectionStart = start - lStart-1;
  ta.selectionEnd = end - lStart-1;
  ta.focus();
}

function move2Bottom(ta){
  let text = ta.value;
  let start = ta.selectionStart;
  let end = ta.selectionEnd;
  let lStart = getNewlinePos_back(text,start-1);
  let lEnd = getNewlinePos_forth(text,end);
  ta.value = text.substring(0,lStart+1)+text.substring(lEnd+1)+
    text.substring(lStart+1,lEnd+1);
  ta.selectionStart = start + text.length - lEnd-1;
  ta.selectionEnd = end + text.length - lEnd-1;
  ta.focus();
}

function moveDown(ta){
  let text = ta.value;
  let start = ta.selectionStart;
  let end = ta.selectionEnd;
  let lStart = getNewlinePos_back(text,start-1);
  let lEnd = getNewlinePos_forth(text,end);
  let nextE = getNewlinePos_forth(text,lEnd+1);
  ta.value = text.substring(0,lStart+1) + text.substring(lEnd+1,nextE+1) +
    text.substring(lStart+1,lEnd+1)+text.substring(nextE+1);
  ta.selectionStart = start + (nextE - lEnd);
  ta.selectionEnd = end + (nextE - lEnd);
  ta.focus();
}


function onSave(fn){
  let u8=new TextEncoder().encode(textarea.value);let r='';for(let i=0;i<u8.byteLength;i++)r+=String.fromCharCode(u8[i]);location.href='i:0l'+fn+':'+btoa(r);
}
