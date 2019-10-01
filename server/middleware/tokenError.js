const jwt = require('jsonwebtoken');
const config = require('../config');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      // console.log('authorization',ctx.header.authorization)
      const token = ctx.header.authorization; 
      if (token) {
        try {
          let payload = await verify(token.split(' ')[1], config.secret);
          // console.log(payload)
          ctx.user = {
            code:payload.code,
            name: payload.name,
            mobile:payload.mobile,
            role_code:payload.role_code
          };
        } catch (err) {
          console.log('token verify fail: ', err)
        }
      }
      await next();
    } catch (err) {
      console.error(err)
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          errcode: -1,
          message: '认证失败'
        };
      } else {
        err.status = 404;
        ctx.body = {
          errcode: -4,
          message: '404'
        };
      }
    }
  }
}