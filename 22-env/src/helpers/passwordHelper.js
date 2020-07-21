const Bcrypt = require('bcrypt');
const { promisify } = require('util');

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = process.env.SALT_PWD;
class PasswordHelper {
  static hashPassword(pass) {
    return hashAsync(pass, parseInt(SALT));
  }

  static comparePassword(pass, hash) {
    return compareAsync(pass, hash);
  }
}

module.exports = PasswordHelper;