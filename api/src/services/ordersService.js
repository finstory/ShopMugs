const { Order, Cart, Product, User } = require("../db");
const { Op } = require("sequelize");
const { sendRegistrationEmail } = require("../utils/mailsService");


/**
 * 
 * @param {*} status
 * 
 * si se pasa un status, retorna las ordenes de compra con ese estado, sino retorna todas las ordenes de compra
 */
async function getAllOrders(status) {

    try {

        if (status) {

            let orders = await Order.findAll({
                where: {
                    status: status
                }
            });

            return orders;
        }

        let orders = await Order.findAll();

        return orders;

    } catch (error) {

        throw error;

    }
}

async function getUserOrders(userID) {

    try {

        let orders = null;
        const user = await User.findOne({
            where: { id: userID }
        })

        if (user.user_type === "Admin")

            orders = await Order.findAll({
                raw: true
            })
        else
            orders = await Order.findAll({
                where: {
                    UserId: userID
                }, raw: true
            })

        if (orders) return orders.map(order => {
            delete order.userID;
            return { ...order, cart: JSON.parse(order.cart) }
        })
        else throw new Error(`Orders not found or id user incorrect.`);

    } catch (error) {

        throw error;

    }
}

async function addOrder(userID, status, address) {

    function generateCode(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    try {
        let cart = await Cart.findOne({
            where: {
                UserId: userID
            }, raw: true
        });

        const user = await User.findOne({
            where: { id: userID }
        })

        const cartItems = JSON.parse(cart.items);
        const cartResult = [];

        for (let j = 0; j < cartItems.length; j++) {
            const itemDB = await Product.findOne({
                where: {
                    id: cartItems[j].id,
                }, raw: true
            });
            cartResult.push({ ...cartItems[j], ...itemDB })
        }

        if (user && cart.total_price > 0)
            await Order.create({ UserId: userID, status, address, code: generateCode(4), cart: JSON.stringify(cartResult), total_price: cart.total_price });

        else throw new Error(`User not found or your cart is null.`);
    } catch (error) {

        throw error;

    }
}


/**
 * 
 * @param {*} orderID 
 * @param {*} status puede ser 'open', 'created', 'processing', 'approved' o 'cancelled'
 * 
 * modifica el estado de una orden por id
 */
async function changeOrderStatus(orderID, status) {

    try {

        let order = await Order.findByPk(orderID);

        if (order) await order.update({ status: status });
        else throw new Error(`Order not found.`);
    } catch (error) {

        throw error;

    }
}


module.exports = {
    getAllOrders,
    addOrder,
    changeOrderStatus,
    getUserOrders
}