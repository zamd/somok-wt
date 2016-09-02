const nconf = require('nconf');
module.exports = {
	host: nconf.get("REDIS_HOST"),
	port: nconf.get("REDIS_PORT"),
	auth_pass: nconf.get("REDIS_AUTH_KEY")
}