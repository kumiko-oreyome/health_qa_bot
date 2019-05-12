var turn_user = true;
var app = new Vue({
  el: '#message_box',
  data: {chat_messages:[{id:0,text:'Hello!',isUserMessage:false}],
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
		sendMessage(true,inp.value);
		inp.value = '';
	}
}
  
});

function sendMessage(change_turn,_text){
	app.chat_messages.push({id:app.chat_messages.length,text:_text,isUserMessage:turn_user});
	if(change_turn){
		turn_user=!turn_user;
	}
 } 
  


function generate_responses(question){
	var corpus = [
		{question:'糖尿病吃什麼',answer:'糖尿病吃XXX',triggers:['糖尿病','吃']},
		{question:'高血壓能喝咖啡嗎',answer:'高血壓可不可以喝咖啡的回答',triggers:['高血壓','咖啡']},
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
		response_obj =  corpus[Math.floor(Math.random() * corpus.length)];
	}
	
	return response_obj;
}



$(function(){
	$('#clear').on('click',function(){
		turn_user = true;
		app.chat_messages=[{id:0,text:'Hello!',isUserMessage:false}];
		});
}
);


