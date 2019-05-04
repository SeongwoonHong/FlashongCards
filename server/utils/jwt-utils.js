const jwt = require('jsonwebtoken');

const {
  JWT_SECRET_KEY: secret,
  JWT_ISSUER: issuer,
} = process.env;

module.exports = {
  createToken: function(payload, subject = '', expiresIn = '7d') {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, {
        expiresIn,
        issuer,
        subject
      }, (err, token) => {
        if (err) reject(err)
        resolve(token);
      });
    })
  },
  verify: function(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err)
        resolve(decoded);
      })
    })
  },
}
