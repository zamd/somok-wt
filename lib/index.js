console.log('GETTING OAUTH2AUTHORIZE SERVER....');
var oauth2orize = require('oauth2orize');
console.log('GOT passport....');
var passport = require('passport');
console.log('GOT DEBUG....');
var debug = require('debug')('somok');
console.log('GOT UTILS....');
var utils = require('../utils');
console.log('GOT DB....');

var db = require('../db');

console.log('createServer ROUTER....');
const server = oauth2orize.createServer();

server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
	var code = utils.uid(32);
	console.log(`granting authorization code "${code}" to "${client.id}"`);
	db.grants.insert(
	{
		code: code,
		client: client, 
		redirectURI: redirectURI, 
		user: user, 
		params: ares
	}, function(err, grant){
		if (err)
			return done(err, null);
		done(null,grant.code);
	});
}));
	

server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, done) {
	console.log(`Issuing token for authorization code "${code}" to "${client.id}"`);
	//TODO: validation... 
	db.grants.findOne({code: code}, function(err, grant){
		if (err){
			console.log(`no grant found for code "${code}"`)
			done(err, null)
		}

		var token = utils.uid(256);
		grant.token = token;
		db.grants.update(grant, function(err, updatedGrant){
			if (err)
				return done(err, null);
			done(null, updatedGrant.token);
		});
	});
}));

server.serializeClient(function(client, done){
	//TODO: implementation serialization...
	console.log(`serializing client "${client.id}"...`);
	done(null, client.id);
});

server.deserializeClient(function(id, done) {
	console.log(`deserializing client "${id}"...`);
	done(null, {id: id});
});

module.exports.authorizationGrantDirect = [
	passport.authenticate('autoAuth',{session:false}), //RO authentication...
	server.authorization(function(clientID, redirectURI,done)
	{
		var client = {
			id: clientID,
			redirectURI: redirectURI
		};
		//TODO: validation... 
		done(null, client, redirectURI);
	}),
	function(req,res,next){
		//Simulate authorization dailaog approval: 
		req.query["transaction_id"] = req.oauth2.transactionID;

		next();
	},
	function(req,res,next){
		console.log(`waiting for RO consent...`);
		//Simulate consent delay at AS
		setTimeout(next, 1);
	},
	server.decision(function(req, done){
		console.log(`processing RO consent approval...`);
		//Extract any extra params from req *here* to save in authorization transaction... 
		var params = req.oauth2.req;
		done(null,params);
	})
];

module.exports.issueToken = [
	function(req,res,next){
		//adapt FB *GET* to OAUTH2
		req.body.grant_type = 'authorization_code';
		req.body.code = req.query.code;
		req.body.redirect_uri = req.query.redirect_uri;
		next();
	},
	server.token()
];

module.exports.token = 	[
	passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
	function(req,res,next){
		console.log(`client ${req.user.id} authenticated...`);
		next();
	},
	server.token()
];