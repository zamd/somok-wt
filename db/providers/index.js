const redis = require('./redis'),
	  loki  = require('./loki');

module.exports.active = function(){
	if (process.env.clusterMode)
		return redis;
	return loki;
}