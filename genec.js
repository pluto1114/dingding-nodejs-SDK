var _ = require('lodash');

const path = require('path')
const fs = require('fs')

const controllers = process.argv.slice(2)
const dir = 'server'
if (controllers.length === 0) {
    throw new Error('No controller specified\nUsage: node generate_model controller1 controller2 controller3\n')
}


const modelStrArr = []
for (let controller of controllers) {
    let admin=controller.indexOf("-admin")>0
    let prefix=admin?'/api':'/v1'
    let name = admin? controller.substring(0, controller.indexOf("-admin") + 1) : controller

    modelStrArr.push({
        name: name,
        admin:admin,
        tpl: `
const model = require('../model');
const service = require('../service');
const r=require('../dto/resp');
const Op = require('sequelize').Op;
var fetch${_.capitalize(name)} = async (ctx, next) => {
    let items = [];
    ctx.body=r().setItems(items);
};

module.exports = {
    'GET ${prefix}/${name}': fetch${_.capitalize(name)},
};`
    })
}


for (let modelObj of modelStrArr) {
    console.log(modelObj)
    let filePath = dir + '/' + (modelObj.admin ? 'controller-admin' : 'controller')
    let file = path.resolve(__dirname, filePath) + '/' + _.camelCase(modelObj.name) + '.js'
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, modelObj.tpl)
    }
}
console.log('\n\nProcess completed successfully.')

