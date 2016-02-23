var oauth2orize = require('oauth2orize');
var server = oauth2orize.createServer();
var debug = require('debug')('somok');
var utils = require('./utils');


server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
	debug('granting...');
 	done(null,utils.uid(32));
 }));

server.serializeClient(function(client, done){
	done(null, client.id);
});

server.deserializeClient(function(id, done) {
	done(null, {clientID: id});
});


module.exports.authorizationGrantDirect = [
	server.authorization(function(clientID, redirectURI, done)
	{
		var client = {id: clientID};
		//TODO: validation... 
		done(null, client, redirectURI);
	}),
	function(req,res,next){
		//HACK: 
		req.query["transaction_id"] = req.oauth2.transactionID;
		next();
	},
	server.decision()
];



