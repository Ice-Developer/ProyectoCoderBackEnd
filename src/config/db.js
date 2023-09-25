import mongoose from "mongoose";
import dotenv from "dotenv";
import envConfig from "./env.config.js";
dotenv.config()

/* const enviorment = async ()=>{
await mongoose.connect(
    //url de mongoDB
    envConfig.mongoUrl,
    {  
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

enviorment() */




const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(envConfig.mongoUrl);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB()
export default mongoose;