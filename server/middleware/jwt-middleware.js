const jwt = require('express-jwt');
const {
  JWT_SECRET_KEY: secret,
  JWT_ISSUER: issuer,
} = process.env;

const auth = jwt({
  secret,
  credentialsRequired: false
})

module.exports = auth;
