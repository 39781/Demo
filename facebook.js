var responses = {};

responses.quickReplies  = function(){	
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
responses.carousel = function(){
	resolve({
			"speech": "",
			"messages": [{
				  "type": 1,
				  "platform": "facebook",
				  "title": "card1",
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
				  "type": 1,
				  "platform": "facebook",
				  "title": "card2",
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
				  "type": 1,
				  "platform": "facebook",
				  "title": "card3",
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
}
responses.simpleResponse = function (){
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
responses.basicCard = function(){
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
		
responses.image = function(){
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