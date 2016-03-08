module.exports = {
	url:  process.env.REDIS_URL,
	port: process.env.REDIS_PORT || 6379,
	authKey: process.env.REDIS_AUTH_KEY
}