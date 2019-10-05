
const model = require('../model');
const service = require('../service');
const r = require('../dto/resp');
const Op = require('sequelize').Op;
class Order {
    async index(ctx) {
        let { userid, orderStatus } = ctx.query;
        const orders = await model.order.findBy({ userid, orderStatus})
        ctx.body = r().setItems(orders);
    }
    async show(ctx) {
        let { id } = ctx.params;
        const order = await model.order.getBy({ orderId: id })
        ctx.body = r().setItemMap({ order })
    }
    async count(ctx) {
        let { userid } = ctx.query;
        let unfinCount = await model.order.countBy({ orderStatus: {[Op.ne]:'orderFinish'}, userid })
        let finCount = await model.order.countBy({ orderStatus: 'orderFinish', userid })
        ctx.body = r().setItemMap({ unfinCount, finCount });
    }
    async save(ctx) {
        let body = ctx.request.body;
        let order = await model.order.create({
            orderId: new Date().getTime(),
            orderStatus: 'orderStart',
            createtime: new Date(),
            ...body
        })
        ctx.body = r().setItemMap({ order })
    }
    async finish(ctx) {
        let body = ctx.request.body;
        const order=await model.order.getBy({orderId:body.orderId})
        order.orderStatus='orderFinish'
        await order.save()
        ctx.body = r()
    }
}
let order = new Order()
module.exports = {
    'GET /v1/order/index': order.index,
    'GET /v1/order/count': order.count,
    'GET /v1/order/:id': order.show,
    'POST /v1/order/save': order.save,
    'PUT /v1/order/finish': order.finish,

};