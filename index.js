
var app = require('express')(),
	session = require('express-session'),
	auth = require('./auth'),
	bodyParser = require('body-parser'),
	debug = require('debug')('somok');

module.exports = (storageContext) => {
	app.use((req,res,next)=>{
		console.log('RUNNING request....');
		next();
	});
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session({
		secret: '3232322',
		resave: true,
		saveUninitialized: false
	}));

	app.use('/', require('./facebook'));
	return app;
	
}

/*

http://localhost:1443/dialog/oauth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=openid%20profile&client_id=232322232232

*/