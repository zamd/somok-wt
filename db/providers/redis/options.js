module.exports = {
	host:  process.env.REDIS_HOST,
	port: process.env.REDIS_PORT || 6379,
	auth_pass: process.env.REDIS_AUTH_KEY
}