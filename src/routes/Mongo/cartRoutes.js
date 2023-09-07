import express from 'express';
import {CartModel} from '../../models/cartModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        const response = await CartModel.create(body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/* router.post ("/", CartControler.createProduct);
 */
export default router;