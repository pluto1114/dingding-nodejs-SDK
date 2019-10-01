
const model = require('../model');
const service = require('../service');
const r=require('../dto/resp');
const Op = require('sequelize').Op;
var fetchApple = async (ctx, next) => {
    let items = [];
    ctx.body=r().setItems(items);
};

module.exports = {
    'GET /v1/apple': fetchApple,
};