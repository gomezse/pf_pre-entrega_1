import { cartsModel } from "../../../config/database/mongoose/models/cart.model.js";
import { productsManager } from "../mongoose/ProductsManager.js";

class CartsManager {
    /**
     * Busca y devuelve un carrito por su ID.
     * @param {string} searchId - El ID del carrito a buscar.
     * @returns {Promise<Object|null>} - El carrito encontrado o null si no se encuentra.
     */
    async getCartById(searchId) {
        try {
            const cart = await cartsModel.findById(searchId);
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Obtiene y devuelve todos los carritos.
     * @returns {Promise<Array>} - Una matriz de carritos.
     */
    async getCarts() {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            return error;
        }
    }

    /**
     * Crea un nuevo carrito vacío.
     * @returns {Promise<Object>} - El carrito recién creado.
     */
    async createCart() {
        try {
            const newCart = { products: [] };
            const response = await cartsModel.create(newCart);
            return response;
        } catch (error) {
            return error;
        }
    }

    /**
     * Agrega un producto a un carrito especificado.
     * @param {string} cartId - El ID del carrito al que se debe agregar el producto.
     * @param {string} productId - El ID del producto a agregar.
     * @returns {Promise<Object>} - El carrito actualizado con el producto agregado.
     */
    async addProductToCart(cartId, productId) {
        try {
            const cart = await cartsModel.findById(cartId);

            const productIndex = cart.products.findIndex(
                (p) => p.product._id.equals(productId)
            );
            if (productIndex === -1) {
                cart.products.push({ product: productId, quantity: 1 });
            } else {
                cart.products[productIndex].quantity++;
            }
            return cart.save();
        } catch (error) {
            return error;
        }



    }
}

export const cartsManager = new CartsManager();
