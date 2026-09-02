import mongoose from "mongoose";

import { DB_name } from "../constants.js";

const connectDB = async () =>{

    try{

        const connectionINS = await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_name}`);
        console.log(`mongo db connected :db host ${connectionINS.connection.host}`);
    }catch(error){
        console.error("data connection Failed" , error);

        process.exit(1);

    }
    
}

export default connectDB;