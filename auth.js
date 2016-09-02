var passport = require('passport'),
	CustomStrategy = require('passport-custom'),
	BearerStartegy = require('passport-http-bearer'),
	BasicStrategy = require('passport-http').BasicStrategy,
	ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
	debug = require('debug')('somok'),
	db = require('./db'),
	nconf = require('nconf'),
	random = require('./utils').random;

passport.use(new BearerStartegy(function(token, cb){
	db.grants.findOne({token: token}, function(err, grant) {
		if (err)
			return cb(err,null)
		cb(null, grant.user);	
	});
}));

passport.use("autoAuth", new CustomStrategy(function(req,done){
	var id = random(1, parseInt(nconf.get("MAX_USERS")));
	console.log(`authenticating: getting user:id "${id}"...`);
	
	db.users.get(id, function(err,user) {
		if (err)
			return cb(err,null);
		done(null,{username: user.username, id: user.id});
	});

}));


passport.use(new BasicStrategy(
  function(username, password, done) {
   	//TODO: authenticate...
    return done(null, {id: username});
  })
);

passport.use(new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
  	//TODO: authenticate...
    return done(null, {id: clientId});
    })
);



