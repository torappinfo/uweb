var expUrl = new RegExp('^(https?://)([-a-zA-z0-9]+\\.)+([-a-zA-z0-9]+)+\\S*$');
function getUuidNojian() {
	return URL.createObjectURL(new Blob()).split('/')[3].replace(/-/g, '');
}

class SendMessageManager {
	//(会话id，客户端id，签名id，是否是开始)
	//(string,string,string,boolena)
	constructor(conversationId, clientId, conversationSignature,invocationId) {
		this.invocationId = invocationId==undefined?1:invocationId;
		this.conversationId = conversationId;
		this.clientId = clientId;
		this.conversationSignature = conversationSignature;
		this.optionsSets = chatTypes.balance;
	}

	//chatTypes中的一种
	setChatType(chatType) {
		this.optionsSets = chatType;
	}

	//发送json数据
	sendJson(chatWebSocket, json) {
		let go = JSON.stringify(json) + '\u001e';
		chatWebSocket.send(go);
		console.log('发送', go)
	}
	//获取用于发送的握手数据
	//(WebSocket)
	sendShakeHandsJson(chatWebSocket) {
		this.sendJson(chatWebSocket, {
			"protocol": "json",
			"version": 1
		});
	}
	//获取用于发送的聊天数据
	//(WebSocket,sreing)
  async sendChatMessage(chatWebSocket, chat) {
    let optionsSets = chatTypes[this.optionsSets];
		let json = {
			"arguments": [{
				"source": source,
				"optionsSets": optionsSets,
				"allowedMessageTypes": allowedMessageTypes,
				"sliceIds": sliceIds,
				"verbosity": "verbose",
				"traceId": getUuidNojian(),
				"isStartOfSession": (this.invocationId <= 1) ? true : false,
				"message": await generateMessages(this,chat),
				"conversationSignature": this.conversationSignature,
				"participant": {
					"id": this.clientId
				},
				"conversationId": this.conversationId,
				"previousMessages": (this.invocationId <= 1) ? await getPreviousMessages() : undefined
			}],
			"invocationId": this.invocationId.toString(),
			"target": "chat",
			"type": 4
		};
		this.sendJson(chatWebSocket, json);
		this.invocationId++;
	}
}





//处理返回消息的类
class ReturnMessage {
	//(WebSocket,function:可以不传)
	constructor(catWebSocket, lisin) {
		this.catWebSocket = catWebSocket;
		this.onMessage = [(v) => {
			//console.log(JSON.stringify(v))
		}];
		if ((typeof lisin) == 'function') {
			this.regOnMessage(lisin);
		}
		catWebSocket.onmessage = (mess) => {
			//console.log('收到', mess.data);
			let sss = mess.data.split('\u001e');
			for (let i = 0; i < sss.length; i++) {
				if (sss[i] == '') {
					continue;
				}
				for (let j in this.onMessage) {
					if ((typeof this.onMessage[j]) == 'function') {
						try {
							this.onMessage[j](JSON.parse(sss[i]), this);
						} catch (e) {
							console.warn(e)
						}
					}
				}
			}
		}
		catWebSocket.onclose = (mess) => {
			for (let i in this.onMessage) {
				if ((typeof this.onMessage[i]) == 'function') {
					try {
						this.onMessage[i]({
							type: 'close',
							mess: '连接关闭'
						}, this);
					} catch (e) {
						console.warn(e)
					}
				}
			}
		}
		catWebSocket.onerror = (mess) => {
			console.log(mess);
			for (let i in this.onMessage) {
				if ((typeof this.onMessage[i]) == 'function') {
					try {
						this.onMessage[i]({
							type: 'error',
							mess: mess
						}, this);
					} catch (e) {
						console.warn(e)
					}
				}
			}
		}
	}
	/*
	获取消息WebSocket
	*/
	getCatWebSocket() {
		return this.catWebSocket;
	}
	/**
	 * 注册收到消息监听器
	 */
	//(function(json,ReturnMessage))
	regOnMessage(theFun) {
		this.onMessage[this.onMessage.length] = theFun;
	}
}
//处理聊天的类
class Chat {
	//theChatType chatTypes变量中的其中一个
	//invocationId 可以不传
	//(string,ture|false|'repeat',string,string,string,theChatType,int|undefined)
	constructor(magicUrl, chatWithMagic, charID, clientId, conversationSignature, theChatType,invocationId) {
		this.magicUrl = magicUrl;
		this.chatWithMagic = chatWithMagic; 
		this.sendMessageManager = new SendMessageManager(charID, clientId, conversationSignature,invocationId);
		if (theChatType) {
			this.sendMessageManager.setChatType(theChatType);
		}
	}
	/**
	 * 返回
	 {
		 ok:true|false，
		 message:显示消息，
		 obj:ReturnMessage对象
	   }
	 当ok等于false时，不返回ReturnMessage
	 * 参数 消息string,当收到消息的函数,当关闭时函数
	 */
	//(string,function:可以不传)
  sendMessage(message, onMessage) {
    try {
      //let restsrstUrl = 'wss://sydney.bing.com/sydney/ChatHub';
      //if (this.chatWithMagic==true)
      let restsrstUrl = this.magicUrl.replace('http', 'ws')+"sydney/ChatHub";
      
      let chatWebSocket = new WebSocket(restsrstUrl);
      chatWebSocket.onopen = () => {
	this.sendMessageManager.sendShakeHandsJson(chatWebSocket);
	this.sendMessageManager.sendChatMessage(chatWebSocket, message);
      }
      return {
	ok: true,
	message: 'ok',
	obj: new ReturnMessage(chatWebSocket, onMessage),
	chatWithMagic: this.chatWithMagic==true?true:false
      };
    } catch (e) {
      console.warn(e)
      return {
	ok: false,
	message: "发生错误,可能是网络连接错误:" + e.message
      };
    }
  }
}

function URLTrue(url, thiePath) {
  return url + thiePath;
}

//获取newbing权限
async function getPower() {}

async function copyCookies(magicUrl) {}

//创建一个新对话
/**
 返回结构，如果ok等于false则无chat对象
 {
	 ok:true|false,
	 message:显示消息,
	 obj:Cat对象
 }
 */
async function createChat(theChatType) {
  let chatWithMagic = await getChatHubWithMagic();
  let magicUrl = await getMagicUrl();
  let restartNewChat = document.getElementById('restartNewChat');
  
	if(chatWithMagic=='repeat'){//如果是聊天复用
		restartNewChat.classList.remove('onShow');
		let resjson = await getLastChatJson();
		if(resjson){//如果没有上次聊天或上次聊天已经失效就不返回，继续走创建聊天流程
			let invocationId = await getLastChatInvocationId();
			if(!invocationId){
				invocationId = 1;
			}
			return {
				ok: true,
				message: 'ok',
				obj: new Chat(magicUrl, chatWithMagic, resjson.conversationId, resjson.clientId, resjson.conversationSignature, theChatType,invocationId)
			};
		}
	}
  
  let mes;
  do {
    try {
      let url = URLTrue(magicUrl,'turing/conversation/create');
      let res = await fetch(url);
      if(!res.ok){
        if(res.headers.has('cf-mitigated')){
          let challengeUrl = `${magicUrl}/challenge?`+location.href;
          location.href=challengeUrl;
          return;
        }
        mes = `Error code: ${res.status} ${res.statusText}`;
        break;
      }
      let resjson = await res.json();
      if (!resjson.result || resjson.result.value != 'Success') {
        mes = resjson;
        break;
      }
      //保存成功的聊天
      setLastChatJson(resjson);
      return {
        ok: true,
        message: 'ok',
        obj: new Chat(magicUrl, chatWithMagic, resjson.conversationId, resjson.clientId, resjson.conversationSignature, theChatType)
      };
    } catch (e) {mes = e.message;}
  }while(false);
  
  return {
    ok: false,
    message: mes
  };
}
