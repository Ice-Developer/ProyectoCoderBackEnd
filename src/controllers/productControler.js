import * as ProductServices from '../services/productService.js';


export async function createProduct(req, res) {
    try {
        const {body} = req;
        const response = await ProductServices.createProduct (body)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    
    }
}

export async function getProducts(req, res) {
    let limit = req.params.limit ? parseInt(req.params.limit) :  10;
    let page = req.params.page ? parseInt(req.params.page) : 1;
    
    try {
        const response = await ProductServices.getProducts(limit, page);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}