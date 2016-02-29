
var app = require('express')(),
	session = require('express-session'),
	auth = require('./auth'),
	bodyParser = require('body-parser'),
	debug = require('debug')('somok');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: '3232322'}));

app.use('/', require('./facebook'));

var server = app.listen(1443, function(){
	debug('started...');
});