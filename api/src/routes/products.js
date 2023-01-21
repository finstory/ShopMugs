const { Router } = require('express');
const axios = require('axios');
const {
    addProduct,
    setProducts,
    deleteProduct,
    modifyProduct,
    getProductAndFiltred,
    getProductById,
} = require("../services/productsService");

const router = Router();



//** retorno total de productos

router.get("/products", async function (req, res) {
    // setProducts();
    const { name = "", _page = 1, _limit = 99, _order = "name", _sort = "ASC", first_category = "", sencond_category = "", type, id_limited } = req.query;

    try {
        res.status(200).json(await getProductAndFiltred(name, _page, _limit, _order, _sort, first_category, sencond_category, type, id_limited));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

/**
 * retorno producto por id
 */
router.get("/products/:id", async function (req, res) {

    const { id } = req.params;

    try {
        res.status(200).json(await getProductById(id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

})


/**
 * agrego producto recibido por body
 */
router.post("/products", async function (req, res) {

    const product = req.body;

    try {
        res.status(200).json(await addProduct(product));

    } catch (error) {
        res.status(400).json({ error: error.message });
    }


})

/**
 * borramos producto recibo por query
 */
router.delete("/products", async function (req, res) {

    const { id } = req.query;

    try {
        res.status(200).json(await deleteProduct(id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

/**
 * modifico el producto recibido
 */
router.put("/products", async function (req, res) {

    const { id, newProduct } = req.body;

    try {
        res.status(200).json(await modifyProduct(id, newProduct));
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

})


module.exports = router;
