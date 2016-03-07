var redis = require('redis');

var url  = process.env.REDIS_URL,
	authKey  = process.env.REDIS_AUTH_KEY,
	port = process.env.REDIS_PORT || 6379;

module.exports = redis.createClient(port,url, {
	auth_pass: authKey
});