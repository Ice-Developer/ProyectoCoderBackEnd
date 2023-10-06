import envConfig from "../config/env.config"
import MongoSingleton from "../config/db"

let userService
let productService
let cartService


async function initializeMongoService (){
    console.log("Iniciando DAO servicio para MongoDB");
    try {
        await MongoSingleton.getInstance()
        console.log("Conexión exitosa a MongoDB");
        
        const {default: UserDaoMongo} = await import("./user.dao.mongo")
        userService = new UserDaoMongo()

       
    } catch (error) {
        
    }
}
