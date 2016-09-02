

const app = require('./index')({});

console.log('starting server...');
var port = process.env.PORT || 1443;
app.listen(port, function(){
	console.log(`started on ${port}`);
});
