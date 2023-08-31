import express from 'express';
import * as ProductController from '../controllers/productControler.js';

const router = express.Router();

router.post ("/", ProductController.createProduct);

router.get ("/:limit?/:page", ProductController.getProducts);

export default router;