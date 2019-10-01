/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('organ', {
		id: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		orgname: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		parentorg: {
			type: DataTypes.STRING(20),
			allowNull: true,
			defaultValue: '0'
		},
		haschildren: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0'
		},
		cname: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ''
		},
		ccode: {
			type: DataTypes.STRING(200),
			allowNull: true,
			defaultValue: ''
		},
		orgorder: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: '0'
		},
		dd_dept_id: {
			type: DataTypes.BIGINT,
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'organ',
		timestamps: false
	});
};
