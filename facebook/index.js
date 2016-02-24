var router = require('express').Router();
var lib = require('../lib');

// state:FMKl70PZsXn2r9GK
// prompt:consent
// response_type:code
// redirect_uri:https://satpara.vmauth0.co.id/login/callback
// scope:public_profile
// client_id:723043064496993
router.get('/v2.2/dialog/oauth',lib.authorizationGrantDirect);
router.get('/v2.2/oauth/access_token', lib.issueToken);


router.get('/dialog/oauth',lib.authorizationGrantDirect);
router.post('/oauth/access_token', function(req,res,next){
	console.log('issuing...');
	next();
}, lib.token);

module.exports = router;