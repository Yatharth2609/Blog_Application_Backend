import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to DB!!")
        })
    } catch (error) {
        console.log("MONGODB: ", error.message)
    }
}