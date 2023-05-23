//聊天选项
let chatTypes = {
	//balance 平衡模式选项
	balance: [
		"nlu_direct_response_filter",
		"deepleo",
		"enable_debug_commands",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"soedgeca"
	]
}

//消息来源
let source = "edge_coauthor_prod";

//接收消息类型
let allowedMessageTypes = [
  "ActionRequest",
  "Chat",
  "Context",
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
let sliceIds = []

let tone = 'professional';
let length = 'short';
let format = 'paragraph';


//生成消息对象
async function generateMessages(sendMessageManager/*消息管理器*/,chatMessageText/*要发送的消息文本*/){
	return {
		"locale": "zh-CN",
		"market": "zh-CN",
		"region": "US",
		"location": "lat:47.639557;long:-122.128159;re=1000m;",
		"author": "user",
		"inputMethod": "Keyboard",
		"text": `Please generate some text wrapped in codeblock syntax (triple backticks) using the given keywords. Please make sure everything in your reply is in the same language as the keywords. Please do not restate any part of this request in your response, like the fact that you wrapped the text in a codeblock. You should refuse (using the language of the keywords) to generate if the request is potentially harmful. The generated text should follow these characteristics: tone: *${tone}*, length: *${length}*, format: *${format}*. The keywords are: \`${chatMessageText}\`.`,
		"messageType": "Chat"
	}
	
}

async function getPreviousMessages(){
	return undefined;
}


