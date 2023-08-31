import * as CartServices from '../services/cartServices.js';


export async function createProduct(req, res) {
    try {
        const {body} = req; 
        const response = await CartServices.createProduct (body)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}