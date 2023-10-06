import envConfig from "../config/env.config.js"
import MongoSingleton from "../config/db.js"

let userService
let productService
let cartService


async function initializeMongoService (){
    console.log("Iniciando DAO servicio para MongoDB");
    try {
        await MongoSingleton.getInstance()
        console.log("Conexión exitosa a MongoDB");
        
        //Inicializo distinitos servicios
        const {default: UserDaoMongo} = await import("./dao/mongo/user.services.js")
        userService = new UserDaoMongo()
        console.log("servicio de usuario inicializado en mongo");
        console.log(userService);

        const {default: ProductDaoMongo} = await import("./dao/mongo/product.services.js")
        productService = new ProductDaoMongo()
        console.log("servicio de producto inicializado en mongo");
        console.log(productService);

        const {default: CartDaoMongo} = await import("./dao/mongo/cart.services.js")
        cartService = new CartDaoMongo()
        console.log("servicio de cart inicializado en mongo");
        console.log(cartService);

    } catch (error) {
        console.error("Error al inicializar el servicio de MongoDB", error);
        process.exit(1)
    }
};

async function initializeFileSyste (){
    console.log("Iniciando DAO servicio para FileSystem");
    try {
        const {default: UserDaoFileSystem} = await import("./dao/fileSystem/user.services.js")
        userService = new UserDaoFileSystem()
        console.log("servicio de usuario inicializado en file system");
        console.log(userService);

        const {default: ProductDaoFileSystem} = await import("./dao/fileSystem/product.services.js")
        productService = new ProductDaoFileSystem()
        console.log("servicio de producto inicializado en file system");
        console.log(productService);

        const {default: CartDaoFileSystem} = await import("./dao/fileSystem/cart.services.js")
        cartService = new CartDaoFileSystem()
        console.log("servicio de cart inicializado en file system");
        console.log(cartService);

    } catch (error) {
        console.error("Error al inicializar el servicio de FileSystem", error);
        process.exit(1)
    }

};

switch (envConfig.persistence) {
    case "mongo":
        initializeMongoService()
        break;
    case "files":
        initializeFileSyste()
        break;
    default:
        console.error("Persistencia no valida en la configuracion: " + envConfig.persistence);
        break;

}


export {userService, productService, cartService}