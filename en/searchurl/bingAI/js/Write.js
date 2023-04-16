createChat(thisChatType).then((r) => {
  if(r.ok) talk = r.obj;
});

/**重写重置聊天到初始状态函数 */
function reSetStartChatMessage(type) {
  chat.innerHTML = ``;
  isSpeaking = false;
}

/**重写函数 */
function isSpeakingStart(chatWithMagic, sendText) {
  isSpeaking = true;
}
//重写
function isSpeakingFinish() {
  isSpeaking = false;
}


//重写send函数
oldSend = send;
send = (text) => {
    reSetStartChatMessage();
    oldSend(text);
}

//重写porserTextBlock函数
/*
解析TextBlock body.type==TextBlock
*/
function porserTextBlock(body, father) {
    if (!body.size) {
        let div = getByClass('textBlock', 'div', father, 'markdown-body');
        div.innerHTML = marked.marked(completeCodeBlock(body.text));
        renderMathInElement(div,renderMathInElementOptions);
        let aaas = div.getElementsByTagName('a');
        //将超链接在新页面打开
        for(let i=0;i<aaas.length;i++){
            aaas[i].target = '_blank';
        }
        //如果是注释则加上上标样式
        for(let i=0;i<aaas.length;i++){
            let reg = new RegExp('^\\^(\\d+)\\^$');
            if(reg.test(aaas[i].innerHTML)){
                aaas[i].innerHTML = aaas[i].innerHTML.replace(reg,'$1');
                aaas[i].classList.add('superscript');
            }
        }
    } else if (body.size == 'small') {
        //原本bing官网的small并没有输出
    }
}

//重写send按钮点击事件
send_button.onclick = () => {
  let text = input_text.value;
  send(text);
};
