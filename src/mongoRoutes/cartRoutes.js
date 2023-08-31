import express from 'express';
import * as CartControler from '../controllers/cartControler.js';

const router = express.Router();

router.post ("/", CartControler.createProduct);

/* router.post ("/", CartControler.createProduct);
 */
export default router;