import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    "products": {
        type: Array
    }
})

export const  CartModel = mongoose.model('cart', Schema);