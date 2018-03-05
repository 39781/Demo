var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var port = process.env.PORT || 3000;
var passport =	require('passport');

require('./auth/passport')(passport);
app.use(session({ secret: 'this-is-a-secret-token',resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));
//global.recentInput = "";
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app,passport);

global.incidentParams = {};
var server = app.listen(port,function(){
	console.log("Application started listening port "+port);	
});