const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'Order',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				validate: {
					isUUID: 4
				}
			},
			status: {
				type: DataTypes.ENUM(
					'open',
					'created',
					'processing',
					'approved',
					'cancelled'
				),
				allowNull: false,
				validate: {
					notEmpty: true,
					isIn: [['open', 'created', 'processing', 'approved', 'cancelled']]
				}
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			code: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			cart: {
				type: DataTypes.JSON,
				allowNull: true,
			},
			total_price: {
				type: DataTypes.FLOAT,
				defaultValue: 0,
				validate: {
					isFloat: true
				}
			},
			// userId: {
			// 	type: DataTypes.STRING,
			// 	allowNull: false,
			// 	unique: true,
			// 	validate: {
			// 		isEmail: true,
			// 		notEmpty: true,
			// 	},
			// }
		},
		{ timestamps: false }
	);
};
