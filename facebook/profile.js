var db = require('../db'),
	passport = require('passport');

module.exports.serve = [
	passport.authenticate('bearer',{session: false}),
	function(req,res,next){
		db.profiles.findOne({username: req.user.username}, function(err, profile){
			if (err)
				return res.status(500).send(err);
			res.json(profile);	
		});
	}
]