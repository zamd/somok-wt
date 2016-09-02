const debug = require('debug')('somok'),
	nconf = require('nconf');
	  
module.exports.active = function(){
	if (nconf.get("CLUSTER_MODE").toLowerCase()=='true'){
		debug(`Active Provider: Redis`);
		return require('./redis');
	}
	debug(`Active Provider: Inproc(loki)`);
	return require('./loki');
}