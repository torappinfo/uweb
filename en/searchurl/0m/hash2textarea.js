(function(){let d=document;let t=d.location.hash.substring(1);if(!t)return;t=decodeURI(t);let ta;function setV(){if(ta.value)return;ta.value=t;ta.dispatchEvent(new InputEvent('input'));setTimeout(()=>{setV()},400)}function waitTextarea(){ta=d.querySelector('textarea');if(ta){setV();return;}setTimeout(()=>{waitTextarea();},400);}waitTextarea();})()