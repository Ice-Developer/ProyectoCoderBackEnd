import * as ProductModel from '../models/productModel.js';
import mongoosePaginate from "mongoose-paginate-v2";

ProductModel.plugin(mongoosePaginate);

export async function createProduct(data) {
    try {
        const response = await ProductModel.create(data)
        return response
    } catch (error) {
        throw new Error(error)
    
    }
}

export async function getProducts(limit, page)
{
    try {

        const options = {
            page: page,
            limit: limit,
            sort: { price: 1 } 
        };
        let response = await ProductModel.paginate({}, options)
        return response
    }catch (error) {
        throw new Error(error)  
    }
}
