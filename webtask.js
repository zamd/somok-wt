'use latest';

const nconf = require('nconf');
const Webtask = require('webtask-tools');

let server = null;
const getServer = (req, res) => {
  if (!server) {
    nconf
      .defaults({
        "REDIS_HOST": "somok.redis.cache.windows.net",
        "REDIS_AUTH_KEY": "pLtirMHAmglRvKddv2HulvOeEF4iS6OojaadOHyt1Ug=",
        "CLUSTER_MODE":  "true",
        "DEBUG": 'somok',
        "MAX_USERS": 1000,
        "REDIS_PORT": 6379,
        AUTH0_DOMAIN: req.webtaskContext.secrets.AUTH0_DOMAIN,
        AUTH0_CLIENT_ID: req.webtaskContext.secrets.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: req.webtaskContext.secrets.AUTH0_CLIENT_SECRET,
        EXTENSION_SECRET: req.webtaskContext.secrets.EXTENSION_SECRET,
        NODE_ENV: 'production',
        HOSTING_ENV: 'webtask',
        CLIENT_VERSION: process.env.CLIENT_VERSION,
        SMTP_HOST: req.webtaskContext.secrets.SMTP_HOST,
        SMTP_PORT: req.webtaskContext.secrets.SMTP_PORT,
        SMTP_SECURE: req.webtaskContext.secrets.SMTP_SECURE,
        SMTP_AUTH_USER: req.webtaskContext.secrets.SMTP_AUTH_USER,
        SMTP_AUTH_PASS: req.webtaskContext.secrets.SMTP_AUTH_PASS,
        WT_URL: req.webtaskContext.secrets.WT_URL
      });


    // Start the server.
    server = require('./index')(req.webtaskContext.storage);
  }

  return server(req, res);
};

module.exports = Webtask.fromExpress((req, res) => getServer(req, res));
