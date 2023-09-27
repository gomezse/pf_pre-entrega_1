import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js'; 

//configuracion del servidor
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//definicion de routes
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

//definicion de puerto
app.listen(8080,()=>{
    console.log('Port:8080');
})
