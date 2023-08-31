import express from 'express';
/* import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';  */
/* import realTimeProductsRoutes from './routes/realTimeProducts.routes.js'; */
import __dirname from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
/* import {ProductManager} from '../src/managers/productManager.js';  */
import dotenv from 'dotenv';
import './db.js'
import productRoutes from './mongoRoutes/productRoutes.js'
import cartRoutes from './mongoRoutes/cartRoutes.js'

dotenv.config();

/* let productManager = new ProductManager();  */

const app = express();
/* const Port = 8080; */

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


/* app.use('/', express.static(__dirname + '/public')); */
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes);  
/* app.use("/api/carts", cartsRoutes); */
/* app.use("/api/products", productsRoutes);
app.use('/realTimeProducts', realTimeProductsRoutes);
 */

app.get('/', async (req, res) => {
    let allProducts = await productManager.getProducts();
    const products = JSON.parse(allProducts);
    console.log(allProducts);
    res.render('home', {
        title: 'Express con Handlebars',
        products
    });
    }
)

const PORT = process.env.PORT;
const httpServer = app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})

export const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    const data = await productManager.getProducts();
    console.log(data);
    const dataProd = JSON.parse(data);
    socket.emit('all-products', {dataProd});
    }) 
    
/* //Devuelve todos los productos
app.get('/productos', async (req, res) => {
    const productos = await productManager.getProducts();
    const prodObjeto = JSON.parse(productos); 
    res.json (prodObjeto);
}) 

//Devuelve la cantidad de productos segun el query limit
app.get('/productos/query', async (req, res) => {
    const {limit} = req.query;
    if (limit == undefined) {
        const productos = await productManager.getProducts();
        const prodObjeto = JSON.parse(productos); 
        res.json (prodObjeto);
    }else if(limit > 0){
        const productos = await productManager.getProducts();
        const prodObjeto = JSON.parse(productos); 
        const prodFiltrados = prodObjeto.slice(0, limit);
        res.json (prodFiltrados);
    }else {
        res.json ({error: 'El monto requerido supera la cantidad de productos'});
    
    }

})

app.get('/productos/:pid', async (req, res) => {
    const pid = req.params.pid;
    const id = parseInt(pid);
    const producto = await productManager.getProductById(id);
    if (producto) {
        res.json ({producto});
    }else {
        res.json ({error: 'producto no encontrado'});
    }
    
})

const producto = async () => {
    await productManager.getProductById(1)
}
console.log(producto()); */