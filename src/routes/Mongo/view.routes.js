import express from 'express';
import { ProductModel } from '../../models/productModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
        let page = parseInt(req.query.page);
        if (!page) page = 1;
        let result = await ProductModel.paginate({}, {page, lean: true })
        let prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
        let nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
        let isValid = !(result.page <= 0 || result.page > result.totalPages)
        res.render('products', { result, prevLink, nextLink, isValid })
        console.log(result.page);
});

export default router;