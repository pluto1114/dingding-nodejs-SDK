const defaultConfig = './config-default.js';
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = 'e:/config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        // if (fs.statSync(overrideConfig).isFile()) {
        //     console.log(`Load ${overrideConfig}...`);
        //     config = Object.assign(config, require(overrideConfig));
        // }
    } catch (err) {
        console.log(err)
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;