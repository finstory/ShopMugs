const axios = require('axios');
const { Op } = require('sequelize');
const { Sequelize } = require("sequelize");
const { Product, Comment, Order, User } = require("../db");
const json = require("../../mugs.json");
const { getOrderDetails } = require('./ordersService');
/**
 * setea de db.json los productos en db
 */
async function setProducts() {

    try {
        const products = json.map((product) => {
            return {
                name: product.name,
                sub_name: product.sub_name,
                image: product.image,
                image_cold: product.image_cold,
                wallpaper: product.wallpaper,
                animation: product.animation,
                price: product.price,
                type: product.type,
                id_limited: product.id_limited,
                first_category: product.first_category,
                sencond_category: product.sencond_category,
            };
        });

        Product.bulkCreate(products);



    } catch (error) {
        throw error;
    }

}

/**
 * 
 * @returns todos los prductos
 * 
 * esta funcion no se exporta
 */
async function getProducts() {

    try {
        const products = await Product.findAll();

        return products;
    } catch (error) {

        throw error;
    }
}

/**
 * 
 * @param {*} name 
 * @returns si hay name por nombre, si no todos los productos
 */

async function getProductAndFiltred(name = "", _page = 1, _limit = 10000, _order = "name", _sort = "ASC", first_category = "", sencond_category = "", type = "", id_limited = "") {

    let products = await getProducts();
    let results = [];
    let totalPages = 0;
    const filtred = async (cond, total) => {
        const searchBy = cond ? "name" : "sub_name";
        const list = await Product.findAll({
            where: {
                id_limited: {
                    [Sequelize.Op.like]: `%${id_limited}`
                },
                first_category: {
                    [Sequelize.Op.like]: `%${first_category}`
                },
                sencond_category: {
                    [Sequelize.Op.like]: `%${sencond_category}`
                },
                type: {
                    [Sequelize.Op.like]: `%${type}`
                },
                [searchBy]: {
                    [Sequelize.Op.like]: `%${name}%`,
                },
            },
            offset: total ? 0 : (_page - 1) * _limit,
            limit: total ? 10000 : _limit,
            order: [
                [_order, _sort],
            ], raw: true
        });

        if (total) totalPages = Math.ceil(list.length / _limit);
        else results = list
    }

    await filtred(true, true);
    if (!totalPages) await filtred(false, true);

    await filtred(true);
    if (!results.length) await filtred(false);


    // if (totalPages) {
    //     (list.length / _limit).toString() === (list.length / _limit).toFixed(0) ? totalPages = list.length : totalPages = parseInt((list.length / _limit).toFixed(0)) + 1;
    // }

    return { list: results, totalPages };

}


/**
 * 
 * @param {*} id 
 * @returns retorna un objeto por id
 */
async function getProductById(id) {

    try {

        const product = await Product.findOne({
            where: { id: id },
            include: {
                model: Comment
            }
        });

        return product;

    } catch (error) {
        throw error;
    }

}



/**
 * 
 * @param {*} product 
 * 
 * agrego producto recibido
 */
async function addProduct(product) {


    try {
        await Product.create(product);

        // if (product.discount !== 0) {
        //     let finalPrice = product.price - ((product.price * product.discount) / 100);
        //     let finalProduct = { ...product, finalPrice };

        //     await Product.create(finalProduct);

        // } else {
        //     const finalPrice = product.price;
        //     const finalProduct = { ...product, finalPrice };
        //     await Product.create(finalProduct);
        // }



    } catch (error) {

        throw error;

    }

}

/**
 * 
 * @param {*} id 
 * 
 * borro producto por id
 */
async function deleteProduct(id) {

    const myProduct = await Product.findOne({
        where: { id }
    });

    if (myProduct) {
        await myProduct.destroy();
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} newProduct 
 * 
 * modificamos el producto por id pusheando uno nuevo
 */
async function modifyProduct(id, newProduct) {

    const myProduct = await Product.findOne({
        where: { id }
    })

    if (myProduct) {
        await myProduct.update(newProduct);
    }
    else {
        throw new Error("Product not found");
    }

}

module.exports = {
    addProduct,
    setProducts,
    deleteProduct,
    modifyProduct,
    getProductAndFiltred,
    getProductById,
}
