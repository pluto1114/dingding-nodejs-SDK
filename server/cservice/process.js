const model = require('../model');
const Op = require('sequelize').Op;

class Process {
    async createTask({ ukey, orderId }) {
        let order = await model.order.getBy({ orderId });
        let ddConfig = await model.DdConfig.getBy({ ukey });
        let url = `${ddConfig.url}`;
        let createInstanceOptions = {
            url: 'https://oapi.dingtalk.com/topapi/process/workrecord/create',
            data: {
                "request": {
                    "title": `demo未处理工单(${order.orderName})`,
                    "process_code": `${ddConfig.process_code}`,
                    "originator_user_id": order.userid,
                    "form_component_values": {
                        "name": "待办工单",
                        "value": `${order.orderId}`
                    },
                    "url": `${url}`
                }
            },
            method: 'post'
        };
        let process_instance_id = order.processInstanceId;
        if (process_instance_id == null) {
            let instanceData = await model.DdConfig.callApi(ukey, createInstanceOptions);
            process_instance_id = instanceData.result.process_instance_id
        }

        let createTaskOptions = {
            url: 'https://oapi.dingtalk.com/topapi/process/workrecord/task/create',
            data: {
                "request": {
                    "process_instance_id": process_instance_id,
                    "activity_id": "solve",
                    "tasks": {
                        "userid": order.userid,
                        "url": `${url}`
                    }
                }
            },
            method: 'post'
        };
        let taskData = await model.DdConfig.callApi(ukey, createTaskOptions);
        if (taskData.errcode === 0) {
            await order.update({ processInstanceId: process_instance_id });
            return process_instance_id;
        } else {
            return null;
        }

    }
    async cancelTask({ ukey, orderId }) {
        let order = await model.order.getBy({ orderId });
        let cancelTaskOptions = {
            url: 'https://oapi.dingtalk.com/topapi/process/workrecord/taskgroup/cancel',
            data: {
                "request": {
                    "process_instance_id": `${order.processInstanceId}`,
                    "activity_id": "solve"
                }
            },
            method: 'post'
        };
        if (order.processInstanceId) {
            await model.DdConfig.callApi(ukey, cancelTaskOptions);
        }
    }
    async updateInstance({ ukey, orderId }) {
        let order = await model.Order.getBy({ orderId });
        let updateInstanceOptions = {
            url: 'https://oapi.dingtalk.com/topapi/process/workrecord/update',
            data: {
                "request": {
                    "process_instance_id": `${order.processInstanceId}`,
                    "status": "COMPLETED",
                    "result": order.revisitCode == "yes" ? "agree" : "refuse"
                }
            },
            method: 'post'
        };
        if (order.processInstanceId) {
            await model.DdConfig.callApi(ukey, updateInstanceOptions);
        }
    }
}

const obj=new Process()
exports.obj = obj

