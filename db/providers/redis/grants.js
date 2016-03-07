var client = require('./client');

function Grants(){

	function key(suffix){
		return `grant.${suffix}`;
	}

	function userKey(base){
		return `${base}.user`;
	}
	function clientKey(base){
		return `${base}.client`;
	}

	function loadGrant(gkey, done){
		client.multi()
		.hgetall(gkey)
		.hgetall(userKey(gkey))
		.hgetall(clientKey(gkey))
		.exec(function(err,replies){
			if (err)
				done(err,null);
			var grant = replies[0];
			grant.user = replies[1];
			grant.client = replies[2];

			done(null, grant);
		});
	}

	function findOne(filter, done){
		if (filter.token)
		{
			client.get(key(filter.token), function(_,grantKey) {
				loadGrant(grantKey, function(err, grant){
					done(err,grant);
				});
			});
		}
		else
		{
			loadGrant(key(filter.code), function(err,grant){
				done(err,grant);
			});
		}
	}

	function insert(grant, done) {
		var grantKey = key(grant.code);
		var user = grant.user; delete grant.user;
		var	grantClient = grant.client; delete grant.client;

		client.multi()
		.set(key(grant.token), grantKey) // store foreign key...
		.hmset(grantKey,grant)
		.hmset(userKey(grantKey), user)
		.hmset(clientKey(grantKey),grantClient)
		.exec(function(err, replies){
			if (err)
				return done(err, null);
			
			grant.user = user;
			grant.client = grantClient;
			done(null, grant);
		})
	}

	return {
		update: insert,
		insert,
		findOne
	}
}

module.exports = new Grants();
