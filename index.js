var app = require('express')(),
	session = require('express-session'),
	data = require('./data'),
	auth = require('./auth'),
	bodyParser = require('body-parser'),
	debug = require('debug')('somok');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: '3232322'}));

app.use('/', require('./facebook'));

function startServer(){
	var port = process.env.PORT || 1443;
	app.listen(port, function(){
		debug(`started on ${port}`);
	});
}

debug('setting up seed data...');
data.setup(function(err){
	if (err){
		console.log(err);
		return;
	}
	debug('starting server...');
	startServer();
});