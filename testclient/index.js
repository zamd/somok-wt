var express = require('express'),
	request = require('request'),
	app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//https://satpara.showtps.com/authorize?client_id=t5IZiqpHLIrvwMzhB0VD86BneJ1rVA9K&response_type=code&connection=facebook&prompt=consent&redirect_uri=http://requestb.in/ouginjou

var counter = 0;

app.get('/',function(req,res){
	request({
		uri: "https://satpara.showtps.com/oauth/token", 
		method: "POST",
		json: {
			code: req.query.code,
			client_id:"t5IZiqpHLIrvwMzhB0VD86BneJ1rVA9K",
			client_secret:"",
			redirect_uri:"http://requestb.in/ouginjou",
			grant_type: "authorization_code"
		}
	},function(err,response,body){
		if (!err){
			counter++;
			res.json(body);
		}
		res.end(err);
	});

});

app.get('/counter',function(req,res){
	res.status(200).send(`counter =${counter}`);
});

app.post('/counter/reset',function(req,res){
	counter=0;
	res.redirect('/counter');
});


app.listen(5000,function(){
	console.log('started....');
});

