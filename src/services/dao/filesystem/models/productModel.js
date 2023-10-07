/* import fs from 'fs';  */


export default class Product{
    constructor (title, description, price, thumbnail, code, stock, category, id){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.status = true;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.category = category;
    }
};



