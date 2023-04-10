var expUrl = new RegExp('^(https?://)([-a-zA-z0-9]+\\.)+([-a-zA-z0-9]+)+\\S*$');
function timeString() {
	var d = new Date();
	var year = d.getFullYear();
	var month = (d.getMonth() + 1).toString().padStart(2, "0");
	var date = d.getDate().toString().padStart(2, "0");
	var hour = d.getHours().toString().padStart(2, "0");
	var minute = d.getMinutes().toString().padStart(2, "0");
	var second = d.getSeconds().toString().padStart(2, "0");
	var offset = "+08:00"; // 你可以根据需要修改这个值
	var s = year + "-" + month + "-" + date + "T" + hour + ":" + minute + ":" + second + offset;
	return s;
}

function getUuidNojian() {
	return URL.createObjectURL(new Blob()).split('/')[3].replace(/-/g, '');
}

function getUuid() {
	return URL.createObjectURL(new Blob()).split('/')[3];
}

//聊天选项
let chatTypes = {
	//更有创造力选项
	create: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"h3imaginative",
		"clgalileo",
		"gencontentv3",
		"telmet",
		"jbfv2",
		"c2b47e4f",
		"dv3sugg"
	],
	//balance 平衡模式选项
	balance: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"galileo",
		"telmet",
		"jbfv2",
		"c2b47e4f",
		"dv3sugg"
	],
	//精准选项
	accurate: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"h3precise",
		"telmet",
		"jbfv2",
		"c2b47e4f",
		"dv3sugg",
		"clgalileo"
	]
}

//接收消息类型
let allowedMessageTypes = [
	"Chat",
	"InternalSearchQuery",
	"InternalSearchResult",
	"Disengaged",
	"InternalLoaderMessage",
	"RenderCardRequest",
	"AdsQuery",
	"SemanticSerp",
	"GenerateContentQuery",
	"SearchQuery"
]

//切片id，也不知道是啥意思，反正官网的更新了
let sliceIds = [
	"semserpsup3",
	"styleqnatg",
	"lgintsuppcf",
	"sydpayajax",
	"toneexp",
	"327telmet",
	"325contents0",
	"324jbfv2",
	"303hubcancls0",
	"321jobsgndv0",
	"328throt",
	"328postclss0"
]

class SendMessageManager {
	//(会话id，客户端id，签名id，是否是开始)
	//(string,string,string,boolena)
	constructor(conversationId, clientId, conversationSignature,invocationId) {
		this.startTime = timeString();
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
	sendChatMessage(chatWebSocket, chat) {
	  let pos = ['','','']; //initial 3 suggestions
		let previousMessages = [{
			"text": '',
			"author": "bot",
			"adaptiveCards": [],
			"suggestedResponses": [{
				"text": pos[0],
				"contentOrigin": "DeepLeo",
				"messageType": "Suggestion",
				"messageId": getUuid(),
				"offense": "Unknown"
			}, {
				"text": pos[1],
				"contentOrigin": "DeepLeo",
				"messageType": "Suggestion",
				"messageId": getUuid(),
				"offense": "Unknown"
			}, {
				"text": pos[2],
				"contentOrigin": "DeepLeo",
				"messageType": "Suggestion",
				"messageId": getUuid(),
				"offense": "Unknown"
			}],
			"messageId": getUuid(),
			"messageType": "Chat"
		}];
		let json = {
			"arguments": [{
				"source": "cib",
				"optionsSets": this.optionsSets,
				"allowedMessageTypes": allowedMessageTypes,
				"sliceIds": sliceIds,
				"verbosity": "verbose",
				"traceId": getUuidNojian(),
				"isStartOfSession": (this.invocationId <= 1) ? true : false,
				"message": {
					"locale": "zh-CN",
					"market": "zh-CN",
					"region": "US",
					"location": "lat:47.639557;long:-122.128159;re=1000m;",
					"locationHints": [
						{
							"Center": {
								"Latitude": 30.474109798833613,
								"Longitude": 114.39626256171093
							},
							"RegionType": 2,
							"SourceType": 11
						},
						{
							"country": "United States",
							"state": "California",
							"city": "Los Angeles",
							"zipcode": "90060",
							"timezoneoffset": -8,
							"dma": 803,
							"countryConfidence": 8,
							"cityConfidence": 5,
							"Center": {
								"Latitude": 33.9757,
								"Longitude": -118.2564
							},
							"RegionType": 2,
							"SourceType": 1
						}
					],
					"timestamp": this.startTime,
					"author": "user",
					"inputMethod": "Keyboard",
					"text": chat,
					"messageType": "Chat"
				},
				"conversationSignature": this.conversationSignature,
				"participant": {
					"id": this.clientId
				},
				"conversationId": this.conversationId,
				"previousMessages": (this.invocationId <= 1) ? previousMessages : undefined
			}],
			"invocationId": this.invocationId.toString(),
			"target": "chat",
			"type": 4
		};
		this.sendJson(chatWebSocket, json);
		this.invocationId++;
		setLastInvocationId(this.invocationId);
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
			let restsrstUrl = 'wss://sydney.bing.com/sydney/ChatHub';
			if (this.chatWithMagic==true) {
				restsrstUrl = URLTrue(this.magicUrl.replace('http', 'ws'), "ChatHub");
			}
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
      let res = await fetch(url, {credentials: "include"});
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