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
		departmentName: {
			type: DataTypes.STRING(255),
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
		upDepart: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		ukey: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		point: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		},
		god: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		},
		role: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: 'P'
		}
	}, {
		tableName: 't_user',
		timestamps: false
	});
};
