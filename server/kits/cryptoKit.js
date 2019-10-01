var crypto = require('crypto');

var toSha1 = str=>{
  return crypto.createHash('sha1').update(str).digest('hex')
}

module.exports = {
  toSha1
};