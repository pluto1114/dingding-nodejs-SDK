const model = require('../model')
const r = require('../dto/resp')

class Dd{
  async getCorpid(ctx){
    let ddConfig = await model.DdConfig.getBy({ ukey: ctx.ukey })
    ctx.body = r().setItemMap({ corpid: ddConfig.corpid })
  };
  async getUserinfo(ctx){
    let ukey = ctx.ukey
    let code = ctx.query.code
    console.log('code', code)
    let options = {
      url: 'https://oapi.dingtalk.com/user/getuserinfo',
      params: { code },
    }
    let info = await model.DdConfig.callApi(ctx.ukey, options)
    console.log('info', info)
  
    let user = await model.user.getBy({ userid: info.userid })
  
    if (user) {
      let lasttime = user.accesstime
      user.hot = user.hot + 1
      user.accesstime = new Date
      await user.save()
      user.accesstime = lasttime
    } else {
      user= await model.user.createUser(info.userid,ukey)
    }
  
    ctx.body = r().setItemMap({ user })
  };
  async getJsconfig(ctx){
    let jsconfig = await model.DdConfig.getJsconfig(ctx.ukey)
    console.log('info', jsconfig)
  
    ctx.body = r().setItemMap({ jsconfig })
  };
  
}

let dd=new Dd();
module.exports = {
  'GET /v1/dd/corpid': dd.getCorpid,
  'GET /v1/dd/userinfo': dd.getUserinfo,
  'GET /v1/dd/jsconfig': dd.getJsconfig,

};