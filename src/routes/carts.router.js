import { Router } from 'express';
import { cartsManager } from '../CartsManager.js';

const router = Router();

//new cart
router.post("/", async (req, res) => {
    try {
        const newCart= await cartsManager.createCart();
        res.status(200).json({ message: 'Cart created', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//getById
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsManager.getCartById(+cid);
        if (!cart) {
            return res.status(404).json({ message: `No cart found with that id ${cid}`});
        }
        res.status(200).json({ message: 'Cart found', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//add product to cart
router.post("/:cid/product/:pid", async (req, res) => {
    const {cid,pid}=req.params;

    try {
        const newProduct = await cartsManager.addProductToCart(+cid,+pid);
        res.status(200).json({ message: 'Product added to cart', product: newProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;