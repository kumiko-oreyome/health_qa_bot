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
  data: {userSays:''},
	methods: {
	send: function (event) {
        console.log(this.userSays);
		if(this.userSays.trim().length == 0){
			this.userSays = '';
			return ;
		}
		sendMessage(true,this.userSays);
		var response = generate_responses(this.userSays);
        this.userSays = '';
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

var speech =  new Vue({
  el: '#speech',
  data: {},
	methods: {
	speech: function (event) {
		//console.log('1234');
		if(typeof android !=='undefined'){
			android.speechRecognition();
		}else{
			console.log('undefined android gg');
		}
	}
}
});

function sendMessage(isUserMessage,_text){
	app.chat_messages.push({id:app.chat_messages.length,text:_text,isUserMessage:isUserMessage});
 } 
  
function receiveFinalMessageFromAndroid(_text){
    kb.userSays = _text;
    kb.send();
 } 

 function receivePartialMessageFromAndroid(_text){
    if(_text.length > 0 ){
        kb.userSays = _text;
    }
 } 


function generate_responses(question){
	var corpus = [
		{question:'高血壓',answer:['治療:\n1.定期召醫生指示服藥、定期追蹤\n2.不可以因狀況改善就自行停藥，容易造成更嚴重的高血壓\n3.要避免過量飲酒、劇烈運動、服藥後三小時內不得洗熱水澡','飲食\n1.盡量使用含不飽和脂肪酸的植物油，因其穩定且不易變性，例如:橄欖油。\n2.以烤、蒸、水煮及微波爐等方式來調理食物以減少油量的攝取\n3.以中藥材、辛香料、檸檬片、薑、蒜、蔥等食物添加風味，以減少鹽、味精、醬油的攝取。\n4.建議多吃：海產類、植物類（含不飽和脂肪酸的食物）、低膽固醇、富含纖維質的食物','建議\n1.作息、生活規律\n2.注意大幅度的溫差變動，太冷太熱都會造成血壓上下降\n3.適度運動，但不及劇烈運動應在身體可以接受的範圍下進行\n4.每日測量血壓並記錄，以供醫生進行參考\n5.注意飲食，減少鈉鹽、卡路里、膽固醇及飽和脂肪酸的攝取'],triggers:['高血壓']},
		{question:'肌肉痠痛',answer:['治療:\n1.適度運動是提升肌力、肌耐力、骨骼力不可或缺的關鍵\n2.建立老人家可採取水上運動、室內單車、健走等方式進行運動\n3.阻抗運動（重訓）可強化肌力，幫助肌少症患者長肌肉','飲食:\n1.鈣、維生素D，以及適量的鎂、鉀、維生素K，建議從食物攝取較容易被身體吸收\n2.乳製品、豆製品跟蔬菜都有豐富鈣質，其中奶粉、乳酪、小方豆乾、黑芝麻、小魚乾、蝦米、香椿、野莧、食茱萸\n3.維生素D則可藉由曬太陽獲得，或多吃沙丁魚、鮭魚、鮪魚、乾香菇\n4.堅果類跟豆類則有豐富的鎂；一般蔬菜、水果含鉀量都不低；維生素K則可從深綠色蔬菜攝取\n5.飲食多樣、均衡，每天至少五蔬果，再平均從蛋、豆、魚、肉類攝取蛋白質，然後喝杯牛奶、曬曬太陽，你就能擁有健康的骨頭','可能類似疾病--肌肉骨頭痠痛(風濕性多肌痛):\n1.開始發病時，感覺渾身疼痛，但往往又難以指出具體某個關節痛，也說不清是什麼時候開始痛\n2.起病時主要是頸項部、肩背至上臂部、骨盆周圍至大腿部的酸痛和無力，隨著病程的發展，可發展到四肢近端、頸、胸、臀等部位疼痛\n3.夜間更痛，嚴重影響睡眠，導致病人精神和體力很快就有被摧毀的感覺\n4.伴隨有肌肉無力。肌無力以骨盆帶肌和大腿開始，逐漸發展到全身肌無力'],triggers:['肌肉痠痛']},{question:'骨刺',answer:['治療:\n1.平時可以藉由游泳、腳踏車或是輕度的有氧運動，增加大腿、臀部的肌力，減少關節的負荷\n2.養成規律的運動習慣，不過應採漸進式增加活動量，避免劇烈運動\n3.練習瑜珈可以緩和骨刺引起的疼痛，但不能貿然做幅度太大的前後彎仰動作\n4.維持理想的體重，減輕脊椎的負荷\n5.避免粗重的工作及不良的姿勢，包括坐姿、站姿、臥姿等','飲食:\n1.多攝取富含抗氧化劑的食物，如：有花椰菜、甜瓜、青椒、柚子、鮮棗、番茄、柑橘、杏仁、花生、核桃、捲心菜、芝麻、葵花子……等\n2.多攝取生物類黃酮食物，如：西紅柿和茄子……等，以預防骨刺的發生\n3.忌食冰冷飲料，汽水，忌喝酒\n4.忌吃芒果、香蕉、木瓜、竹筍、芋頭\n5.晚上5點過後，或吃飯前後不吃西瓜、哈密瓜……等寒涼性質的瓜類，以免氣滯血瘀，使疼痛加劇'],triggers:['骨刺']},{question:'口腔疾病',answer:['治療:\n1.保持口腔潔凈，使口腔內少有雜味，這樣能增加味覺敏感性，有利於提高食慾。同時失牙老人還應儘可能地補牙、鑲牙和裝上假牙，以改善口腔咀嚼功能\n2.定期檢查牙齒、定期洗牙\n3.咀嚼的正確方法是交替使用兩側牙齒。如經常使用單側牙齒咀嚼，則不用一側缺少生理性刺激，易發生組織的雇用性萎縮，而常咀嚼的一側負荷過重，易造成牙髓炎','飲食:\n1.應食易於咀嚼和利於消化並富有營養的食品，可多食肉湯、乳類製品、雞蛋、軟魚和水果等\n2.食富有維生素和礦物質的食物，因為維生素對維持組織器官的正常結構與功能有很大關係。礦物質，尤其是鈣、磷對骨質的影響較大\n3.老年人每天攝入蛋白質以男性75克，女性65克為宜。食用足夠量的蛋白質，有利於口腔支持組織的健康耐力'],triggers:['口腔疾病']},{question:'食慾不振',answer:['原因:\n1.消化道疾病\n2.慢性病問題\n3.牙齒退化\n4.癌症','飲食:\n1.食慾差的老年人，可先選擇流質類的食物，像是稀飯、肉、菜打成稀狀流質物，補充營養的不足，也較好入口\n多人共餐，營造熱鬧的實用氣氛'],triggers:['食慾不振']},{question:'糖尿病',answer:['治療:\n胰島素需在醫生指示下進行嚴格控制，勿自行施打或是不施打\n2.避免過度勞力與壓力，亦容易導致血糖上下降過於迅速\n3.充足睡眠有助於穩定血糖','飲食:\n 1.需特別注意：全穀根莖類、水果類、乳製品，不宜攝取過多\n 2.減少喝酒，以攝取充足的水分代替\n 3.六大原則:\n - 了解一日所需的食物份量\n - 均衡攝取六大類食物\n - 含醣食物需要多加注意\n - 少油少鹽少加工\n - 低脂高纖多喝水\n - 維持理想（穩定）體重'],triggers:['糖尿病']},{question:'失眠',answer:['原因:\n1.生理因素：年紀越大，睡得越少，容易引起睡眠障礙\n2.夜尿增多：膀胱無力，容易在夜晚起來上廁所\n3.心理社會因素：引起老年人的思考、不安、懷念、憂傷、煩惱、焦慮、痛苦等，都可使老年人產生失眠症','飲食:\n1.天然助眠劑／色胺酸：大多數含有蛋白質的食物，包含牛奶與天然乳製品。豆類、五穀根莖類也都有類似效果。\n2.助眠好幫手／維生素B群：全榖類、小麥胚芽、堅果、啤酒酵母、蛋、綠色的多葉蔬菜等\n3.舒緩兼放鬆／礦物質鈣、鎂：鈣較多的食物有牛奶、小魚乾和深綠色的蔬菜。另外，香蕉富含礦物質鉀、鎂，更可幫助安定神經、減少夜晚發生抽筋。含有較多鎂的食物，有香蕉、芝麻、堅果、葡萄乾等。\n4.調節睡眠／褪黑激素：燕麥、甜玉米、米、薑、番茄、香蕉、大麥等，另外，海帶、黃豆、南瓜子、西瓜子、杏仁果、花生、酵母、麥芽等'],triggers:['失眠']},{question:'心臟病',answer:['治療:\n1.按時服藥，維持心臟功能\n2.保持情緒平穩，不去接觸容易造成情緒起伏之活動\n3.避免使用刺激性食物，如煙、酒、咖啡因飲品等\n4.避免上呼吸道感染，遇到天氣不佳時須做好相關準備','飲食:\n1.均衡攝取食物\n2.避免攝取動物類脂肪、海鮮類、內臟及過多蛋黃\n3.部分食物有助於降低心血管疾病：菠菜、黃豆、黑芝麻、杏仁等'],triggers:['心臟病']}];
	
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



