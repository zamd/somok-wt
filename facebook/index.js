var router = require('express').Router(),
	lib = require('../lib'),
	passport = require('passport'),
	profile = require('./profile');

router.use(passport.initialize());

// state:FMKl70PZsXn2r9GK
// prompt:consent
// response_type:code
// redirect_uri:https://satpara.vmauth0.co.id/login/callback
// scope:public_profile
// client_id:723043064496993

//auth0 uses /v2.2/ endpoints 
router.get('/v2.2/dialog/oauth',lib.authorizationGrantDirect); 
router.get('/dialog/oauth',lib.authorizationGrantDirect);

router.get('/v2.2/oauth/access_token', lib.issueToken);
router.post('/oauth/access_token', lib.token);

router.get('/v2.0/me', profile.serve);
router.get('/v2.5/me', profile.serve);

module.exports = router;