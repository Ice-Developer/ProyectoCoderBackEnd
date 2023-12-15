import {fileURLToPath} from 'url';
import { dirname, parse } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envConfig from './config/env.config.js';
import {fakerES as faker} from '@faker-js/faker';
import nodemailer from 'nodemailer';
import multer from 'multer'

// Encriptacion
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

//administracion archivos locales
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


//Configuracion de Multer para subir archivos
function createMulterMiddleware(destination) {
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, destination);
      },
      filename: function (req, file, cb) {
        cb(null, (file.originalname).split(" ").join("_"));
      },
    }),
    onError: function (err, next) {
      console.log(err);
      next();
    },
  });
}

export const upProfileImg = createMulterMiddleware(`${__dirname}/public/profile`);
export const upProdImg = createMulterMiddleware(`${__dirname}/public/products`);
export const upUserDocs = createMulterMiddleware(`${__dirname}/public/documents`);


/////////////////////////////////////////////////////////
//Config JWT
////////////////////////////////////////////////////////
export const PRIVATE_KEY = envConfig.jwtPrivateKey;

export const generateToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '60s'})
};

export const authToken = (req, res, next) => {
    //el JWT de autorizacion se guarda en el header de la peticion
    const authHeader = req.headers.authorization;
    if (!authHeader){ 
        return res.status(401).send({error: 'User not authenticated or missing token'})
    };
    const token = authHeader.split(' ')[1]; // se hace el split para retirar la palabra Bearer y quedarnos solo con el token
    
    //validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: 'Invalid token, access denied'});
        //token ok
        req.user = credentials.user;
        next();
    });
};


//creamos base de productos con Faker
export const generateProducts = () => {
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alpha(5),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar(),
        stock: faker.number.int(500),
        available: faker.datatype.boolean(),
    }
};
    


//transporter de Nodemailer
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: envConfig.gmailUser, 
        pass: envConfig.gmailPass
    }
})

