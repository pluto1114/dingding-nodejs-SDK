const Koa = require('koa');
var http = require('http');

var fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const static = require('koa-static');

const controller = require('./server/controller');
const ukey = require('./server/middleware/ukey');
const error = require('./server/middleware/error');
const app = new Koa();
const port = 9021
const compress = require('koa-compress')


app.use(compress({ threshold: 2048 }));
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir:path.join(__dirname,'static/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));
app.use(cors({
  origin: function (ctx) {
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 1000,
  credentials: true,
  allowMethods: ['POST', 'PUT', 'PATCH', 'DELETE','OPTIONS'],
  allowHeaders: ['*','x-requested-with','x-key','Accept','Content-Type'],
}))

const staticPath = path.resolve(__dirname, 'static');
app.use(static(staticPath, {
  setHeaders: (res, path, stats) => {
    if (path.indexOf('jpg') > -1||path.indexOf('png') > -1) {
      res.setHeader('Cache-Control', ['private', 'max-age=60']);
    }
  }
}));
app.use(ukey())
app.use(async (ctx, next) => {
  let d=new Date()
  console.log(`Process ${d.toString()} ${ctx.request.method} ${ctx.request.url}`);
  await next();
});
app.use(controller());
app.use(error())

http.createServer(app.callback()).listen(port);

console.log(`app started at port ${port}...`);

process.on('uncaughtException', function(err) {
  console.log(err)
})

String.prototype.ellipsis=function(len){
  return this.length>len?(this.substring(0,len)+'...'):this
}

function dateFormat(date, fmt) {
  if (null == date || undefined == date) return '';
  var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Date.prototype.toJSON = function () { return dateFormat(this,'yyyy-MM-dd hh:mm:ss')}
Date.prototype.toString = function () { return dateFormat(this,'yyyy-MM-dd hh:mm:ss')}
Date.prototype.toMM = function () { return dateFormat(this,'yyyyMMddhhmmss')}