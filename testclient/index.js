var express = require('express'),
	request = require('request'),
	app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var counter = 0;

app.get('/',function(req,res){
	//console.log(`processing token:     ${req.query.code}`);
	request({
		uri: "https://satpara.showtps.com/oauth/token",
		method: "POST",
		json: {
			code: req.query.code,
			client_id:"tPKsiils4Lk5osvIe6Xbi78CFaAe5cbH",
			client_secret:"nvymD4ll1e28VmZ95J0iAoDbDhZRf6P8it4bXGL_4WQT_KJwizSd7ojjoPid7GV5",
			redirect_uri:"http://zamd.southeastasia.cloudapp.azure.com",
			grant_type: "authorization_code"
		}
	},function(err,response,body) {
		if (!err){
			request(
			{
				uri: 'https://satpara.showtps.com/userinfo',
				headers: {
					"Authorization": `Bearer ${body.access_token}`
				}
			}, function(err,resp, profile){
				if (!err)
					res.json(JSON.parse(profile));
				else{
					res.end(err);
				}
			});
		}
		else {
			res.end(err);
		}
	});
});

app.get('/counter',function(req,res){
	res.status(200).send(`counter =${counter}`);
});

app.post('/counter/reset',function(req,res){
	counter=0;
	res.redirect('/counter');
});


app.listen(8000,function(){
	console.log('started....');
});

