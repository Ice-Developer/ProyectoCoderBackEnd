import express from 'express';
/* import { ProductModel } from '../../services/db/models/productModel.js'; */
import { createProduct, getProducts, getProdById, updateProdById, deleteProdById  } from '../../controllers/product.controller.js';

const router = express.Router();

//Create Product
router.post('/', createProduct );

//Get all with filters
router.get('/', getProducts);

//Get product by id
router.get('/:pid', getProdById );

//Update product by id
router.put('/:pid', updateProdById );

//Delete product by id
router.delete('/:pid', deleteProdById );


export default router;