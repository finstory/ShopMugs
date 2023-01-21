const { Router } = require('express');
const axios = require('axios');
const {
    addProductCart,
    deleteProductCart,
    clearAllProcutsCart,
    addBulkCart,
    getUserCart,
    modifyAmount
} = require("../services/cartService");

const router = Router();


/**
 * retorna el carrito de un usuario por id
 */
router.get("/cart/:userId", async function (req, res) {
    const { userId } = req.params;

    try {
        res.status(200).json(await getUserCart(userId));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


/**
 * agrega UN SOLO producto al carrito
 */
router.put("/cart", async function (req, res) {

    const { productId, userId, amount } = req.body;

    try {
        await addProductCart(productId, userId, amount);
        res.status(200).json("Product added successfully.");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});


router.patch("/cart", async function (req, res) {

    const { productId, userId, amount } = req.body;

    try {
        await modifyAmount(productId, userId, amount);
        res.status(200).json("Product update successfully.");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

/**
 * elimina UN SOLO producto (con todas sus cantidades) del carrito
 */
router.delete("/cart", async function (req, res) {
    
    const { productId, userId } = req.body;

    try {
        await deleteProductCart(productId, userId)
        res.status(200).json("Product remove successfully.");

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});


/**
 * IMPORTANTE!!! la data tiene que ser:
 * @param {*} allProducts //ARRAY con id de los productos minimamente
 * @param {*} userID // id del usuario 
 * agregamos todos los productos que llegan de LOCALSTORAGE al carrito cuando el usuario se loguea
 */
router.post("/cart/bulk", async function (req, res) {

    const { allProducts, userID } = req.body;

    try {
        res.status(200).json(await addBulkCart(allProducts, userID));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});


/**
 * vaciamos el carrito con el id del usuario
 */
router.delete("/cart/:userId", async function (req, res) {

    const { userId } = req.params;

    try {
        res.status(200).json(await clearAllProcutsCart(userId));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});


/**
 * modifica la cantidad agregada al carrito de un producto por id
 */
router.put("/cart/quantity", async function (req, res) {

    const { newQuantity, productID, userId } = req.body;

    try {
        res.status(200).json(await modifyQuantity(newQuantity, productID, userId))
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})


module.exports = router;