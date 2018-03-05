
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var fs = require('fs');
// load up the user model
var User       = require('./../users/users.json');

// load the auth variables
var configAuth = require('./configAuth');
console.log(User);

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		if(User.facebook[id]){
			done(null,User.facebook[id]);	
		}		
        /*User.findById(id, function(err, user) {
            done(err, user);
        });*/
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebook.clientID,
        clientSecret    : configAuth.facebook.clientSecret,
        callbackURL     : configAuth.facebook.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
		console.log(profile);
        // asynchronous
		if(profile){	
			process.nextTick(function() {
				if(!User.facebook[profile.id]){				
					User.facebook[profile.id] = {
						id:profile.id,
						token:token,
						name : profile.displayName
					}
					console.log(User);
					fs.writeFile('users/users.json',JSON.stringify(User),function(err){
						if(err){
							console.log(err);
						}else{
							console.log('User added');						
						}
					});				
				}      
				return done(null, User.facebook[profile.Id]);			
			});
		}else{
			return done(err, {});        
		}
    }));

	
	passport.use(new GoogleStrategy({
        clientID        : configAuth.google.clientID,
        clientSecret    : configAuth.google.clientSecret,
        callbackURL     : configAuth.google.callbackURL,		
    },
    function(token, refreshToken, profile, done) {
		console.log(profile);
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google   
		if(profile){	
			process.nextTick(function() {
			   if(!User.google[profile.id]){			
					User.google[profile.id] = {
						id:profile.id,
						token:token,
						name : profile.displayName
					}
					console.log(User);
					fs.writeFile('users/users.json',JSON.stringify(User),function(err,data){
						if(err){
							console.log(err);
						}else{
							console.log('User added');
						}
					});
				} 
				return done(null, User.google[profile.Id]);        
			})
		}else{
			return done(err, {});        
		}
    }));
};