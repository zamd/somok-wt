
var app = require('express')(),
	session = require('express-session'),
	bodyParser = require('body-parser');
	
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: '3232322'}));

app.use('/', require('./facebook'));

app.listen(5000, function(){
	console.log('started');
});