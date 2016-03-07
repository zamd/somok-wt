var router = require('express').Router(),
	lib = require('../lib'),
	passport = require('passport'),
	profile = require('./profile');

router.use(passport.initialize());

//auth0 uses /v2.2/ endpoints 
router.get('/v2.2/dialog/oauth',lib.authorizationGrantDirect); 
router.get('/dialog/oauth',lib.authorizationGrantDirect);

router.get('/v2.2/oauth/access_token', lib.issueToken);
router.post('/oauth/access_token', lib.token);

router.get('/v2.0/me', profile.serve);
router.get('/v2.5/me', profile.serve);

module.exports = router;