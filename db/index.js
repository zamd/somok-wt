var loki = require('lokijs'),
	data = require('./data'),
	db = new loki();


const profiles = db.addCollection('profiles');
const users = db.addCollection('users');
const grants = db.addCollection('grants');

grants.ensureIndex("code");
grants.ensureIndex("token");

data.generate(users, profiles);

module.exports.users = users;
module.exports.profiles = profiles;
module.exports.grants = grants;


