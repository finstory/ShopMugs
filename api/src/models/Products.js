const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Product',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				validate: {
					isUUID: 4
				}
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			sub_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},

			image: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: true,
					notEmpty: true
				}
			},
			image_cold: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: "",
				validate: {
					isUrl: true,
					notEmpty: true
				}
			},
			wallpaper: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: true,
					notEmpty: true
				}
			},

			animation: {
				type: DataTypes.TEXT,
				defaultValue: "",
				validate: {
					isUrl: true,
					notEmpty: true
				}
			},

			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},

			id_limited: {
				type: DataTypes.STRING,
				defaultValue: "",
				validate: {
					notEmpty: true
				}
			},

			price: {
				type: DataTypes.FLOAT,
				allowNull: true,
				validate: {
					isFloat: true,
					min: 1
				}
			},

			// stock: {
			// 	type: DataTypes.INTEGER,
			// 	defaultValue: 20,
			// 	validate: {
			// 		isInt: true,
			// 		min: 0
			// 	}
			// },

			// description: {
			// 	type: DataTypes.TEXT,
			// 	validate: {
			// 		len: [6, 3040],
			// 		notEmpty: true
			// 	}
			// },



			first_category: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},

			sencond_category: {
				type: DataTypes.STRING,
				// allowNull: false,
				validate: {
					notEmpty: true
				}
			},

			createdAt: {
				type: DataTypes.DATEONLY,
				defaultValue: DataTypes.NOW,
				validate: {
					notEmpty: true,
					isDate: true
				}
			},

			// discount: {
			// 	type: DataTypes.INTEGER,
			// 	defaultValue: 0,
			// 	validate: {
			// 		min: 0,
			// 		max: 100
			// 	}
			// },


			disable: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			}
		},
		{ timestamps: false }
	);
};