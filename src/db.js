import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

mongoose.connect(
    //url de mongoDB
    process.env.MONGO_URL,
    {  
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

export default mongoose;