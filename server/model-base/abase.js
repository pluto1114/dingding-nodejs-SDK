const db = require('../db');
const pageSize=db.pageSize

function base(table) {
	const contruct = require(`./${table}`)
	const obj = contruct(db.sequelize, db.dataTypes)
	obj.sql=db.sequelize
	obj.SELECT=db.sequelize.QueryTypes.SELECT
	obj.getBy = (param) => {
		return obj.findOne({ where: param });
	}
	obj.findBy = (param) => {
		return obj.findAll({ where: param })
	}
	obj.findByOrder = (param,order) => {
		return obj.findAll({ where: param ,order})
	}
	obj.pageByOrder = async (param,order,pageNum) => {
		// return obj.findAll({ where: param ,order:order,offset:(pageNum-1)*pageSize,limit:pageSize})
		let items=await obj.findAll({ where: param ,order:order,offset:(pageNum-1)*pageSize,limit:pageSize})
		let total=await obj.count({ where: param})
		return {items,total}
	}
	obj.findBySql=(sql,param)=>{
		return obj.sql.query(sql,{replacements:param,type : obj.SELECT})
	}
	obj.pageBySql=(sql,param,pageNum)=>{
		sql=sql+' limit '+(pageNum-1)*pageSize+','+pageSize
		return obj.sql.query(sql,{replacements:param,type : obj.SELECT})
	}
	obj.updateBySql=(sql,param)=>{
		return obj.sql.query(sql,{replacements:param,type : obj.UPDATE})
	}
	obj.updateBy = (model,param) => {
		return obj.update(model,{ where: param })
	}
	obj.deleteBy = (param) => {
		return obj.destroy({ where: param })
	}
	obj.countBy = (param) => {
		return obj.count({ where: param })
	}
	
	return obj
	
}
module.exports = base

