import { Router } from "express";

import { productsManager } from "../dao/models/mongoose/ProductsManager.js"
const router = Router();

router.get(`/`, async (req, res) => {
    const products = await productsManager.findAll(req.query);
    res.render("chat",{products,style:'index'});
  
  });
export default router;