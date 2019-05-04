const bcrypt = require('bcrypt');

module.exports = {
  hash: function(password) {
    return bcrypt.hash(password, 10)
      .then(hash => hash)
      .catch(err => {
        throw new Error(err);
      });
  },
  compare: function(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword)
      .then(res => res === true)
      .catch(err => {
        throw new Error(err);
      });
  },
}
