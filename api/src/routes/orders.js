const { Router } = require('express');
const axios = require('axios');
const {
    getAllOrders,
    addOrder,
    getOrderDetails,
    changeOrderStatus,
    getUserOrders
} = require("../services/ordersService");


const router = Router();


// /**
//  * si se pasa un estado por query, retorna las ordenes de compra en ese estado
//  * si no se pasa un estado, retorna todas las ordenes de compra
//  */
//  router.get("/orders", async function(req, res) {

//     const { status } = req.query;

//     try {
        
//         res.status(200).json(await getAllOrders(status));

//     } catch (error) {
        
//         res.status(400).json({error: error.message});

//     }
// })



/**
 * retorna las ordenes de compra de un usuario por id
 */
 router.get("/orders/:userID", async function(req, res) {

    const { userID } = req.params;

    try {

        res.status(200).json(await getUserOrders(userID));

    } catch (error) {
        
        res.status(400).json({error: error.message});

    }
})


/**
 * crea una orden de compra
 */
router.post("/orders", async function(req, res) {

    const { userID, status, address } = req.body;

    try {
        await addOrder(userID, status, address)
        res.status(200).json("Your order has been added.");

    } catch (error) {
        
        res.status(400).json({error: error.message});

    }
})


/**
 * cambia el estado de una orden por id
 */
router.patch("/orders", async function(req, res) {

    const { orderId, status } = req.body;

    try {
        await changeOrderStatus(orderId, status)
        res.status(200).json("Your status order has been updated.");

    } catch (error) {
        
        res.status(400).json({error: error.message});

    }
})


module.exports = router;