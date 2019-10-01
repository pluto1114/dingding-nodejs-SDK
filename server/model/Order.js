
const table='t_order'
const obj=require('../model-base/abase')(table)

obj.findWithTypeBy=(p)=>{
  return obj.findBySql(`select t1.*,t2.name typeName,t3.value orderStatusName from t_order t1
   join t_order_type t2 on t1.typeCode=t2.code
   join t_dict t3 on t1.orderStatus=t3.key
   where orderStatus=:orderStatus
   order by id desc`,p)
}
obj.findMyOrders=(p)=>{
  return obj.findBySql(`select t1.*,t2.name typeName,t3.value orderStatusName from t_order t1
   join t_order_type t2 on t1.typeCode=t2.code
   join t_dict t3 on t1.orderStatus=t3.key
   
   where startUserid=:startUserid
   order by id desc`,p)
}
obj.findMyOrdersForWorker=(p)=>{
  return obj.findBySql(`select t1.*,t2.name typeName,t3.value orderStatusName from t_order t1
   join t_order_type t2 on t1.typeCode=t2.code
   join t_dict t3 on t1.orderStatus=t3.key
   join t_order_worker t4 on t1.orderCode=t4.orderCode
   where t4.userid=:userid and t1.orderStatus='orderCFOResolve'
   order by id desc`,p)
}
obj.findForCFO=(p)=>{
  let sql=`select t1.*,t2.name typeName,t3.value orderStatusName,t4.departCascadeName from t_order t1
   join t_order_type t2 on t1.typeCode=t2.code
   join t_dict t3 on t1.orderStatus=t3.key
   join t_user t4 on t1.startUserid=t4.userid
   where orderStatus in(:orderStatus) ${p.orderStatus!='orderFinish'?'and cfoUserid=:userid':''}
   order by id desc`
   console.log(sql,p)
  return obj.findBySql(sql,p)
}
obj.getMaxId=(p)=>{
  return obj.findBySql(`select max(id) maxId from t_order`,p)
}
exports.obj = obj