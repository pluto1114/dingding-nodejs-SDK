/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_order', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		orderCode: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		startUserid: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		startName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		cfoUserid: {
			type: DataTypes.STRING(64),
			allowNull: true,
			defaultValue: ''
		},
		orderStatus: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		typeCode: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		descp: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		resolveDescp: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		comment: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		result: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		createtime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		recvtime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		sendtime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		finishtime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		rate: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		topDeptId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		ukey: {
			type: DataTypes.STRING(64),
			allowNull: true
		}
	}, {
		tableName: 't_order',
		timestamps: false
	});
};
