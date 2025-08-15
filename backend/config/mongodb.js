import mongoose from "mongoose"


const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => {
            console.log("Database connected");
        })

        mongoose.connection.on('error', (err) => {
            console.log("Database connection error", err)
        })

        mongoose.connection.on('disconnected', () => {
            console.log("Database connection lost")
        })

        mongoose.connection.on('reconnected', () => {
            console.log("Database connection reconnected")
        })

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "insuranceapp"
        })
        
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;