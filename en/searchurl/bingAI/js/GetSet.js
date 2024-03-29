async function setMagicUrl(url) {
  localStorage.setItem('GoGoUrl',url);
}

// ture:开启使用魔法聊天|false:关闭使用魔法聊天|'repeat':开启聊天复用
async function setChatHubWithMagic(user) {
  localStorage.setItem('ChatHubWithMagic',user);
}
// ture|false|'repeat'
async function getChatHubWithMagic() {
  let v = localStorage.ChatHubWithMagic;
  if (v) {
    switch(v){
    case 0:
      break;
    case 1:
      return false;
    case 2:
      return true;
    }
  }
  return 'repeat';
}

//设置上次创建的聊天
async function setLastChatJson(json) {
  localStorage.setItem('LastChatJson',json);
}

//获取上次创建的聊天
async function getLastChatJson() {
  return localStorage.LastChatJson;
}

//获取上次聊天聊到的消息id次数
async function getLastChatInvocationId(){
  return localStorage.LastChatInvocationId;
}
//设置上次聊天聊到的消息id次数
async function setLastInvocationId(invocationId){
  return localStorage.setItem('LastChatInvocationId',invocationId);
}
