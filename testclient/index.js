
require('dotenv').config();

var express = require('express'),
	request = require('request'),
	cluster = require('cluster'),
	options = require('./options'),
	redis = require('redis'),
	debug = require('debug')('profile')
	app = express();



process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var counter = 0;

if (process.env.CLUSTER_MODE)
	var client = redis.createClient(options);

var profileKey = 'profile.count';

function increment(done){
	if (!process.env.CLUSTER_MODE)
		return counter++;

	client.incr(profileKey, function(err, v){
		done(parseInt(v));
	});
}

function getCounter(done){
	if (!process.env.CLUSTER_MODE)
		return done(counter);
	client.incrby(profileKey,0, function(_,v){
		done(parseInt(v));
	});
}

function resetCounter(done){
	if (!process.env.CLUSTER_MODE){
		counter = 0;
		return done(counter);
	}

	client.del(profileKey, done);
}



app.get('/',function(req,res){
	if (process.env.NO_PROFILE)
		return increment(v=> res.json({counter: v}));

	debug(`processing code:  ${req.query.code}`);
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
				{	var json;
					try{
						json = JSON.parse(profile);
					}
					catch(e){
						json = {parseError: e}
					}
					increment(v=>{});
					res.json(json);
				}
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
	getCounter(v=>res.json({counter: v}));
});

app.post('/counter/reset',function(req,res){
	resetCounter(function(){
		res.redirect('/counter');
	});
});

function startServer(){
	debug(`starting server...`);
	app.listen(8000,function(){
		debug(`started...`);
	});
}


if (cluster.isMaster && process.env.CLUSTER_MODE) {
	debug(`staring in clustered mode...`);
	var workerCount = require('os').cpus().length;
	for (var i = 0; i < workerCount; i++) {
		cluster.fork();
	}
}
else {
	startServer(); 
}







