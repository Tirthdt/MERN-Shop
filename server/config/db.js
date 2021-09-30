import mongoose from "mongoose";

const connDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO DB connected : ${conn.connection.host}`.cyan.bold);
    } catch (error) {
        console.log(`Error : ${error.message}`.red.bold);
        console.log(error);
        process.exit(1);
    }
}

export default connDB;