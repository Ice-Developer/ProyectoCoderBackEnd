import { CartModel } from '../models/cartModel.js';

export async function createProduct(data) {
    try {
        const response = await CartModel.create(data)
        return response
    } catch (error) {
        throw new Error(error)
    }
}