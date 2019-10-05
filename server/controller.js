const fs = require('fs');

function addMapping(router, mapping) {
  for (var url in mapping) {
    var
      delimiter = url.indexOf(' ');
    method = url.slice(0, delimiter);
    path = url.slice(delimiter + 1);
    router[method.toLowerCase()](path, mapping[url]);
    console.log(`register URL mapping: ${method} ${path}`);
  }
}

function addControllers(router, dir) {
  var files = fs.readdirSync(__dirname + '/' + dir);
  var js_files = files.filter((f) => {
    return f.endsWith('.js');
  });

  
  for (var f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(__dirname + `/${dir}/` + f);
    let name = f.replace('.js', '');
    let keys = Object.keys(mapping);
    
    if (keys.every(k => k.includes(`/v1/${name}/`)||k.includes(`/v2/${name}/`))) {
      addMapping(router, mapping);
    } else {
      throw new Error(`${f} 路径命名不合法`);
    }

  }
}
function _to(s) {
  let d = "s", e = "es";
  let len = s.length;
  if ((s[len - 1] == 'o' || s[len - 1] == 's' || s[len - 1] == 'x') || ((s[len - 2] == 'c' || s[len - 2] == 's') && (s[len - 1] == 'h'))) {
    s = s.concat(e);
  }
  else if (s[len - 1] == 'y') {
    s[len - 1] = 'i';
    s = s.concat(e);
  }
  else {
    s = s.concat(d);
  }
  return s;
}
module.exports = function (dir) {
  let
    controller_dir = dir || 'controller', // 如果不传参数，扫描目录默认为'controllers'
    router = require('koa-router')();
  addControllers(router, controller_dir);
  return router.routes();
}