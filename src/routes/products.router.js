import { Router } from 'express';
import { productsManager } from '../ProductManager.js';

const router = Router();

//getAll
router.get("/", async (req, res) => {
    try {
        const products = await productsManager.getProducts(req.query);

        if (!products.length) {
            return res.status(200).json({ message: 'No products' });
        }

        res.status(200).json({ message: 'Products found', products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//getById
router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productsManager.getProductById(+pid);
        if (!product) {
            return res.status(404).json({ message: `No product found with that id ${pid} ` });
        }
        res.status(200).json({ message: 'Product found', product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//new
router.post("/", async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: `Required data is misssing` });
    }

    try {
        const newProduct = await productsManager.createProduct(req.body);
        res.status(200).json({ message: 'Product created', product: newProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//delete
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productsManager.getProductById(+pid);
        if (!product) {
            return res.status(404).json({ message: `No product found with that id ${pid} ` });
        }
        await productsManager.deleteProduct(+pid)
        res.status(200).json({ message: 'Product deleted', product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update
router.put("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await productsManager.getProductById(+pid);
        
        if (!product) {
            return res.status(404).json({ message: `No product found with that id ${pid} ` });
        }
        // Actualizar el producto
        await productsManager.updateProduct(+pid, req.body);
        const productUpdated = await productsManager.getProductById(+pid);

        res.status(200).json({ message: 'Product updated', product: productUpdated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



export default router;