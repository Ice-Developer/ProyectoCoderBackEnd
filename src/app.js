//import dependencias
import express from 'express';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';

//import router
import productRoutes from './routes/Mongo/productRoutes.js'
import cartRoutes from './routes/Mongo/cartRoutes.js';
import viewsRouter from './routes/Users/views.router.js';
import usersViewRouter from './routes/Users/users.views.router.js';
import sessionsRouter from './routes/Users/sessions.router.js'
import views from './routes/Mongo/view.routes.js';

//import managers
import dotenv from 'dotenv';
import './db.js'

//PARA SESSION
import session from 'express-session';
import MongoStore from 'connect-mongo';

//COMENTADOS POR FILE SYSTEM
/* import {ProductManager} from '../src/managers/productManager.js';  */
/* import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';  */
/* import realTimeProductsRoutes from './routes/realTimeProducts.routes.js'; */



dotenv.config();
const app = express();

/* let productManager = new ProductManager();  */
/* const Port = 8080; */

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware para archivos estaticos

app.use(express.static(__dirname + '/public'));

//Config Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 60
    }),
    secret: "coderS3cr3t",
    resave: true, //guarda en memoria
    saveUninitialized: false, 
    //lo guarda apenas se crea
}));


//ROUTERS
/* app.use('/', express.static(__dirname + '/public')); */
/* app.use("/api/products", productsRoutes);*/
/* app.use('/realTimeProducts', realTimeProductsRoutes); */
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes);  
app.use("/products", views);
app.use("/carts", views);
app.use("/", viewsRouter);
app.use("/users", usersViewRouter);
app.use("/api/sessions", sessionsRouter);





const PORT = process.env.PORT;
const httpServer = app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})



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

