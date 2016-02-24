var oauth2orize = require('oauth2orize');
var server = oauth2orize.createServer();
var debug = require('debug')('somok');
var utils = require('./utils');


server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {
	debug('granting...');
 	done(null,utils.uid(32));
 }));


server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, done) {
	debug('issuing token for authorization code...') 
    var token = utils.uid(256);
    done(null, token);
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
	function(req,res,next){
		//Simulate consent delay at AS
		setTimeout(next, 2000);
	},
	server.decision()
];

module.exports.issueToken = [
	function(req,res,next){
		//adapt FB to OAUTH2
		req.body.grant_type = 'authorization_code';
		req.body.code = req.query.code;
		req.body.redirect_uri = req.query.redirect_uri;
		next();
	},
	server.token()
]

