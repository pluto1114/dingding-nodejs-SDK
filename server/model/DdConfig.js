
const table='dd_config'
const obj=require('../model-base/abase')(table)
const axios = require('axios')
const config = require('../config')
const cryptoKit=require('../kits/cryptoKit')

var _merge = require('lodash/merge')
obj.gettoken = async (ukey) => {
    let ddconfig = await obj.getBy({ ukey})
    // console.log('ddconfig',ddconfig)
    let date=new Date()
    date.setHours(date.getHours()-1)
    if(ddconfig.token_begin_time>date){
        console.log('token used')
        return ddconfig.access_token
    }
    var options = {
        url: 'https://oapi.dingtalk.com/gettoken',
        params: {
            appkey: ddconfig.corpid,
            appsecret: ddconfig.corpsecret,
        }
    };
    if(ddconfig.corpsecret){
        // console.warn("corpid")
        options.params={
            appkey: ddconfig.corpid,
            appsecret: ddconfig.corpsecret,
        }
    }else{
        // console.warn("appkey")
        options.params={
            appkey: ddconfig.appkey,
            appsecret: ddconfig.appsecret,
        }
    }
    let {data} = await axios(options)
    await ddconfig.update({access_token: data.access_token,token_begin_time:new Date()})
    return data.access_token
}
obj._getticket = async (ukey,access_token) => {
    let ddconfig = await obj.getBy({ ukey})
    let date=new Date()
    date.setHours(date.getHours()-1)
    if(ddconfig.ticket_begin_time>date){
        console.log('ticket used')
        return ddconfig.ticket
    }
    var options = {
        url: 'https://oapi.dingtalk.com/get_jsapi_ticket',
        params: {access_token}
    };
    
    let {data} = await axios(options)
    console.log(data)
    await ddconfig.update({ticket: data.ticket,ticket_begin_time:new Date()})
    return data.ticket
}
function sign(ticket,nonceStr,timeStamp,url){
    let plain = "jsapi_ticket=" + ticket + "&noncestr=" + nonceStr + "&timestamp=" + timeStamp
    + "&url=" + url;
    console.log('plain',plain)
    return cryptoKit.toSha1(plain)
}

obj.getJsconfig=async (ukey)=>{
    let access_token= await obj.gettoken(ukey)
    let ticket=await obj._getticket(ukey,access_token)
    let ddconfig = await obj.getBy({ ukey})
    let timeStamp=new Date().getTime()
    let nonceStr=config.secret
    return {
        agentId:ddconfig.agentid,
        corpId:ddconfig.corpid,
        signature:sign(ticket,nonceStr,timeStamp,ddconfig.url),
        timeStamp,
        nonceStr
    }
}

obj.callApi=async (ukey,options)=>{
    let access_token= await obj.gettoken(ukey)
    console.log('access_token',access_token)
    let DEFAULTS = {
        url: 'https://oapi.dingtalk.com/',
        params: {access_token}
    };
    options=_merge(DEFAULTS,options)
    console.log('options',options)
    let {data} = await axios(options)
    console.log(data)
    return data
}

exports.obj = obj