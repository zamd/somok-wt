var db = require('../db'),
	passport = require('passport');




module.exports.serve = [
	passport.authenticate('bearer',{session: false}),
	function(req,res,next){
		var profile = db.profiles.findOne({username: req.user.username});
		delete profile.meta;
		delete profile.$loki;

		res.json(profile);
	}
]