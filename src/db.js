import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const enviorment = async ()=>{
await mongoose.connect(
    //url de mongoDB
    "mongodb+srv://jtognidev:00Iceman00@cluster0.hzyqwa1.mongodb.net/ProyectCH",
    {  
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

enviorment()
export default mongoose;