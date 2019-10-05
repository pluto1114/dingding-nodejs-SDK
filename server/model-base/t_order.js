/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('t_order', {
		orderId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		orderName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		userid: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		totalPrice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		orderStatus: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		processInstanceId: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		createtime: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 't_order',
		timestamps: false
	});
};
