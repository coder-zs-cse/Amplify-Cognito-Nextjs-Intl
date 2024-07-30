import mongoose from 'mongoose';


async function dbConnect(){
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
}

export default dbConnect