import mongoose from 'mongoose'

const dbConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB is successfully connected at PORT: ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log("MongoDB connection failed ", err.message)
        process.exit(1)
    }
}

export default dbConnection