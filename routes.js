var DialogflowApp	=	require('actions-on-google').DialogflowApp;
var request			=	require('request');
var path 			=	require('path');	
var url				=	require('url');
module.exports = function(router, passport){
	router.get('/', function(req, res) {
		res.sendFile(path.resolve('./public/login.html')); // load the index.ejs file
	});
	router.get('/loginFailed', function(req, res) {
		console.log('login failed');
		res.sendFile(path.resolve('./public/login.html')); // load the index.ejs file
	});
	router.get('/sendResponseToBot',isLoggedIn, function(req, res){						
		sendMessageToBot(req.query['src'],req.user);
		console.log(req.user[req.query['src']].redirectURI, req.user[req.query['src']]);
		res.redirect(req.user[req.query['src']].redirectURI);
	})
	router.get('/auth/facebook',function(req, res){		
		 passport.authenticate('facebook', { 
			  scope : ['public_profile', 'email'],state:"appId="+req.query.appId+'&redirectURI='+req.query.redirectURI
			  
		})(req, res);
	});

	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/sendResponseToBot?src=facebook',
			failureRedirect : '/'
	}));	
	router.get('/auth/google/callback',
		passport.authenticate('google', {			
			successRedirect : '/sendResponseToBot?src=google',
			failureRedirect : '/'			
	}));	
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/auth/google',function(req, res){ 
		passport.authenticate('google', { scope : ['profile','email'],state:"appId="+req.query.appId+'&redirectURI='+req.query.redirectURI})(req, res);
	});
	

	router.get('/test',function(req,res){
		//console.log(req.query.hari);
		res.end("test called");
	})

	router.post('/botHandler',function(req, res){
		console.log('Dialogflow Request headers: ' + JSON.stringify(req.body));
						
			let requestSource = (req.body.originalRequest) ? req.body.originalRequest.source : undefined;	
			console.log(requestSource);
			let action = req.body.result.action; // https://dialogflow.com/docs/actions-and-parameters			
			let inputContexts = req.body.result.contexts; // https://dialogflow.com/docs/contexts	
			var sessionId = (req.body.sessionId)?req.body.sessionId:'';
			var resolvedQuery = req.body.result.resolvedQuery;	
			let botResponses = require('./'+requestSource);		
			let senderId = (req.body.originalRequest)?req.body.originalRequest.data.sender.id:undefined;			
			if(action.toLowerCase() == 'demo'){			
				let resp = openLoginWebView(senderId);
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

}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	console.log(req.isAuthenticated);
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

function sendMessageToBot(src, user){
	var queryParams = {};
	/*var messageToSend = {			
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
		};*/
		var messageToSend = {
			recipient: {
			  id: user[src].recipientId,
			},
			message: {
				"attachment":{
					"type":"template",
					"payload":{
					  "template_type":"generic",
					  "elements": [{
						"title":'login sucess',
						"image_url": "https://raw.githubusercontent.com/39781/incidentMG/master/images/incidentMG.jpg",
						"subtitle": "Welcome to Demobot, Mr/Mrs/Miss."+user[src].name				
					  }]
					}
				}
			},
		  }
		
	const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;	
	const query = Object.assign({access_token: PAGE_ACCESS_TOKEN}, queryParams);	
	request({
    uri: `https://graph.facebook.com/v2.6/me/messages`,
    qs: query,
    method: 'POST',
    json: messageToSend,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // Message has been successfully received by Facebook.
      console.log(JSON.stringify(body));
    } else {		
      // Message has not been successfully received by Facebook.
      console.error(
        `Failed calling Messenger API endpoint`,
        response.statusCode,
        response.statusMessage,
        body.error,
        queryParams
      );      
    }
  });
}

openLoginWebView = function(senderId){
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
                      "type": "account_link",
                      "url": "https://desolate-beach-84758.herokuapp.com/login.html"+((senderId)?"?rid="+senderId:'')
                      //"title": "Login",
                      //"webview_height_ratio": "tall",
                      //"messenger_extensions": "true"
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





			
