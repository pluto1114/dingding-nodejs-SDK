/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_order_type', {
		code: {
			type: DataTypes.STRING(64),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(64),
			allowNull: true
		}
	}, {
		tableName: 't_order_type',
		timestamps: false
	});
};
