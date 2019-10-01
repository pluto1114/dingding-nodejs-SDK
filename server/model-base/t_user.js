/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			unique: true
		},
		userid: {
			type: DataTypes.STRING(64),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		department: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		avatar: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		openid: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		unionid: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		createtime: {
			type: DataTypes.DATE,
			allowNull: false
		},
		accesstime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		hot: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		ukey: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		god: {
			type: DataTypes.INTEGER(2),
			allowNull: false,
			defaultValue: '0'
		},
		authed: {
			type: DataTypes.INTEGER(2),
			allowNull: true,
			defaultValue: '0'
		},
		orgid: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		role: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: 'ddguest'
		},
		topDeptId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			defaultValue: '0'
		},
		departCascadeName: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		orderCount: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 't_user',
		timestamps: false
	});
};
