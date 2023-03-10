require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

let sequelize =
	process.env.NODE_ENV === 'production'
		? new Sequelize({
				database: DB_NAME,
				dialect: 'postgres',
				host: DB_HOST,
				port: 5432,
				username: DB_USER,
				password: DB_PASSWORD,
				pool: {
					max: 3,
					min: 1,
					idle: 10000,
				},
				dialectOptions: {
					ssl: {
						require: true,
						// Ref.: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
				{ logging: false, native: false }
		  );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Order, Product, Comment, Cart } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
const ProductCart = sequelize.define('product_cart', {
	quantity: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, { timestamps: false });


// Product.belongsToMany(Order, { through: 'product_order', timestamps: false,});
// Order.belongsToMany(Product, { through: 'product_order', timestamps: false,});

Cart.belongsToMany(Product, { through: ProductCart });
Product.belongsToMany(Cart, { through: ProductCart });
User.hasMany(Cart);
Cart.belongsTo(User);

Order.belongsTo(User);
User.hasMany(Order);

Product.hasMany(Comment);

Comment.belongsTo(Product);

User.hasMany(Comment);
Comment.belongsTo(User);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
