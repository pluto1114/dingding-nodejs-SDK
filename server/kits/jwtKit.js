const jwt = require('jsonwebtoken')
const config=require('../config')
const secret = config.secret

const expiresIn='6h'
let sign=(userToken)=>{
    return jwt.sign(userToken, secret, { expiresIn})
}

module.exports = {
    'sign':sign
  };