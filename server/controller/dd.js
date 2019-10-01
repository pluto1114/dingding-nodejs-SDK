const model = require('../model')
const r = require('../dto/resp')



var fetchCorpid = async (ctx, next) => {
  let ddConfig = await model.DdConfig.getBy({ ukey: ctx.ukey })
  ctx.body = r().setItemMap({ corpid: ddConfig.corpid })
};
var fetchUserinfo = async (ctx, next) => {
  let ukey = ctx.ukey
  let code = ctx.query.code
  console.log('code', code)
  let options = {
    url: 'https://oapi.dingtalk.com/user/getuserinfo',
    params: { code },
  }
  let info = await model.DdConfig.callApi(ctx.ukey, options)
  console.log('info', info)

  let user = await model.User.getBy({ userid: info.userid })

  if (user) {
    let lasttime = user.accesstime
    user.hot = user.hot + 1
    user.accesstime = new Date
    await user.save()
    user.accesstime = lasttime
  } else {
    user= await model.User.createUser(info,ukey)
  }

  ctx.body = r().setItemMap({ user })
};
var fetchJsconfig = async (ctx, next) => {
  let jsconfig = await model.DdConfig.getJsconfig(ctx.ukey)
  console.log('info', jsconfig)

  ctx.body = r().setItemMap({ jsconfig })
};



module.exports = {
  'GET /v1/dd/corpid': fetchCorpid,
  'GET /v1/dd/userinfo': fetchUserinfo,
  'GET /v1/dd/jsconfig': fetchJsconfig,

};