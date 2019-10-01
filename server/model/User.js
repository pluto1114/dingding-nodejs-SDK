
const table = 't_user'
const obj = require('../model-base/abase')(table)
const model = require('../model')

obj.createUser = async (info,ukey) => {
    let options = {
        url: 'https://oapi.dingtalk.com/user/get',
        params: { userid: info.userid },
    }
    let u = await model.DdConfig.callApi(ukey, options)
    let depart = u.department[0]
    let topDepts = await model.Dept.findBySql(`call getAllDepart(${depart},'${ukey}')`)
    let dept = topDepts[0]['0']
    let deptname = ''
    for (let k in topDepts[0]) {
        deptname += '-' + topDepts[0][k].name
    }
    deptname = deptname.substring(1)
    let organ = await model.Organ.getBy({ dd_dept_id: dept.id })
    let orgid = organ && organ.id
    user = await model.User.create({
        userid: u.userid, openid: u.openId, name: u.name, mobile: u.mobile, email: u.email, avatar: u.avatar, department: u.department.join(','), orgid, topDeptId: dept.id, departCascadeName: deptname, jobnumber: u.jobnumber, ukey: ukey, createtime: new Date, accesstime: new Date, god: false, role:info.role
    })
    return user
}

obj.getCFO=async p=>{
    const cfos=await obj.findByOrder({god:1},[['orderCount','asc']])
    return cfos.length>0?cfos[0]:null
}
obj.findWorkers=async ()=>{
    return obj.findBySql(`select t1.*,t2.name deptName from t_user t1
     left join dd_dept t2 on t1.topDeptId=t2.id where role='worker'
     order by topDeptId`)
}
exports.obj = obj