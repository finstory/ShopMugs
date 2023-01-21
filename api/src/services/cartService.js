const axios = require('axios');
const { Op } = require('sequelize');
const { Product, Cart, ProductCart } = require("../db");


/**
 * @param {*} userID
 * 
 * retorna el carrito de un usuario por id
 */
async function getUserCart(UserId) {

    try {

        let cart = await Cart.findOne({
            where: {
                UserId
            }, raw: true
        });
        let itemsToDB = JSON.parse(cart.items);
        for (let i = 0; i < itemsToDB.length; i++) {
            console.log(itemsToDB[i].id)
            const itemDB = await Product.findOne({
                where: {
                    id: itemsToDB[i].id
                }, raw: true
            });
            itemsToDB[i] = { ...itemDB, amount: itemsToDB[i].amount }
        }

        return { ...cart, items: itemsToDB };
    } catch (error) {
        throw error;
    }
}

/**
 * 
 * @param {*} productID 
 * @param {*} userId 
 * 
 * agrega un producto al carrito con su cantidad y actualiza el precio
 */
async function addProductCart(productId, userId, amount) {

    try {
        const cart = await Cart.findOne({
            where: {
                UserId: userId
            }
        });
        const itemUptedate = JSON.parse(cart.items);

        const product = await Product.findByPk(productId);
        const itemExistsInCart = itemUptedate.find(item => item.id === productId);

        if (product && !itemExistsInCart)
            itemUptedate.push({ id: productId, amount });
        else
            throw new Error(`This product not found or is already in cart.`);

        //* update total pirce.
        let total_price = 0;
        for (let i = 0; i < itemUptedate.length; i++) {
            const itemDB = await Product.findByPk(itemUptedate[i].id);
            total_price += itemDB.price * itemUptedate[i].amount;
        }
        //$  update total pirce.

        await cart.update({
            items: JSON.stringify(itemUptedate),
            total_price
        });


    } catch (error) {
        throw error;
    }

}

async function modifyAmount(productId, userId, amount) {

    try {

        const cart = await Cart.findOne({
            where: {
                UserId: userId
            }
        });
        let itemUptedate = JSON.parse(cart.items);
        console.log(itemUptedate)
        const product = await Product.findByPk(productId);
        const itemExistsInCart = itemUptedate.find(item => item.id === productId);


        if (product && itemExistsInCart)
            itemUptedate = itemUptedate.map(item => {
                if (item.id === productId) return { ...item, amount }
                else return item;
            })
        else
            throw new Error(`This product does not exist.`);

        //* update total pirce.
        let total_price = 0;
        for (let i = 0; i < itemUptedate.length; i++) {
            const itemDB = await Product.findByPk(itemUptedate[i].id);
            total_price += itemDB.price * itemUptedate[i].amount;
        }
        //$  update total pirce.

        await cart.update({
            items: JSON.stringify(itemUptedate),
            total_price
        });

    } catch (error) {
        throw error;
    }

}


async function deleteProductCart(productId, userId) {

    try {
        const cart = await Cart.findOne({
            where: {
                UserId: userId
            }
        });
        let itemUptedate = JSON.parse(cart.items);

        const product = await Product.findByPk(productId);
        const itemExistsInCart = itemUptedate.find(item => item.id === productId);

        if (product && itemExistsInCart)
            itemUptedate = itemUptedate.filter(item => item.id !== productId);
        else
            throw new Error(`This product not found in cart.`);

        //* update total pirce.
        let total_price = 0;
        for (let i = 0; i < itemUptedate.length; i++) {
            const itemDB = await Product.findByPk(itemUptedate[i].id);
            total_price += itemDB.price * itemUptedate[i].amount;
        }
        //$  update total pirce.

        await cart.update({
            items: JSON.stringify(itemUptedate),
            total_price
        });


    } catch (error) {
        throw error;
    }

}


/**
 * 
 * @param {*} userID 
 * 
 * limpia el carrito con el id del usuario
 */
async function clearAllProcutsCart(userId) {

    try {

        const cart = await Cart.findOne({
            where: {
                UserId: userId
            }
        });

        if (!cart)
            throw new Error(`This cart does not belong to any user.`);

        await cart.update({
            items: JSON.stringify([]),
            total_price: 0
        });

    } catch (error) {
        throw error;
    }

}


/**
 * 
 * @param {*} allProducts 
 * @param {*} userID 
 * 
 * agrega productos en cantidad con el id de usuario
 */
async function addBulkCart(allProducts, userID) {

    try {

        await clearAllCart(userID);

        let cart = await Cart.findOne({
            where: {
                UserId: userID,
            }
        });

        let productsTotalPrice = 0;

        allProducts.forEach(async product => {

            const dbProduct = await Product.findByPk(product.id);

            await cart.addProduct(dbProduct, { through: { quantity: product.amount } });

            productsTotalPrice = productsTotalPrice + (dbProduct.finalPrice * product.amount);

            await cart.update({
                total_price: parseFloat(productsTotalPrice).toFixed(2)
            });
        })

    } catch (error) {
        throw error;
    }


}



module.exports = {
    addProductCart,
    deleteProductCart,
    clearAllProcutsCart,
    addBulkCart,
    getUserCart,
    modifyAmount
}