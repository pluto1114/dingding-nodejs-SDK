var _ = require('lodash');
const SeqAuto = require('sequelize-auto')
const path = require('path')
const fs = require('fs')
const config = require('./server/config');
const tables = process.argv.slice(2)
const dir = 'server'
if (tables.length === 0) {
    throw new Error('No table specified\nUsage: node generate_model table1 table2 table3\n')
}

const auto = new SeqAuto(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    directory: path.resolve(__dirname, `${dir}/model-base`),
    additional: {
        timestamps: false
    },
    tables: tables
})
const modelStrArr = []
for (let table of tables) {
    let name = table.includes("t_") ? table.substring(table.indexOf("t_")+1) : table

    console.log(name)
    modelStrArr.push({
        name: name,
        tpl: `
const table='${table}'
const obj=require('../model-base/abase')(table)


exports.obj = obj`
    })
}

auto.run(err => {
    if (err) {
        throw err
    }
    for (let modelObj of modelStrArr) {
        console.log(modelObj)
        let file = path.resolve(__dirname, `${dir}/model`) + '/' + _.camelCase(modelObj.name) + '.js'
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, modelObj.tpl)
        }
    }
    console.log('\n\nProcess completed successfully.')
    console.log('You may need to add these Foreign Keys mannually:\n', auto.foreignKeys)
})