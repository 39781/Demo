var responses = {};
responses.getResponse = function(demotype){
	return new Promise(function(resolve, reject){
		switch(demotype.toLowerCase()){
			case "text response":case "simple response":resolve(simpleResponse());break;
			case "card":case "basic card":resolve(basicCard());break;
			case "quick replies":case "suggestionChips":resolve(quickReplies());break;
			case "image":resolve(image());break;
		}
	});
}
quickReplies  = function(){	
	return new Promise(function(resolve, reject){
		resolve( {			
			"speech": "",		
			"messages": [{
				  "type": 2,
				  "platform": "facebook",
				  "title": "Please select option from quick replies",
				  "replies": ["Demo1","Demo2"]
			},
			{
			  "type": 0,
			  "speech": ""
			}
			]
		});	
	});
	  //console.log('hari');
	//return true;
}
simpleResponse = function (){
	return new Promise(function(resolve, reject){
		resolve({			
			"speech": "",								
			"messages": [{
			  "type": 0,
			  "platform": "facebook",
			  "speech": "Simple text Reponse demo"
			},	
			{
			  "type": 0,
			  "speech": ""
			}]
		});	
	});
}
basicCard = function(){
	return new Promise(function(resolve, reject){				
		resolve({
			"speech": "",
			"messages": [{
				  "type": 1,
				  "platform": "facebook",
				  "title": "basic card",
				  "subtitle": "demo",
				  "imageUrl": "https://raw.githubusercontent.com/39781/incidentMG/master/images/incidentMG.jpg",
				  "buttons": [
					{
					  "text": "Demo1",
					  "postback": "Demo1"
					},
					{
					  "text": "Demo2",
					  "postback": "Demo2"
					}
				  ]
				},				 
				{
					"type": 0,
					"speech": ""
				}]
		});
	});
}
		
image = function(txtMsg, callBackIntent, params){
	return new Promise(function(resolve, reject){	
		resolve({			
				"speech": "",					
				"messages": [{
				  "type": 3,
				  "platform": "facebook",
				  "imageUrl": "https://raw.githubusercontent.com/39781/incidentMG/master/images/incidentMG.jpg"
				},		
				{
				  "type": 0,
				  "speech": ""
				}]
			});		
	});
}


responses.generateQuickReplyResponseOld = function(responseContent, responseViewModel){
}
module.exports = responses;