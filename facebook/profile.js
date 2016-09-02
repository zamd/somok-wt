var db = require('../db'),
	debug = require('debug')('somok'),
	passport = require('passport');

module.exports.serve = [
	passport.authenticate('bearer',{session: false}),
	function(req,res,next){
		console.log(`profile requested for ${req.user.username}`);
		db.profiles.findOne({username: req.user.username}, function(err, profile){
			if (err)
				return res.status(500).send(err);
			console.log(`returning profile for ${profile.username}`);
			res.json(profile);	
		});
	}
]