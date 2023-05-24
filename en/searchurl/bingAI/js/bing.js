var chat = document.getElementById('chat');
var chatTypeDiv = document.getElementById('chatTypeDiv');
var docTitle = document.getElementById('docTitle');
var restart_button = document.getElementById('restart');
var input_text = document.getElementById('input');
var send_button = document.getElementById('send');
let restartNewChat = document.getElementById('restartNewChat');
var thisChatType = chatTypes.balance;

//全局变量
var talk;
var returnMessage;
var isSpeaking = false;

reSetStartChatMessage();

//(string)
function addMyChat(message) {
	let bobo = document.createElement('div');
	bobo.style.whiteSpace = 'pre-wrap';
	bobo.innerText = message;
	bobo.classList.add('bobo');
	bobo.classList.add('markdown-body');
	let go = document.createElement('div');
	go.classList.add('my');
	go.appendChild(bobo);
	chat.appendChild(go);
}

//(string)
function addError(message) {
	let go = document.createElement('div');
	go.classList.add('error');
	go.innerHTML = message;
	chat.appendChild(go);
}

let onMessageIsOKClose = false;
//(json)
function onMessage(json, returnMessage) {
	if (json.type == "close") {
		isSpeakingFinish();
		if (!onMessageIsOKClose) {
			addError("聊天异常中断了！可能是网络问题。");
		}
		return;
	}
	if (json.type == 'error') {
		addError("连接发生错误：" + json.mess);
		return;
	}
	onMessageIsOKClose = false
	if (json.type == 3) {
		onMessageIsOKClose = true;
		returnMessage.getCatWebSocket().close(1000, 'ok');
	} else {
          localStorage.removeItem('LastChatJson');
          if (json.type == 1) {
	    porserArguments(json.arguments);
	  } else if (json.type == 2) {
	    porserType2Item(json.item);
	  } else {
	    console.log(JSON.stringify(json));
	  }
        }
}


//页面逻辑


//回车键发送 ctrl+回车换行
input_text.addEventListener('keydown', (event) => {
	if (event.key === 'Enter' && !event.altKey) {
		event.preventDefault();
		//调用发送消息的函数
		send_button.onclick();
	} else if (event.key === 'Enter' && event.altKey) {
		event.preventDefault();
		// 插入换行符
		input_text.value += "\n";
	}
});

/**重置聊天框和聊天建议到初始状态 */
function reSetStartChatMessage(type) {
  createChat(thisChatType).then((r) => {
    if(r.ok) talk = r.obj;
  });
	getChatHubWithMagic().then(async a => {
		chat.innerHTML = `
		<div class="bing">
			<div class="adaptiveCardsFatherDIV">
				<div class="textBlock markdown-body">
				</div>
				<div class="throttling">
					${t} / 0
				</div>
			</div>
		</div>
		`;
	});
}

/**正在创建聊天 */
function isAskingToMagic() {
	isSpeaking = true;
	send_button.value = '施法中.';
}

/**bing正在回复 */
function isSpeakingStart(chatWithMagic, sendText) {
	isSpeaking = true;

	if (sendText) {
		docTitle.innerText = sendText;
	}
	send_button.value = '响应中.';
}

/**bing回复结束 */
function isSpeakingFinish() {
	isSpeaking = false;
	send_button.value = 'submit';
}

function send(text) {
	if (isSpeaking) {
		return;
	}
	chatTypeDiv.style.opacity = 0;
	addMyChat(text);
	if (!talk) {
		isAskingToMagic();
		createChat(thisChatType).then((r) => {
			if (!r.ok) {
				addError(r.message);
				isSpeakingFinish();
				return;
			}
			talk = r.obj;
			isSpeakingStart();
			r = talk.sendMessage(text, onMessage);
			if (!r.ok) {
				isSpeakingFinish();
				addError(r.message);
				return;
			}
			returnMessage = r.obj;
			isSpeakingStart(r.chatWithMagic, text);
		});
		return;
	} else {
		isSpeakingStart();
		let r = talk.sendMessage(text, onMessage)
		if (!r.ok) {
			isSpeakingFinish();
			addError(r.message);
			return;
		}
		returnMessage = r.obj;
		isSpeakingStart(r.chatWithMagic, text);
	}
}

send_button.onclick = () => {
	if (isSpeaking) {
		return;
	}
	let text = input_text.value;
	input_text.value = '';
	input_update_input_text_sstyle_show_update({ target: input_text });
	if (!text) {
		alert('什么都没有输入呀！');
		return;
	}
	send(text);
};

restart_button.onclick = () => {
	onMessageIsOKClose = true;
	if (returnMessage) {
		returnMessage.getCatWebSocket().close(1000, 'ok');
		returnMessage = undefined;
	}
	talk = undefined;
	isSpeakingFinish();
	reSetStartChatMessage();
	chatTypeDiv.style.opacity = 1;
};



//滚动到底部显示收聊天建议

// 定义一个函数处理滚动事件
function handleScroll() {
	// 获取文档的高度和滚动距离
	var docHeight = document.body.scrollHeight;
	var scrollPos = window.pageYOffset;
	// 如果滚动到底部，显示元素，否则隐藏元素
}
// 添加滚动事件监听器
window.addEventListener("scroll", handleScroll);




//选择聊天类型，创造力，平衡，精准
let backgroundDIV = document.getElementById('background');
let chatTypeChoseCreate = document.getElementById('chatTypeChoseCreate');
let chatTypeChoseBalance = document.getElementById('chatTypeChoseBalance');
let chatTypeChoseAccurate = document.getElementById('chatTypeChoseAccurate');
//默认平衡
thisChatType = chatTypes.balance;
chatTypeChoseCreate.onclick = () => {
	if (chatTypeDiv.style.opacity == 0) {
		return;
	}
	chatTypeChoseCreate.classList.add('Chose');
	chatTypeChoseBalance.classList.remove('Chose');
	chatTypeChoseAccurate.classList.remove('Chose');
	thisChatType = chatTypes.create;
	backgroundDIV.className = 'a';
	reSetStartChatMessage('create');
}
chatTypeChoseBalance.onclick = () => {
	if (chatTypeDiv.style.opacity == 0) {
		return;
	}
	chatTypeChoseCreate.classList.remove('Chose');
	chatTypeChoseBalance.classList.add('Chose');
	chatTypeChoseAccurate.classList.remove('Chose');
	thisChatType = chatTypes.balance;
	backgroundDIV.className = 'b';
	reSetStartChatMessage('balance');
}
chatTypeChoseAccurate.onclick = () => {
	if (chatTypeDiv.style.opacity == 0) {
		return;
	}
	chatTypeChoseCreate.classList.remove('Chose');
	chatTypeChoseBalance.classList.remove('Chose');
	chatTypeChoseAccurate.classList.add('Chose');
	thisChatType = chatTypes.accurate;
	backgroundDIV.className = 'c';
	reSetStartChatMessage('accurate');
}


// "resourceTypes": [
// 	"main_frame",
// 	"sub_frame",
// 	"stylesheet",
// 	"script",
// 	"image",
// 	"font",
// 	"object",
// 	"xmlhttprequest",
// 	"ping",
// 	"csp_report",
// 	"media",
// 	"websocket",
// 	"webtransport",
// 	"webbundle",
// 	"other"
//   ]


//发送按钮出现逻辑
function input_update_input_text_sstyle_show_update(v) {
	if (v.target.value) {
		send_button.style.opacity = 1;
	} else {
		send_button.style.opacity = 0;
	}
}
input_text.addEventListener("input", input_update_input_text_sstyle_show_update);
input_update_input_text_sstyle_show_update({ target: input_text });


//开始新聊天按钮逻辑，仅在聊天复用
restartNewChat.onclick = async () => {
	localStorage.removeItem('LastChatJson');
	await setLastInvocationId(1);
	restart_button.onclick();
}



