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
		"jbf101",
		"cachewriteext",
		"e2ecachewrite",
		"nodlcpcwrite",
		"dv3sugg",
		"clgalileo",
		"gencontentv3"
	],
	//balance 平衡模式选项
	balance: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"galileo",
		"jbf101",
		"cachewriteext",
		"e2ecachewrite",
		"nodlcpcwrite",
		"dv3sugg",
		"dlwebtrunc",
		"glpromptv6"
	],
	//精准选项
	accurate: [
		"nlu_direct_response_filter",
		"deepleo",
		"disable_emoji_spoken_text",
		"responsible_ai_policy_235",
		"enablemm",
		"h3precise",
		"clgalileo",
		"jbf101",
		"cachewriteext",
		"e2ecachewrite",
		"nodlcpcwrite",
		"dv3sugg"
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
	"audseq",
	"chk1cln",
	"nofbkcf",
	"nosharepre",
	"fixsacodecf",
	"405suggbs0",
	"scctl",
	"403jbf101",
	"udstrclm8cmp",
	"udstrclm8",
	"329v6webtrunc",
	"404e2ewrt"
]


async function getPreviousMessages(){
	function getUuid() {
		return URL.createObjectURL(new Blob()).split('/')[3];
	}
	let pos = getStartProposes();
	return [{
	  "text": getStartMessage(),
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
}