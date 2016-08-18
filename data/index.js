const fake = require('./fake'),
	  debug = require('debug')('somok'),
	  db = require('../db');

module.exports.setup = function(done){
	var maxUsers = process.env.MAX_USERS || 1000;
	var data = fake.generate(maxUsers);
	debug(`importing ${data.users.length} users & ${data.profiles.length} profiles...`);
	db.users.import(data.users, function(err,uc){
		db.profiles.import(data.profiles, function(err,pc){
			debug(`imported ${uc} users & ${pc} profiles...`);
			if (data.users.length===uc &&
				data.profiles.length===pc)
				return done();
			done(`partial import error`);
		});
	});
	data = null;
}