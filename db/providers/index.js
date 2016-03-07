const redis = require('./redis'),
	  loki  = require('./loki');

module.exports.active = function(){
	if (process.env.CLUSTER_MODE)
		return redis;
	return loki;
}