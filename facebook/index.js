var router = require('express').Router();
console.log('GOT ROUTER....');
var	lib = require('../lib');
console.log('GOT LIB....');
var passport = require('passport');
	console.log('GOT passport....');

var profile = require('./profile');

	console.log('GOT PROFILE....');
router.use(passport.initialize());

	console.log('INIT PASSPORt ..');

//auth0 uses /v2.2/ endpoints 
router.get('/v2.2/dialog/oauth',lib.authorizationGrantDirect); 
router.get('/dialog/oauth',lib.authorizationGrantDirect);

router.get('/v2.2/oauth/access_token', lib.issueToken);
router.post('/oauth/access_token', lib.token);

router.get('/v2.0/me', profile.serve);
router.get('/v2.5/me', profile.serve);

console.log('returning router....');

module.exports = router;