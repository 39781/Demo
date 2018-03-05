var config = {
	"facebook":{
		"clientID":"337136916777295",
		"clientSecret":"2dac4b9a86b5caf9226b5b79eb007ec2",
		//"callbackURL":"https://desolate-beach-84758.herokuapp.com/auth/facebook/callback",
		"callbackURL":"http://localhost:3000/auth/facebook/callback",
	},
	"google":{
		"clientID":"93244704256-64rcj088ddmp9r1t9qmgkq931gl5521s.apps.googleusercontent.com",
		"clientSecret":"65FSU4LVZeNCJ7Ys8LfRK6da",
		"callbackURL":"http://localhost:3000/auth/google/callback"
		//"callbackURL":"https://desolate-beach-84758.herokuapp.com/auth/facebook/callback",
	}
}

module.exports = config;