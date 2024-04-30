import mongoose from "mongoose";


const Connect_db = async (DATABASE_URL,DATABASE_NAME) => {
    try {
        await mongoose.connect(DATABASE_URL, { dbName: DATABASE_NAME })
        console.log("successfully connected to database ...");
    } catch (error) {
        console.log("unable to connect to database ...");
    }
}


export default Connect_db