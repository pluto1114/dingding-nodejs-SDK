const model = require('../model');
const Op = require('sequelize').Op;
const obj = {}

obj.createTask = async ({ ukey, orderCode }) => {
    let order = await model.Order.getBy({ orderCode });
    let ddConfig = await model.DdConfig.getBy({ ukey });
    let url = `${ddConfig.url}`;
    let createInstanceOptions = {
        url: 'https://oapi.dingtalk.com/topapi/process/workrecord/create',
        data: {
            "request": {
                "title": `NPS未处理工单(${order.paperid})`,
                "process_code": `${ddConfig.process_code}`,
                "originator_user_id": order.recvUserid,
                "form_component_values": {
                    "name": "待办工单",
                    "value": `${order.orderCode}`
                },
                "url": `${url}#/survey/${order.sid}/watch-paper/${order.paperid}/${order.orderCode}`
            }
        },
        method: 'post'
    };
    let process_instance_id=order.process_instance_id;
    if(process_instance_id==null){
        let instanceData = await model.DdConfig.callApi(ukey, createInstanceOptions);
        process_instance_id=instanceData.result.process_instance_id
    }
    
    let createTaskOptions = {
        url: 'https://oapi.dingtalk.com/topapi/process/workrecord/task/create',
        data: {
            "request": {
                "process_instance_id": process_instance_id,
                "activity_id": "solve",
                "tasks": {
                    "userid": `${order.touserid}`,
                    "url": `${url}#/survey/${order.sid}/solve-paper/${order.paperid}/${order.orderCode}`
                }
            }
        },
        method: 'post'
    };
    let taskData = await model.DdConfig.callApi(ukey, createTaskOptions);
    if(taskData.errcode===0){
        await order.update({ process_instance_id});
        return process_instance_id;
    }else{
        return null;
    }
    
}
obj.cancelTask=async ({ ukey, orderCode })=>{
    let order = await model.Order.getBy({ orderCode });
    let cancelTaskOptions = {
        url: 'https://oapi.dingtalk.com/topapi/process/workrecord/taskgroup/cancel',
        data: {
            "request": {
                "process_instance_id": `${order.process_instance_id}`,
                "activity_id":"solve"
            }
        },
        method: 'post'
    };
    if(order.process_instance_id){
        await model.DdConfig.callApi(ukey, cancelTaskOptions);
    }
}
obj.updateInstance=async ({ ukey, orderCode })=>{
    let order = await model.Order.getBy({ orderCode });
    let updateInstanceOptions = {
        url: 'https://oapi.dingtalk.com/topapi/process/workrecord/update',
        data: {
            "request": {
                "process_instance_id": `${order.process_instance_id}`,
                "status":"COMPLETED",
		        "result":order.revisitCode=="yes"?"agree":"refuse"
            }
        },
        method: 'post'
    };
    if(order.process_instance_id){
        await model.DdConfig.callApi(ukey, updateInstanceOptions);
    }
}
exports.obj = obj

