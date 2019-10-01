


module.exports = function () {
  return async function (ctx, next) {
    try {
      const keyArr=['nmlt','pluto1114','rcpbe-cs']
      const ukey = ctx.header['x-key']; 
      console.log('ukey',ukey)
      if (ukey&&keyArr.findIndex(k=>k==ukey)>-1) {
        ctx.ukey=ukey
        await next();
      }else if(ctx.is('multipart')){
        await next();
      }else{
        await next();
      }
    } catch (err) {
      console.error(err)
      
    }
  }
}