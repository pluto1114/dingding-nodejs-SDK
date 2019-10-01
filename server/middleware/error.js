


module.exports = function () {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      console.error(err)
      ctx.body = 'server error';
      ctx.status = err.status || 500;
    }
  }
}