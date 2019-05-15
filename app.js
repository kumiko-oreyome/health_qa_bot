var app = new Vue({
  el: '#message_box',
  data: {chat_messages:[{id:0,text:'你好!',isUserMessage:false}],
		 userMessageClass: 'left',
		 botMessageClass: 'right',
		 appearedClass:'appeared'

       },
  updated(){     
		var $messages = $(this.$el);
		$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    }
});

var kb = new Vue({
  el: '#kb',
  data: {},
	methods: {
	send: function (event) {
		var inp = this.$refs.inp;
		var q = inp.value;
		if(q.trim().length == 0){
			inp.value = '';
			return ;
		}
		sendMessage(true,q);
		inp.value = '';
		var response = generate_responses(q);
		for(let answer of response.answer){
			setTimeout(function(){sendMessage(false,answer)},750);
		}
	}
}
  
});

var clear =  new Vue({
  el: '#clear',
  data: {},
	methods: {
	clear: function (event) {
		app.chat_messages = [{id:0,text:'你好!',isUserMessage:false}];
	}
}
  
});

function sendMessage(isUserMessage,_text){
	app.chat_messages.push({id:app.chat_messages.length,text:_text,isUserMessage:isUserMessage});
 } 
  


function generate_responses(question){
	var corpus = [
		{question:'糖尿病吃什麼',answer:['治療:\n1.定期召醫生指示服藥、定期追蹤\n2.不可以因狀況改善就自行停藥，容易造成更嚴重的高血壓\n3.要避免過量飲酒、劇烈運動、服藥後三小時內不得洗熱水澡','飲食\n1.盡量使用含不飽和脂肪酸的植物油，因其穩定且不易變性，例如:橄欖油。\n2.以烤、蒸、水煮及微波爐等方式來調理食物以減少油量的攝取\n3.以中藥材、辛香料、檸檬片、薑、蒜、蔥等食物添加風味，以減少鹽、味精、醬油的攝取。\n4.建議多吃：海產類、植物類（含不飽和脂肪酸的食物）、低膽固醇、富含纖維質的食物','建議\n1.作息、生活規律\n2.注意大幅度的溫差變動，太冷太熱都會造成血壓上下降\n3.適度運動，但不及劇烈運動應在身體可以接受的範圍下進行\n4.每日測量血壓並記錄，以供醫生進行參考\n5.注意飲食，減少鈉鹽、卡路里、膽固醇及飽和脂肪酸的攝取'],triggers:['高血壓']},
		{question:'高血壓能喝咖啡嗎',answer:['高血壓可不可以喝咖啡的回答'],triggers:['高X壓']},
	];
	var response_obj = {};
	for(let  obj of corpus){
		let match_flag = false;
		for(let w of obj.triggers){
			if(question.search(w)>=0){
				match_flag = true;
			}
		}
		if(match_flag){
			response_obj = obj;
			break;
		}
	}
	if($.isEmptyObject(response_obj)){
		//response_obj =  corpus[Math.floor(Math.random() * corpus.length)];
		response_obj =  {answer:["抱歉我聽不懂"]};
	}
	
	return response_obj;
}



