const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/model');

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    if (f === 'AAA.js') continue
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/model/' + f).obj;
}
module.exports.now = () => {
    let date = new Date();
    return date
}
module.exports.date = (s) => {
    let date = new Date(s);
    // date.setHours(date.getHours() + 8);
    return date
}
module.exports.sync = () => {
    db.sync();
};

module.exports.pageSize=db.pageSize