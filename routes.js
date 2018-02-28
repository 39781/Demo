var express 		= require('express');
var router			= express.Router();	 
var DialogflowApp	=	require('actions-on-google').DialogflowApp;
const {OAuth2Client} = require('google-auth-library');

//client id = 93244704256-qao2ngc31bb93k1uifsn42ffo5rmsbs1.apps.googleusercontent.com
//secret = 5_m-HkHU6_V1HnXMNL7R2WJ7
//let botResponses = require('./google');		
//let botResponses = require('./facebook');		
//let botResponses = require('./slack');		
router.get('/',function(req, res){
	console.log('req received');
	res.send("req received");
	res.end();
})



function verify(token) {
	console.log('verify calling');
	return new Promise(function(resolve, reject){
	  const client = new OAuth2Client('93244704256-qao2ngc31bb93k1uifsn42ffo5rmsbs1.apps.googleusercontent.com');
	  client.verifyIdToken({
		  idToken: token,
		  audience: '93244704256-qao2ngc31bb93k1uifsn42ffo5rmsbs1.apps.googleusercontent.com',  
	  },function(e, ticket){
		   const payload = ticket.getPayload();
		  const userid = payload['sub'];
		  console.log(payload);
		  if(payload['iss']=='accounts.google.com'&&payload['aud']=='93244704256-qao2ngc31bb93k1uifsn42ffo5rmsbs1.apps.googleusercontent.com'&&payload['email_verified']){
			  resolve({name:payload['name'],userId : payload['sub'],userValid:true});
		  }else{
			  resolve({name:payload['name'],userId : payload['sub'],userValid:false});
		  }	
	  });	  
	 	  
	});
}
router.get('/test',function(req,res){
	console.log(req.query.hari);
	res.end("test called");
})
router.get('/validateUser',function(req, res){
	console.log(req.query.accessToken);
	verify(req.query.accessToken)
	.then((resp)=>{		
		console.log(resp);
		if(resp.userValid){
			res.status(400);
		}else{
			res.status(200);
		}		
		res.json(resp).end();
	})
	.catch((err)=>{
		console.log(err);		
		res.status(400);
		res.json(err).end();
	});	
});
router.post('/botHandler',function(req, res){
	//console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
	console.log('Dialogflow Request body: ' + JSON.stringify(req.body));	
	
		let requestSource = (req.body.originalRequest) ? req.body.originalRequest.source : undefined;	
		console.log(requestSource);
		let action = req.body.result.action; // https://dialogflow.com/docs/actions-and-parameters			
		let inputContexts = req.body.result.contexts; // https://dialogflow.com/docs/contexts	
		var sessionId = (req.body.sessionId)?req.body.sessionId:'';
		var resolvedQuery = req.body.result.resolvedQuery;	
		let botResponses = require('./'+requestSource);		
		if(action.toLowerCase() == 'demo'){			
			let resp = openLoginWebView();
			console.log(JSON.stringify(resp));
			res.setHeader('X-Frame-Options','ALLOW-FROM https://www.messenger.com');
			res.setHeader('X-Frame-Options','ALLOW-FROM https://www.facebook.com');
			res.setHeader('X-Frame-Options','ALLOW-FROM https://www.gmail.com');
			res.json(resp).end();
		}else{			
			if(requestSource == 'google'){
				let appHandler = new DialogflowApp({request: req, response: res});
				googleAssitant(req.body.result.parameters['demotype'], botResponses, appHandler)
				.then((resp)=>{console.log(resp);})
				.catch((err)=>{console.log(err);})
			}else{
				getResponse(req.body.result.parameters['demotype'],botResponses)
				.then((resp)=>{
					console.log(resp);
					res.json(resp).end();
				})
				.catch((err)=>{
					res.json(err).end();
				});
			}
		}
		
});
openLoginWebView = function(){
	return {
      "speech": "",
      "messages": [
        {
          "type": 4,
          "platform": "facebook",
          "payload": {
            "facebook": {
              "attachment": {
                "type": "template",
                "payload": {
                  "template_type": "button",
                  "text": "Please login",
                  "buttons": [
                    {
                      "type": "web_url",
                      "url": "https://desolate-beach-84758.herokuapp.com/login.html",
                      "title": "Login",
                      "webview_height_ratio": "tall",
                      "messenger_extensions": "true"
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "type": 0,
          "speech": ""
        }
      ]
    }
	
}
getResponse = function(demotype,botResponses){
	return new Promise(function(resolve, reject){
		switch(demotype.toLowerCase()){
			case "text response":case "simple response":resolve(botResponses.simpleResponse());break;
			case "card":case "basic card":resolve(botResponses.basicCard());break;
			case "quick replies":case "suggestionChips":resolve(botResponses.quickReplies());break;
			case "image":resolve(botResponses.image());break;
			case 'carousel':resolve(botResponses.carousel());break;
		}
	});
}

googleAssitant = function(demotype, botResponses,appHandler){
	return new Promise(function(resolve, reject){		
		switch(demotype.toLowerCase()){
			case "text response":case "simple response":resolve(botResponses.simpleResponse(appHandler));break;
			case "card":case "basic card":resolve(botResponses.basicCard(appHandler));break;
			case "quick replies":case "suggestionChips":resolve(botResponses.quickReplies(appHandler));break;
			case "image":resolve(botResponses.image(appHandler));break;
			case 'carousel':resolve(botResponses.carousel(appHandler));break;
			case 'list':resolve(botResponses.list(appHandler));break;
		}
	});
}

module.exports = router;



			
