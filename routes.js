var express 		= require('express');
var router			= express.Router();	 
var DialogflowApp	=	require('actions-on-google').DialogflowApp;

var serviceNowApi 	=	require('./serviceNow');
var config 			= 	require('./config');
var botResponses	=	{};
var botResponses = require('./facebook.js');
//var botResponses = require('./slack.js');
router.get('/',function(req, res){
	console.log('req received');
	res.send("req received");
	res.end();
})


router.post('/botHandler',function(req, res){
	//console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
	console.log('Dialogflow Request body: ' + JSON.stringify(req.body));	
	
	let requestSource = (req.body.originalRequest) ? req.body.originalRequest.source : undefined;	
	console.log(requestSource);
	let action = req.body.result.action; // https://dialogflow.com/docs/actions-and-parameters			
	let inputContexts = req.body.result.contexts; // https://dialogflow.com/docs/contexts	
	var sessionId = (req.body.sessionId)?req.body.sessionId:'';
	var resolvedQuery = req.body.result.resolvedQuery;	
	botResponses = require('./'+requestSource);		
	
});



module.exports = router;



			