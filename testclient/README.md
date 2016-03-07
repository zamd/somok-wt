##Test Client

Used by `RO/loadimpact.com` and does the final leg of OAuth by exchanging the `authorization code` with an `access token` and pulling profile information from auth0.

Replace `client_id`, `client_secret` & `redirect_uri` in *index.js*

`client_id:"t5IZiqpHLIrvwMzhB0VD86BneJ1rVA9K",
client_secret:"",
redirect_uri:"http://requestb.in/ouginjou",
`

`nginx.conf` applied by `setup.sh` already has binding for this test-client

`nave use stable`

`npm install`

`node index.js`

