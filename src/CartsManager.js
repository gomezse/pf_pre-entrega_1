import { existsSync, promises } from "fs";
import { productsManager } from "./ProductManager.js";
const path = "./data/CartsFile.json";

class CartsManager {

    constructor() {
        this.carts = [];
    }

    //getById
    async getCartById(searchId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === searchId);
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    //getAll 
    async getCarts(queryObj = {}) {
        const { limit } = queryObj;

        try {
            if (existsSync(path)) {
                const cartsFile = await promises.readFile(path, 'utf-8');
                const cartsData = JSON.parse(cartsFile);
                return limit ? cartsData.slice(0, +limit) : cartsData;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }


    //create new cart
    async createCart() {
        try {
            const carts = await this.getCarts();
            const newCart = {
                id: !carts.length ? 1 : carts[carts.length - 1].id + 1,
                products: []
            };

            carts.push(newCart);

            await promises.writeFile(path, JSON.stringify(carts));
            return newCart;
        } catch (error) {
            return error;
        }
    }

    //add product to cart
    async addProductToCart(cid, pid) {
        //validate cart
        const cart = await this.getCartById(cid);
        if (!cart) { throw new Error("There is no cart for that id"); }

        //validate product
        const product = await productsManager.getProductById(pid);
        if (!product) { throw new Error("There is no product for that id"); }

        //exist product in cart ?
        const productIndex = cart.products.findIndex(product => product.id === pid)

        //add product to cart
        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }
    }

}

export const cartsManager = new CartsManager();
