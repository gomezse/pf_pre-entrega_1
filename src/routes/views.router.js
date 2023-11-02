import { Router } from "express";

import { productsManager } from "../dao/models/mongoose/ProductsManager.js"
const router = Router();

router.get(`/`, async (req, res) => {
    const products = await productsManager.findAll(req.query);
    res.render("chat",{products,style:'index'});
  
  });

  router.get(`/api/products`, async (req, res) => {
    const products = await productsManager.findAll(req.query);
    const {payload,totalPages,page,nextLink,prevLink,hasNextPage,hasPrevPage}=products;
    const productsObject = payload.map(product => product.toObject());

    res.render('home', { product : productsObject,page:page,next:nextLink,prev:prevLink,hasNext:hasNextPage,hasPrev:hasPrevPage,totalPages:totalPages });
  
  });

export default router;